@extends('layouts.app')

<!-- Fonts e íconos -->
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Gloock&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/phosphor.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

@section('content')
<div class="container mt-4">

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card mb-4">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Registro de Materias</h5>
        </div>
        <div class="card-body">
            <form id="formMaterias" action="{{ route('materias.store') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label class="form-label">Nombre de la materia</label>
                    <input type="text" id="nombreMateria" name="nombre_materia" class="form-control" required onblur="validarNombreMateria(this)">
                </div>

                <div class="mb-3">
                    <label class="form-label">Descripción (opcional)</label>
                    <textarea name="descripcion" class="form-control" rows="2"></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Docente asignado</label>
                    <select name="docente_id" class="form-control" required>
                        <option value="">Seleccione un docente</option>
                        @foreach($docentes as $docente)
                            <option value="{{ $docente->id }}">{{ $docente->nombre }}</option>
                        @endforeach
                    </select>
                </div>

                <button type="submit" class="btn btn-success">Guardar Materia</button>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-dark text-white">
            <h5 class="mb-0">Listado de Materias</h5>
        </div>
        <div class="card-body">

            <!-- Buscador -->
            <div class="row justify-content-center mb-3">
                <div class="col-md-6 position-relative">
                    <i class="ph-fill ph-magnifying-glass position-absolute" style="top: 50%; left: 10px; transform: translateY(-50%); font-size: 1.2rem; color: #888;"></i>
                    <input type="text" id="busquedaMaterias" class="form-control ps-5 text-center" placeholder="Buscar por nombre, docente...">
                </div>
            </div>

            <table id="tablaMaterias" class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Materia</th>
                        <th>Descripción</th>
                        <th>Docente</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($materias as $materia)
                        <tr>
                            <td>{{ $materia->nombre_materia }}</td>
                            <td>{{ $materia->descripcion }}</td>
                            <td>{{ $materia->docente->nombre }}</td>
                            <td class="text-center d-flex gap-2 justify-content-center">
                                <a href="{{ route('materias.edit', $materia->id) }}" class="btn btn-warning btn-sm">
                                    <i class="ph ph-pencil-simple"></i>
                                </a>
                                <form action="{{ route('materias.destroy', $materia->id) }}" method="POST" class="form-eliminar-materia">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">
                                        <i class="ph ph-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    @if($materias->isEmpty())
                        <tr>
                            <td colspan="4" class="text-center">No hay materias registradas.</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

<!-- Scripts -->
<script>
    // Validación de nombre
    function validarNombreMateria(input) {
        const nombre = input.value.trim();
        const regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,100}$/;

        if (regex.test(nombre)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            if (nombre === '') {
                alertify.error('El nombre no puede estar vacío');
            } else {
                alertify.warning('El nombre debe tener al menos 3 letras y solo letras');
            }
        }
    }

    // Validación general al enviar
    document.getElementById('formMaterias').addEventListener('submit', function (e) {
        const nombre = document.getElementById('nombreMateria');
        validarNombreMateria(nombre);

        if (!nombre.classList.contains('is-valid')) {
            e.preventDefault();
            alertify.error('Por favor complete el formulario correctamente');
        }
    });

    // Buscador de materias
    document.addEventListener('DOMContentLoaded', function () {
        const input = document.getElementById('busquedaMaterias');
        const filas = document.querySelectorAll('#tablaMaterias tbody tr');

        input.addEventListener('keyup', function () {
            const filtro = input.value.toLowerCase();
            filas.forEach(fila => {
                const texto = fila.textContent.toLowerCase();
                fila.style.display = texto.includes(filtro) ? '' : 'none';
            });
        });

        // Confirmación al eliminar
        const formularios = document.querySelectorAll('.form-eliminar-materia');
        formularios.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                alertify.confirm('Confirmar eliminación',
                    '¿Estás seguro de que deseas eliminar esta materia?',
                    function () {
                        form.submit();
                    },
                    function () {
                        alertify.error('Eliminación cancelada');
                    }).set({ labels: { ok: 'Sí', cancel: 'No' }, transition: 'zoom' });
            });
        });
    });
</script>

<script>
document.addEventListener('DOMContentLoaded', function () {
    // Confirmación al eliminar (funciona correctamente ahora)
    document.querySelectorAll('.form-eliminar-materia').forEach(formulario => {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault(); // Previene envío inmediato

            alertify.confirm(
                'Confirmar eliminación',
                '¿Estás seguro de que deseas eliminar esta materia?',
                function () {
                    formulario.submit(); // Solo se envía si el usuario confirma
                },
                function () {
                    alertify.error('Eliminación cancelada');
                }
            ).set({
                labels: { ok: 'Sí, eliminar', cancel: 'Cancelar' },
                transition: 'zoom',
                closableByDimmer: false
            });
        });
    });
});
</script>


<script src="https://unpkg.com/phosphor-icons"></script>
