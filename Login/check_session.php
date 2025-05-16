<?php
require_once __DIR__ . '/../misc/db_config.php';
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'], $_SESSION['display_name'])) {
    echo json_encode([
        'logged_in' => true,
        'display_name' => $_SESSION['display_name']
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}
?>