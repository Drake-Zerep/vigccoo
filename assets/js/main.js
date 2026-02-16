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

    // Cargar noticias dinámicas
    loadNews();
});

// Función para cargar noticias desde JSON
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
                <div class="news-thumb">
                    <img src="${item.thumbnail}" alt="${item.title}">
                </div>
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
