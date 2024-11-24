<?php
session_start();
if (isset($_SESSION['unique_id'])) {
    include_once "config.php";
    $outgoing_id = mysqli_real_escape_string($connection, $_POST['outgoing_id']);
    $incoming_id = mysqli_real_escape_string($connection, $_POST['incoming_id']);
    $message = mysqli_real_escape_string($connection, $_POST['message']);

    if (!empty($message)) {
        $sql = "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg) 
                VALUES ('{$incoming_id}', '{$outgoing_id}', '{$message}')";
        
        if (!mysqli_query($connection, $sql)) {
            // Log detailed SQL error for debugging
            die("Error inserting message: " . mysqli_error($connection));
        }
    }
} else {
    // Redirect to login page if session is invalid
    header("Location: ../login.html");
    exit();
}
?>
