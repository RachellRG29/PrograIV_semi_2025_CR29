<?php
include('../../Config/Config.php');
header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

extract($_REQUEST);

$matricula = $matricula ?? '[]';
$accion = $accion ?? '';
$class_matricula = new Matricula($conexion);

try {
    echo json_encode($class_matricula->recibir_datos($matricula));
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

class Matricula {
    private $datos = [], $db, $respuesta = ['msg' => 'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }

    public function recibir_datos($matricula) {
        global $accion;
        
        if ($accion == 'consultar') {
            return $this->consultar_alumnos();
        } elseif ($accion == 'consultarMatriculados') {
            return $this->consultar_matriculados();
        } else {
            $this->datos = json_decode($matricula, true);
            return $this->administrar_matricula();
        }
    }

    private function consultar_alumnos() {
        $this->db->consultasql('SELECT idAlumno, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo FROM alumnos');
        $alumnos = $this->db->obtener_datos();
        return $alumnos ?: []; // Siempre retornar array
    }

    private function consultar_matriculados() {
        $this->db->consultasql('SELECT m.idAlumno, a.codigo, a.nombre, a.direccion, a.telefono, a.email, a.fechanacimiento, a.sexo, m.codigo_transaccion, m.hash 
                               FROM matricula m 
                               JOIN alumnos a ON m.idAlumno = a.idAlumno');
        $matriculados = $this->db->obtener_datos();
        return $matriculados ?: []; // Siempre retornar array
    }

    private function administrar_matricula() {
        global $accion;
        
        if ($this->respuesta['msg'] == 'ok') {
            $this->db->consultasql('INSERT INTO bitacora(idDocumento, hash, data, fecha_hora) VALUES(?, ?, ?, ?)', 
                $this->datos['codigo_transaccion'], $this->datos['hash'], json_encode($this->datos), date('Y-m-d H:i:s'));

            if ($accion == 'matricular') {
                // Verificar si el alumno existe
                $this->db->consultasql('SELECT idAlumno FROM alumnos WHERE idAlumno = ?', $this->datos['idAlumno']);
                $existe = $this->db->obtener_datos();
                
                if (empty($existe)) {
                    return "El alumno no existe";
                }
                
                // Verificar si ya está matriculado
                $this->db->consultasql('SELECT idAlumno FROM matricula WHERE idAlumno = ?', $this->datos['idAlumno']);
                $matriculado = $this->db->obtener_datos();
                
                if (!empty($matriculado)) {
                    return "El alumno ya está matriculado";
                }
                
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
            } else if ($accion == 'ping') {
                return true;
            }
        }
        
        return $this->respuesta;
    }
}
