<?php
include('../../Config/Config.php');
extract($_REQUEST);

$matricula = $matricula ?? '[]';
$accion = $accion ?? '';
$class_matricula = new Matricula($conexion);
echo json_encode($class_matricula->recibir_datos($matricula));

class Matricula {
    private $datos = [], $db, $respuesta = ['msg' => 'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }

    public function recibir_datos($matricula) {
        global $accion;
        $this->datos = json_decode($matricula, true);
        return $this->administrar_matricula();
    }

    private function administrar_matricula() {
        global $accion;
        if ($this->respuesta['msg'] == 'ok') {
            if ($accion == 'matricular') {
                return $this->db->consultasql(
                    'INSERT INTO matricula (idAlumno, codigo_transaccion, hash, data) VALUES (?, ?, ?, ?)',
                    $this->datos['idAlumno'],
                    $this->datos['codigo_transaccion'],
                    $this->datos['hash'],
                    json_encode($this->datos)
                );
            } else if ($accion == 'eliminar') {
                return $this->db->consultasql(
                    'DELETE FROM matricula WHERE idAlumno = ?',
                    $this->datos['idAlumno']
                );
            }
        } else {
            return $this->respuesta;
        }
    }
}
