// Sélection des éléments HTML

const gallery = document.querySelector(".gallery");

// Récupération des données de l'API

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }

    const projets = await reponse.json();
    for (let i = 0; i < projets.length; i++) {
        afficherProjet(projets[i]);
    }
  } catch (erreur) {
    console.error(erreur.message);
  }
}
getWorks();

function afficherProjet(projet) {
  const figure = document.createElement("figure");

  const image = document.createElement("img");
  image.src = projet.imageUrl;
  image.alt = projet.title;

  const legende = document.createElement("figcaption");
  legende.textContent = projet.title;

  figure.append(image, legende);
  gallery.appendChild(figure);
}


