@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>📘 Alumnos Matriculados</h4>
        <a href="{{ route('matriculaciones.index') }}" class="btn btn-secondary">🔙 Volver</a>
    </div>

    <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark text-center">
            <tr>
                <th>Código</th>
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($matriculaciones as $matricula)
                <tr>
                    <td class="text-center">{{ $matricula->alumno->codigo ?? '—' }}</td>
                    <td class="text-center">{{ $matricula->alumno->nombre }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="2" class="text-center">No hay alumnos matriculados.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

</div>
@endsection
