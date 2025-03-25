<?php
include('../../Config/Config.php');
header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

extract($_REQUEST);

$alumnos = $alumnos ?? '[]';
$accion = $accion ?? '';
$class_alumnos = new alumnos($conexion);

try {
    $resultado = $class_alumnos->recibir_datos($alumnos);
    if (is_array($resultado) && isset($resultado['msg']) && $resultado['msg'] !== 'ok') {
        echo json_encode(['success' => false, 'message' => $resultado['msg']]);
    } else {
        echo json_encode(['success' => true, 'message' => 'Alumno sincronizado correctamente']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}

class alumnos {
    private $datos = [], $db, $respuesta = ['msg' => 'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }
    public function recibir_datos($alumnos){
        global $accion;
        if($accion == 'consultar'){
            return $this->administrar_alumnos();
        }else{
            $this->datos = json_decode($alumnos, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if (empty($this->datos['codigo'])) {
            $this->respuesta['msg'] = 'El código es requerido';
        } else if (empty($this->datos['nombre'])) {
            $this->respuesta['msg'] = 'El nombre es requerido';
        } else if (empty($this->datos['direccion'])) {
            $this->respuesta['msg'] = 'La dirección es requerida';
        } else if (empty($this->datos['telefono'])) {
            $this->respuesta['msg'] = 'El teléfono es requerido';
        } else if (empty($this->datos['email'])) {
            $this->respuesta['msg'] = 'El email es requerido';
        } else if (empty($this->datos['fechanacimiento'])) {
            $this->respuesta['msg'] = 'La fecha de nacimiento es requerida';
        } else if (empty($this->datos['sexo'])) {
            $this->respuesta['msg'] = 'El sexo es requerido';
        } else {
            return $this->administrar_alumnos();
        }
        
    }
    private function administrar_alumnos(){
        global $accion;
        if($this->respuesta['msg'] == 'ok'){
            $this->db->consultasql('INSERT INTO bitacora(idDocumento, hash, data, fecha_hora) VALUES(?, ?, ?, ?)', 
            $this->datos['codigo_transaccion'], $this->datos['hash'], json_encode($this->datos), date('Y-m-d H:i:s') );

            if($accion == 'nuevo'){
                return $this->db->consultasql('INSERT INTO alumnos(codigo,nombre,direccion,telefono,email,fechanacimiento,sexo,codigo_transaccion, hash) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], $this->datos['telefono'], 
                    $this->datos['email'], $this->datos['fechanacimiento'], $this->datos['sexo'], $this->datos['codigo_transaccion'], 
                    $this->datos['hash']);
            }
            else if($accion == 'modificar'){
                return $this->db->consultasql('UPDATE alumnos SET codigo=?,nombre=?,direccion=?,telefono=?,email=?,fechanacimiento=?,sexo=?, hash=? WHERE codigo_transaccion = ?', 
                $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], $this->datos['telefono'], 
                $this->datos['email'], $this->datos['fechanacimiento'],$this->datos['sexo'], $this->datos['hash'], $this->datos['codigo_transaccion']);
            }
            else if($accion == 'eliminar'){
                return $this->db->consultasql('DELETE FROM alumnos WHERE codigo_transaccion = ?', $this->datos['codigo_transaccion']);
            }
            else if($accion == 'consultar'){
                $this->db->consultasql('SELECT idAlumno, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, codigo_transaccion, hash FROM alumnos');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>
