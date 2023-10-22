<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prefs";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch POST data
$appliance_id = $_POST['appliance_id'];
$appliance_name = $_POST['appliance_name'];
$appliance_type = $_POST['appliance_type'];
$wattage = $_POST['wattage'];

// Prepare an UPDATE statement
$stmt = $conn->prepare("UPDATE appliances SET appliance_name=?, appliance_type=?, wattage=? WHERE appliance_id=?");
$stmt->bind_param("ssii", $appliance_name, $appliance_type, $wattage, $appliance_id);

// Execute and check for errors
if ($stmt->execute()) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
