// ===== Config fija =====
const COMPANY = "TU-WIFI";              // Texto visible
const WAPP_FIXED = "573009020221";      // +57 300 902 0221
// =======================

document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico (si existe el span#year)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Menú responsive -----
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("open");               // usa .open (coincide con CSS)
      menuToggle.setAttribute(
        "aria-expanded",
        menu.classList.contains("open") ? "true" : "false"
      );
    });

    // Cierra el menú al hacer click en cualquier enlace
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  // ----- Enlaces rápidos (WhatsApp/Teléfono) -----
  const wappTextDefault = `Hola ${COMPANY}, necesito información.`;
  const wappEncodedDefault = encodeURIComponent(wappTextDefault);

  const linkWapp = document.getElementById("linkWapp");
  const linkTel  = document.getElementById("linkTel");
  const wappFloat = document.getElementById("wappFloat");

  if (linkWapp)  linkWapp.href  = `https://wa.me/${WAPP_FIXED}?text=${wappEncodedDefault}`;
  if (wappFloat) wappFloat.href = `https://wa.me/${WAPP_FIXED}?text=${wappEncodedDefault}`;
  if (linkTel)   linkTel.href   = `tel:+${WAPP_FIXED}`;

  // ----- Formulario -> WhatsApp (usa id="formContacto") -----
  const form = document.getElementById("formContacto");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = (document.getElementById("nombre")?.value || "").trim();
      const email  = (document.getElementById("email")?.value || "").trim();
      const tel    = (document.getElementById("telefono")?.value || "").trim();
      const msg    = (document.getElementById("mensaje")?.value || "").trim();

      // Validaciones básicas
      if (!/^3\d{9}$/.test(tel)) {
        alert("El teléfono debe tener 10 dígitos y empezar por 3.");
        return;
      }
      if (!nombre || !email || !msg) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Construye el texto con saltos de línea
      const texto =
        `Hola ${COMPANY}, soy ${nombre}.%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Tel: ${encodeURIComponent(tel)}%0A` +
        `Mensaje: ${encodeURIComponent(msg)}`;

      const url = `https://wa.me/${WAPP_FIXED}?text=${texto}`;

      // Abrir en nueva pestaña (con fallback)
      const win = window.open(url, "_blank", "noopener");
      if (!win) window.location.href = url;
    });
  }
});
