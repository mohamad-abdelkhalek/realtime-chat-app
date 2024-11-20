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
            // Check if an image file is uploaded
            if (isset($_FILES['image'])) {
                $img_name = $_FILES['image']['name']; // Get uploaded image name
                $tmp_name = $_FILES['image']['tmp_name']; // Get temporary file name
                $img_explode = explode('.', $img_name);
                $img_ext = strtolower(end($img_explode)); // Get file extension

                $extensions = ['png', 'jpeg', 'jpg'];
                if (in_array($img_ext, $extensions) === true) {
                    $time = time(); // Current timestamp
                    $new_img_name = $time . $img_name;

                    // Ensure images directory exists
                    if (!is_dir("images")) {
                        mkdir("images", 0777, true);
                    }

                    // Move uploaded file
                    if (move_uploaded_file($tmp_name, "images/" . $new_img_name)) {
                        $status = "Active now";
                        $random_id = rand(time(), 10000000);
                        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

?>