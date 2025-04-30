<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    // Mostrar todos los alumnos
    public function index()
    {
        $alumnos = Alumno::all();
        return view('alumnos.index', compact('alumnos'));
    }

    // Mostrar formulario de creación
    public function create()
    {
        return view('alumnos.create');
    }

    // Guardar un nuevo alumno
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|unique:alumnos',
            'nombre' => 'required',
            'email' => 'required|email',
            'direccion' => 'required',
            'distrito' => 'required',
            'municipio' => 'required',
            'telefono' => 'required',
            'fechanacimiento' => 'required|date',
            'sexo' => 'required',
        ]);

        Alumno::create($request->all());

        return redirect()->route('alumnos.index')->with('success', 'Alumno registrado correctamente.');
    }

    // Mostrar formulario de edición
    public function edit($id)
    {
        $alumno = Alumno::findOrFail($id);
        return view('alumnos.edit', compact('alumno'));
    }

    // Actualizar alumno
    public function update(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($id);

        $request->validate([
            'codigo' => 'required|unique:alumnos,codigo,' . $id,
            'nombre' => 'required',
            'email' => 'required|email',
            'direccion' => 'required',
            'distrito' => 'required',
            'municipio' => 'required',
            'telefono' => 'required',
            'fechanacimiento' => 'required|date',
            'sexo' => 'required',
        ]);

        $alumno->update($request->all());

        return redirect()->route('alumnos.index')->with('success', 'Alumno modificado correctamente.');
    }

    // Eliminar alumno
    public function destroy($id)
    {
        $alumno = Alumno::findOrFail($id);
        $alumno->delete();

        return redirect()->route('alumnos.index')->with('success', 'Alumno eliminado correctamente.');
    }
}
