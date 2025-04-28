<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RecetaController;

//Usuarios
Route::get('/', function () {
    return view('welcome'); // <-- muestra el formulario de registrar o crear cuenta de Veganimo
});

Route::post('/', [RegisterController::class, 'store'])->name('register.store');

//Recetas
Route::get('/recetas', function () {
    return view('crear-recetas');
});

Route::post('/recetas', [RecetaController::class, 'store'])->name('recetas.store');