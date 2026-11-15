
// Elementos del buscador
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const searchMessage = document.getElementById("searchMessage");

// Categorías de recomendaciones
const recommendationGroups = document.querySelectorAll(
    ".recommendation-group"
);

// Buscar destinos
function searchDestinations() {
    const searchText = searchInput.value.trim().toLowerCase();

    let visibleCards = 0;

    recommendationGroups.forEach((group) => {
        const cards = group.querySelectorAll(".destination-card");
        let groupHasResults = false;

        cards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(searchText);

            card.hidden = !matches;

            if (matches) {
                groupHasResults = true;
                visibleCards++;
            }
        });

        group.hidden = !groupHasResults;
    });

    if (searchText === "") {
        searchMessage.textContent = "Showing all travel recommendations.";
    } else if (visibleCards > 0) {
        searchMessage.textContent =
            visibleCards + " destination(s) found.";
    } else {
        searchMessage.textContent =
            "No destinations found. Try searching for beaches, temples, France or Japan.";
    }
}

// Ejecutar la búsqueda con el botón
searchButton.addEventListener("click", searchDestinations);

// Buscar al presionar Enter
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchDestinations();
    }
});

// Limpiar la búsqueda y mostrar todas las recomendaciones
clearButton.addEventListener("click", () => {
    searchInput.value = "";

    recommendationGroups.forEach((group) => {
        group.hidden = false;

        group.querySelectorAll(".destination-card").forEach((card) => {
            card.hidden = false;
        });
    });

    searchMessage.textContent = "Showing all travel recommendations.";
});

// Menú adaptable para celulares
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Cerrar el menú al seleccionar una sección
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Formulario de contacto
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all the fields.";
        return;
    }

    formMessage.textContent =
        "Thank you, " + name + "! Your message has been prepared successfully.";

    contactForm.reset();
});
