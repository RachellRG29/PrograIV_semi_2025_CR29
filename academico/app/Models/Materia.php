<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Docente;

class Materia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_materia',
        'descripcion',
        'docente_id'
    ];

    // Relación: una materia pertenece a un docente
    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }
}
