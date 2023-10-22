<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prefs";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . $conn->connect_error]));
}

// Get the appliance_id from the POST request
$appliance_id = $_POST['appliance_id'];

// Prepare the SQL statement for deletion
$stmt = $conn->prepare("DELETE FROM appliances WHERE appliance_id = ?");
$stmt->bind_param("i", $appliance_id); // "i" indicates integer type

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
