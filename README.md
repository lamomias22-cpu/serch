# Landing — Mini Plancha a Vapor Portátil (Arte de Regalar)

Landing estática para venta directa, pensada primero para mobile. Abrí `index.html` en el navegador o subí la carpeta a cualquier hosting.

## Editar precio, cuotas y descuento
Todo se cambia en `config.js` (precio, precio tachado, % por transferencia, cuotas, plazo de envío). El precio por transferencia se calcula solo.
Si tenés checkout en la tienda, poné la URL en `checkoutUrl` y los botones de compra van ahí; si lo dejás vacío, abren WhatsApp con el mensaje precargado.

## Indicaciones visuales
Cada sección de `index.html` tiene un comentario `<!-- ... -->` con la indicación visual (fotos o video sugeridos, cómo se ve en mobile y en desktop).
Pendientes recomendados:
- Video loop del producto desarrugando una camisa en percha (`assets/plancha-percha.mp4`; el código ya está comentado en el hero).
- Logos oficiales de tarjetas y correos en lugar de las etiquetas de texto.
- Revisar qué incluye la caja ("Accesorios incluidos según modelo") y qué correos usan.

## Estructura
1. Barra superior · 2. Hero · 3. Dolor vs. Solución · 4. Casos de uso · 5. Características → beneficios · 6. Oferta y medios de pago · 7. FAQ · CTA final · 8. Footer · Barra de compra fija en mobile
