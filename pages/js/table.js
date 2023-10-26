fetch('fetch_table.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#appliances-table tbody');
        data.forEach(appliance => {
            const row = document.createElement('tr');

            function mapApplianceName(appliance_name) {
                if (appliance_name.toLowerCase() === "air conditioner") {
                    return "heat_pump";
                }
                return appliance_name.toLowerCase();
            }

            const imageName = mapApplianceName(appliance.appliance_name);
            const td1 = document.createElement('td');
            td1.innerHTML = `
                <div class="d-flex px-2 py-1">
                    <div class="avatar-sm me-3 border-radius-lg d-flex align-items-center justify-content-center">
                        <i class="material-icons opacity-10">${imageName}</i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${appliance.appliance_name}</h6>
                    </div>
                </div>
            `;
            row.appendChild(td1);

            const td2 = document.createElement('td');
            td2.innerHTML = `<p class="text-xs font-weight-bold mb-0">${appliance.appliance_type}</p>`;
            row.appendChild(td2);

            function mapStatusToBadgeColor(status) {
                if (status.toLowerCase() === "offline") {
                    return "bg-gradient-danger";
                }
                return "bg-gradient-success";
            }

            const badgeColor = mapStatusToBadgeColor(appliance.status);
            const td3 = document.createElement('td');
            td3.className = 'align-middle text-center text-sm';
            td3.innerHTML = `<span class="badge badge-sm ${badgeColor}">${appliance.status}</span>`;
            row.appendChild(td3);

            const td4 = document.createElement('td');
            td4.className = 'align-middle text-center text-sm';
            td4.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${appliance.wattage}</span>`;
            row.appendChild(td4);

            const td5 = document.createElement('td');
            td5.innerHTML = `
                <div class="d-flex px-2 py-1">
                    <div class="nav-item px-2 d-flex align-items-center">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs">Edit</a>
                    </div>
                    <a href="javascript:;" class="nav-item px-2 d-flex align-items-center">
                        <i class="material-icons opacity-10" id="${appliance.appliance_id}">delete</i>
                    </a>
                    <a href="javascript:;" class="nav-item px-2 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#consumptionModal">
                        <i class="material-icons opacity-10" id="${appliance.appliance_id}">manage_search</i>
                    </a>
                </div>
            `;
            row.appendChild(td5);

            td5.querySelector('a').addEventListener('click', function(e) {
                    e.preventDefault();

                    if (this.innerText === 'Edit') {
                        td1.querySelector('h6').contentEditable = "true";
                        td2.querySelector('p').contentEditable = "true";
                        td4.querySelector('span').contentEditable = "true";
                        this.innerText = 'Save';

                    } else if (this.innerText === 'Save') {

                        // Capture updated data
                        let updated_appliance_name = td1.querySelector('h6').innerText;
                        let updated_appliance_type = td2.querySelector('p').innerText;
                        let updated_wattage = td4.querySelector('span').innerText;

                        // Validate wattage - Ensure it's a number
                        if (isNaN(updated_wattage) || updated_wattage.trim() === '') {
                            alert("Please enter a valid number for wattage.");
                            return;  // Don't proceed further if there's an error
                        }

                        td1.querySelector('h6').contentEditable = "false";
                        td2.querySelector('p').contentEditable = "false";
                        td4.querySelector('span').contentEditable = "false";

                        // Send updated data to the server
                        fetch('update_appliance.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `appliance_id=${appliance.appliance_id}&appliance_name=${updated_appliance_name}&appliance_type=${updated_appliance_type}&wattage=${updated_wattage}`
                        })
                            .then(response => response.text())
                            .then(data => {
                                console.log(data);
                            })
                            .catch(error => console.error('Error:', error));

                        this.innerText = 'Edit';
                    }
                });

            // Delete logic
            td5.querySelector('i.material-icons').addEventListener('click', function(e) {
                e.preventDefault();
                let isConfirmed = confirm("Are you sure you want to delete this entry?");
                if (!isConfirmed) {
                    return;
                }

                fetch('delete_appliance.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `appliance_id=${appliance.appliance_id}`
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            row.remove();
                            location.reload()
                        } else {
                            alert('Error deleting the entry. Please try again.');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            });

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
function loadApplianceCharts(applianceId) {
    window.dailyConsumptionChartInstance = null;
    // Fetch data for the appliance from a hypothetical endpoint
    fetch(`fetchApplianceConsumption.php?appliance_id=${applianceId}`)
        .then(response => response.json())
        .then(data => {
            // Render the daily consumption chart using the fetched data
            var ctxDaily = document.getElementById("dailyConsumptionChart").getContext("2d");
            // Check if the chart instance exists. If yes, destroy it.
            if (window.dailyConsumptionChartInstance) {
                window.dailyConsumptionChartInstance.destroy();
            }

            window.dailyConsumptionChartInstance = new Chart(ctxDaily, {
                type: "line",
                data: {
                    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                    datasets: [{
                        label: "Daily Consumption",
                        data: [
                            data.daily["00:00"], data.daily["01:00"], data.daily["02:00"], data.daily["03:00"], data.daily["04:00"],
                            data.daily["05:00"], data.daily["06:00"], data.daily["07:00"], data.daily["08:00"], data.daily["09:00"],
                            data.daily["10:00"], data.daily["11:00"], data.daily["12:00"], data.daily["13:00"], data.daily["14:00"],
                            data.daily["15:00"], data.daily["16:00"], data.daily["17:00"], data.daily["18:00"], data.daily["19:00"],
                            data.daily["20:00"], data.daily["21:00"], data.daily["22:00"], data.daily["23:00"]
                        ],
                        tension: 0,
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255, 255, 255, .8)",
                        pointBorderColor: "transparent",
                        borderColor: "rgba(255, 255, 255, .8)",
                        borderWidth: 4,
                        backgroundColor: "transparent",
                        fill: true,
                        maxBarThickness: 6,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });

            // Render the weekly consumption chart
            var ctxweekly = document.getElementById("weeklyConsumptionChart").getContext("2d");
            // Check if the chart instance exists. If yes, destroy it.
            if (window.weeklyConsumptionChartInstance) {
                window.weeklyConsumptionChartInstance.destroy();
            }
            window.weeklyConsumptionChartInstance = new Chart(ctxweekly, {
                type: "line",
                data: {
                    labels: data.weekly.labels, // expecting an array of labels (e.g., days of the week)
                    datasets: [{
                        label: "weekly Consumption",
                        data: data.weekly.values, // expecting an array of consumption values
                        tension: 0,
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255, 255, 255, .8)",
                        pointBorderColor: "transparent",
                        borderColor: "rgba(255, 255, 255, .8)",
                        borderWidth: 4,
                        backgroundColor: "transparent",
                        fill: true,
                        maxBarThickness: 6,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });

            // Render the recommended usage hours chart (if you have this data)
            var ctxRecommended = document.getElementById("recommendedHoursChart").getContext("2d");
            // Check if the chart instance exists. If yes, destroy it.
            if (window.RecommendedhoursChartInstance) {
                window.RecommendedhoursChartInstance.destroy();
            }
            window.RecommendedhoursChartInstance = new Chart(ctxRecommended, {
                type: "bar", // or "line" based on your preference
                data: {
                    labels: data.recommended.labels, // expecting an array of labels (e.g., recommended hours)
                    datasets: [{
                        label: "Recommended usage",
                        data: data.recommended.values, // expecting an array of values (e.g., efficiency or cost savings)
                        tension: 0,
                        borderWidth: 0,
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255, 255, 255, .8)",
                        pointBorderColor: "transparent",
                        borderColor: "rgba(255, 255, 255, .8)",
                        borderWidth: 4,
                        backgroundColor: "transparent",
                        fill: true,
                        maxBarThickness: 6,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#f8f9fa',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });

        })
        .catch(error => {
            console.error("Error fetching appliance data:", error);
        });
}

function loadUserPreferences(applianceId) {
    $.ajax({
        url: 'getUserPrefs.php',
        type: 'GET',
        data: {
            appliance_id: applianceId
        },
        dataType: 'json',
        success: function(response) {
            if (response.start_time && response.end_time) {
                $('#startTimeInput').val(response.start_time);
                $('#endTimeInput').val(response.end_time);
            } else {
                alert('Error fetching user preferences: ' + response.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('An unexpected error occurred. Please try again.');
        }
    });
}


// Event listener for when the modal is shown
document.getElementById('consumptionModal').addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract appliance ID from the button's ID attribute
    const applianceId = button.querySelector('i.material-icons').id;
    // Set the applianceId to the modal's data attribute
    $(this).data('appliance-id', applianceId);
    //Implement your chart data fetching and rendering logic here
    loadApplianceCharts(applianceId);
    loadUserPreferences(applianceId);
});

document.getElementById('consumptionModal').addEventListener('hidden.bs.modal', function () {
    // This will be executed every time the modal is hidden
    // Clear any previously fetched data or reset any UI elements if necessary
    if (window.dailyConsumptionChartInstance) {
        window.dailyConsumptionChartInstance.destroy();
    }
    var ctxDaily = document.getElementById("dailyConsumptionChart").getContext("2d");
    ctxDaily.clearRect(0, 0, ctxDaily.canvas.width, ctxDaily.canvas.height);

    if (window.weeklyConsumptionChartInstance) {
        window.weeklyConsumptionChartInstance.destroy();
    }
    var ctxweekly = document.getElementById("weeklyConsumptionChart").getContext("2d");
    ctxweekly.clearRect(0, 0, ctxweekly.canvas.width, ctxweekly.canvas.height);

    if (window.RecommendedhoursChartInstance) {
        window.RecommendedhoursChartInstance.destroy();
    }
    var ctxRecommended = document.getElementById("recommendedHoursChart").getContext("2d");
    ctxRecommended.clearRect(0, 0, ctxRecommended.canvas.width, ctxRecommended.canvas.height);
});
$(document).ready(function() {
    // Event listener for "Save Changes" button click
    $('#consumptionModal .btn-primary').click(function() {
        // Extract selected times and appliance ID
        const startTime = $('#startTimeInput').val();
        const endTime = $('#endTimeInput').val();
        const applianceId = $('#consumptionModal').data('appliance-id'); // We will set this data attribute when opening the modal

        // Validate that start time is before end time
        if (startTime >= endTime) {
            alert('End time should be after start time.');
            return; // Stop further execution
        }

        // Make AJAX request to save user preferences
        $.ajax({
            url: 'saveUserPrefs.php',
            type: 'POST',
            data: {
                appliance_id: applianceId,
                start_time: startTime,
                end_time: endTime
            },
            dataType: 'json',
            success: function(response) {
                // Handle response
                if (response.success) {
                    alert('Preferences saved successfully!');
                } else {
                    console.error("Error saving user preferences:", response.error);
                    alert('Error saving preferences: ' + response.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Handle AJAX error
                console.error("AJAX error:", textStatus, errorThrown);
                alert('An unexpected error occurred. Please try again.');
            }
        });
    });
});


