@extends('layouts.app')

@section('content')
<div class="container mt-4">

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card mb-4">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Registrar Inscripción</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('inscripciones.store') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label class="form-label">Alumno</label>
                    <select name="alumno_id" class="form-control" required>
                        <option value="">Seleccione un alumno</option>
                        @foreach ($alumnos as $alumno)
                            <option value="{{ $alumno->id }}">{{ $alumno->nombre }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Materia</label>
                    <select name="materia_id" class="form-control" required>
                        <option value="">Seleccione una materia</option>
                        @foreach ($materias as $materia)
                            <option value="{{ $materia->id }}">{{ $materia->nombre_materia }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Fecha de inscripción</label>
                    <input type="date" name="fecha_inscripcion" class="form-control" required>
                </div>

                <button type="submit" class="btn btn-success">Guardar Inscripción</button>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-dark text-white">
            <h5 class="mb-0">Listado de Inscripciones</h5>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Alumno</th>
                        <th>Materia</th>
                        <th>Fecha</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($inscripciones as $inscripcion)
                        <tr>
                            <td>{{ $inscripcion->alumno->nombre }}</td>
                            <td>{{ $inscripcion->materia->nombre_materia }}</td>
                            <td>{{ $inscripcion->fecha_inscripcion }}</td>
                            <td>
                                <div class="d-flex justify-content-center align-items-center gap-2">
                                    <a href="{{ route('inscripciones.edit', $inscripcion->id) }}" class="btn btn-warning btn-sm">Modificar</a>

                                    <form action="{{ route('inscripciones.destroy', $inscripcion->id) }}" method="POST" onsubmit="return confirm('¿Eliminar esta inscripción?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    @if($inscripciones->isEmpty())
                        <tr>
                            <td colspan="4" class="text-center">No hay inscripciones registradas.</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
