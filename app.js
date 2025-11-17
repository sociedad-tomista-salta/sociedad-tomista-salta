document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".section");

  // Mostrar solo la sección "presentacion" al cargar
  document.getElementById("presentacion").classList.add("active");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const target = link.getAttribute("data-section");

      // Ocultar todas las secciones
      sections.forEach(sec => sec.classList.remove("active"));

      // Mostrar la sección correspondiente
      document.getElementById(target).classList.add("active");
    });
  });
});
