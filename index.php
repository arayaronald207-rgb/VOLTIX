
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VOLTIX | Tienda de Tecnología</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/detalles.css">
</head>
<body>

<header class="encabezado">
    <div class="contenedor navegacion">
        <a href="index.php" class="logo"> VOLT<span>IX.</span></a>

        <nav class="menu">
            <a href="#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#pedidos">Mis pedidos</a>
        </nav>

        <button id="abrir-carrito" class="boton-carrito"
                type="button" aria-controls="panel-carrito"
                aria-expanded="false">
            🛒 Carrito <span id="contador-carrito">0</span>
        </button>
    </div>
</header>

<main>
    <section class="hero" id="inicio">
        <div class="contenedor">
            <div class="etiqueta">ENERGÍA PARA TU MUNDO DIGITAL</div>
            <h1>La tecnología que <span>te impulsa.</span></h1>
            <p>
                Descubre una nueva forma de comprar tecnología.
                Explora nuestra selección de computadoras,
                accesorios y periféricos.
            </p>
            <a href="#productos" class="boton-principal">
                Explorar productos →
            </a>
        </div>
    </section>

    <section class="seccion-productos" id="productos">
        <div class="contenedor">
            <div class="titulo-seccion">
                <span class="subtitulo">DESCUBRE VOLTIX</span>
                <h2>Explora nuestros productos</h2>
            </div>

            <div class="barra-busqueda">
                <input type="search" id="buscar-producto"
                       placeholder="Buscar productos...">
            </div>

            <div id="lista-productos" class="grid-productos">
                <div class="mensaje-inicial">Cargando productos...</div>
            </div>
        </div>
    </section>

    <section class="seccion-pedidos" id="pedidos">
        <div class="contenedor">
            <span class="subtitulo">HISTORIAL DE COMPRAS</span>
            <h2>Mis pedidos</h2>
            <p>Consulta los pedidos realizados a través de VOLTIX.</p>

            <div id="lista-pedidos" class="mensaje-inicial">
                Cargando pedidos...
            </div>
        </div>
    </section>
</main>

<!-- VENTANA DE DETALLES -->
<div id="fondo-detalle" class="fondo-detalle" hidden></div>

<section
    id="modal-detalle"
    class="modal-detalle"
    role="dialog"
    aria-modal="true"
    aria-labelledby="titulo-detalle"
    aria-hidden="true"
    inert
>
    <div class="detalle-encabezado">
        <span class="subtitulo">INFORMACIÓN DEL PRODUCTO</span>
        <button
            id="cerrar-detalle"
            class="cerrar-carrito"
            type="button"
            aria-label="Cerrar detalles"
        >✕</button>
    </div>
    <div id="contenido-detalle" aria-live="polite"></div>
</section>

<!-- FONDO OSCURO DEL CARRITO -->
<div id="fondo-carrito" class="fondo-carrito" hidden></div>

<!-- CARRITO LATERAL -->
<aside
    id="panel-carrito"
    class="panel-carrito"
    role="dialog"
    aria-modal="true"
    aria-labelledby="titulo-carrito"
    aria-hidden="true"
    inert
>
    <div class="carrito-encabezado">
        <div>
            <span class="subtitulo">TU SELECCIÓN</span>
            <h2 id="titulo-carrito">Mi carrito</h2>
        </div>

        <button
            id="cerrar-carrito"
            class="cerrar-carrito"
            type="button"
            aria-label="Cerrar carrito"
        >✕</button>
    </div>

    <div class="productos-carrito">

        <div id="productos-carrito">
            <p class="carrito-vacio">Tu carrito está vacío.</p>
        </div>

        <form id="formulario-pedido" class="formulario-pedido" hidden>

            <div class="formulario-titulo">
                <span class="subtitulo">FINALIZAR COMPRA</span>
                <h3>Datos del cliente</h3>
                <p>Completa tus datos para confirmar el pedido.</p>
            </div>

            <label for="nombre-cliente">Nombre del cliente *</label>
            <input
                type="text"
                id="nombre-cliente"
                name="nombre"
                placeholder="Escribe tu nombre completo"
                minlength="2"
                maxlength="100"
                required
            >

            <label for="notas-pedido">Notas adicionales (opcional)</label>
            <textarea
                id="notas-pedido"
                name="notas"
                placeholder="Indicaciones para tu pedido..."
                maxlength="500"
                rows="3"
            ></textarea>

            <div
                id="mensaje-pedido"
                class="mensaje-pedido"
                role="status"
                aria-live="polite"
                hidden
            ></div>

            <button
                id="confirmar-pedido"
                class="boton-finalizar"
                type="submit"
            >
                ✓ Confirmar compra
            </button>

            <button
                id="cancelar-formulario"
                class="boton-secundario"
                type="button"
            >
                Volver al carrito
            </button>
        </form>
    </div>

    <div class="carrito-resumen">
        <div class="fila-total">
            <span>Total</span>
            <strong id="total-carrito">₡0</strong>
        </div>

        <button
            id="realizar-pedido"
            class="boton-finalizar"
            type="button"
            disabled
        >
            Continuar con el pedido →
        </button>

        <p class="nota-carrito">
            Compra gestionada mediante Aula API Lab.
        </p>
    </div>
</aside>

<footer class="pie-pagina">
    <div class="contenedor">
        <p>© 2026 VOLTIX. Proyecto académico de integración API REST.</p>
    </div>
</footer>

<script src="js/app.js"></script>
</body>
</html>
