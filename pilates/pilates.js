(function () {
  // Botones de compra con menú desplegable
  var drops = document.querySelectorAll("[data-buydrop]");
  function setDrop(drop, open) {
    var btn = drop.querySelector(".buydrop__toggle");
    var menu = drop.querySelector(".buydrop__menu");
    drop.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  }
  function closeAll(except) {
    drops.forEach(function (d) { if (d !== except && d.classList.contains("is-open")) setDrop(d, false); });
  }
  drops.forEach(function (drop) {
    var btn = drop.querySelector(".buydrop__toggle");
    btn.addEventListener("click", function () {
      var open = !drop.classList.contains("is-open");
      closeAll(drop);
      setDrop(drop, open);
      if (open) drop.querySelector(".buydrop__item").focus({ preventScroll: true });
    });
    drop.addEventListener("keydown", function (e) {
      var items = Array.prototype.slice.call(drop.querySelectorAll(".buydrop__item"));
      var i = items.indexOf(document.activeElement);
      if (e.key === "Escape" && drop.classList.contains("is-open")) { setDrop(drop, false); btn.focus(); }
      else if (e.key === "ArrowDown" && i > -1) { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === "ArrowUp" && i > -1) { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
    drop.querySelectorAll(".buydrop__item").forEach(function (a) {
      a.addEventListener("click", function () { setDrop(drop, false); });
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-buydrop]")) closeAll();
  });

  // Las opciones de pago del menú dejan preseleccionado el método en el formulario
  var form = document.getElementById("coForm");
  document.querySelectorAll(".js-buy[data-pago]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (!form) return;
      var radio = form.querySelector('input[name="pago"][value="' + a.getAttribute("data-pago") + '"]');
      if (radio) {
        radio.checked = true;
        form.dispatchEvent(new Event("change"));
      }
    });
  });

  // Si la barra fija se oculta con su menú abierto, cerrarlo
  var sticky = document.getElementById("stickyCta");
  var stickyDrop = sticky && sticky.querySelector("[data-buydrop]");
  if (stickyDrop) {
    window.addEventListener("scroll", function () {
      if (!sticky.classList.contains("is-visible") && stickyDrop.classList.contains("is-open")) setDrop(stickyDrop, false);
    }, { passive: true });
  }
})();
