(function () {
  var cfg = window.LANDING_CONFIG || {};
  var ars = function (n) { return "$" + Math.round(n).toLocaleString("es-AR"); };

  var values = {
    precio: cfg.precio != null ? ars(cfg.precio) : null,
    precioAnterior: cfg.precioAnterior ? ars(cfg.precioAnterior) : null,
    precioTransferencia: cfg.precio != null && cfg.descuento != null
      ? ars(cfg.precio * (1 - cfg.descuento / 100)) : null,
    descuento: cfg.descuento,
    plazoEnvio: cfg.plazoEnvio
  };

  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var key = el.getAttribute("data-cfg");
    if (key === "precioAnterior" && !values.precioAnterior) { el.hidden = true; return; }
    if (values[key] != null) el.textContent = values[key];
  });

  var storeUrl = cfg.checkoutUrl || cfg.whatsappUrl;
  document.querySelectorAll(".js-store").forEach(function (a) { a.href = storeUrl; });
  var useForm = cfg.modoCompra === "formulario" && document.getElementById("checkout");
  document.querySelectorAll(".js-buy").forEach(function (a) {
    a.href = storeUrl;
    if (!cfg.checkoutUrl) { a.target = "_blank"; a.rel = "noopener"; }
    if (useForm) a.addEventListener("click", function (e) { e.preventDefault(); openCheckout(a); });
  });

  // Formulario de pedido
  var co = document.getElementById("checkout");
  var form = document.getElementById("coForm");
  var lastTrigger = null;
  function openCheckout(trigger) {
    lastTrigger = trigger;
    if (drawer && drawer.classList.contains("is-open")) setMenu(false);
    form.hidden = false;
    document.getElementById("coDone").hidden = true;
    co.classList.add("is-open");
    co.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    co.querySelector(".checkout__panel").scrollTop = 0;
    setTimeout(function () { document.getElementById("coQty").focus(); }, 50);
  }
  function closeCheckout() {
    co.classList.remove("is-open");
    co.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }
  if (co && form) {
    co.querySelectorAll("[data-co-close]").forEach(function (el) { el.addEventListener("click", closeCheckout); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && co.classList.contains("is-open")) closeCheckout();
    });

    var calc = function () {
      var qty = parseInt(form.cantidad.value, 10) || 1;
      var sub = (cfg.precio || 0) * qty;
      var transfer = form.pago.value === "Transferencia";
      var off = transfer ? Math.round(sub * (cfg.descuento || 0) / 100) : 0;
      document.getElementById("coSubtotal").textContent = ars(sub);
      document.getElementById("coOffRow").hidden = !transfer;
      document.getElementById("coOff").textContent = "-" + ars(off);
      document.getElementById("coTotal").textContent = ars(sub - off);
      return { qty: qty, sub: sub, off: off, total: sub - off };
    };
    form.addEventListener("change", calc);
    form.addEventListener("input", function (e) {
      var fld = e.target.closest(".fld");
      if (fld && e.target.checkValidity()) fld.classList.remove("is-invalid");
      if (!form.querySelector(".fld.is-invalid") && form.pago.value) document.getElementById("coError").hidden = true;
    });
    form.addEventListener("change", function () {
      if (!form.querySelector(".fld.is-invalid") && form.pago.value) document.getElementById("coError").hidden = true;
    });
    calc();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("coError");
      var bad = Array.prototype.filter.call(form.elements, function (el) {
        var invalid = el.willValidate && !el.checkValidity();
        if (el.closest && el.closest(".fld")) el.closest(".fld").classList.toggle("is-invalid", invalid);
        return invalid;
      });
      if (bad.length) {
        err.textContent = !form.pago.value && bad.length === 1
          ? "Elegí un método de pago."
          : "Revisá los campos marcados: son obligatorios.";
        err.hidden = false;
        bad[0].focus();
        return;
      }
      err.hidden = true;
      var t = calc();
      var f = function (n) { return form[n].value.trim(); };
      var lines = [
        "¡Hola! Quiero hacer este pedido:",
        "",
        "🛍️ " + t.qty + " x Mini Plancha a Vapor Portátil",
        "Subtotal: " + ars(t.sub),
        t.off ? "Descuento transferencia (" + cfg.descuento + "%): -" + ars(t.off) : null,
        "Envío: GRATIS",
        "*Total: " + ars(t.total) + "*",
        "Pago: " + f("pago"),
        "",
        "📦 Mis datos:",
        "Nombre: " + f("nombre"),
        "Teléfono: " + f("telefono"),
        "DNI: " + f("dni"),
        "E-mail: " + f("email"),
        "Dirección: " + f("direccion"),
        f("referencia") ? "Referencia: " + f("referencia") : null,
        "Ciudad: " + f("ciudad") + ", " + f("provincia") + " (CP " + f("cp") + ")"
      ].filter(function (l) { return l !== null; });
      var url = "https://wa.me/" + (cfg.whatsappPedidos || "") + "?text=" + encodeURIComponent(lines.join("\n"));
      document.getElementById("coResend").href = url;
      form.hidden = true;
      document.getElementById("coDone").hidden = false;
      co.querySelector(".checkout__panel").scrollTop = 0;
      window.open(url, "_blank", "noopener");
    });
  }

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

  // Galería del hero con puntos
  var track = document.querySelector(".gallery__track");
  var dotsBox = document.querySelector(".gallery__dots");
  if (track && dotsBox) {
    var slides = track.children;
    var dots = [];
    for (var i = 0; i < slides.length; i++) {
      (function (n) {
        var b = document.createElement("button");
        b.type = "button";
        b.addEventListener("click", function () { track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" }); });
        dotsBox.appendChild(b);
        dots.push(b);
      })(i);
    }
    var mark = function () {
      var cur = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach(function (d, n) { d.classList.toggle("is-active", n === cur); });
    };
    track.addEventListener("scroll", mark, { passive: true });
    mark();
  }

  // Menú lateral
  var drawer = document.getElementById("menu");
  var menuBtn = document.querySelector(".nav__menu");
  if (drawer && menuBtn) {
    var setMenu = function (open) {
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      menuBtn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      if (open) drawer.querySelector(".drawer__close").focus();
      else menuBtn.focus({ preventScroll: true });
    };
    menuBtn.addEventListener("click", function () { setMenu(true); });
    drawer.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setMenu(false);
    });
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
