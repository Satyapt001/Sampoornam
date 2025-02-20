document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!email || !username || !phone || !password) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("server/signup.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, phone, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "index.html";
        } else {
            alert("Signup failed. Please try again.");
        }
    })
    .catch(error => console.error("Error:", error));
});
