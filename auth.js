// Validation for Login Form
function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === '' || password === '') {
        alert('Please fill out all fields.');
        return false;
    }
    return true;
}

// Validation for Register Form
function validateRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill out all fields.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    return true;
}
