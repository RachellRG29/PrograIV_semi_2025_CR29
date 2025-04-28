<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'tiempo_preparacion',
        'dificultad',
        'ingredientes',
        'pasos',
        'imagen',
    ];
}
