<?php
include 'session.php';
$user_id = getSession('user_id');

// Check if user_id is null
if ($user_id === null) {
    $user_id = 0;
}

// Your database config
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

// Initialize variables to store query results
$response = [
    'user_id' => $user_id,
    'today_consumption' => 0,
    'this_month_consumption' => 0,
    'current_price' => 0,
    'alerts' => 0, // Initialize unread notifications count as 0
];

// Check if user_id is not 0 (meaning it's not null)
if ($user_id !== 0) {
    // Function to count unread notifications for a user
    function countUnreadNotifications($conn, $user_id) {
        $sql = "SELECT COUNT(*) AS unread_count FROM user_notifications WHERE user_id = ? AND is_read = 0";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['unread_count'];
    }

    // Call the function to get the unread notifications count
    $unreadCount = countUnreadNotifications($conn, $user_id);

    // Define SQL queries to fetch data from the database
    $query1 = "SELECT todays_consumption FROM users WHERE `ID` = $user_id;";
    $query2 = "SELECT this_months_consumption FROM users WHERE `ID` = $user_id;";
    // Execute the queries and fetch the results
    $result1 = $conn->query($query1);
    $result2 = $conn->query($query2);

    // Fetch data as associative arrays
    $row1 = $result1->fetch_assoc();
    $row2 = $result2->fetch_assoc();

    // Update the response with actual data
    $response['today_consumption'] = $row1['todays_consumption'];
    $response['this_month_consumption'] = $row2['this_months_consumption'];
    $response['alerts'] = $unreadCount; // Include the unread notifications count
} else
{

}

// Close the database connection
$conn->close();

// Return data as a JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
