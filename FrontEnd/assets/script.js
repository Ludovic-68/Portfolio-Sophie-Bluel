// Sélection des éléments HTML

let projets = []; // Liste de tous les projets, remplie par getWorks()
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const token = localStorage.getItem("token"); // Récupération du token depuis le localStorage
const bandeau = document.querySelector("#mode-edition"); 
const lienLogin = document.querySelector("#lien-login");
const boutonModifier = document.querySelector("#bouton-modifier"); 
const modale = document.querySelector("#modale");
const boutonFermer = document.querySelector("#bouton-fermer");
const vueGalerie = document.querySelector("#vue-galerie");
const vueAjout = document.querySelector("#vue-ajout");
const boutonAjouterPhoto = document.querySelector("#bouton-ajouter-photo");
const boutonRetour = document.querySelector("#bouton-retour");


// Récupération des travaux depuis l'API

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }
    projets = await reponse.json();
    afficherGalerie(projets);
  } catch (erreur) {
    console.error(erreur.message);
  }
}
getWorks(); 

function afficherGalerie(liste) { 
  gallery.textContent = "";
  for (let i = 0; i < liste.length; i++) {
    afficherProjet(liste[i]);
  }
}

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

// Récupération des données getCategories de l'API (Filtres)

function afficherBoutonTous() {
  const bouton = document.createElement("button");
  bouton.textContent = "Tous";
  bouton.classList.add("active");

  bouton.addEventListener("click", function () {
    filters.querySelector(".active").classList.remove("active");
    bouton.classList.add("active");
    afficherGalerie(projets);
  });
  
  filters.appendChild(bouton);
}
afficherBoutonTous();

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Statut de réponse : ${reponse.status}`);
    }

    const categories = await reponse.json();
    for (let i = 0; i < categories.length; i++) {
        afficherCategorie(categories[i]);
    }
  } catch (erreur) {
    console.error(erreur.message);
  }
}
getCategories();

function afficherCategorie(categorie) {
  const bouton = document.createElement("button");
  bouton.textContent = categorie.name;

  bouton.addEventListener("click", function () {
    filters.querySelector(".active").classList.remove("active"); 
    bouton.classList.add("active");
    const projetsFiltres = [];
    for (let i = 0; i < projets.length; i++) {
      if (projets[i].categoryId === categorie.id) {
        projetsFiltres.push(projets[i]);
      }
    }
    afficherGalerie(projetsFiltres);
  });

  filters.appendChild(bouton);
}

// LocalStorage : Token

if (token) {
  bandeau.classList.remove("cache"); // Affiche le bandeau si l'utilisateur est connecté
  boutonModifier.classList.remove("cache"); // Affiche le bouton "modifier" si l'utilisateur est connecté
  lienLogin.textContent = "logout";
  filters.classList.add("cache"); // Cache les filtres si l'utilisateur est connecté

  lienLogin.addEventListener("click", function (event) {
    event.preventDefault(); 
    localStorage.removeItem("token"); // Supprime le token du localStorage
    window.location.href = "./index.html";
  });
}

// Modale //

function reinitialiserModale() {
  vueGalerie.classList.remove("cache");
  vueAjout.classList.add("cache");
  boutonRetour.classList.add("cache");
}

boutonModifier.addEventListener("click", function () {
  reinitialiserModale();
  modale.classList.remove("cache");
});

boutonFermer.addEventListener("click", function () {
  modale.classList.add("cache");
});

modale.addEventListener("click", function (event) {
  if (event.target === modale) {
    modale.classList.add("cache");
  }
});

// Passer de la galerie au formulaire d'ajout
boutonAjouterPhoto.addEventListener("click", function () {
  vueGalerie.classList.add("cache");
  vueAjout.classList.remove("cache");
  boutonRetour.classList.remove("cache");
});

// Revenir du formulaire à la galerie
boutonRetour.addEventListener("click", function () {
  vueAjout.classList.add("cache");
  vueGalerie.classList.remove("cache");
  boutonRetour.classList.add("cache");
});