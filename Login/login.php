<?php
require_once __DIR__ . '/../misc/db_config.php';
header('Content-Type: application/json');

// Obtener datos del POST
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Validación básica
if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "⚠️ Debes ingresar el correo y la contraseña"
    ]);
    exit;
}

$baseDatos = 'Veganimo';
$coleccion = 'Usuarios';

try {
    // Buscar usuario por email
    $filtro = ['email' => $email];
    $query = new MongoDB\Driver\Query($filtro, ['limit' => 1]);
    $cursor = $cliente->executeQuery("$baseDatos.$coleccion", $query);
    $usuario = current($cursor->toArray());

    if (!$usuario) {
        echo json_encode([
            "success" => false,
            "message" => "❌ Correo no registrado"
        ]);
        exit;
    }

    // Verificar contraseña
    if (!password_verify($password, $usuario->password)) {
        echo json_encode([
            "success" => false,
            "message" => "❌ Contraseña incorrecta"
        ]);
        exit;
    }

    // Iniciar sesión
    // Extraer primer nombre y primer apellido correctamente
    $nombreParts = preg_split('/\s+/', trim($usuario->fullname));
    $nombreMostrar = $nombreParts[0]; // Primer nombre
    if (count($nombreParts) > 1) {
        $nombreMostrar .= ' ' . $nombreParts[1]; // Primer apellido
    }

    // Guardar en sesión y también enviar al frontend
    $_SESSION['display_name'] = $nombreMostrar;

    echo json_encode([
        "success" => true,
        "message" => "✅ Sesión iniciada correctamente. Redirigiendo...",
        "display_name" => $nombreMostrar,
        "full_name" => $usuario->fullname // Para depuración
    ]);
    
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "❌ Error en el servidor: " . $e->getMessage()
    ]);
}
?>