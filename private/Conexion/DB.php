<?php 
class DB {
    private $conexion, $consulta, $resultado;

    public function __construct($server, $user, $pass) {
        try {
            $this->conexion = new PDO($server, $user, $pass, 
                array(
                    PDO::ATTR_EMULATE_PREPARES => false, 
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                ));
        } catch (PDOException $e) {
            die("Error al conectar con la base de datos: " . $e->getMessage());
        }
    }

    public function consultasql($sql) {
        try {
            $parametros = func_get_args();
            array_shift($parametros);
            
            $this->consulta = $this->conexion->prepare($sql);
            $this->resultado = $this->consulta->execute($parametros);
            
            return $this->resultado;
        } catch (Exception $e) {
            error_log("Error en consulta SQL: " . $e->getMessage());
            return $e->getMessage();
        }
    }

    public function obtener_datos() {
        try {
            return $this->consulta->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Error al obtener datos: " . $e->getMessage());
            return [];
        }
    }
}