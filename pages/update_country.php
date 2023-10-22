<?php
// Handle the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['country'])) {
    $selected_country = $data['country'];

    // Connect to your database and update the user's country
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "prefs";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Replace "your_user_id" with the actual user ID you want to update
    $user_id = 1; // Change this to the appropriate user ID

    $sql = "UPDATE users SET country = '$selected_country' WHERE ID = $user_id";

    if ($conn->query($sql) === TRUE) {
        $response = ['success' => true];
    } else {
        $response = ['success' => false, 'error' => $conn->error];
    }

    $conn->close();

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
