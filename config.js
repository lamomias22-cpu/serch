/*
 * CONFIGURACIÓN DE LA OFERTA
 * Editá estos valores y se actualizan en toda la landing.
 */
window.LANDING_CONFIG = {
  precio: 39999,              // precio de lista (tarjeta)
  precioAnterior: 59999,      // precio tachado; poné null para ocultarlo
  descuento: 15,              // % de descuento por transferencia
  cuotas: 6,                  // cantidad máxima de cuotas
  plazoEnvio: "3 a 7 días hábiles",

  // Botones de compra. Si tenés checkout en la tienda, poné la URL del
  // producto en checkoutUrl y los CTA irán ahí en lugar de a WhatsApp.
  checkoutUrl: "",
  whatsappUrl: "https://wa.me/5493413088480?text=Hola!%20Quiero%20comprar%20la%20Mini%20Plancha%20a%20Vapor"
};
