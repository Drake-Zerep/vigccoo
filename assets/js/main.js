// Año dinámico en el footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Chat IA (placeholder)
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage("user", text);
            chatInput.value = "";

            setTimeout(() => {
                const reply =
                    "Esta es una respuesta de ejemplo. En la versión completa, aquí se conectaría con un modelo de IA especializado en seguridad privada.";
                addMessage("bot", reply);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });
    }

    function addMessage(role, text) {
        const div = document.createElement("div");
        div.classList.add("chat-message", role === "user" ? "user" : "bot");
        const p = document.createElement("p");
        p.textContent = text;
        div.appendChild(p);
        chatMessages.appendChild(div);
    }

    // Inicializar noticias
    initNews();
});

// --- Noticias: paginación + buscador ---

let allNews = [];
let filteredNews = [];
let newsRenderedCount = 0;
const NEWS_PAGE_SIZE = 3;

// Cargar noticias desde noticias.json
async function initNews() {
    try {
        const response = await fetch("assets/data/noticias.json");
        const news = await response.json();

        // Ordenar por fecha descendente
        news.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        allNews = news;
        filteredNews = news;

        const searchInput = document.getElementById("news-search");
        const loadMoreBtn = document.getElementById("news-load-more");

        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const term = searchInput.value.trim().toLowerCase();
                filterNews(term);
            });
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                renderMoreNews();
            });
        }

        resetAndRenderNews();
    } catch (error) {
        console.error("Error cargando noticias:", error);
    }
}

function filterNews(term) {
    if (!term) {
        filteredNews = allNews;
    } else {
        filteredNews = allNews.filter((item) => {
            const text = (item.titulo || "") + " " + (item.resumen || "");
            return text.toLowerCase().includes(term);
        });
    }
    resetAndRenderNews();
}

function resetAndRenderNews() {
    const container = document.getElementById("news-container");
    const loadMoreBtn = document.getElementById("news-load-more");
    if (!container) return;

    container.innerHTML = "";
    newsRenderedCount = 0;

    renderMoreNews();

    if (loadMoreBtn) {
        loadMoreBtn.style.display =
            newsRenderedCount >= filteredNews.length ? "none" : "inline-flex";
    }
}

function renderMoreNews() {
    const container = document.getElementById("news-container");
    const loadMoreBtn = document.getElementById("news-load-more");
    if (!container) return;

    const nextItems = filteredNews.slice(
        newsRenderedCount,
        newsRenderedCount + NEWS_PAGE_SIZE
    );

    nextItems.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        // Para el filtro por categoría
        card.dataset.categoria = item.categoria;

        const fecha = new Date(item.fecha).toLocaleDateString("es-ES");

        card.innerHTML = `
            <div class="news-thumb">
                <img src="${item.imagen}" alt="${item.titulo}">
            </div>
            <span class="news-date">${fecha} · ${item.categoria}</span>
            <h3>${item.titulo}</h3>
            <p>${item.resumen}</p>
            <a href="noticias/noticia.html?id=${item.id}" class="btn secondary">Leer más</a>
        `;

        container.appendChild(card);
    });

    newsRenderedCount += nextItems.length;

    if (loadMoreBtn) {
        loadMoreBtn.style.display =
            newsRenderedCount >= filteredNews.length ? "none" : "inline-flex";
    }
}
