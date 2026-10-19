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
  //  "tienda"     → lleva a checkoutUrl (el producto en la tienda Emidica) y el
  //                 pedido por WhatsApp queda como segunda opción
  modoCompra: "formulario",
  seccionPagos: "#oferta",    // los botones de compra llevan a esta sección; los de adentro abren el formulario
  whatsappPedidos: "5493413088480",
  checkoutUrl: "https://artederegalar.com.ar", // ← reemplazar por el link del producto y pasar modoCompra a "tienda"
  whatsappUrl: "https://wa.me/5493413088480?text=Hola!%20Quiero%20comprar%20el%20Sill%C3%B3n%20Inflable"
};
