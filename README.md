# Landing — Mini Plancha a Vapor Portátil (Arte de Regalar)

Landing estática para venta directa, pensada primero para mobile. Abrí `index.html` en el navegador o subí la carpeta a cualquier hosting.

## Editar precio y descuento
Todo se cambia en `config.js` (precio, precio tachado, % por transferencia, plazo de envío). El precio por transferencia se calcula solo.
Si tenés checkout en la tienda, poné la URL en `checkoutUrl` y los botones de compra van ahí; si lo dejás vacío, abren WhatsApp con el mensaje precargado.

## Indicaciones visuales
Cada sección de `index.html` tiene un comentario `<!-- ... -->` con la indicación visual (fotos o video sugeridos, cómo se ve en mobile y en desktop).
Pendientes recomendados:
- Video loop del producto desarrugando una camisa en percha (`assets/plancha-percha.mp4`; el código ya está comentado en el hero).
- Logos oficiales de tarjetas y correos en lugar de las etiquetas de texto.
- Revisar qué incluye la caja ("Accesorios incluidos según modelo") y qué correos usan.

## Estructura
1. Barra superior · 2. Hero · 3. Dolor vs. Solución · 4. Casos de uso · 5. Características → beneficios · 6. Oferta y medios de pago · 7. FAQ · CTA final · 8. Footer · Barra de compra fija en mobile

## Publicar en un subdominio (GitHub Pages, gratis)
La landing se publica desde este repositorio y los botones de compra siguen llevando al producto en la tienda de Emidica.

1. **Activar GitHub Pages:** en GitHub, entrá a este repositorio → *Settings* → *Pages*. En *Source* elegí **Deploy from a branch**, en *Branch* elegí `claude/mini-plancha-landing-page-unwbsx` y la carpeta `/ (root)`, y tocá *Save*. En 1–2 minutos queda online en `https://lamomias22-cpu.github.io/serch/`.
2. **Crear el subdominio:** en el panel donde se administra el DNS de `artederegalar.com.ar` agregá un registro:
   - Tipo: `CNAME`
   - Nombre / Host: `oferta`
   - Valor / Destino: `lamomias22-cpu.github.io`

   Si delegaste el dominio a Emidica, el DNS se administra en el panel de Emidica; si no, en tu proveedor de dominio. **No toques** los registros que ya apuntan a la tienda.
3. **Conectar el subdominio:** de vuelta en *Settings* → *Pages*, en *Custom domain* escribí `oferta.artederegalar.com.ar`, tocá *Save* y, cuando GitHub lo verifique, activá *Enforce HTTPS*.

Listo: la landing queda en `https://oferta.artederegalar.com.ar` y la tienda sigue en `https://artederegalar.com.ar`.
