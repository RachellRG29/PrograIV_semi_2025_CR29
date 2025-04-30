@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="card">
        <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">Modificar Materia</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('materias.update', $materia->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label class="form-label">Nombre de la materia</label>
                    <input type="text" name="nombre_materia" class="form-control" value="{{ $materia->nombre_materia }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Descripción (opcional)</label>
                    <textarea name="descripcion" class="form-control" rows="2">{{ $materia->descripcion }}</textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Docente asignado</label>
                    <select name="docente_id" class="form-control" required>
                        <option value="">Seleccione un docente</option>
                        @foreach ($docentes as $docente)
                            <option value="{{ $docente->id }}" {{ $materia->docente_id == $docente->id ? 'selected' : '' }}>
                                {{ $docente->nombre }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Actualizar</button>
                <a href="{{ route('materias.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>

</div>
@endsection
