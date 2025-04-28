<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
use Illuminate\Support\Facades\Storage;

class RecetaController extends Controller
{
    public function store(Request $request)
    {
        // Validar datos básicos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'tiempo_preparacion' => 'nullable|string',
            'dificultad' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
            'ingredientes' => 'nullable|array',
            'pasos' => 'nullable|array',
        ]);

        // Subir imagen (si existe)
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('recetas', 'public');
            $validated['imagen'] = $path;
        }

        // Guardar los arrays como texto
        $validated['ingredientes'] = $request->ingredientes ? json_encode($request->ingredientes) : null;
        $validated['pasos'] = $request->pasos ? json_encode($request->pasos) : null;

        // Guardar en base de datos
        Receta::create($validated);

        return redirect()->back()->with('success', 'Receta creada correctamente.');
    }
}
