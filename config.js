/*
 * CONFIGURACIÓN DE LA OFERTA
 * Editá estos valores y se actualizan en toda la landing.
 */
window.LANDING_CONFIG = {
  precio: 58999,              // precio de lista (tarjeta)
  precioAnterior: null,       // precio tachado; poné null para ocultarlo
  descuento: 5,               // % de descuento por transferencia
  plazoEnvio: "3 a 7 días hábiles",

  // Botones de compra:
  //  "formulario" → abre el formulario de pedido en la landing y lo envía por WhatsApp
  //  "tienda"     → lleva a checkoutUrl (el producto en la tienda Emidica)
  modoCompra: "formulario",
  whatsappPedidos: "5493413088480",
  checkoutUrl: "https://artederegalar.com.ar/producto/plancha-a-vapor-portatil-mini-60",
  whatsappUrl: "https://wa.me/5493413088480?text=Hola!%20Quiero%20comprar%20la%20Mini%20Plancha%20a%20Vapor"
};
