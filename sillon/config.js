/*
 * CONFIGURACIÓN DE LA OFERTA
 * Editá estos valores y se actualizan en toda la landing.
 */
window.LANDING_CONFIG = {
  producto: "Sillón Inflable Individual Ergonómico", // nombre en el mensaje de pedido
  precio: 74999,              // precio de lista (tarjeta)
  precioAnterior: null,       // precio tachado; poné null para ocultarlo
  descuento: 5,               // % de descuento por transferencia
  plazoEnvio: "3 a 7 días hábiles",

  // Botones de compra:
  //  "formulario" → abre el formulario de pedido en la landing y lo envía por WhatsApp
  //  "tienda"     → lleva a checkoutUrl (el producto en la tienda Emidica)
  modoCompra: "formulario",
  whatsappPedidos: "5493413088480",
  checkoutUrl: "https://artederegalar.com.ar",
  whatsappUrl: "https://wa.me/5493413088480?text=Hola!%20Quiero%20comprar%20el%20Sill%C3%B3n%20Inflable"
};
