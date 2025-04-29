<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id(); // idAlumno
            $table->string('codigo', 10)->unique();
            $table->string('nombre', 150);
            $table->string('email')->unique();
            $table->string('direccion');
            $table->string('departamento');
            $table->string('municipio');
            $table->string('distrito');
            $table->string('telefono', 9);
            $table->date('fechanacimiento');
            $table->enum('sexo', ['Femenino', 'Masculino']);
            $table->timestamps();
        });
    }
    

    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
    
};
