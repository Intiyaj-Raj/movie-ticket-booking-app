(function () {
    emailjs.init("9JIMT7L0LnqOStK5U");
})();

let generatedOtp = "";

// Send OTP
async function sendOtp() {
    let email = document.getElementById("signupUsername").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    generatedOtp = Math.floor(1000 + Math.random() * 9000);

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

function showSignup() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
}

// signup with OTP verify
function signup() {
    let username = document.getElementById("signupUsername").value;
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

    localStorage.setItem("user", JSON.stringify({ username, password }));

    alert("Signup successful");

    document.getElementById("signupBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let saved = JSON.parse(localStorage.getItem("user"));

    if (saved && saved.username === username && saved.password === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }

}

// localStorage.clear()