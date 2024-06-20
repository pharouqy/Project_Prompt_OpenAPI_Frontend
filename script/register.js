const API_URL = "https://backend-prompt-app-younsi-farouks-projects.vercel.app";

const button = document.getElementById("button");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const birthDate = document.getElementById("birthDate");
const ocupation = document.getElementById("ocupation");
const email = document.getElementById("email");
const password = document.getElementById("password");

button.addEventListener("click", (e) => {
  e.preventDefault();
  firstnameCheck(firstname);
  lastnameCheck(lastname);
  birthDateCheck(birthDate);
  ocupationCheck(ocupation);
  emailCheck(email);
  passwordCheck(password);
  const isFormValid =
    firstnameCheck(firstname) &&
    lastnameCheck(lastname) &&
    birthDateCheck(birthDate) &&
    ocupationCheck(ocupation) &&
    emailCheck(email) &&
    passwordCheck(password);

  if (isFormValid) {
    fetchData();
  }
});

function firstnameCheck(firstname) {
  if (firstname.value.trim() === "" || lastname.value.trim().length < 4) {
    firstname.style.border = "3px red solid";
    return false;
  } else {
    firstname.style.border = "3px green solid";
    return true;
  }
}

function lastnameCheck(lastname) {
  if (lastname.value.trim() === "" || lastname.value.trim().length < 4) {
    lastname.style.border = "3px red solid";
    return false;
  } else {
    lastname.style.border = "3px green solid";
    return true;
  }
}

function birthDateCheck(birthDate) {
  if (birthDate.value.trim() === "" || !estMajeur(birthDate.value.trim())) {
    birthDate.style.border = "3px red solid";
    return false;
  } else {
    birthDate.style.border = "3px green solid";
    return true;
  }
}

function ocupationCheck(ocupation) {
  if (ocupation.value.trim() === "" || lastname.value.trim().length < 4) {
    ocupation.style.border = "3px red solid";
    return false;
  } else {
    ocupation.style.border = "3px green solid";
    return true;
  }
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

function estMajeur(dateNaissance) {
  const dateNaissanceObj = new Date(dateNaissance);
  const dateActuelle = new Date();
  const anneeMajeure = dateActuelle.getFullYear() - 18;
  const moisMajeur = dateActuelle.getMonth();
  const jourMajeur = dateActuelle.getDate();

  return (
    dateNaissanceObj.getFullYear() < anneeMajeure ||
    (dateNaissanceObj.getFullYear() === anneeMajeure &&
      (dateNaissanceObj.getMonth() < moisMajeur ||
        (dateNaissanceObj.getMonth() === moisMajeur &&
          dateNaissanceObj.getDate() <= jourMajeur)))
  );
}

function fetchData() {
  fetch(`${API_URL}/auth/register`, {
    //mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      birthDate: birthDate.value,
      ocupation: ocupation.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json();
      }
    })
    .then(() => {
      loginSession();
    })
    .catch((error) => {
      console.log(error);
    });
}

function loginSession() {
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      window.location.href = "./app.html";
    })
    .catch((error) => {
      console.log(error);
    });
}
