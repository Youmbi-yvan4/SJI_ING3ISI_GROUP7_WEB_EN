let currentUser = null; // Declare the currentUser variable

function checkCredentials() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve the users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the entered credentials
    const user = users.find(user => user.name === name && user.email === email && user.password === password);

    if (user) {
        // If the user is found, store the name in currentUser and redirect to the next page
        currentUser = user.name;
        localStorage.setItem('currentUser', currentUser); // Store the currentUser in local storage
        window.location.href = "StickyWall.html";
    } else {
        // If the user is not found, display an error message
        document.getElementById('message').textContent = "User not found";
    }
}