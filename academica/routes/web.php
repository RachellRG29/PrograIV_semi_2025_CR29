<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/alumno', function () {
    return 'welcome progra4';
});

Route::resource('alumno', AlumnoController::class); 
