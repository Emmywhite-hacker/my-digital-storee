// ======= API URL =======
const API_URL = "https://emmy-backend.onrender.com"; // change if needed

// ======= ELEMENTS =======
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const status = document.getElementById("status");
const signupStatus = document.getElementById("signupStatus");

// ======= SWITCH TABS =======
function showLogin() {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");

  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  // clear status messages
  status.innerText = "";
  signupStatus.innerText = "";
}

function showSignup() {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");

  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  // clear status messages
  status.innerText = "";
  signupStatus.innerText = "";
}

// ======= LOGIN =======
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    status.innerText = data.msg;

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      // optionally redirect user after login
      // window.location.href = "/dashboard.html";
    }
  } catch (err) {
    status.innerText = "An error occurred. Please try again.";
    console.error(err);
  }
});

// ======= SIGNUP =======
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    signupStatus.innerText = data.msg;

    if (data.msg === "User registered successfully") {
      // automatically switch to login tab
      showLogin();
    }
  } catch (err) {
    signupStatus.innerText = "An error occurred. Please try again.";
    console.error(err);
  }
});
