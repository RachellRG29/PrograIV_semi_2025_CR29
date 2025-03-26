<?php
include('../../Config/Config.php');
header('Content-Type: application/json'); 

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
        return $alumnos ?: [];
    }

    private function consultar_matriculados() {
        $this->db->consultasql('SELECT m.idMatricula, m.idAlumno, m.codigo_transaccion, m.hash, m.data, a.codigo, a.nombre 
                               FROM matricula m JOIN alumnos a ON m.idAlumno = a.idAlumno');
        $matriculados = $this->db->obtener_datos();
        
        return array_map(function($mat) {
            return [
                'idMatricula' => $mat['idMatricula'],
                'idAlumno' => $mat['idAlumno'],
                'codigo_transaccion' => $mat['codigo_transaccion'],
                'hash' => $mat['hash'],
                'data' => $mat['data'],
                'codigo' => $mat['codigo'],
                'nombre' => $mat['nombre']
            ];
        }, $matriculados ?: []);
    }

    private function administrar_matricula() {
        global $accion;
        
        if ($accion == 'matricular') {
         
            $this->db->consultasql('SELECT idAlumno FROM alumnos WHERE idAlumno = ?', $this->datos['idAlumno']);
            $existe = $this->db->obtener_datos();
            
            if (empty($existe)) {
                return ['error' => 'El alumno no existe'];
            }
            
            $this->db->consultasql('SELECT idAlumno FROM matricula WHERE idAlumno = ?', $this->datos['idAlumno']);
            $matriculado = $this->db->obtener_datos();
            
            if (!empty($matriculado)) {
                return ['error' => 'El alumno ya está matriculado'];
            }
            
            // Registrar en bitacora
            $this->db->consultasql('INSERT INTO bitacora(idDocumento, hash, data, fecha_hora) VALUES(?, ?, ?, ?)', 
                $this->datos['codigo_transaccion'], $this->datos['hash'], $this->datos['data'], date('Y-m-d H:i:s'));
            
            // Insertar matrícula
            $result = $this->db->consultasql(
                'INSERT INTO matricula (idAlumno, codigo_transaccion, hash, data) VALUES (?, ?, ?, ?)',
                $this->datos['idAlumno'],$this->datos['codigo_transaccion'],$this->datos['hash'],$this->datos['data']
            );
            
            return $result !== false;
            
        } else if ($accion == 'eliminar') {
            $result = $this->db->consultasql(
                'DELETE FROM matricula WHERE idAlumno = ?',
                $this->datos['idAlumno']
            );
            
            return $result !== false;
            
        } else if ($accion == 'ping') {
            return true;
        }
        
        return $this->respuesta;
    }
}
