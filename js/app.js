
"use strict";

// VOLTIX - TIENDA DE TECNOLOGÍA

const $ = id => document.getElementById(id);

const listaProductos = $("lista-productos");
const buscador = $("buscar-producto");
const listaPedidos = $("lista-pedidos");

const modalDetalle = $("modal-detalle");
const fondoDetalle = $("fondo-detalle");
const cerrarDetalle = $("cerrar-detalle");
const contenidoDetalle = $("contenido-detalle");

const abrirCarrito = $("abrir-carrito");
const cerrarCarrito = $("cerrar-carrito");
const panelCarrito = $("panel-carrito");
const fondoCarrito = $("fondo-carrito");

const productosCarrito = $("productos-carrito");
const contadorCarrito = $("contador-carrito");
const totalCarrito = $("total-carrito");
const realizarPedido = $("realizar-pedido");

const formularioPedido = $("formulario-pedido");
const nombreCliente = $("nombre-cliente");
const notasPedido = $("notas-pedido");
const confirmarPedido = $("confirmar-pedido");
const cancelarFormulario = $("cancelar-formulario");
const mensajePedido = $("mensaje-pedido");

let productos = [];
let carrito = [];
let procesandoPedido = false;
let ultimoFoco = null;
let focoAnteriorDetalle = null;
let solicitudDetalle = 0;

// UTILIDADES

function formatoPrecio(precio) {
    return new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
        maximumFractionDigits: 2
    }).format(Number(precio));
}

function crearElemento(etiqueta, clase = "", contenido = "") {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    elemento.textContent = String(contenido);
    return elemento;
}

function mostrarMensaje(texto, tipo = "error") {
    mensajePedido.textContent = texto;
    mensajePedido.className = "mensaje-pedido " + tipo;
    mensajePedido.hidden = false;
}

function limpiarMensaje() {
    mensajePedido.textContent = "";
    mensajePedido.hidden = true;
}

// PERSONALIZACIÓN DE PRODUCTOS

function personalizarProducto(producto) {
    const original = String(producto.name || "");
    const nombre = original.toLowerCase();

    let nombreV = original.replace(/para desarrollo/gi, "").trim();
    let descripcionV = "Tecnología para acompañarte en tu día a día.";
    let categoriaV = String(producto.category || "Tecnología");

    if (nombre.includes("laptop")) {
        nombreV = "Laptop";
        descripcionV = "Ideal para estudiar, trabajar y realizar tus actividades digitales.";
        categoriaV = "Computadoras";
    } else if (nombre.includes("mouse")) {
        nombreV = "Mouse";
        descripcionV = "Comodidad y precisión para tu espacio de trabajo.";
        categoriaV = "Periféricos";
    } else if (nombre.includes("teclado")) {
        descripcionV = "Complementa tu computadora con un accesorio práctico.";
        categoriaV = "Periféricos";
    } else if (nombre.includes("audífono")) {
        nombreV = "Audífonos";
        descripcionV = "Disfruta de tu música, reuniones y contenido favorito.";
        categoriaV = "Audio y sonido";
    } else if (nombre.includes("adaptador")) {
        nombreV = "Adaptador USB-C";
        descripcionV = "Amplía las conexiones de tus dispositivos.";
        categoriaV = "Conectividad";
    } else if (nombre.includes("memoria")) {
        descripcionV = "Actualiza los componentes de tu computadora.";
        categoriaV = "Componentes";
    } else if (nombre.includes("ssd") || nombre.includes("disco")) {
        descripcionV = "Espacio para guardar tus archivos y proyectos.";
        categoriaV = "Almacenamiento";
    } else if (nombre.includes("cable")) {
        descripcionV = "Mantén conectados tus equipos y dispositivos.";
        categoriaV = "Conectividad";
    } else if (nombre.includes("router") || nombre.includes("switch")) {
        descripcionV = "Una solución para la conectividad de tus equipos.";
        categoriaV = "Redes";
    } else if (nombre.includes("webcam")) {
        descripcionV = "Conéctate a reuniones y videollamadas.";
        categoriaV = "Periféricos";
    }

    return { ...producto, nombreV, descripcionV, categoriaV };
}

// GET - CONSULTAR CATÁLOGO

async function cargarProductos() {
    listaProductos.textContent = "Cargando productos...";

    try {
        const respuesta = await fetch("api.php", {
            cache: "no-store"
        });

        const datos = await respuesta.json();

        if (!respuesta.ok || datos.success !== true ||
            !Array.isArray(datos.data)) {
            throw new Error("No se pudo consultar el catálogo.");
        }

        productos = datos.data.map(personalizarProducto);
        filtrarProductos();

    } catch (error) {
        console.error(error);
        listaProductos.textContent =
            "No fue posible cargar los productos.";
    }
}

function filtrarProductos() {
    const texto = buscador.value.toLowerCase().trim();

    const filtrados = productos.filter(producto =>
        producto.nombreV.toLowerCase().includes(texto) ||
        producto.categoriaV.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
}

function mostrarProductos(lista) {
    listaProductos.replaceChildren();

    if (lista.length === 0) {
        listaProductos.appendChild(
            crearElemento(
                "div",
                "mensaje-inicial",
                "No se encontraron productos."
            )
        );
        return;
    }

    lista.forEach(producto => {
        const tarjeta = crearElemento("article", "tarjeta-producto");

        tarjeta.appendChild(
            crearElemento("span", "categoria-producto", producto.categoriaV)
        );

        tarjeta.appendChild(
            crearElemento("h3", "", producto.nombreV)
        );

        tarjeta.appendChild(
            crearElemento("p", "", producto.descripcionV)
        );

        tarjeta.appendChild(
            crearElemento(
                "strong",
                "precio-producto",
                formatoPrecio(producto.price)
            )
        );

        tarjeta.appendChild(
            crearElemento(
                "small",
                "existencia-producto",
                "Disponibles: " + producto.stock
            )
        );

        // NUEVO BOTÓN DE DETALLES
        const botonDetalle = crearElemento(
            "button",
            "boton-ver-detalle",
            "Ver detalles"
        );

        botonDetalle.type = "button";
        botonDetalle.addEventListener("click", () => {
            verDetalles(producto.id);
        });

        tarjeta.appendChild(botonDetalle);

        // BOTÓN DEL CARRITO
        const botonAgregar = crearElemento(
            "button",
            "agregar-producto",
            Number(producto.stock) > 0
                ? "Agregar al carrito"
                : "Agotado"
        );

        botonAgregar.type = "button";
        botonAgregar.disabled = Number(producto.stock) <= 0;

        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        tarjeta.appendChild(botonAgregar);
        listaProductos.appendChild(tarjeta);
    });
}

buscador.addEventListener("input", filtrarProductos);

// GET - CONSULTAR DETALLES POR ID

async function verDetalles(id) {
    focoAnteriorDetalle = document.activeElement;
    const solicitudActual = ++solicitudDetalle;

    contenidoDetalle.replaceChildren(
        crearElemento("p", "mensaje-inicial", "Cargando detalles...")
    );

    fondoDetalle.hidden = false;
    modalDetalle.inert = false;
    modalDetalle.setAttribute("aria-hidden", "false");
    document.body.classList.add("detalle-abierto");
    cerrarDetalle.focus();

    try {
        const respuesta = await fetch(
            "api.php?accion=detalle_producto&id=" +
            encodeURIComponent(id),
            { cache: "no-store" }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok || resultado.success !== true ||
            !resultado.data ||
            Array.isArray(resultado.data) ||
            typeof resultado.data !== "object") {
            throw new Error(
                resultado.error?.message ||
                "No fue posible consultar el producto."
            );
        }

        if (solicitudActual !== solicitudDetalle) return;

        const producto = personalizarProducto(resultado.data);

        contenidoDetalle.replaceChildren();

        contenidoDetalle.appendChild(
            crearElemento(
                "span",
                "categoria-producto",
                producto.categoriaV
            )
        );

        const titulo = crearElemento(
            "h2",
            "detalle-titulo",
            producto.nombreV
        );

        titulo.id = "titulo-detalle";
        contenidoDetalle.appendChild(titulo);

        contenidoDetalle.appendChild(
            crearElemento(
                "p",
                "detalle-descripcion",
                producto.description || producto.descripcionV
            )
        );

        contenidoDetalle.appendChild(
            crearElemento(
                "p",
                "detalle-dato",
                "Código: " + (producto.sku || producto.id)
            )
        );

        contenidoDetalle.appendChild(
            crearElemento(
                "strong",
                "detalle-precio",
                formatoPrecio(producto.price)
            )
        );

        contenidoDetalle.appendChild(
            crearElemento(
                "p",
                "detalle-dato",
                "Disponibles: " + producto.stock
            )
        );

        const boton = crearElemento(
            "button",
            "agregar-producto detalle-agregar",
            Number(producto.stock) > 0
                ? "Agregar al carrito"
                : "Agotado"
        );

        boton.type = "button";
        boton.disabled = Number(producto.stock) <= 0;

        boton.addEventListener("click", () => {
            ocultarDetalle();
            agregarAlCarrito(producto.id);
        });

        contenidoDetalle.appendChild(boton);

    } catch (error) {
        if (solicitudActual !== solicitudDetalle) return;

        contenidoDetalle.replaceChildren(
            crearElemento("p", "mensaje-inicial", error.message)
        );
    }
}

function ocultarDetalle() {
    solicitudDetalle++;

    modalDetalle.inert = true;
    modalDetalle.setAttribute("aria-hidden", "true");
    fondoDetalle.hidden = true;
    document.body.classList.remove("detalle-abierto");

    if (focoAnteriorDetalle && focoAnteriorDetalle.isConnected) {
        focoAnteriorDetalle.focus();
    }
}

cerrarDetalle.addEventListener("click", ocultarDetalle);
fondoDetalle.addEventListener("click", ocultarDetalle);

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && !fondoDetalle.hidden) {
        ocultarDetalle();
    }
});

// CARRITO

function agregarAlCarrito(id) {
    const producto = productos.find(
        p => String(p.id) === String(id)
    );

    if (!producto) return;

    const existente = carrito.find(
        p => String(p.id) === String(id)
    );

    const stock = Number(producto.stock);

    if (existente) {
        if (existente.cantidad >= stock) {
            mostrarCarrito();
            return;
        }
        existente.cantidad++;
    } else {
        if (stock <= 0) return;

        carrito.push({
            id: producto.id,
            nombre: producto.nombreV,
            precio: Number(producto.price),
            stock,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarCarrito();
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(
        p => String(p.id) === String(id)
    );

    if (!item) return;

    const nueva = item.cantidad + cambio;

    if (nueva > item.stock) return;

    if (nueva <= 0) {
        carrito = carrito.filter(
            p => String(p.id) !== String(id)
        );
    } else {
        item.cantidad = nueva;
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(
        p => String(p.id) !== String(id)
    );

    actualizarCarrito();
}

function actualizarCarrito() {
    productosCarrito.replaceChildren();

    let total = 0;
    let cantidad = 0;

    if (carrito.length === 0) {
        productosCarrito.appendChild(
            crearElemento(
                "p",
                "carrito-vacio",
                "Tu carrito está vacío."
            )
        );
    }

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cantidad += item.cantidad;

        const tarjeta = crearElemento("div", "item-carrito");

        tarjeta.appendChild(
            crearElemento("h3", "", item.nombre)
        );

        tarjeta.appendChild(
            crearElemento("p", "", formatoPrecio(item.precio))
        );

        const controles = crearElemento(
            "div",
            "controles-cantidad"
        );

        const menos = crearElemento("button", "", "−");
        menos.type = "button";
        menos.addEventListener("click", () => {
            cambiarCantidad(item.id, -1);
        });

        const numero = crearElemento(
            "span",
            "",
            String(item.cantidad)
        );

        const mas = crearElemento("button", "", "+");
        mas.type = "button";
        mas.disabled = item.cantidad >= item.stock;

        mas.addEventListener("click", () => {
            cambiarCantidad(item.id, 1);
        });

        controles.append(menos, numero, mas);
        tarjeta.appendChild(controles);

        const eliminar = crearElemento(
            "button",
            "eliminar-item",
            "Eliminar"
        );

        eliminar.type = "button";
        eliminar.addEventListener("click", () => {
            eliminarDelCarrito(item.id);
        });

        tarjeta.appendChild(eliminar);
        productosCarrito.appendChild(tarjeta);
    });

    contadorCarrito.textContent = cantidad;
    totalCarrito.textContent = formatoPrecio(total);

    realizarPedido.disabled =
        carrito.length === 0 || procesandoPedido;
}

// PANEL DEL CARRITO

function mostrarCarrito() {
    if (panelCarrito.classList.contains("activo")) return;

    ultimoFoco = document.activeElement;

    fondoCarrito.hidden = false;
    panelCarrito.inert = false;
    panelCarrito.classList.add("activo");
    panelCarrito.setAttribute("aria-hidden", "false");

    abrirCarrito.setAttribute("aria-expanded", "true");
    document.body.classList.add("carrito-abierto");

    cerrarCarrito.focus();
}

function ocultarCarrito() {
    if (procesandoPedido) return;

    panelCarrito.classList.remove("activo");
    panelCarrito.setAttribute("aria-hidden", "true");
    panelCarrito.inert = true;

    fondoCarrito.hidden = true;
    abrirCarrito.setAttribute("aria-expanded", "false");
    document.body.classList.remove("carrito-abierto");

    if (ultimoFoco && ultimoFoco.isConnected) {
        ultimoFoco.focus();
    } else {
        abrirCarrito.focus();
    }
}

abrirCarrito.addEventListener("click", mostrarCarrito);
cerrarCarrito.addEventListener("click", ocultarCarrito);
fondoCarrito.addEventListener("click", ocultarCarrito);

document.addEventListener("keydown", evento => {
    if (!panelCarrito.classList.contains("activo")) return;

    if (evento.key === "Escape") {
        ocultarCarrito();
    }

    if (evento.key === "Tab") {
        const elementos = Array.from(
            panelCarrito.querySelectorAll(
                "button:not(:disabled), input:not(:disabled), textarea:not(:disabled)"
            )
        ).filter(elemento =>
            elemento.getClientRects().length > 0
        );

        if (!elementos.length) return;

        const primero = elementos[0];
        const ultimo = elementos[elementos.length - 1];

        if (evento.shiftKey &&
            document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey &&
            document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    }
});

// FORMULARIO

realizarPedido.addEventListener("click", () => {
    if (carrito.length === 0) return;

    formularioPedido.hidden = false;
    realizarPedido.hidden = true;
    limpiarMensaje();
    nombreCliente.focus();
});

cancelarFormulario.addEventListener("click", () => {
    formularioPedido.hidden = true;
    realizarPedido.hidden = false;
    limpiarMensaje();
    realizarPedido.focus();
});

// POST - REGISTRAR COMPRA

formularioPedido.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (procesandoPedido || carrito.length === 0) return;

    const nombre = nombreCliente.value.trim();
    const notas = notasPedido.value.trim();

    if (nombre.length < 2 || nombre.length > 100) {
        mostrarMensaje("Escribe un nombre válido.");
        return;
    }

    if (notas.length > 500) {
        mostrarMensaje("Las notas son demasiado largas.");
        return;
    }

    const datosPedido = {
        customer_name: nombre,
        notes: notas,
        items: carrito.map(item => ({
            product_id: Number(item.id),
            quantity: item.cantidad
        }))
    };

    procesandoPedido = true;
    confirmarPedido.disabled = true;
    confirmarPedido.textContent = "Procesando compra...";
    actualizarCarrito();
    limpiarMensaje();

    try {
        const respuesta = await fetch(
            "api.php?accion=crear_pedido",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(datosPedido)
            }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok || resultado.success !== true) {
            throw new Error(
                resultado.error?.message ||
                "No fue posible registrar el pedido."
            );
        }

        const pedido = resultado.data || {};

        let texto = "¡Compra registrada correctamente!";

        if (pedido.id !== undefined) {
            texto += " Pedido #" + pedido.id + ".";
        }

        if (pedido.total !== undefined) {
            texto += " Total: " +
                formatoPrecio(pedido.total) + ".";
        }

        carrito = [];
        actualizarCarrito();
        mostrarMensaje(texto, "exito");

        formularioPedido.reset();

        await cargarProductos();
        await cargarPedidos();

        formularioPedido.hidden = true;
        realizarPedido.hidden = false;

        ocultarCarrito();

        $("pedidos").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        mostrarMensaje(error.message, "error");

    } finally {
        procesandoPedido = false;
        confirmarPedido.disabled = false;
        confirmarPedido.textContent = "✓ Confirmar compra";
        actualizarCarrito();
    }
});

// GET - HISTORIAL DE PEDIDOS

async function cargarPedidos() {
    listaPedidos.textContent = "Cargando pedidos...";

    try {
        const respuesta = await fetch(
            "api.php?accion=pedidos",
            { cache: "no-store" }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok ||
            datos.success !== true ||
            !Array.isArray(datos.data)) {
            throw new Error(
                "No se pudieron consultar los pedidos."
            );
        }

        mostrarPedidos(datos.data);

    } catch (error) {
        console.error(error);
        listaPedidos.textContent =
            "No fue posible consultar los pedidos.";
    }
}

function mostrarPedidos(pedidos) {
    listaPedidos.replaceChildren();

    if (pedidos.length === 0) {
        listaPedidos.textContent =
            "Todavía no hay pedidos registrados.";
        return;
    }

    const contenedor = crearElemento(
        "div",
        "historial-pedidos"
    );

    pedidos.forEach(pedido => {
        const tarjeta = crearElemento(
            "article",
            "item-carrito"
        );

        tarjeta.appendChild(
            crearElemento(
                "h3",
                "",
                "Pedido #" + pedido.id
            )
        );

        tarjeta.appendChild(
            crearElemento(
                "p",
                "",
                "Cliente: " +
                (pedido.customer_name || "Sin nombre")
            )
        );

        tarjeta.appendChild(
            crearElemento(
                "p",
                "",
                "Estado: " +
                (pedido.status || "Registrado")
            )
        );

        tarjeta.appendChild(
            crearElemento(
                "strong",
                "",
                formatoPrecio(pedido.total || 0)
            )
        );

        contenedor.appendChild(tarjeta);
    });

    listaPedidos.appendChild(contenedor);
}

// INICIAR VOLTIX

actualizarCarrito();
cargarProductos();
cargarPedidos();
