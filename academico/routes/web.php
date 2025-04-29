<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/alumnos', [AlumnoController::class, 'store']);
Route::post('/alumnos/buscar', [AlumnoController::class, 'buscar']);
Route::get('/api/alumnos', [AlumnoController::class, 'listar']);
