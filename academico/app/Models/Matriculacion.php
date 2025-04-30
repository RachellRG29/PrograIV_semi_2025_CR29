<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Alumno;
use App\Models\Materia;

class Matriculacion extends Model
{
    use HasFactory;

    protected $table = 'matriculaciones';

    protected $fillable = [
        'alumno_id',
        'materia_id',
        'fecha_matriculacion'
    ];

    // Relación: una matriculación pertenece a un alumno
    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }

    // Relación: una matriculación pertenece a una materia
    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }
}
