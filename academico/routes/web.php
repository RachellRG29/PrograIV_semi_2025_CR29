<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\MatriculacionController;
use App\Http\Controllers\InscripcionController;


Route::get('/', function () {
    return redirect()->route('alumnos.index');
});

Route::resource('alumnos', AlumnoController::class);
Route::resource('docentes', DocenteController::class);
Route::resource('materias', MateriaController::class);
Route::resource('matriculaciones', MatriculacionController::class)->except(['show']);
Route::resource('inscripciones', InscripcionController::class);
Route::get('/matriculaciones/matriculados', [MatriculacionController::class, 'matriculados'])->name('matriculaciones.matriculados');
Route::get('/matriculaciones/no_matriculados', [MatriculacionController::class, 'noMatriculados'])->name('matriculaciones.no_matriculados');
Route::get('/matriculaciones/matricular/{id}', [MatriculacionController::class, 'formulario'])->name('matriculaciones.matricular');


