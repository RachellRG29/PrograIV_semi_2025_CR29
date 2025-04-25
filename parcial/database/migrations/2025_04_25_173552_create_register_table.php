<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('register', function (Blueprint $table) {
            $table->id('id_register');
            $table->string('fullname');
            $table->date('birthdate');
            $table->enum('gender', ['Femenino', 'Masculino']);
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps(); // Esto ya incluye created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('register');
    }
};
