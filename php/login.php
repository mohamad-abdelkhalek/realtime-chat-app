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

?>
