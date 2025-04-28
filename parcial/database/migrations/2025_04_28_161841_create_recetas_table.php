<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recetas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('tiempo_preparacion')->nullable();
            $table->string('dificultad')->nullable();
            $table->text('ingredientes')->nullable(); // Guardaremos ingredientes en formato texto
            $table->text('pasos')->nullable(); // Igual los pasos
            $table->string('imagen')->nullable();
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recetas');
    }
};
