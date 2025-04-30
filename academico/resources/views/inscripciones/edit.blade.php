@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="card">
        <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">Modificar Inscripción</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('inscripciones.update', $inscripcion->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label class="form-label">Alumno</label>
                    <select name="alumno_id" class="form-control" required>
                        @foreach ($alumnos as $alumno)
                            <option value="{{ $alumno->id }}" {{ $inscripcion->alumno_id == $alumno->id ? 'selected' : '' }}>
                                {{ $alumno->nombre }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Materia</label>
                    <select name="materia_id" class="form-control" required>
                        @foreach ($materias as $materia)
                            <option value="{{ $materia->id }}" {{ $inscripcion->materia_id == $materia->id ? 'selected' : '' }}>
                                {{ $materia->nombre_materia }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Fecha de inscripción</label>
                    <input type="date" name="fecha_inscripcion" class="form-control" value="{{ $inscripcion->fecha_inscripcion }}" required>
                </div>

                <button type="submit" class="btn btn-primary">Actualizar</button>
                <a href="{{ route('inscripciones.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>

</div>
@endsection
