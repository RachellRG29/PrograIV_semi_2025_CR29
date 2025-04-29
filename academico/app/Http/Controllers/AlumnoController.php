<?php

namespace App\Http\Controllers; // <-- también debe estar este namespace arriba

use App\Models\Alumno;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // <-- ESTA LÍNEA

class AlumnoController extends Controller
{
    public function index()
    {
        return view('alumnos');
    }

    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|regex:/^[A-Za-z]{4}[0-9]{6}$/|unique:alumnos',
            'nombre' => 'required|string|max:150',
            'email' => 'required|email|unique:alumnos',
            'direccion' => 'required|string',
            'departamento' => 'required|string',
            'municipio' => 'required|string',
            'distrito' => 'required|string',
            'telefono' => 'required|regex:/^[0-9]{4}-[0-9]{4}$/',
            'fechanacimiento' => 'required|date',
            'sexo' => 'required|in:Masculino,Femenino',
        ]);

        Alumno::create($request->all());

        return response()->json(['mensaje' => 'Alumno guardado correctamente']);
    }

    public function buscar(Request $request)
    {
        return Alumno::where('codigo', $request->codigo)->first();
    }

    public function listar(Request $request)
    {
        $tipo = $request->tipo;
        $buscar = $request->buscar;
    
        $query = Alumno::query();
    
        if ($buscar) {
            $query->where($tipo, 'LIKE', "%$buscar%");
        }
    
        $alumnos = $query->get();
    
        return response()->json($alumnos);
    }

}
