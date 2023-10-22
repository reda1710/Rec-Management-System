<?php
include 'session.php';

// Use this to retrieve user-specific data.
$user_id = getSession('user_id');

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prefs";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve user data based on user_id
$sql = "SELECT * FROM users WHERE ID = $user_id";

// Execute the query
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch the user data
    $row = $result->fetch_assoc();

    // Now you can access the user's data
    $user_id = $row['ID'];
    $firstname = $row['firstname'];
    $lastname = $row['lastname'];
    $email = $row['email'];
    $phonenumber = $row['phonenumber'];
    $country = $row['country'];

    // You can use this data as needed, for example, to send it to the client-side JavaScript.
    $user_data = [
        'user_id' => $user_id,
        'firstname' => $firstname,
        'lastname' => $lastname,
        'email' => $email,
        'phonenumber' => $phonenumber,
        'country' => $country
    ];

    // Close the database connection
    $conn->close();

    // Return the user data as a JSON response
    header('Content-Type: application/json');
    echo json_encode($user_data);
} else {
    // User not found
    $conn->close();
    echo json_encode(['error' => 'User not found']);
}
?>
