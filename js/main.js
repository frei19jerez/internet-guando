// =======================
// Configuración general
// =======================
const COMPANY = "TU-WIFI";
const WAPP_FIXED = "573009020221"; // +57 300 902 0221

document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Año dinámico
  // =======================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =======================
  // Menú responsive
  // =======================
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Cerrar menú al hacer clic en cualquier enlace
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =======================
  // WhatsApp rápido
  // =======================
  const defaultMessage = `Hola ${COMPANY}, quiero información sobre sus planes de internet.`;
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${WAPP_FIXED}?text=${encodedMessage}`;

  const linkWapp = document.getElementById("linkWapp");
  const wappFloat = document.getElementById("wappFloat");

  if (linkWapp) {
    linkWapp.href = whatsappUrl;
  }

  if (wappFloat) {
    wappFloat.href = whatsappUrl;
  }

  // =======================
  // Formulario hacia WhatsApp
  // =======================
  const form = document.getElementById("formContacto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = (document.getElementById("nombre")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const tel = (document.getElementById("telefono")?.value || "").trim();
      const msg = (document.getElementById("mensaje")?.value || "").trim();

      // Validaciones
      if (!nombre || !email || !tel || !msg) {
        alert("Por favor completa todos los campos.");
        return;
      }

      if (!/^3\d{9}$/.test(tel)) {
        alert("El teléfono debe tener 10 dígitos y empezar por 3.");
        return;
      }

      const texto = encodeURIComponent(
        `Hola ${COMPANY}, soy ${nombre}.
Email: ${email}
Teléfono: ${tel}
Mensaje: ${msg}`
      );

      const url = `https://wa.me/${WAPP_FIXED}?text=${texto}`;
      window.open(url, "_blank");
    });
  }
});