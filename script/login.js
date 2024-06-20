const API_URL = "https://backend-prompt-app-younsi-farouks-projects.vercel.app";
const token = JSON.parse(localStorage.getItem("token"));

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("button");
const errors = document.getElementById("errors");

fetchData();

function fetchData() {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    errors.innerHTML = "";
    if (emailCheck(email) && passwordCheck(password)) {
      loginSession();
    } else {
      emailCheck(email);
      passwordCheck(password);
    }
  });
}

function emailCheck(email) {
  if (
    email.value.trim() === "" ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value.trim())
  ) {
    email.style.border = "3px red solid";
    return false;
  } else {
    email.style.border = "3px green solid";
    return true;
  }
}

function passwordCheck(password) {
  if (
    password.value.trim() === "" ||
    password.value.trim().length < 8 ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]){8,}$/.test(
      password.value.trim()
    )
  ) {
    password.style.border = "3px red solid";
    return false;
  } else {
    password.style.border = "3px green solid";
    return true;
  }
}

function loginSession() {
  fetch(`${API_URL}/auth/login`, {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 429) {
          errors.innerHTML =
            "Limite de taux atteinte. Veuillez réessayer dans 30 minutes.";
        } else {
          const errorData = await response.json();
          errors.innerHTML = errorData.message;
          return;
        }
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.href = "./app.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
