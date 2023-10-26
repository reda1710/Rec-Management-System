<?php
include 'session.php';

// Database connection parameters
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'prefs';

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$applianceId = $_GET['appliance_id'];
$user_id = getSession('user_id');

// Fetch user preferences
$sql = "SELECT TIME_FORMAT(start_time, '%H:%i') as start_time, TIME_FORMAT(end_time, '%H:%i') as end_time FROM appliance_user_prefs WHERE appliance_id = $applianceId";
$result = $conn->query($sql);

if($result && $result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'No preferences found for this user and appliance']);
}

$conn->close();
?>
