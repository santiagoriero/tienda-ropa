# MEMORY.md - Contexto y Memoria de la Tienda de Ropa

## Estado Actual del Proyecto
- Proyecto: Página web para una tienda de ropa enfocada en un catálogo de productos y carrito de compras.
- Archivos: `index.html`, `script.js` (depurados y reestructurados).
- Tarea actual: Flujo de checkout vía WhatsApp implementado.

## Decisiones Tomadas (y por qué)
- Se utiliza HTML, CSS y JavaScript Vanilla para la estructura base. Esto permite tener un proyecto ligero, fácil de entender y sin dependencias complejas en la etapa inicial.
- La interfaz y el catálogo deben diseñarse pensando primero en dispositivos móviles (Mobile-first).
- Los precios se almacenan como números en el array de productos y se formatean con `toLocaleString('es-AR')` al mostrarse.
- Toda la lógica JS vive en `script.js`; `index.html` solo contiene estructura HTML y estilos.
- Los event listeners se asignan programáticamente (no inline onclick) para mantener separación de concerns.
- Los talles se almacenan como array en cada producto. El carrito distingue items por combinación `id + talle` (ej: Remera M y Remera L son ítems independientes).
- La selección de talle es obligatoria: si el usuario intenta agregar sin elegir, se muestra una alerta visual amigable que desaparece a los 3 segundos.
- El buscador del header es expandible (se despliega al hacer clic en la lupa) para mantener la UI limpia en móviles.
- El filtrado por categorías usa un toggle: si se hace clic en la misma categoría dos veces, se limpia el filtro.
- La función central `filtrarProductos()` combina búsqueda por texto y filtro por categoría simultáneamente.
- El checkout se realiza vía WhatsApp usando la API `wa.me` con número de prueba `5491123456789`. El mensaje incluye lista de items con talles, total y datos del comprador.
- Tras enviar el pedido, el carrito se vacía automáticamente y se muestra un mensaje de agradecimiento.

## Aprendizajes y Errores a Evitar
- **Depuración Prioritaria:** El agente no debe construir sobre código sucio; siempre debe refactorizar y limpiar antes de añadir nuevas funciones.
- No acoplar en exceso. La lista de productos (ropa, precios, talles) debe manejarse preferentemente como una estructura de datos (ej. un Array de Objetos en JS) para facilitar futuras actualizaciones.
- **Nunca usar `indexOf` en inline onclick** para pasar datos: es frágil y se rompe si el orden del array cambia. Usar `data-index` + event listeners.
- **Nunca dejar animaciones referenciadas sin definir** (ej. `animate-[fadeIn...]` sin el `@keyframes fadeIn`).
- **Nunca referenciar funciones en HTML que no existen en JS** (ej. `toggleSearch()` debe definirse en script.js antes de usarse en index.html).
- **Nunca incluir claves reales de WhatsApp ni datos personales en el código cliente.** El número usado es solo de prueba.

## Próximos Pasos
1. ~~Leer los archivos `index.html` y `script.js` actuales, depurarlos y estructurarlos correctamente.~~ ✅ Completado.
2. ~~Construir la estructura semántica de la página (Header, Hero section, Catálogo, Footer).~~ ✅ Completado.
3. ~~Implementar la funcionalidad básica del carrito de compras (Agregar productos, ver total y eliminar).~~ ✅ Completado.
4. ~~Implementar el sistema de selección de talles (obligatorio, alerta visual, ítems independientes por talle).~~ ✅ Completado.
5. ~~Implementar búsqueda por texto y filtrado por categorías (Drop Nuevo, Superior, Inferior, Sale).~~ ✅ Completado.
6. ~~Implementar flujo de checkout vía WhatsApp con formulario de contacto y validación.~~ ✅ Completado.
7. ~~Reemplazar el número de WhatsApp de prueba con el número real de la tienda.~~ ✅ Completado (5493758541221).
8. ~~Agregar más productos al catálogo y considerar paginación o scroll infinito.~~ ✅ Completado (12 productos totales: 4 superior, 3 inferior, 5 accesorios).
9. Optimizar rendimiento: lazy loading de imágenes y debounce en el input de búsqueda.
10. Agregar animaciones de entrada (stagger) a las tarjetas de producto.
11. Considerar despliegue en hosting estático (Netlify, Vercel o GitHub Pages).

> **NOTA DE SEGURIDAD PARA EL AGENTE:** NUNCA escribas en este archivo claves, tokens, URLs de bases de datos privadas ni información de clientes.
