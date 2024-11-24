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

        $status = "Active now";
        // updating user status to active now if user login successfully
        $sql2 = mysqli_query($connection, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");

        // Verify the password
        if (password_verify($password, $row['password'])) {
            if($sql2){
                $_SESSION['unique_id'] = $row['unique_id']; // Use this session variable elsewhere
            }
            $response = [
                "status" => "success",
                "message" => "Login successful",
                "unique_id" => $row['unique_id']
            ];
        } else {
            $response = [
                "status" => "error",
                "message" => "Email or password is incorrect"
            ];
        }
    } else {
        $response = [
            "status" => "error",
            "message" => "Email or password is incorrect"
        ];
    }

    $stmt->close();
} else {
    $response = [
        "status" => "error",
        "message" => "All input fields are required"
    ];
}

echo json_encode($response);
?>
