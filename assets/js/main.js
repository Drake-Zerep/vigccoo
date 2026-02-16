// Cargar noticias dinámicamente
async function loadNews() {
    try {
        const response = await fetch("assets/data/news.json");
        const news = await response.json();

        // Ordenar por fecha descendente
        news.sort((a, b) => new Date(b.date) - new Date(a.date));

        const container = document.getElementById("news-container");
        container.innerHTML = "";

        news.forEach(item => {
            const card = document.createElement("article");
            card.classList.add("news-card");

            const date = new Date(item.date).toLocaleDateString("es-ES");

            card.innerHTML = `
                <span class="news-date">${date}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="noticias/${item.slug}.html" class="link-btn">Leer más</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando noticias:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadNews);
