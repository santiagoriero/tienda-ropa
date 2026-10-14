# AGENTS.md - Reglas y Directrices de la Tienda de Ropa

## 1. Stack Tecnológico
- Frontend: HTML5, CSS3 y JavaScript Vanilla.

## 2. Convenciones de Código
- HTML: Usa etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<footer>`).
- JS: Usa `camelCase` para variables y funciones. Separa la lógica de los datos (productos) de la interfaz visual (DOM).
- Limpieza: Analiza y depura constantemente el código. Elimina funciones sin uso, variables huérfanas o código basura de versiones previas.

## 3. Forma de Trabajar
- Lee detenidamente `MEMORY.md` antes de empezar cualquier tarea para mantener el contexto.
- Trabaja de forma iterativa: enfócate en una sola funcionalidad a la vez (ej. solo el catálogo o solo el carrito).
- Mantén el diseño siempre adaptable (Responsive Web Design).

## 4. Verificación de Cambios
- Antes de terminar, verifica la consola del navegador para asegurar que no hay errores de JavaScript.
- Comprueba que la nueva funcionalidad de la tienda no rompa el diseño existente en móviles y escritorio.

## 5. Límites y Reglas Estrictas
- **Siempre:** Actualiza `MEMORY.md` al finalizar una tarea con los logros y siguientes pasos.
- **Pregunta antes de:** Instalar librerías externas (como Bootstrap, Tailwind o frameworks JS) o borrar archivos completos.
- **Nunca:** Incluyas claves reales de pasarelas de pago, tokens de bases de datos, ni datos personales sensibles en el código cliente.