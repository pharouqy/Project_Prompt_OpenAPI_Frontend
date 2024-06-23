const token = JSON.parse(localStorage.getItem("token"));

const API_URL = "https://backend-prompt-app-younsi-farouks-projects.vercel.app";
const result = document.getElementById("result");
const button = document.getElementById("button");

submit();
logout();

function promptData(id) {
  const textarea = document.getElementById(id).value;
  return textarea;
}

function preparePrompt(array) {
  let result = "";
  array.forEach((element) => {
    result += element.trim() + "\n";
  });
  return result;
}

function displayData(value) {
  result.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = value;
  result.appendChild(p);
}

async function compteur(element, response) {
  let compteur = 0;
  function incrementerCompteur() {
    compteur++;
    element.innerHTML = compteur;
  }
  const dureeEnSecondes = 5;
  const intervalId = setInterval(incrementerCompteur, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    displayData(response.response);
    button.disabled = false;
  }, dureeEnSecondes * 1000);
  return;
}

function submit() {
  const textareas = document.querySelectorAll("textarea");
  const array = [
    "action",
    "identite",
    "context",
    "tonalite",
    "format",
    "etapes",
  ];
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    button.disabled = true;
    const data = [];
    const boolean = Array.from(textareas).some((textarea) => {
      return textarea.value.trim() !== "";
    });
    if (!boolean) {
      alert("Remplissez Toutes Les Cases S'il Vous Plait !!!");
      window.location.reload();
      return;
    }
    array.forEach((element) => {
      promptData(element);
      data.push(promptData(element));
    });
    const finalData = preparePrompt(data).trim();
    const sendData = {
      prompt: finalData,
    };
    try {
      const fetchData = await fetch(`${API_URL}/api/open`, {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(sendData),
      });
      if (fetchData.status === 429) {
        // Gérer ici l'erreur de limite de taux (status 429)
        result.innerHTML =
          "Limite de taux atteinte. Veuillez réessayer dans 30 minutes.";
        return;
      }
      if (fetchData.ok) {
        const response = await fetchData.json();
        await response;
        compteur(result, response);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function logout() {
  const logout = document.getElementById("logout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("token");
        window.location.href = "./index.html";
      }
    });
  });
}
