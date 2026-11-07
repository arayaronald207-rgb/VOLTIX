# VOLTIX - Tienda Tecnológica

VOLTIX es una tienda virtual de productos tecnológicos desarrollada como proyecto del curso de Programación Avanzada.

El proyecto consiste en una página web que se conecta a una API REST para consultar productos, mostrar sus detalles y registrar pedidos.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- PHP
- API REST
- JSON

## Funcionalidades

- Visualización de productos disponibles.
- Búsqueda de productos por nombre o categoría.
- Consulta de detalles de cada producto.
- Carrito de compras.
- Registro de pedidos.
- Historial de pedidos realizados.

## Funcionamiento

Para obtener la información de los productos y pedidos se realizan solicitudes a la API REST proporcionada en el curso.

Desde JavaScript se utiliza `fetch()` para enviar solicitudes al archivo `api.php`. Este archivo utiliza PHP y cURL para comunicarse con la API externa.

Se utilizan solicitudes GET para consultar información y POST para registrar los pedidos.

Los datos se intercambian mediante JSON.

## Archivos principales

- `index.php`: estructura de la página web.
- `api.php`: conexión con la API REST.
- `js/app.js`: funcionalidades de la tienda.
- `css/estilos.css`: diseño de la página.
- `css/detalles.css`: estilos de la ventana de detalles.

## Ejecución del proyecto

Para ejecutar el proyecto se necesita un servidor local con PHP, como XAMPP.

También es necesario configurar el archivo `config.php` con la URL y la clave de acceso a la API, ya que este archivo no se incluye en el repositorio por seguridad.

## Autor

Ronald Araya

Programación Avanzada - 2026
