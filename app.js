// app.js
// Controla el navbar y carga archivos .md (deben estar en la misma carpeta que index.html)

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a[data-section]");
  const content = document.getElementById("content");

  // Función que carga y renderiza un markdown (archivo debe existir)
  async function cargarMarkdown(file) {
    try {
      const res = await fetch(`${file}.md`, { cache: "no-store" });
      if (!res.ok) {
        content.innerHTML = `<p style="color:#900">Error: no se encontró <strong>${file}.md</strong> (HTTP ${res.status})</p>`;
        console.error("Fetch error:", res.status, res.statusText);
        return;
      }
      const md = await res.text();
      // marked debe estar cargado desde el CDN en el HTML
      const html = (window.marked) ? marked.parse(md) : `<pre>${md}</pre>`;
      content.innerHTML = html;
      // opcional: mover viewport al inicio del contenido
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      content.innerHTML = `<p style="color:#900">Error al cargar el archivo. Mirá la consola.</p>`;
    }
  }

  // Click handlers del nav
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const file = link.getAttribute("data-section");
      cargarMarkdown(file);

      // marcar visualmente activo (opcional)
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Cargar la página inicial al abrir (Inicio / presentacion)
  cargarMarkdown("presentacion");
});
