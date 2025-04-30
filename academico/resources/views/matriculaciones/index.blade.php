@extends('layouts.app')

@section('content')
<div class="container mt-4">

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Menú de Matriculación</h5>
        </div>
        <div class="card-body text-center d-flex flex-column gap-3">

            <a href="{{ route('matriculaciones.matriculados') }}" class="btn btn-outline-primary btn-lg">
                📘 Ver Alumnos Matriculados
            </a>

            <a href="{{ route('matriculaciones.no_matriculados') }}" class="btn btn-outline-secondary btn-lg">
                🚫 Ver Alumnos No Matriculados
            </a>

        </div>
    </div>

</div>
@endsection
