<?php
include 'session.php';
$user_id = getSession('user_id');
$appliance_id = $_GET['appliance_id'];

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

if ($user_id > 0 && $appliance_id > 0) {
    // SQL query to retrieve daily consumption data
    $sql_daily = "SELECT `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00` FROM `appliance_daily_consumption` WHERE `appliance_id` = $appliance_id;";
    $result_daily = $conn->query($sql_daily);

    if ($result_daily) {
        $response_data['daily'] = $result_daily->fetch_assoc();
    } else {
        echo "Error fetching daily data: " . $sql_daily . "<br>" . $conn->error;
        exit();
    }

    // SQL query to retrieve weekly consumption data
    $sql_weekly = "SELECT Mon, Tue, Wed, Thu, Fri, Sat, Sun FROM appliance_weekly_consumption WHERE appliance_id = $appliance_id;";
    $result_weekly = $conn->query($sql_weekly);

    if ($result_weekly) {
        $weekly_data = $result_weekly->fetch_assoc();
        $response_data['weekly'] = [
            "labels" => array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"),
            "values" => array($weekly_data["Mon"], $weekly_data["Tue"], $weekly_data["Wed"], $weekly_data["Thu"], $weekly_data["Fri"], $weekly_data["Sat"], $weekly_data["Sun"])
        ];
    } else {
        echo "Error fetching weekly data: " . $sql_weekly . "<br>" . $conn->error;
        exit();
    }

    // SQL query to retrieve recommended hourly consumption data
    $sql_recommended = "SELECT `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00` FROM appliance_recommended_hours WHERE appliance_id = $appliance_id;";
    $result_recommended = $conn->query($sql_recommended);

    if ($result_recommended) {
        $recommended_data = $result_recommended->fetch_assoc();
        $response_data['recommended'] = [
            "labels" => array("00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"),
            "values" => array($recommended_data["00:00"], $recommended_data["01:00"], $recommended_data["02:00"], $recommended_data["03:00"], $recommended_data["04:00"], $recommended_data["05:00"], $recommended_data["06:00"], $recommended_data["07:00"], $recommended_data["08:00"], $recommended_data["09:00"], $recommended_data["10:00"], $recommended_data["11:00"], $recommended_data["12:00"], $recommended_data["13:00"], $recommended_data["14:00"], $recommended_data["15:00"], $recommended_data["16:00"], $recommended_data["17:00"], $recommended_data["18:00"], $recommended_data["19:00"], $recommended_data["20:00"], $recommended_data["21:00"], $recommended_data["22:00"], $recommended_data["23:00"])
        ];
    } else {
        echo "Error fetching recommended hours data: " . $sql_recommended . "<br>" . $conn->error;
        exit();
    }

    // Return combined data
    echo json_encode($response_data);

} else {
    echo json_encode(array("error" => "Invalid user or appliance ID"));
}

// Close the database connection
$conn->close();
?>
