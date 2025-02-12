// scripts.js

// Handle user login (for simplicity, this is just a placeholder)
function loginUser(event) {
    event.preventDefault();
    alert("Login functionality would go here.");
}



function toggleDetails(id) {
    const details = document.getElementById(id);
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}
