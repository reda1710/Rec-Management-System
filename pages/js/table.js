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
