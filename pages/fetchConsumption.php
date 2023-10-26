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

$response_data = [];

if ($user_id > 0) {
    // SQL query to retrieve weekly consumption data
    $sql_weekly = "SELECT mon, tue, wed, thu, fri, sat, sun FROM weekly_consumption WHERE user_id = $user_id;";
    $result_weekly = $conn->query($sql_weekly);

    if ($result_weekly) {
        $weekly_data = $result_weekly->fetch_assoc();
        $response_data['weekly'] = [
            "labels" => array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"),
            "values" => array_values($weekly_data)
        ];
    } else {
        echo "Error fetching weekly data: " . $sql_weekly . "<br>" . $conn->error;
        exit();
    }

    // SQL query to retrieve daily consumption data for a specific user
    $sql_daily_consumption = "SELECT `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00` FROM daily_consumption WHERE user_id = $user_id;";
    $result_daily_consumption = $conn->query($sql_daily_consumption);

    if ($result_daily_consumption) {
        $daily_data = $result_daily_consumption->fetch_assoc();
        $response_data['daily'] = [
            "labels" => array("00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"),
            "values" => array_values($daily_data)
        ];
    } else {
        echo "Error fetching daily consumption data: " . $sql_daily_consumption . "<br>" . $conn->error;
        exit();
    }

    echo json_encode($response_data);

} else {
    $data['weekly'] = [
        "labels" => array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"),
        "values" => array(0, 0, 0, 0, 0, 0, 0)
        ];

    // Encode the data as JSON
    echo json_encode($data);
}

// Close the database connection
$conn->close();
?>
