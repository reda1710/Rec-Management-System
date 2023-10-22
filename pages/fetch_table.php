<?php
include 'session.php';
// Use this to retrieve user-specific data.
$user_id = getSession('user_id');

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Replace with your MySQL password
$dbname = "prefs";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve data from the Appliances table
$sql = "SELECT * FROM Appliances WHERE user_id = $user_id";
$result = $conn->query($sql);

// Initialize an array to store the retrieved data
$appliances = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $appliances[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($appliances);
?>
