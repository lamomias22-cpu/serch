(function () {
  var cfg = window.LANDING_CONFIG || {};
  var ars = function (n) { return "$" + Math.round(n).toLocaleString("es-AR"); };

  var values = {
    precio: cfg.precio != null ? ars(cfg.precio) : null,
    precioAnterior: cfg.precioAnterior ? ars(cfg.precioAnterior) : null,
    precioTransferencia: cfg.precio != null && cfg.descuento != null
      ? ars(cfg.precio * (1 - cfg.descuento / 100)) : null,
    descuento: cfg.descuento,
    cuotas: cfg.cuotas,
    plazoEnvio: cfg.plazoEnvio
  };

  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var key = el.getAttribute("data-cfg");
    if (key === "precioAnterior" && !values.precioAnterior) { el.hidden = true; return; }
    if (values[key] != null) el.textContent = values[key];
  });

  var buyUrl = cfg.checkoutUrl || cfg.whatsappUrl;
  document.querySelectorAll(".js-buy").forEach(function (a) {
    a.href = buyUrl;
    if (!cfg.checkoutUrl) { a.target = "_blank"; a.rel = "noopener"; }
  });

  // Barra fija: aparece cuando el CTA del hero sale de pantalla
  var sticky = document.getElementById("stickyCta");
  var heroCta = document.querySelector(".hero .js-buy");
  if (sticky && heroCta) {
    var onScroll = function () {
      sticky.classList.toggle("is-visible", heroCta.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // FAQ: una pregunta abierta a la vez
  var faqs = document.querySelectorAll(".faq details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
