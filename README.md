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
- Carrito de compras con control de cantidades.
- Registro de pedidos.
- Historial de pedidos realizados.

## Funcionamiento

Para obtener la información de los productos y pedidos se realizan solicitudes a la API REST proporcionada en el curso.

Desde JavaScript se utiliza `fetch()` para enviar solicitudes al archivo `api.php`. Este archivo utiliza PHP y cURL como intermediario para comunicarse con la API externa.

Se utilizan solicitudes GET para consultar los productos, sus detalles y los pedidos registrados. Para registrar nuevos pedidos se utiliza POST.

La información se intercambia mediante JSON.

## Archivos principales

- `index.php`: estructura de la página web.
- `api.php`: conexión con la API REST.
- `js/app.js`: funcionalidades de la tienda.
- `css/estilos.css`: diseño de la página.
- `css/detalles.css`: estilos de la ventana de detalles.
- `.gitignore`: excluye el archivo de configuración del repositorio.

## Configuración de la API

El proyecto utiliza un archivo llamado `config.php`, donde se define la dirección de la API y su clave de acceso.

Este archivo no se incluye en GitHub porque contiene una credencial privada.

Para configurar la conexión, se debe crear un archivo llamado `config.php` en la misma carpeta donde se encuentra `api.php`, con el siguiente contenido:

```php
<?php

define('API_URL', 'https://darkred-rook-511555.hostingersite.com/api/v1');

define('API_KEY', 'TU_CLAVE_API');
```

Se debe reemplazar `TU_CLAVE_API` por una clave válida proporcionada para utilizar la API.

El archivo `api.php` utiliza esta configuración para realizar las solicitudes HTTP y enviar la clave mediante la cabecera `X-API-Key`.

## Ejecución del proyecto

Para ejecutar VOLTIX de forma local:

1. Descargar el repositorio desde GitHub.
2. Tener instalado XAMPP o un servidor compatible con PHP.
3. Colocar la carpeta del proyecto dentro de `htdocs`.
4. Crear y configurar el archivo `config.php`.
5. Iniciar Apache desde el panel de XAMPP.
6. Abrir en el navegador:

`http://localhost/VOLTIX/`

La dirección puede cambiar dependiendo del nombre de la carpeta donde se guarde el proyecto.

Para su funcionamiento se requiere PHP con las extensiones cURL y mbstring habilitadas, además de conexión a Internet para consultar la API externa.

**Nota:** VOLTIX se ejecuta mediante un servidor local. El enlace de localhost no es una dirección pública de Internet.

## Autor

Ronald Araya

Programación Avanzada - 2026
