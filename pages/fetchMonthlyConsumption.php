<?php
include 'session.php';
$user_id = getSession('user_id');
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
if ($user_id > 0) {
// SQL query to retrieve data from the "Monthly Consumption" table for a specific user
$sql = "SELECT `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec` FROM `Monthly Consumption` WHERE `user_id` = $user_id;";

$result = $conn->query($sql);

// Check if the query was successful
if ($result) {
    $data = $result->fetch_assoc();
    echo json_encode($data);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
}
else {
    $data = array(
        "Jan" => "0.0",
        "Feb" => "0.0",
        "Mar" => "0.0",
        "Apr" => "0.0",
        "May" => "0.0",
        "Jun" => "0.0",
        "Jul" => "0.0",
        "Aug" => "0.0",
        "Sep" => "0.0",
        "Oct" => "0.0",
        "Nov" => "0.0",
        "Dec" => "0.0"
    );

// Encode the data as JSON
    echo json_encode($data);

}

// Close the database connection
$conn->close();
?>
