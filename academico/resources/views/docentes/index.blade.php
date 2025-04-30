@extends('layouts.app')
    <!-- Gloock y Comfortaa fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Gloock&display=swap" rel="stylesheet">

    <!-- Iconos de Phosphor -->
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/phosphor.css">
    <!-- AlertifyJS CSS y JS -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

@section('content')
<div class="container mt-4">

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card mb-4">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Registro de Docentes</h5>
        </div>
        <div class="card-body">

        

        <form id="formDocentes" action="{{ route('docentes.store') }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="nombre" required onblur="validarNombreDocente(this)">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" name="email" required oninput="validarEmailDocente(this)" onblur="validarEmailDocente(this, true)">
                </div>

                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="text" class="form-control" name="telefono" required onblur="validarTelefonoDocente(this)">
                </div>

                <button type="submit" class="btn btn-success">Guardar Docente</button>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-dark text-white">
            <h5 class="mb-0">Listado de Docentes</h5>
        </div>
        <div class="card-body">
        <div class="row justify-content-center mb-3">
                <div class="col-md-6 position-relative">
                    <i class="ph-fill ph-magnifying-glass position-absolute" style="top: 50%; left: 10px; transform: translateY(-50%); font-size: 1.2rem; color: #888;"></i>
                    <input type="text" id="busquedaDocentes" class="form-control ps-5 text-center" placeholder="Buscar docente por nombre, código, email...">
                </div>
            </div>

            <table id="tablaDocentes" class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($docentes as $docente)
                        <tr>
                            <td>{{ $docente->nombre }}</td>
                            <td>{{ $docente->email }}</td>
                            <td>{{ $docente->telefono }}</td>
                            <td class="text-center d-flex gap-2 justify-content-center">
    <a href="{{ route('docentes.edit', $docente->id) }}" class="btn btn-warning btn-sm">
    <i class="ph ph-pencil-simple"></i>
    </a>

    <form action="{{ route('docentes.destroy', $docente->id) }}" method="POST" class="form-eliminar-docente">

        @method('DELETE')
        <button type="submit" class="btn btn-danger btn-sm">
        <i class="ph ph-trash">
        </button>
    </form>
</td>

                        </tr>
                    @endforeach
                    @if($docentes->isEmpty())
                        <tr>
                            <td colspan="4" class="text-center">No hay docentes registrados.</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection

<script>
    function validarNombreDocente(input, mostrarAlerta = true) {
        const nombre = input.value.trim();
        const regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

        if (regex.test(nombre)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            if (mostrarAlerta) {
                if (nombre === '') {
                    alertify.error('El nombre no puede estar vacío');
                } else {
                    alertify.warning('El nombre debe tener al menos 3 letras y solo letras');
                }
            }
        }
    }


    function validarEmailDocente(input, mostrarAlerta = false) {
        const email = input.value.trim();
        const regexEmail = /^[a-zA-Z0-9._-]+@(ugb\.edu\.sv|gmail\.com)$/;

        if (regexEmail.test(email)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            if (mostrarAlerta) {
                if (email === '') {
                    alertify.error('El email no puede estar vacío');
                } else {
                    alertify.warning('El email debe ser institucional (@ugb.edu.sv) o de Gmail (@gmail.com)');
                }
            }
        }
    }

    function validarTelefonoDocente(input, mostrarAlerta = true) {
        const telefono = input.value.trim();
        const regex = /^[0-9]{4}-[0-9]{4}$/;

        if (regex.test(telefono)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            if (mostrarAlerta) {
                if (telefono === '') {
                    alertify.error('El teléfono no puede estar vacío');
                } else {
                    alertify.warning('Formato válido: 0000-0000');
                }
            }
        }
    }

    // Validación al enviar formulario
    document.getElementById('formDocentes').addEventListener('submit', function(e) {
        const nombre = document.getElementById('nombreDocente');
        const email = document.getElementById('emailDocente');
        const telefono = document.getElementById('telefonoDocente');

        validarNombreDocente(nombre);
        validarEmailDocente(email);
        validarTelefonoDocente(telefono);

        if (
            !nombre.classList.contains('is-valid') ||
            !email.classList.contains('is-valid') ||
            !telefono.classList.contains('is-valid')
        ) {
            e.preventDefault();
            alertify.error('Por favor complete todos los campos correctamente');
        }
    });
    </script>


<script>

    


document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('busquedaDocentes');
    const filas = document.querySelectorAll('#tablaDocentes tbody tr');

    input.addEventListener('keyup', function () {
        const filtro = input.value.toLowerCase();

        filas.forEach(fila => {
            const texto = fila.textContent.toLowerCase();
            fila.style.display = texto.includes(filtro) ? '' : 'none';
        });
    });
});

</script>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const formularios = document.querySelectorAll('.form-eliminar-docente');

        formularios.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // Previene el envío inmediato

                alertify.confirm('Confirmar eliminación',
                    '¿Estás seguro de que deseas eliminar este docente?',
                    function () {
                        form.submit(); // Si el usuario confirma
                    },
                    function () {
                        alertify.error('Eliminación cancelada');
                    }).set({ labels: { ok: 'Sí', cancel: 'No' }, transition: 'zoom' });
            });
        });
    });
</script>


<script src="https://unpkg.com/phosphor-icons"></script>