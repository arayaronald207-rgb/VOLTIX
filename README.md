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

## Configuración de la API

El proyecto utiliza `config.php` para definir la dirección de la API y su clave de acceso.

Este archivo no se incluye en el repositorio porque contiene una credencial privada. Para ejecutar el proyecto, crea un archivo llamado `config.php` en la misma carpeta que `api.php`, con este contenido:

```php
<?php

// Dirección de la API del profesor.
define('API_URL', 'https://darkred-rook-511555.hostingersite.com/api/v1');

// Reemplazar por una clave válida proporcionada por el profesor.
define('API_KEY', 'TU_CLAVE_API');
```

El archivo `api.php` carga esta configuración y utiliza la clave en el encabezado `X-API-Key` para comunicarse con la API externa.

La aplicación debe ejecutarse mediante un servidor con PHP y las extensiones cURL y mbstring habilitadas, por ejemplo, XAMPP. No basta con abrir `index.php` directamente en el navegador.

## Link de acceso al sistema

   http://localhost/nexus_store/

## Autor

Ronald Araya

Programación Avanzada - 2026
