<?php
require_once __DIR__ . '/../misc/db_config.php';
header('Content-Type: application/json');

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    // Obtener todos los usuarios
    if ($method === 'GET') {
        $query = new MongoDB\Driver\Query([]);
        $cursor = $cliente->executeQuery('Veganimo.Usuarios', $query);

        $usuarios = [];
        foreach ($cursor as $documento) {
            $usuario = (array)$documento;
            $usuario['_id'] = (string)$usuario['_id'];
            $usuario['created_at'] = $usuario['created_at']->toDateTime()->format('c');
            // Asegurar que el campo verified exista (por si hay usuarios antiguos)
            $usuario['verified'] = isset($usuario['verified']) ? (bool)$usuario['verified'] : false;
            $usuarios[] = $usuario;
        }
        
        echo json_encode($usuarios);
    }
    
    // Actualizar usuario
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $bulk = new MongoDB\Driver\BulkWrite;
        $filter = ['_id' => new MongoDB\BSON\ObjectId($data['_id'])];
        $update = [
            '$set' => [
                'fullname' => $data['fullname'],
                'email' => $data['email'],
                'birthdate' => $data['birthdate'],
                'gender' => $data['gender'],
                'verified' => $data['verified']
            ]
        ];
        
        // Actualizar contraseña si se proporcionó
        if (!empty($data['password'])) {
            if ($data['password'] !== $data['confirmPassword']) {
                throw new Exception("Las contraseñas no coinciden");
            }
            $update['$set']['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        
        $bulk->update($filter, $update);
        $result = $cliente->executeBulkWrite('Veganimo.Usuarios', $bulk);
        
        echo json_encode(['success' => true, 'modified' => $result->getModifiedCount()]);
    }
    
    // Eliminar usuario
    elseif ($method === 'DELETE') {
        $id = $_GET['id'];
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->delete(['_id' => new MongoDB\BSON\ObjectId($id)]);
        $result = $cliente->executeBulkWrite('Veganimo.Usuarios', $bulk);
        
        echo json_encode(['success' => true, 'deleted' => $result->getDeletedCount()]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>