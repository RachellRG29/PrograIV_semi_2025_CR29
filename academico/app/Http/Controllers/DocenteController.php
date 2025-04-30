<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    public function index()
    {
        $docentes = Docente::all();
        return view('docentes.index', compact('docentes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'email' => 'required|email|unique:docentes',
            'telefono' => 'required',
        ]);

        Docente::create($request->all());

        return redirect()->route('docentes.index')->with('success', 'Docente registrado correctamente.');
    }

    // NUEVO: Mostrar formulario de edición
    public function edit($id)
    {
        $docente = Docente::findOrFail($id);
        return view('docentes.edit', compact('docente'));
    }

    // NUEVO: Actualizar datos del docente
    public function update(Request $request, $id)
    {
        $docente = Docente::findOrFail($id);

        $request->validate([
            'nombre' => 'required',
            'email' => 'required|email|unique:docentes,email,' . $id,
            'telefono' => 'required',
        ]);

        $docente->update($request->all());

        return redirect()->route('docentes.index')->with('success', 'Docente modificado correctamente.');
    }

    public function destroy($id)
    {
        $docente = Docente::findOrFail($id);
        $docente->delete();

        return redirect()->route('docentes.index')->with('success', 'Docente eliminado correctamente.');
    }
}
