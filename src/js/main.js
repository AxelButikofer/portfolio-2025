import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Fonction pour initialiser le changement de langue
function switchLang() {
  // Sélectionne tous les éléments avec la classe "switchLang"
  const langSwitchers = document.querySelectorAll(".switchLang");

  langSwitchers.forEach((langSwitcher) => {
    // Écouteur d'événement au clic
    langSwitcher.addEventListener("click", function (e) {
      e.preventDefault(); // Empêche le comportement par défaut du lien

      // Récupère le chemin actuel de la page
      const currentPath = window.location.pathname;

      // Détermine la nouvelle langue en fonction de l'URL actuelle
      let newPath;
      if (currentPath.includes("/fr/")) {
        newPath = currentPath.replace("/fr/", "/en/");
      } else if (currentPath.includes("/en/")) {
        newPath = currentPath.replace("/en/", "/fr/");
      } else {
        // Si aucune langue n’est trouvée dans l’URL, redirige vers FR par défaut
        newPath = "/fr/";
      }

      // Redirige vers le nouveau chemin
      window.location.href = newPath;
    });

    // Accessibilité : permet le changement au clavier avec Entrée ou Espace
    langSwitcher.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        langSwitcher.click();
      }
    });

    // Accessibilité : s'assure que les éléments sont focusables
    if (!langSwitcher.hasAttribute("tabindex")) {
      langSwitcher.setAttribute("tabindex", "0");
    }

    // Accessibilité : ajoute un rôle de lien sémantique si nécessaire
    if (!langSwitcher.hasAttribute("role")) {
      langSwitcher.setAttribute("role", "link");
    }

    // Bonnes pratiques : ajoute un label sémantique si manquant
    if (!langSwitcher.hasAttribute("aria-label")) {
      langSwitcher.setAttribute("aria-label", "Changer la langue");
    }
  });
}

// Appelle la fonction une fois le DOM chargé
document.addEventListener("DOMContentLoaded", switchLang);

// BURGER MENU
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

const toggleMenu = function toggleMenu() {
  menu.classList.toggle("is-active");
  burger.classList.toggle("is-active");
};

burger.addEventListener("click", toggleMenu);

// ANIMATION PICTO
gsap.registerPlugin(ScrollTrigger);

gsap.to(".picto-animate", {
  rotation: 120,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    scrub: 1,
  },
});

// FLITRES PROJETS

const filterButtons = document.querySelectorAll(".filters a");
const items = document.querySelectorAll(".work-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    items.forEach((item) => {
      const categories = item
        .querySelector(".work")
        .dataset.category.split(" ");

      if (filter === "all" || categories.includes(filter)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});
