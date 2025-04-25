<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $table = 'register';

    protected $fillable = [
        'fullname',
        'birthdate',
        'gender',
        'email',
        'password',
    ];

    public $timestamps = false; // <--- importante si no existen en la tabla
}

