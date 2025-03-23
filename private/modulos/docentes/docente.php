<?php
include('../../Config/Config.php');
extract($_REQUEST); // extrae todas las variables

$docentes = $docentes ?? '[]';
$accion = $accion ?? '';
$class_docentes = new docentes($conexion);
print_r(json_encode($class_docentes->recibir_datos($docentes)));

class docentes {
    private $datos = [], $db, $respuesta = ['msg' => 'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }

    public function recibir_datos($docentes){
        global $accion;
        if($accion == 'consultar'){
            return $this->administrar_docentes();
        } else {
            $this->datos = json_decode($docentes, true);
            return $this->validar_datos();
        }
    }

    private function validar_datos(){
        if (empty($this->datos['codigo'])) {
            $this->respuesta['msg'] = 'El código es requerido';
        }
        if (empty($this->datos['nombre'])) {
            $this->respuesta['msg'] = 'El nombre es requerido';
        }
        if (empty($this->datos['direccion'])) {
            $this->respuesta['msg'] = 'La dirección es requerida';
        }
        if (empty($this->datos['telefono'])) {
            $this->respuesta['msg'] = 'El teléfono es requerido';
        }
        if (empty($this->datos['email'])) {
            $this->respuesta['msg'] = 'El email es requerido';
        }
        if (empty($this->datos['fechanacimiento'])) {
            $this->respuesta['msg'] = 'La fecha de nacimiento es requerida';
        }
        if (empty($this->datos['sexo'])) {
            $this->respuesta['msg'] = 'El sexo es requerido';
        }
        return $this->administrar_docentes();
    }

    private function administrar_docentes(){
        global $accion;
        if ($this->respuesta['msg'] == 'ok') {
            /*$this->db->consultasql('INSERT INTO bitacora(idDocumento, hash, data, fecha_hora) VALUES(?, ?, ?, ?)', 
            $this->datos['codigo_transaccion'], $this->datos['hash'], json_encode($this->datos), date('Y-m-d H:i:s'));*/

            if ($accion == 'nuevo') {
                return $this->db->consultasql('INSERT INTO docentes(codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, codigo_transaccion, hash) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], $this->datos['telefono'], 
                    $this->datos['email'], $this->datos['fechanacimiento'], $this->datos['sexo'], $this->datos['codigo_transaccion'],
                    $this->datos['hash']);
            } else if ($accion == 'modificar') {
                return $this->db->consultasql('UPDATE docentes SET codigo=?, nombre=?, direccion=?, telefono=?, email=?, fechanacimiento=?, sexo=?, hash=? WHERE codigo_transaccion=?', 
                $this->datos['codigo'], $this->datos['nombre'], $this->datos['direccion'], $this->datos['telefono'], 
                $this->datos['email'], $this->datos['fechanacimiento'], $this->datos['sexo'], $this->datos['hash'], $this->datos['codigo_transaccion']);
            } else if ($accion == 'eliminar') {
                return $this->db->consultasql('DELETE FROM docentes WHERE codigo_transaccion = ?', $this->datos['codigo_transaccion']);
            } else if ($accion == 'consultar') {
                $this->db->consultasql('SELECT idDocente, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, codigo_transaccion FROM docentes');
                return $this->db->obtener_datos();
            }
        } else {
            return $this->respuesta;
        }
    }
}