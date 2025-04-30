@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>🚫 Alumnos No Matriculados</h4>
        <a href="{{ route('matriculaciones.index') }}" class="btn btn-secondary">🔙 Volver</a>
    </div>

    <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark text-center">
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($alumnos as $alumno)
                <tr>
                    <td class="text-center">{{ $alumno->codigo ?? '—' }}</td>
                    <td class="text-center">{{ $alumno->nombre }}</td>
                    <td class="text-center">
                        <a href="{{ route('matriculaciones.matricular', $alumno->id) }}" class="btn btn-success btn-sm">Matricular</a>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="text-center">Todos los alumnos están matriculados.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

</div>
@endsection
