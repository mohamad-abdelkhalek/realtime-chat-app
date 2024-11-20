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

?>