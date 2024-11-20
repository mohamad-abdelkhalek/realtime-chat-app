<?php

$host = "localhost:3306";
$dbuser = "root";
$dbpass = "";
$dbname = "chat";

$connection = mysqli_connect($host, $dbuser, $dbpass, $dbname);

if (!$connection) {
    die(json_encode(["success" => false, "message" => "Database connection error: " . mysqli_connect_error()]));
}?>