<?php
require_once __DIR__ . '/../misc/db_config.php';
header('Content-Type: application/json');

$fullname = $_POST['fullname'] ?? '';
$birthdate = $_POST['birthdate'] ?? '';
$gender = $_POST['gender'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($fullname) || empty($birthdate) || empty($gender) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "⚠️ Faltan datos del formulario"
    ]);

     // Redirige a login.html después del registro
    header("Location: login.html");    
    exit;
}

$documento = [
    'fullname' => $fullname,
    'birthdate' => $birthdate,
    'gender' => $gender,
    'email' => $email,
    'password' => password_hash($password, PASSWORD_DEFAULT),
    'created_at' => new MongoDB\BSON\UTCDateTime()
];

$bulk = new MongoDB\Driver\BulkWrite;
$bulk->insert($documento);

$baseDatos = 'Veganimo';
$coleccion = 'Usuarios';

try {
    $cliente->executeBulkWrite("$baseDatos.$coleccion", $bulk);
    echo json_encode([
        "success" => true,
        "message" => "✅ Cuenta creada correctamente"
    ]);
} catch (MongoDB\Driver\Exception\Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "❌ Error al guardar: " . $e->getMessage()
    ]);
}
?>
