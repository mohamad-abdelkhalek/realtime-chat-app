<?php
session_start();
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "config.php";

$response = [];

// Validate input data
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$password = filter_var($_POST['password'], FILTER_SANITIZE_SPECIAL_CHARS);

if ($email && $password) {
    // Use prepared statement to prevent SQL injection
    $stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

    }
}

?>
