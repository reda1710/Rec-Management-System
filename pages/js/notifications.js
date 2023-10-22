// Sample data received from PHP
var notificationsData = [
];

// Function to create and append notification HTML
function createNotification(id, message, alertType) {

    // Create the main notification div
    var notificationDiv = document.createElement("div");
    notificationDiv.className = "alert alert-" + alertType + " alert-dismissible text-white";
    notificationDiv.setAttribute("role", "alert");

    // Create the message content span
    var messageSpan = document.createElement("span");
    messageSpan.className = "text-sm";
    messageSpan.textContent = message;

    // Create the example link
    // var link = document.createElement("a");
    // link.href = "javascript:;";
    // link.className = "alert-link text-white";
    // link.textContent = "an example link"; // put link here

    // Create the close button
    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close text-lg py-3 opacity-10";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("data-notification-id", id); // Add the id as a data attribute

    // Create the close button icon (times symbol)
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times;";
    closeButton.appendChild(closeIcon);

    // Add a click event listener to the close button
    closeButton.addEventListener("click", function () {
        var notificationId = this.getAttribute("data-notification-id");
        markNotificationAsRead(notificationId); // Call the function to mark as read
        this.parentNode.remove(); // Remove the notification from the UI
    });

    // Append the link and message content to the main notification div
    // messageSpan.appendChild(document.createTextNode("A simple primary alert with "));
    // messageSpan.appendChild(link);
    // messageSpan.appendChild(document.createTextNode(". Give it a click if you like."));

    notificationDiv.appendChild(messageSpan);
    notificationDiv.appendChild(closeButton);

    // Append the notification to the container
    document.getElementById("notificationContainer").appendChild(notificationDiv);
}


// Loop through the data and create notifications
for (var i = 0; i < notificationsData.length; i++) {
    var notification = notificationsData[i];
    createNotification(notification.id, notification.message, notification.alert);
}

function markNotificationAsRead(notificationId) {
    // Send an AJAX request to a PHP script to update the database
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "update_notification.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define the data to be sent
    var data = "notification_id=" + encodeURIComponent(notificationId);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Handle a successful response if needed
                console.log("Notification marked as read.");
            } else {
                // Handle errors if needed
                console.error("Error marking notification as read.");
            }
        }
    };

    xhr.send(data);
}
// Function to fetch unread notifications from the server
function fetchNotifications() {
    fetch('notifications.php') // Replace with the correct path to your PHP script
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if there are any unread notifications
            if (data.length > 0) {
                //alert Types to send
                // primary,secondary,success,danger,warning,info,light,dark
                // Loop through the notifications and display them
                data.forEach(notification => {
                    createNotification(notification.id, notification.message, notification.alertType)

                });
            }
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });
}

// Call the fetchNotifications function when the page loads
window.addEventListener('load', fetchNotifications);