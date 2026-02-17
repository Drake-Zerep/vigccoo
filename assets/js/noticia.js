// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const noticiaID = params.get("id");

// Cargar JSON
fetch("../assets/data/noticias.json")
  .then(res => res.json())
  .then(noticias => {

    const noticia = noticias.find(n => n.id === noticiaID);

    if (!noticia) {
      document.getElementById("noticia-contenido").innerHTML =
        "<p>No se encontró la noticia.</p>";
      return;
    }

    // Construir contenido principal
    document.getElementById("noticia-contenido").innerHTML = `
      <div class="news-hero">
        <img src="../${noticia.imagen}" alt="${noticia.titulo}">
      </div>

      <p class="news-date">${noticia.fecha} · ${noticia.categoria}</p>

      <h1>${noticia.titulo}</h1>

      <p style="margin-top:1rem; line-height:1.6;">
        ${noticia.contenido}
      </p>

      <a href="../index.html" class="btn secondary" style="margin-top:1.5rem;">
        ← Volver a noticias
      </a>
    `;

    // Noticias relacionadas avanzadas
const relacionadas = noticias
  .filter(n => n.categoria === noticia.categoria && n.id !== noticia.id)
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  .slice(0, 3);

const contenedor = document.getElementById("relacionadas");

if (relacionadas.length === 0) {
  contenedor.innerHTML = `<p style="color:var(--text-muted);">No hay noticias relacionadas.</p>`;
} else {
  relacionadas.forEach(n => {
    const card = document.createElement("div");
    card.classList.add("related-card");

    card.innerHTML = `
      <div class="related-thumb">
        <img src="../${n.imagen}" alt="${n.titulo}">
      </div>

      <h4>${n.titulo}</h4>
      <p>${n.resumen.substring(0, 90)}...</p>

      <a class="btn secondary" href="noticia.html?id=${n.id}">
        Leer más
      </a>
    `;

    contenedor.appendChild(card);
  });
}


  });
