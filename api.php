
<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/config.php';

function responderError($codigo, $mensaje) {
    http_response_code($codigo);
    echo json_encode([
        'success' => false,
        'error' => ['message' => $mensaje]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$accion = $_GET['accion'] ?? 'productos';
$metodo = $_SERVER['REQUEST_METHOD'];

if ($accion === 'productos' && $metodo === 'GET') {
    $ruta = '/products.php?page=1&per_page=50';

} elseif ($accion === 'detalle_producto' && $metodo === 'GET') {
    $id = filter_input(
        INPUT_GET,
        'id',
        FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 1]]
    );

    if ($id === false || $id === null) {
        responderError(400, 'El ID del producto no es válido.');
    }

    $ruta = '/product.php?id=' . $id;

} elseif ($accion === 'pedidos' && $metodo === 'GET') {
    $ruta = '/orders.php?page=1&per_page=50';

} elseif ($accion === 'crear_pedido' && $metodo === 'POST') {
    $ruta = '/orders.php';

} else {
    responderError(400, 'Operación no permitida.');
}

$opciones = [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'X-API-Key: ' . API_KEY,
        'Accept: application/json',
        'Content-Type: application/json'
    ],
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15
];

if ($accion === 'crear_pedido') {
    $entrada = json_decode(file_get_contents('php://input'), true);

    if (!is_array($entrada)) {
        responderError(400, 'El JSON enviado no es válido.');
    }

    $nombre = trim($entrada['customer_name'] ?? '');
    $notas = trim($entrada['notes'] ?? '');
    $items = $entrada['items'] ?? [];

    if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 100) {
        responderError(422, 'El nombre debe tener entre 2 y 100 caracteres.');
    }

    if (mb_strlen($notas) > 500) {
        responderError(422, 'Las notas no pueden superar 500 caracteres.');
    }

    if (!is_array($items) || count($items) < 1 || count($items) > 20) {
        responderError(422, 'Debes seleccionar entre 1 y 20 productos.');
    }

    foreach ($items as $item) {
        if (
            !is_array($item) ||
            !filter_var($item['product_id'] ?? null, FILTER_VALIDATE_INT) ||
            !filter_var(
                $item['quantity'] ?? null,
                FILTER_VALIDATE_INT,
                ['options' => ['min_range' => 1, 'max_range' => 100]]
            )
        ) {
            responderError(422, 'Hay productos o cantidades inválidas.');
        }
    }

    $opciones[CURLOPT_POST] = true;
    $opciones[CURLOPT_POSTFIELDS] = json_encode([
        'customer_name' => $nombre,
        'notes' => $notas,
        'items' => $items
    ], JSON_UNESCAPED_UNICODE);
}

$curl = curl_init(API_URL . $ruta);
curl_setopt_array($curl, $opciones);

$respuesta = curl_exec($curl);
$codigo = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

if ($respuesta === false) {
    responderError(502, 'No fue posible conectar con la API.');
}

$datos = json_decode($respuesta, true);

if (!is_array($datos)) {
    responderError(502, 'La API devolvió una respuesta inválida.');
}

http_response_code(
    $codigo >= 100 && $codigo <= 599 ? $codigo : 502
);

echo json_encode($datos, JSON_UNESCAPED_UNICODE);
