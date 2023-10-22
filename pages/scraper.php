<?php
//your database config
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'prefs';

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The data to insert (received from JavaScript)
$data = json_decode(file_get_contents("php://input"), true);

// Loop through the data and insert it into the 'price' table
foreach ($data as $item) {
    $mtu = $item['mtu'];
    $price = $item['price'];

    // Use prepared statements to prevent SQL injection
    $sql = "INSERT INTO price ($mtu) VALUES (?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("s", $price);
    $stmt->execute();
    $stmt->close();
}

// Close the database connection
$conn->close();

// Respond with a success message
echo json_encode(['message' => 'Data inserted successfully']);
?>
