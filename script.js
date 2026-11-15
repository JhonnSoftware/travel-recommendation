
// ========================================
// TRAVEL RECOMMENDATION
// Funciones principales de la aplicación
// ========================================


// ELEMENTOS DEL BUSCADOR
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const searchMessage = document.getElementById("searchMessage");

const recommendationGroups = document.querySelectorAll(
    ".recommendation-group"
);


// NORMALIZAR PALABRAS
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,!?]/g, "")
        .trim();
}


// RECONOCER CATEGORÍAS
function getSearchCategory(search) {

    const beachWords = [
        "beach",
        "beaches",
        "playa",
        "playas"
    ];

    const templeWords = [
        "temple",
        "temples",
        "templo",
        "templos"
    ];

    const countryWords = [
        "country",
        "countries",
        "pais",
        "paises"
    ];

    if (beachWords.includes(search)) {
        return "beach";
    }

    if (templeWords.includes(search)) {
        return "temple";
    }

    if (countryWords.includes(search)) {
        return "country";
    }

    return null;
}


// FUNCIÓN PRINCIPAL DE BÚSQUEDA
function searchDestinations() {

    const searchText = normalizeText(searchInput.value);

    const category = getSearchCategory(searchText);

    let visibleCards = 0;

    recommendationGroups.forEach((group) => {

        const groupTitle = normalizeText(
            group.querySelector("h3").textContent
        );

        const cards = group.querySelectorAll(".destination-card");

        // Identificar la categoría de cada grupo
        const isBeachGroup =
            groupTitle.includes("beach");

        const isTempleGroup =
            groupTitle.includes("temple");

        const isCountryGroup =
            groupTitle.includes("countr");

        let groupHasResults = false;

        cards.forEach((card) => {

            const cardText = normalizeText(card.textContent);

            let matches = false;

            if (searchText === "") {

                matches = true;

            } else if (category === "beach") {

                matches = isBeachGroup;

            } else if (category === "temple") {

                matches = isTempleGroup;

            } else if (category === "country") {

                matches = isCountryGroup;

            } else {

                matches = cardText.includes(searchText);
            }

            card.hidden = !matches;

            if (matches) {
                groupHasResults = true;
                visibleCards++;
            }

        });

        group.hidden = !groupHasResults;

    });


    // MOSTRAR MENSAJES
    if (searchText === "") {

        searchMessage.textContent =
            "Showing all travel recommendations.";

    } else if (visibleCards > 0) {

        searchMessage.textContent =
            visibleCards + " destination(s) found.";

        // Desplazarse hasta los resultados
        setTimeout(() => {

            document.getElementById("destinations").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    } else {

        searchMessage.textContent =
            "No destinations found. Try beach, temple, France or Japan.";

    }

}


// EVENTO DEL BOTÓN SEARCH
searchButton.addEventListener("click", searchDestinations);


// BUSCAR AL PRESIONAR ENTER
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchDestinations();
    }

});


// BOTÓN CLEAR
clearButton.addEventListener("click", () => {

    searchInput.value = "";

    recommendationGroups.forEach((group) => {

        group.hidden = false;

        const cards = group.querySelectorAll(".destination-card");

        cards.forEach((card) => {
            card.hidden = false;
        });

    });

    searchMessage.textContent =
        "Showing all travel recommendations.";

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// MENÚ PARA DISPOSITIVOS MÓVILES
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// CERRAR MENÚ AL SELECCIONAR UNA OPCIÓN
document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ========================================
// FORMULARIO DE CONTACTO
// ========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const message = document.getElementById("contactMessage").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Please complete all the fields.";

        return;

    }


    formMessage.textContent =
        "Thank you, " + name +
        "! Your message has been prepared successfully.";

    contactForm.reset();

});
