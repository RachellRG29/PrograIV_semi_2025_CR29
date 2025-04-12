<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/bienvenida', function () {
    return 'Bienvenidos a Programacion Computacional IV';
});


Route::get('/usuario/{id}/{nombre}/{apellido}', function ($id, $nombre, $apellido) {
    return 'User #: ' . $id . ', tu nombre es: ' . $nombre . ' y tu apellido es: ' . $apellido;
})->where('id', '[0-9]+');



Route::get('/alumno', function () {
    return 'welcome progra4';
});

Route::resource('alumno', AlumnoController::class); 
