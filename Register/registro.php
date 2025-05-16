<?php
require_once __DIR__ . '/../misc/db_config.php';
require_once __DIR__ . '/../misc/phpmailer_config.php';
session_start();

// Verificar si es una solicitud de verificación
if (isset($_POST['verification_code'])) {
    $codigoIngresado = $_POST['verification_code'];
    
    if (!isset($_SESSION['verification_code'], $_SESSION['user_data'])) {
        echo json_encode([
            "success" => false,
            "message" => "No hay sesión de verificación activa",
            "icon" => "error"
        ]);
        exit;
    }

    if ($codigoIngresado == $_SESSION['verification_code']) {
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->insert($_SESSION['user_data']);

        try {
            $cliente->executeBulkWrite('Veganimo.Usuarios', $bulk);
            session_destroy();
            echo json_encode([
                "success" => true,
                "message" => "Cuenta verificada y creada correctamente",
                "icon" => "success",
                "redirect" => "/Login/login.html"
            ]);
        } catch (MongoDB\Driver\Exception\Exception $e) {
            echo json_encode([
                "success" => false,
                "message" => "Error al guardar en la base de datos",
                "icon" => "error"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Código de verificación incorrecto",
            "icon" => "error"
        ]);
    }
    exit;
}

// Validación de campos
$requiredFields = ['fullname', 'birthdate', 'gender', 'email', 'password'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode([
            "success" => false,
            "message" => "Faltan datos del formulario",
            "icon" => "warning"
        ]);
        exit;
    }
}

// Validación de email existente
$email = $_POST['email'];
$filtro = ['email' => $email];
$query = new MongoDB\Driver\Query($filtro, ['limit' => 1]);
$cursor = $cliente->executeQuery('Veganimo.Usuarios', $query);

if (count($cursor->toArray()) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Este correo ya está registrado",
        "icon" => "error"
    ]);
    exit;
}

// Generar código y guardar en sesión
$verificationCode = rand(1000, 9999);
$_SESSION['user_data'] = [
    'fullname' => $_POST['fullname'],
    'birthdate' => $_POST['birthdate'],
    'gender' => $_POST['gender'],
    'email' => $email,
    'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
    'created_at' => new MongoDB\BSON\UTCDateTime(),
    'verified' => false
];
$_SESSION['verification_code'] = $verificationCode;

// Enviar correo
if (enviarCodigoVerificacion($email, $verificationCode) === true) {
    echo json_encode([
        "success" => true,
        "message" => "Código de verificación enviado a tu correo. Serás redirigido para validarlo",
        "icon" => "info",
        "redirect" => "/Verificacion_correo/verificacion.html"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al enviar el código de verificación",
        "icon" => "error"
    ]);
}
?>