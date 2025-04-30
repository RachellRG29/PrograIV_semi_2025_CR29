@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <h4 class="text-primary mb-3">Matricular Alumno</h4>

    <form action="{{ route('matriculaciones.store') }}" method="POST">
        @csrf

        <input type="hidden" name="alumno_id" value="{{ $alumno->id }}">

        <div class="mb-3">
            <label class="form-label">Alumno</label>
            <input type="text" class="form-control" value="{{ $alumno->nombre }}" disabled>
        </div>

        <button type="submit" class="btn btn-success">Matricular Alumno</button>
        <a href="{{ route('matriculaciones.no_matriculados') }}" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
@endsection
