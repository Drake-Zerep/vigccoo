// FILTRO DE NOTICIAS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    // Activar botón seleccionado
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtro = btn.dataset.filter;

    // Mostrar/ocultar tarjetas según categoría
    document.querySelectorAll('.news-card').forEach(card => {
      const categoria = card.dataset.categoria;

      if (filtro === "Todos" || categoria === filtro) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
