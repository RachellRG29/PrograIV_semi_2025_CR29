<?php

namespace App\Http\Controllers;

use App\Models\Matriculacion;
use App\Models\Alumno;
use Illuminate\Http\Request;

class MatriculacionController extends Controller
{
    // Mostrar listado de matriculaciones
    public function index()
    {
        $matriculaciones = Matriculacion::with('alumno')->get();
        $alumnos = Alumno::all();
        return view('matriculaciones.index', compact('matriculaciones', 'alumnos'));
    }

    // Guardar nueva matriculación (solo alumno)
    public function store(Request $request)
    {
        $request->validate([
            'alumno_id' => 'required|exists:alumnos,id',
        ]);

        Matriculacion::create([
            'alumno_id' => $request->alumno_id,
        ]);

        return redirect()->route('matriculaciones.index')->with('success', 'Alumno matriculado correctamente.');
    }

    // Eliminar matriculación
    public function destroy($id)
    {
        $matriculacion = Matriculacion::findOrFail($id);
        $matriculacion->delete();

        return redirect()->route('matriculaciones.index')->with('success', 'Matriculación eliminada correctamente.');
    }

    // Mostrar formulario de matriculación individual (solo alumno)
    public function formulario($id)
    {
        $alumno = Alumno::findOrFail($id);
        return view('matriculaciones.formulario', compact('alumno'));
    }

    // Mostrar lista de alumnos matriculados
    public function matriculados()
    {
        $matriculaciones = Matriculacion::with('alumno')->get();
        return view('matriculaciones.matriculados', compact('matriculaciones'));
    }

    // Mostrar lista de alumnos no matriculados
    public function noMatriculados()
    {
        $alumnosMatriculados = Matriculacion::pluck('alumno_id');
        $alumnos = Alumno::whereNotIn('id', $alumnosMatriculados)->get();
        return view('matriculaciones.no_matriculados', compact('alumnos'));
    }
}
