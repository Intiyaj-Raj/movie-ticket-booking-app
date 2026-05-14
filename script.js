(function () {
    emailjs.init("Kei6JRDp6jVqRKGQo");  // add your public key here
})();

let generatedOtp = "";
let resetOtp = "";
let resetEmail = "";

// --- Navigation Functions ---
function showSignup() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function showForgotPassword() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "block";
}

// --- Helper Functions ---
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {

    localStorage.setItem("users", JSON.stringify(users));
}

function findUserByEmail(email) {
    return getUsers().find(user => user.username === email);
}

// --- Send OTP for Signup ---
async function sendOtp() {
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    let email = document.getElementById("signupUsername").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    // Check if email already registered
    if (findUserByEmail(email)) {
        alert("This email is already registered. Please login.");
        return;
    }



    try {
        await emailjs.send("service_b02fh38", "template_ex47e8g", {
            to_email: email,
            otp: generatedOtp
        });

        alert("OTP sent successfully");
    } catch (error) {
        console.log(error);
        alert("Failed to send OTP");
    }
}

// --- Signup ---
function signup() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value;
    let mobile = document.getElementById("usermob").value;
    let userOtp = document.getElementById("otp").value;

    if (!username || !password || !mobile || !userOtp) {
        alert("Fill all fields");
        return;
    }

    if (userOtp != generatedOtp) {
        alert("Wrong OTP ");
        return;
    }

    let users = getUsers();

    if (users.find(u => u.username === username)) {
        alert("This email is already registered. Please login.");
        return;
    }

    users.push({ username, password, mobile });
    saveUsers(users);

    alert("Signup successful");
    showLogin();
}

// --- Login ---
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    let users = getUsers();
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    }
    // if (username === "admin@gmail.com" && password === "admin") {
    //     window.location.href = "index.html";
    // }
    else {
        alert("Invalid username or password");
    }
}

// --- Send OTP for Forgot Password ---
async function sendForgotOtp() {
    let email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
        alert("Enter your registered email");
        return;
    }

    let user = findUserByEmail(email);
    if (!user) {
        alert("No account found with this email.");
        return;
    }

    resetEmail = email;
    resetOtp = Math.floor(1000 + Math.random() * 9000);

    try {
        await emailjs.send("service_b02fh38", "template_ex47e8g", {
            to_email: email,
            otp: resetOtp
        });

        alert("OTP sent to your email for password reset.");
    } catch (error) {
        console.log(error);
        alert("Failed to send OTP");
    }
}

// --- Reset Password ---
function resetPassword() {
    let email = document.getElementById("forgotEmail").value.trim();
    let otp = document.getElementById("forgotOtp").value;
    let newPassword = document.getElementById("forgotNewPassword").value;

    if (!email || !otp || !newPassword) {
        alert("Fill all fields");
        return;
    }

    if (email !== resetEmail || otp != resetOtp) {
        alert("Invalid OTP or email.");
        return;
    }

    let users = getUsers();
    let userIndex = users.findIndex(u => u.username === email);

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    users[userIndex].password = newPassword;
    saveUsers(users);

    alert("Password reset successful! Please login with your new password.");
    showLogin();
}

