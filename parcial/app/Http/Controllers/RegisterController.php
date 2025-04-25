<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        // Validación
        $validated = $request->validate([
            'fullname' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'gender' => 'required|in:Femenino,Masculino',
            'email' => 'required|email|unique:register,email',
            'password' => 'required|min:6',
        ]);

        // Crear nuevo registro
        Register::create([
            'fullname' => $validated['fullname'],
            'birthdate' => $validated['birthdate'],
            'gender' => $validated['gender'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        return redirect('/')->with('success', 'Usuario registrado con éxito.');
    }
}
