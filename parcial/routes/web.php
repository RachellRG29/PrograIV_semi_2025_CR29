<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;

Route::get('/', function () {
    return view('welcome'); // <-- muestra el formulario de registrar o crear cuenta de Veganimo
});

Route::post('/', [RegisterController::class, 'store'])->name('register.store');

