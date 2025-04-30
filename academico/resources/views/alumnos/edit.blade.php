@extends('layouts.app')

@section('content')
<div class="container mt-4">

    <div class="card">
        <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">Modificar Alumno</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('alumnos.update', $alumno->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label class="form-label">Código</label>
                    <input type="text" name="codigo" class="form-control" value="{{ $alumno->codigo }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" name="nombre" class="form-control" value="{{ $alumno->nombre }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Correo electrónico</label>
                    <input type="email" name="email" class="form-control" value="{{ $alumno->email }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Dirección</label>
                    <input type="text" name="direccion" class="form-control" value="{{ $alumno->direccion }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Distrito</label>
                    <input type="text" name="distrito" class="form-control" value="{{ $alumno->distrito }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Municipio</label>
                    <input type="text" name="municipio" class="form-control" value="{{ $alumno->municipio }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Teléfono</label>
                    <input type="text" name="telefono" class="form-control" value="{{ $alumno->telefono }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Fecha de Nacimiento</label>
                    <input type="date" name="fechanacimiento" class="form-control" value="{{ $alumno->fechanacimiento }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Sexo</label>
                    <select name="sexo" class="form-control" required>
                        <option value="">Seleccione</option>
                        <option value="Masculino" {{ $alumno->sexo == 'Masculino' ? 'selected' : '' }}>Masculino</option>
                        <option value="Femenino" {{ $alumno->sexo == 'Femenino' ? 'selected' : '' }}>Femenino</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Actualizar</button>
                <a href="{{ route('alumnos.index') }}" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </div>
</div>
@endsection
