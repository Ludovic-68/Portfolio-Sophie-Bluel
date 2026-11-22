// Page de connexion : authentification de l'administrateur

const formulaire = document.querySelector("#login form");

formulaire.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const motDePasse = document.querySelector("#password").value;
  
  try {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: motDePasse }),
    });

    console.log(reponse.status); // Affiche le code de statut de la réponse dans la console

    if (reponse.ok) { // Vérifie si la réponse est réussie (code de statut 200-299)
      const resultat = await reponse.json();
      localStorage.setItem("token", resultat.token);
    }
  } catch (erreur) {
    console.error(erreur.message);
  }
});
