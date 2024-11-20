<?php
session_start();
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

include_once "config.php";

// Sanitize input data
$fname = mysqli_real_escape_string($connection, $_POST['fname']);
$lname = mysqli_real_escape_string($connection, $_POST['lname']);
$email = mysqli_real_escape_string($connection, $_POST['email']);
$password = mysqli_real_escape_string($connection, $_POST['password']);

if (!empty($fname) && !empty($lname) && !empty($email) && !empty($password)) {

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        // Check if email already exists
        $sql = mysqli_query($connection, "SELECT email FROM users WHERE email = '{$email}'");
        if (mysqli_num_rows($sql) > 0) {
            echo "$email - This email already exists!";
        } else {
            
        }
?>