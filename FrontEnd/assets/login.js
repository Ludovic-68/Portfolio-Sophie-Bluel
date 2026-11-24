// Page de connexion : authentification de l'administrateur
const formulaire = document.querySelector("#login form");
const messageErreur = document.querySelector("#message-erreur");

// Fonction pour gérer la soumission du formulaire de connexion
formulaire.addEventListener("submit", async function (event) {
  event.preventDefault();

  messageErreur.textContent = "";

  const email = document.querySelector("#email").value;
  const motDePasse = document.querySelector("#password").value;
  
  try {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: motDePasse }),
    });

    if (reponse.ok) { // Vérifie si la réponse est réussie (code de statut 200-299)
      const resultat = await reponse.json();
      localStorage.setItem("token", resultat.token);
      window.location.href = "./index.html";
    } else {
      messageErreur.textContent = "Erreur dans l'identifiant ou le mot de passe";
    }

  } catch (erreur) {
    console.error(erreur.message);
  }
});


