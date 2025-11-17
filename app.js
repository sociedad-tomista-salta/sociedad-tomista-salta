document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".section");

  function cargarMarkdown(idSeccion) {
    fetch(`${idSeccion}.md`)
      .then(res => res.text())
      .then(md => {
        // Convertir markdown a HTML
        const html = marked.parse(md);
        document.getElementById(idSeccion).innerHTML = html;
      });
  }

  // Mostrar la primera sección
  const inicial = "presentacion";
  cargarMarkdown(inicial);
  document.getElementById(inicial).classList.add("active");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = link.getAttribute("data-section");

      // Ocultar todas las secciones
      sections.forEach(sec => sec.classList.remove("active"));

      // Mostrar la sección clickeada
      const sec = document.getElementById(target);
      sec.classList.add("active");

      // Cargar el markdown correspondiente
      cargarMarkdown(target);
    });
  });
});
