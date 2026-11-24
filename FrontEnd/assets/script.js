// Sélection des éléments HTML

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const token = localStorage.getItem("token");
const bandeau = document.querySelector("#mode-edition");
const lienLogin = document.querySelector("#lien-login");
let projets = []; // Liste de tous les projets, remplie par getWorks()

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
  bandeau.classList.remove("cache");
  lienLogin.textContent = "logout";
  filters.classList.add("cache");

  lienLogin.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
}
