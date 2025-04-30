<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Models\Alumno;
use App\Models\Materia;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    // Mostrar el formulario y listado de inscripciones
    public function index()
{
    $inscripciones = Inscripcion::with('alumno', 'materia')->get();

    // ✅ Solo mostrar alumnos que están en la tabla de matriculaciones
    $alumnosMatriculados = \App\Models\Matriculacion::pluck('alumno_id')->unique();
    $alumnos = Alumno::whereIn('id', $alumnosMatriculados)->get();

    $materias = Materia::all();

    return view('inscripciones.index', compact('inscripciones', 'alumnos', 'materias'));
}

    // Guardar una nueva inscripción
    public function store(Request $request)
    {
        $request->validate([
            'alumno_id' => 'required|exists:alumnos,id',
            'materia_id' => 'required|exists:materias,id',
            'fecha_inscripcion' => 'required|date',
        ]);

        Inscripcion::create($request->all());

        return redirect()->route('inscripciones.index')->with('success', 'Inscripción registrada correctamente.');
    }

    // Eliminar una inscripción
    public function destroy($id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return redirect()->route('inscripciones.index')->with('success', 'Inscripción eliminada correctamente.');
    }

    // Mostrar el formulario de edición
    public function edit($id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $alumnos = Alumno::all();
        $materias = Materia::all();

        return view('inscripciones.edit', compact('inscripcion', 'alumnos', 'materias'));
    }

    // Actualizar una inscripción
    public function update(Request $request, $id)
    {
        $request->validate([
            'alumno_id' => 'required|exists:alumnos,id',
            'materia_id' => 'required|exists:materias,id',
            'fecha_inscripcion' => 'required|date',
        ]);

        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->update($request->all());

        return redirect()->route('inscripciones.index')->with('success', 'Inscripción actualizada correctamente.');
    }
}
