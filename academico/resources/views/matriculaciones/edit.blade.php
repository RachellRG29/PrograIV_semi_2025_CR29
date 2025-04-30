@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="card">
        <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">Modificar Matriculación</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('matriculaciones.update', $matriculacion->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label class="form-label">Alumno</label>
                    <select name="alumno_id" class="form-control" required>
                        @foreach ($alumnos as $alumno)
                            <option value="{{ $alumno->id }}" {{ $matriculacion->alumno_id == $alumno->id ? 'selected' : '' }}>
                                {{ $alumno->nombre }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Materia</label>
                    <select name="materia_id" class="form-control" required>
                        @foreach ($materias as $materia)
                            <option value="{{ $materia->id }}" {{ $matriculacion->materia_id == $materia->id ? 'selected' : '' }}>
                                {{ $materia->nombre_materia }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Fecha de Matriculación</label>
                    <input type="date" name="fecha_matriculacion" class="form-control" value="{{ $matriculacion->fecha_matriculacion }}" required>
                </div>

                <button type="submit" class="btn btn-primary">Actualizar</button>
                <a href="{{ route('matriculaciones.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>

</div>
@endsection
