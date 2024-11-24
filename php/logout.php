<?php

session_start();

if (isset($_SESSION['unique_id'])) { // Check if user is logged in
    include_once "config.php";
    $logout_id = filter_input(INPUT_GET, 'logout_id', FILTER_VALIDATE_INT);

    if ($logout_id) { // If logout_id is valid
        $status = "Offline now";

        // Update user status to offline
        $stmt = $connection->prepare("UPDATE users SET status = ? WHERE unique_id = ?");
        $stmt->bind_param("si", $status, $logout_id);

        if ($stmt->execute()) {
            session_unset();
            session_destroy();
            header("Location: ../login.html", true, 302);
            exit;
        } else {
            error_log("Error updating user status: " . $stmt->error);
        }

        $stmt->close();
    } else {
        header("Location: ../users.php", true, 302);
        exit;
    }
} else {
    header("Location: ../login.html", true, 302);
    exit;
}

?>
