<?php
// Archivo: misc/db_config.php

$usuario = "cindy";
$contrasena = "AYvGzYofm9m0NGM7";

try {
    $cliente = new MongoDB\Driver\Manager(
        "mongodb+srv://$usuario:$contrasena@cluster0.n8op7pt.mongodb.net/?retryWrites=true&w=majority"
    );
} catch (MongoDB\Driver\Exception\Exception $e) {
    die("❌ Error de conexión con MongoDB Atlas: " . $e->getMessage());
}
?>
