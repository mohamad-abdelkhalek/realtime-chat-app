<?php
while ($row = mysqli_fetch_assoc($sql)) {
    $sql2 = "SELECT * FROM messages 
             WHERE (incoming_msg_id = {$row['unique_id']} OR outgoing_msg_id = {$row['unique_id']}) 
             AND (outgoing_msg_id = {$outgoing_id} OR incoming_msg_id = {$outgoing_id}) 
             ORDER BY msg_id DESC LIMIT 1";

    $query2 = mysqli_query($connection, $sql2);

    if (mysqli_num_rows($query2) > 0) {
        $row2 = mysqli_fetch_assoc($query2);
        $result = $row2['msg'];
        // Add "You:" prefix if the logged-in user sent the message
        $you = ($outgoing_id == $row2['outgoing_msg_id']) ? "You: " : "";
    } else {
        $result = "No message available";
        $you = ""; // No sender prefix
    }

    // Trim the message if it's longer than 28 characters
    $msg = (strlen($result) > 28) ? substr($result, 0, 28) . '...' : $result;

    // Check if the user is offline
    $offline = ($row['status'] == "Offline now") ? "offline" : "";

    // Generate output
    $output .= '<a href="chat.php?user_id=' . $row['unique_id'] . '">
                    <div class="content">
                        <img src="php/images/' . $row['img'] . '" alt="">
                        <div class="details">
                            <span>' . $row['fname'] . " " . $row['lname'] . '</span>
                            <p>' . $you . $msg . '</p>
                        </div>
                    </div>
                    <div class="status-dot ' . $offline . '"><i class="fas fa-circle"></i></div>
                </a>';
}

?>
