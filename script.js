// ============================================================
// DATOS
// ============================================================

const productos = [
    {
        id: 1,
        nombre: "Remera Oversize 'Street Logo' Black",
        precio: 22500,
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'superior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        nombre: "Pantalón Cargo Wide Leg Olive",
        precio: 54000,
        precioOriginal: 63500,
        img: "https://images.unsplash.com/photo-1624378440843-16a506798a72?q=80&w=800&auto=format&fit=crop",
        descuento: "15% OFF",
        nuevo: false,
        categoria: 'inferior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        nombre: "Buzo Hoodie Essential Heavyweight",
        precio: 48900,
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'superior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 4,
        nombre: "Gorra Trucker Logo Classic",
        precio: 18000,
        img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: false,
        categoria: 'accesorios',
        talles: ['Único']
    },
    {
        id: 5,
        nombre: "Remera Básica Algodón Premium White",
        precio: 15000,
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'superior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 6,
        nombre: "Jean Slim Fit Negro",
        precio: 42000,
        precioOriginal: 52000,
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
        descuento: "20% OFF",
        nuevo: false,
        categoria: 'inferior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 7,
        nombre: "Buzo Camuflado Urban Jungle",
        precio: 52000,
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'superior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 8,
        nombre: "Pantalón Jogger Techwear Black",
        precio: 38000,
        img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: false,
        categoria: 'inferior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 9,
        nombre: "Riñonera Táctica Street Black",
        precio: 12000,
        precioOriginal: 16000,
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        descuento: "25% OFF",
        nuevo: false,
        categoria: 'accesorios',
        talles: ['Único']
    },
    {
        id: 10,
        nombre: "Remera Tie-Dye Spiral Color",
        precio: 19500,
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'superior',
        talles: ['S', 'M', 'L', 'XL']
    },
    {
        id: 11,
        nombre: "Zapatillas Urban Sneakers Black/White",
        precio: 65000,
        precioOriginal: 78000,
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
        descuento: "15% OFF",
        nuevo: false,
        categoria: 'accesorios',
        talles: ['38', '39', '40', '41', '42']
    },
    {
        id: 12,
        nombre: "Gorro Beanie Ribbed Wool",
        precio: 8500,
        img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
        descuento: false,
        nuevo: true,
        categoria: 'accesorios',
        talles: ['Único']
    }
];

const CODIGOS_POSTALES_LOCALES = [3350, 3300, 3302, 3304];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Estado de filtros
let filtroCategoria = null;
let terminoBusqueda = '';

// ============================================================
// UTILIDADES
// ============================================================

function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-AR');
}

// ============================================================
// MENÚ MÓVIL
// ============================================================

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// ============================================================
// BÚSQUEDA Y FILTRADO
// ============================================================

function filtrarProductos() {
    return productos.filter(prod => {
        // Filtro por categoría
        if (filtroCategoria === 'nuevo' && !prod.nuevo) return false;
        if (filtroCategoria === 'sale' && !prod.descuento) return false;
        if (['superior', 'inferior', 'accesorios'].includes(filtroCategoria) && prod.categoria !== filtroCategoria) return false;

        // Filtro por texto de búsqueda
        if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            return prod.nombre.toLowerCase().includes(termino) ||
                   prod.categoria.toLowerCase().includes(termino);
        }

        return true;
    });
}

function renderizarProductos() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const productosFiltrados = filtrarProductos();

    if (productosFiltrados.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
                <i class="fa-solid fa-magnifying-glass text-4xl mb-4"></i>
                <p class="text-base font-medium">No encontramos prendas que coincidan con tu búsqueda</p>
                <button onclick="limpiarFiltros()" class="mt-4 text-sm font-bold text-brand-black underline hover:text-brand-gray transition">
                    Ver todo el catálogo
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = productosFiltrados.map((prod) => {
        const indexOriginal = productos.indexOf(prod);
        let badges = '';
        if (prod.descuento) {
            badges += `<span class="bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 mr-1">${prod.descuento}</span>`;
        }
        if (prod.nuevo) {
            badges += `<span class="bg-brand-black text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1">NUEVO</span>`;
        }

        const tallesHtml = prod.talles.map(talle => `
            <button
                data-prod-index="${indexOriginal}"
                data-talle="${talle}"
                class="size-btn w-8 h-8 text-xs font-bold border border-gray-300 rounded hover:border-black hover:bg-black hover:text-white transition flex items-center justify-center">
                ${talle}
            </button>
        `).join('');

        return `
            <div class="group relative bg-brand-light p-3 pb-5 transition-all duration-300 hover:bg-gray-200">
                <div class="relative w-full aspect-[4/5] bg-gray-300 overflow-hidden mb-4">
                    <img src="${prod.img}" alt="${prod.nombre}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out">
                    <div class="absolute top-3 left-3 flex">${badges}</div>
                    <div class="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-sm">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-1 justify-center flex-wrap">${tallesHtml}</div>
                            <button data-index="${indexOriginal}" class="add-to-cart-btn text-brand-black font-black uppercase tracking-wider text-sm py-2 px-4 hover:scale-105 transition-transform w-full">
                                + Sumar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Unisex</p>
                    <h3 class="text-sm font-black text-brand-dark leading-tight mb-2 uppercase">${prod.nombre}</h3>
                    <div class="flex items-center gap-3">
                        <p class="text-lg font-black text-brand-black">${formatearPrecio(prod.precio)}</p>
                        ${prod.precioOriginal ? `<p class="text-xs text-gray-400 line-through font-bold mt-1">${formatearPrecio(prod.precioOriginal)}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Event listeners para botones de talle
    grid.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prodIndex = btn.dataset.prodIndex;
            const talle = btn.dataset.talle;
            grid.querySelectorAll(`.size-btn[data-prod-index="${prodIndex}"]`).forEach(b => {
                b.classList.remove('bg-black', 'text-white', 'border-black');
            });
            btn.classList.add('bg-black', 'text-white', 'border-black');
        });
    });

    // Event listeners para botones de carrito
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            const producto = productos[index];
            const selectedBtn = grid.querySelector(`.size-btn[data-prod-index="${index}"].bg-black`);
            if (!selectedBtn) {
                mostrarAlertaTalle(index);
                return;
            }
            const talle = selectedBtn.dataset.talle;
            agregarAlCarrito(producto, talle);
        });
    });
}

function setFiltroCategoria(categoria) {
    filtroCategoria = filtroCategoria === categoria ? null : categoria;
    renderizarProductos();
    // Scroll al catálogo
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

function setTerminoBusqueda(termino) {
    terminoBusqueda = termino.trim();
    renderizarProductos();
}

function limpiarFiltros() {
    filtroCategoria = null;
    terminoBusqueda = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    renderizarProductos();
}

function toggleSearch() {
    const container = document.getElementById('search-container');
    const input = document.getElementById('search-input');
    if (container.classList.contains('w-0')) {
        container.classList.remove('w-0', 'opacity-0');
        container.classList.add('w-auto', 'opacity-100');
        input.focus();
    } else {
        container.classList.add('w-0', 'opacity-0');
        container.classList.remove('w-auto', 'opacity-100');
    }
}

function mostrarAlertaTalle(prodIndex) {
    const card = document.querySelector(`.add-to-cart-btn[data-index="${prodIndex}"]`).closest('.group');
    const alertaPrevia = card.querySelector('.talle-alerta');
    if (alertaPrevia) alertaPrevia.remove();

    const alerta = document.createElement('div');
    alerta.className = 'talle-alerta bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3 py-2 rounded mt-2 animate-[fadeIn_0.3s_ease-out]';
    alerta.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1"></i> Elegí un talle antes de agregar';

    const container = card.querySelector('.flex.flex-col.gap-2');
    container.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3000);
}

// ============================================================
// CARRITO
// ============================================================

function agregarAlCarrito(producto, talle) {
    const existente = carrito.find(p => p.id === producto.id && p.talle === talle);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, talle, cantidad: 1 });
    }
    guardarCarrito();
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);
        cartCountElement.innerText = totalItems;
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
    const contenedor = document.getElementById('cart-items');
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <i class="fa-solid fa-cart-shopping text-4xl mb-3"></i>
                <p class="text-sm font-medium">El carrito está vacío</p>
            </div>
        `;
        return;
    }

    let total = 0;
    contenedor.innerHTML = carrito.map((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;
        return `
            <div class="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <img src="${prod.img}" alt="${prod.nombre}" class="w-16 h-20 object-cover rounded-md flex-shrink-0">
                <div class="flex-1 min-w-0">
                    <h4 class="text-xs font-bold uppercase tracking-wide text-brand-dark leading-tight mb-1 truncate">${prod.nombre}</h4>
                    <p class="text-xs text-gray-500 font-medium mb-1">Talle: <span class="font-bold text-brand-dark">${prod.talle}</span></p>
                    <p class="text-sm font-black text-brand-black mb-2">${formatearPrecio(prod.precio)}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <button onclick="decrementarCantidad(${index})" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-xs font-bold hover:bg-gray-100 transition">-</button>
                            <span class="text-sm font-bold w-4 text-center">${prod.cantidad}</span>
                            <button onclick="incrementarCantidad(${index})" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded text-xs font-bold hover:bg-gray-100 transition">+</button>
                        </div>
                        <button onclick="eliminarDelCarrito(${index})" class="text-red-500 hover:text-red-700 transition text-xs font-bold uppercase tracking-wide">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const totalHtml = document.createElement('div');
    totalHtml.className = 'mt-4 pt-4 border-t border-gray-200 flex justify-between items-center';
    totalHtml.innerHTML = `
        <span class="text-sm font-bold uppercase tracking-wide text-gray-600">Total</span>
        <span class="text-lg font-black text-brand-black">${formatearPrecio(total)}</span>
    `;
    contenedor.appendChild(totalHtml);
}

function incrementarCantidad(index) {
    carrito[index].cantidad += 1;
    guardarCarrito();
    actualizarInterfazCarrito();
    renderizarCarrito();
}

function decrementarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }
    guardarCarrito();
    actualizarInterfazCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarInterfazCarrito();
    renderizarCarrito();
}

function abrirCarrito() {
    renderizarCarrito();
    document.getElementById('cart-panel').classList.remove('translate-x-full');
}

function cerrarCarrito() {
    document.getElementById('cart-panel').classList.add('translate-x-full');
}

// ============================================================
// CHECKOUT VIA WHATSAPP
// ============================================================

function finalizarCompra(evento) {
    evento.preventDefault();

    // Validar carrito
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agregá productos antes de finalizar la compra.');
        return;
    }

    // Validar datos del formulario
    const nombre = document.getElementById('checkout-nombre').value.trim();
    const direccion = document.getElementById('checkout-direccion').value.trim();

    if (!nombre || !direccion) {
        alert('Por favor, completá tu nombre y dirección para continuar.');
        return;
    }

    // Calcular total
    const total = carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

    // Construir mensaje de WhatsApp
    let mensaje = '¡Hola! Quiero hacer un pedido:\n\n';
    mensaje += '📦 *Mi Carrito:*\n';

    carrito.forEach((prod, i) => {
        mensaje += `${i + 1}. ${prod.nombre}\n`;
        mensaje += `   Talle: ${prod.talle} | Cantidad: ${prod.cantidad} | Precio: ${formatearPrecio(prod.precio)}\n`;
    });

    mensaje += `\n💰 *Total: ${formatearPrecio(total)}*\n\n`;
    mensaje += `👤 *Mis datos:*\n`;
    mensaje += `Nombre: ${nombre}\n`;
    mensaje += `Dirección: ${direccion}\n\n`;
    mensaje += '¡Espero tu respuesta! 🙌';

    // Codificar mensaje y abrir WhatsApp
    const numeroWhatsApp = '5493758541221';
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    console.log('URL de WhatsApp generada:', urlWhatsApp);
    console.log('Mensaje:\n', mensaje);

    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Vaciar carrito
    carrito = [];
    guardarCarrito();
    actualizarInterfazCarrito();
    renderizarCarrito();

    // Mostrar mensaje de agradecimiento
    mostrarMensajeGracias();
}

function mostrarMensajeGracias() {
    const contenedor = document.getElementById('cart-items');
    contenedor.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-check text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-lg font-black uppercase tracking-tight mb-2">¡Gracias por tu compra!</h3>
            <p class="text-sm text-gray-500">Te enviamos los detalles por WhatsApp.</p>
        </div>
    `;
}

// ============================================================
// WIDGET DE ENVÍOS
// ============================================================

function actualizarContadorEnvio() {
    const AHORA = new Date();
    const MEDIO_DIA = new Date();
    MEDIO_DIA.setHours(12, 0, 0, 0);

    let diferenciaMilisegundos = MEDIO_DIA - AHORA;
    if (diferenciaMilisegundos < 0) {
        diferenciaMilisegundos += 24 * 60 * 60 * 1000;
    }

    const DIF_HORAS = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
    const DIF_MINUTOS = Math.floor((diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    const timer = `<span class="bg-black text-white px-2 py-1 mx-1 font-mono text-sm inline-block shadow-[2px_2px_0px_rgba(156,163,175,1)]">${String(DIF_HORAS).padStart(2, '0')}:${String(DIF_MINUTOS).padStart(2, '0')} hs</span>`;

    const textoEnvio = document.getElementById('envio-moto-text');
    if (AHORA < MEDIO_DIA) {
        textoEnvio.innerHTML = `Comprando dentro de las próximas ${timer} tu pedido se despacha <strong>HOY</strong>.`;
    } else {
        textoEnvio.innerHTML = `Comprá ahora y tu pedido será preparado para despachar a primera hora de <strong>MAÑANA</strong>.`;
    }
}

// ============================================================
// VERIFICACIÓN DE CÓDIGO POSTAL
// ============================================================

function verificarCP() {
    const input = document.getElementById('cp-input').value;
    const contenedor = document.getElementById('cp-container');
    const cpNumero = parseInt(input);

    if (!input) return;

    if (CODIGOS_POSTALES_LOCALES.includes(cpNumero) || (cpNumero >= 3300 && cpNumero <= 3390)) {
        contenedor.innerHTML = `
            <div class="border-2 border-brand-black p-4 bg-gray-50 flex items-start gap-4 animate-[fadeIn_0.3s_ease-out]">
                <i class="fa-solid fa-bolt text-2xl text-black mt-1"></i>
                <div>
                    <p class="font-black uppercase text-lg tracking-tight">¡Llegamos volando! 🚀</p>
                    <p class="text-sm font-medium text-gray-700 mt-1">Tu CP (${cpNumero}) califica para envío rápido por cadetería en la zona.</p>
                </div>
            </div>
            <button onclick="reiniciarCP()" class="text-xs font-bold text-gray-500 mt-4 uppercase hover:text-black transition flex items-center gap-1"><i class="fa-solid fa-rotate-right"></i> Probar otro CP</button>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="border-2 border-gray-300 p-4 bg-white flex items-start gap-4 animate-[fadeIn_0.3s_ease-out]">
                <i class="fa-solid fa-box text-2xl text-gray-400 mt-1"></i>
                <div>
                    <p class="font-black uppercase text-lg tracking-tight">Envío Nacional 🇦🇷</p>
                    <p class="text-sm font-medium text-gray-600 mt-1">Para el CP ${cpNumero} hacemos envíos seguros mediante Correo Argentino (3 a 5 días hábiles).</p>
                </div>
            </div>
            <button onclick="reiniciarCP()" class="text-xs font-bold text-gray-500 mt-4 uppercase hover:text-black transition flex items-center gap-1"><i class="fa-solid fa-rotate-right"></i> Probar otro CP</button>
        `;
    }
}

function reiniciarCP() {
    const contenedor = document.getElementById('cp-container');
    contenedor.innerHTML = `
        <h4 class="text-sm font-bold mb-3 uppercase tracking-wide text-gray-500">¿Llega rápido a tu zona? (Ej: 3350)</h4>
        <div class="flex gap-2" id="cp-form">
            <input type="number" id="cp-input" placeholder="Ingresá tu CP..." class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium transition-colors">
            <button onclick="verificarCP()" class="bg-brand-black text-white px-6 py-3 font-bold hover:bg-brand-gray transition whitespace-nowrap uppercase text-sm tracking-wider">Verificar</button>
        </div>
    `;
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarInterfazCarrito();
    actualizarContadorEnvio();
    setInterval(actualizarContadorEnvio, 1000);

    // Event listener para el input de búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            setTerminoBusqueda(e.target.value);
        });
    }

    // Event listener para el formulario de checkout
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', finalizarCompra);
    }
});
