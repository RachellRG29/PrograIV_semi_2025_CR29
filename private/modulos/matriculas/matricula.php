<?php
include('../../Config/Config.php');
extract($_REQUEST); // Extrae todas las variables enviadas en la solicitud

$accion = $accion ?? '';
$class_matricula = new Matricula($conexion);
echo json_encode($class_matricula->procesarMatricula($idAlumno ?? ''));

class Matricula {
    private $db, $respuesta = ['msg' => 'ok'];

    public function __construct($conexion) {
        $this->db = $conexion;
    }

    public function procesarMatricula($idAlumno) {
        global $accion;

        if (empty($idAlumno)) {
            $this->respuesta['msg'] = 'El ID del alumno es requerido';
            return $this->respuesta;
        }

        if ($accion == 'nuevo') {
            return $this->matricularAlumno($idAlumno);
        } else if ($accion == 'eliminar') {
            return $this->eliminarMatricula($idAlumno);
        } else if ($accion == 'consultar') {
            return $this->listarMatriculados();
        }
    }

    private function matricularAlumno($idAlumno) {
        // Verificar si el alumno ya está matriculado
        $resultado = $this->db->consultasql("SELECT * FROM matriculas WHERE idAlumno = ?", $idAlumno);
        if (count($resultado) > 0) {
            $this->respuesta['msg'] = "El alumno ya está matriculado";
            return $this->respuesta;
        }

        // Insertar la matrícula
        $query = "INSERT INTO matriculas (idAlumno) VALUES (?)";
        $this->db->consultasql($query, $idAlumno);
        return ['msg' => 'Alumno matriculado correctamente'];
    }

    private function eliminarMatricula($idAlumno) {
        $query = "DELETE FROM matriculas WHERE idAlumno = ?";
        $this->db->consultasql($query, $idAlumno);
        return ['msg' => 'Matrícula eliminada'];
    }

    private function listarMatriculados() {
        $query = "SELECT alumnos.idAlumno, alumnos.codigo, alumnos.nombre, alumnos.email
                  FROM alumnos INNER JOIN matriculas ON alumnos.idAlumno = matriculas.idAlumno";
        return $this->db->consultasql($query);
    }
}
?>
