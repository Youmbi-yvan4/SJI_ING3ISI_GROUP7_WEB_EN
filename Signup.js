function storeCredentials() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Check if the fields are empty
    if (!name || !email || !password) {
      document.getElementById('message').textContent = "All Fields must be filled";
      return;
    }
  
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('message').textContent = "Please enter a valid email address";
      return;
    }
  
    // Retrieve the users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if the credentials already exist
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      document.getElementById('message').textContent = "User exists";
    } else {
      // Add the new user to the array
      users.push({ name, email, password });
  
      // Store the updated array in local storage
      localStorage.setItem('users', JSON.stringify(users));
  
      window.location.href = "Login.html";
    }
  }
  
  