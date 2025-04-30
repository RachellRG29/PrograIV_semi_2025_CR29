<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Alumno;
use App\Models\Materia;

class Inscripcion extends Model
{
    use HasFactory;

    // ✅ Asegura que use la tabla correcta
    protected $table = 'inscripciones';

    protected $fillable = [
        'alumno_id',
        'materia_id',
        'fecha_inscripcion'
    ];

    // Relación: una inscripción pertenece a un alumno
    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }

    // Relación: una inscripción pertenece a una materia
    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }
}
