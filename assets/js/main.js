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

  // Inicializar noticias (paginación + buscador)
  initNews();
});

// --- Noticias: paginación + buscador ---

let allNews = [];
let filteredNews = [];
let newsRenderedCount = 0;
const NEWS_PAGE_SIZE = 3; // cuántas noticias se cargan cada vez

async function initNews() {
  try {
    const response = await fetch("assets/data/news.json");
    const news = await response.json();

    // Ordenar por fecha descendente
    news.sort((a, b) => new Date(b.date) - new Date(a.date));

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

    // Primera carga
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
      const text =
        (item.title || "") + " " + (item.summary || "");
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
    // Mostrar u ocultar botón según si quedan noticias
    if (newsRenderedCount >= filteredNews.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
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

  newsRenderedCount += nextItems.length;

  if (loadMoreBtn) {
    if (newsRenderedCount >= filteredNews.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }
}
