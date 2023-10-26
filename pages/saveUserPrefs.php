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

// Fetch the posted data from $_POST
$applianceId = $_POST['appliance_id'];
$startTime = $_POST['start_time'];
$endTime = $_POST['end_time'];

$user_id = getSession('user_id');

// Check if an entry already exists for this user and appliance
$sql = "SELECT * FROM appliance_user_prefs WHERE appliance_id = $applianceId";
$result = $conn->query($sql);

if($result && $result->num_rows > 0) {
    // Update the existing entry
    $sql = "UPDATE appliance_user_prefs SET start_time = '$startTime', end_time = '$endTime' WHERE appliance_id = $applianceId";
} else {
    // Insert a new entry
    $sql = "INSERT INTO appliance_user_prefs (appliance_id, start_time, end_time) VALUES ($applianceId, '$startTime', '$endTime')";
}

if($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
