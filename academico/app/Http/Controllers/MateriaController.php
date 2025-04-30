<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use App\Models\Docente;
use Illuminate\Http\Request;

class MateriaController extends Controller
{
    // Mostrar listado de materias
    public function index()
    {
        $materias = Materia::with('docente')->get();
        $docentes = Docente::all();
        return view('materias.index', compact('materias', 'docentes'));
    }

    // Guardar nueva materia
    public function store(Request $request)
    {
        $request->validate([
            'nombre_materia' => 'required',
            'descripcion' => 'nullable',
            'docente_id' => 'required|exists:docentes,id',
        ]);

        Materia::create($request->all());

        return redirect()->route('materias.index')->with('success', 'Materia registrada correctamente.');
    }

    // Mostrar formulario de edición
    public function edit($id)
    {
        $materia = Materia::findOrFail($id);
        $docentes = Docente::all();
        return view('materias.edit', compact('materia', 'docentes'));
    }

    // Actualizar materia
    public function update(Request $request, $id)
    {
        $materia = Materia::findOrFail($id);

        $request->validate([
            'nombre_materia' => 'required',
            'descripcion' => 'nullable',
            'docente_id' => 'required|exists:docentes,id',
        ]);

        $materia->update($request->all());

        return redirect()->route('materias.index')->with('success', 'Materia actualizada correctamente.');
    }

    // Eliminar materia
    public function destroy($id)
    {
        $materia = Materia::findOrFail($id);
        $materia->delete();

        return redirect()->route('materias.index')->with('success', 'Materia eliminada correctamente.');
    }
}
