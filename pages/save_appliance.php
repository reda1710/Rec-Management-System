<?php
include 'session.php';

$user_id = getSession('user_id');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prefs";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$appliance_name = $_POST['appliance_name'];
$appliance_type = $_POST['appliance_type'];
$wattage = $_POST['wattage'];

$sql = "INSERT INTO appliances (user_id, appliance_name, appliance_type, wattage) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issi", $user_id, $appliance_name, $appliance_type, $wattage);

if ($stmt->execute()) {
    echo "New appliance added successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
