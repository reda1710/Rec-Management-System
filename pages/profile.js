
    function saveProfile() {
    const profileFields = ['firstname', 'lastname', 'phonenumber', 'email'];
    const updatedData = {};

    profileFields.forEach(field => {
    const label = document.getElementById(field + 'Label');
    const input = document.getElementById(field + 'Input');
    if (label && input) {
    label.textContent = input.value;
    updatedData[field] = input.value;
}
});

    const selectedCountry = document.getElementById("countrySelect").value;

    // You can send updatedData and selectedCountry to the server for saving the changes.
    // Example: Make AJAX requests to update the user's profile data and selected country.

    // Save profile data
    fetch('update_profile.php', {
    method: 'POST',
    body: JSON.stringify(updatedData),
    headers: {
    'Content-Type': 'application/json'
}
})
    .then(response => response.json())
    .then(profileData => {
    if (profileData.success) {
    alert("Profile updated successfully.");
} else {
    alert("Error updating profile: " + profileData.error);
}
})
    .catch(error => {
    console.error("Error:", error);
});

    // Save selected country
    fetch('update_country.php', {
    method: 'POST',
    body: JSON.stringify({ country: selectedCountry }),
    headers: {
    'Content-Type': 'application/json'
}
})
    .then(response => response.json())
    .then(countryData => {
    if (countryData.success) {
} else {
    alert("Error updating country: " + countryData.error);
}
})
    .catch(error => {
    console.error("Error:", error);
});

    toggleEditProfile();
}

    // Call the saveProfile function when needed
    // saveProfile();

    // Function to toggle edit mode for profile fields
    function toggleEditProfile() {
    const profileFields = ['firstname', 'lastname', 'phonenumber', 'email'];
    const isEditMode = isProfileInEditMode();

    profileFields.forEach(field => {
    const label = document.getElementById(field + 'Label');
    const input = document.getElementById(field + 'Input');
    if (label && input) {
    if (isEditMode) {
    // If in edit mode, display the label with the current input value
    label.textContent = input.value;
} else {
    // If not in edit mode, display the input with the current label value
    input.value = label.textContent;
}
    label.style.display = isEditMode ? 'inline' : 'none';
    input.style.display = isEditMode ? 'none' : 'block';
}
});

    // Toggle the "Save Profile" button
    const saveProfileButton = document.getElementById('saveProfileButton');
    if (saveProfileButton) {
    saveProfileButton.style.display = isEditMode ? 'none' : 'block';
}
}

    // Function to check if profile fields are in edit mode
    function isProfileInEditMode() {
    const firstnameInput = document.getElementById('firstnameInput');
    return firstnameInput && firstnameInput.style.display === 'block';
}

    // Function to fetch user data
    function fetchData() {
    fetch('get_user_data.php') // Replace with the actual PHP endpoint
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                populateUserInfo(data);
            } else {
                console.error("Error fetching user data");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

    // Function to populate user information
    function populateUserInfo(userData) {
    // Assuming userData.firstname and userData.lastname contain the first and last names
    const capitalizedFirstName = userData.firstname.charAt(0).toUpperCase() + userData.firstname.slice(1);
    const capitalizedLastName = userData.lastname.charAt(0).toUpperCase() + userData.lastname.slice(1);

// Combine the capitalized first and last names with a space in between
    const fullName = capitalizedFirstName + " " + capitalizedLastName;

// Set the content of the "nameLabel" element
    document.getElementById("nameLabel").textContent = fullName;
    document.getElementById("firstnameLabel").textContent = userData.firstname;
    document.getElementById("lastnameLabel").textContent = userData.lastname;
    document.getElementById("phonenumberLabel").textContent = userData.phonenumber;
    document.getElementById("emailLabel").textContent = userData.email;

    // Populate the country dropdown
    const countrySelect = document.getElementById("countrySelect");
    const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'The Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Democratic Republic of the',
    'Congo, Republic of the',
    'Costa Rica',
    'Côte d’Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor (Timor-Leste)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'The Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Sudan, South',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'];

    countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    if (country === userData.country) {
    option.selected = true;
}
    countrySelect.appendChild(option);
});
}

    // Add click event listeners to the Edit Profile button
    const editProfileButton = document.getElementById('editProfileButton');
    if (editProfileButton) {
    editProfileButton.addEventListener('click', toggleEditProfile);
}

    // Populate user information and the country dropdown when the page loads
    window.addEventListener('DOMContentLoaded', fetchData);