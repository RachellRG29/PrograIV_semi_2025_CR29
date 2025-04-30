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
            <h5 class="mb-0">Registro de Alumnos</h5>
        </div>
        <div class="card-body shadow-sm p-4 bg-white rounded">
        <form action="{{ route('alumnos.store') }}" method="POST">
            @csrf
            <div class="row">
                <!-- Columna izquierda -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Código</label>
                        <input type="text" class="form-control" name="codigo" required
                        pattern="[A-Za-z]{4}[0-9]{6}" oninput="validarCodigoAlumno(this)"  onblur="validarCodigoAlumno(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="nombre" required
                        pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombreAlumno(this)" onblur="validarNombreAlumno(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" name="email" required
                        oninput="validarEmailAlumno(this)" onblur="validarEmailAlumno(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="fechanacimiento" class="form-label">Fecha de Nacimiento</label>
                        <input type="date" class="form-control" name="fechanacimiento" required
                        oninput="validarFechaNacimientoAlumno(this)" onblur="validarFechaNacimientoAlumno(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="sexo" class="form-label">Sexo</label>
                        <select name="sexo" class="form-control" required 
                        oninput="validarSexoAlumno(this)" onblur="validarSexoAlumno(this, true)">
                        <option value="" disabled selected>Seleccione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>

                <!-- Columna derecha -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" name="telefono" required
                        oninput="validarTelefonoAlumno(this)" onblur="validarTelefonoAlumno(this, true)"
                        pattern="[0-9]{4}-[0-9]{4}" placeholder="1234-5678">
                    </div>

                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" name="direccion" required
                        oninput="validarDireccionAlumno(this)" onblur="validarDireccionAlumno(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="distrito" class="form-label">Distrito</label>
                        <input type="text" class="form-control" name="distrito" required
                        pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombreDistrito(this)" onblur="validarNombreDistrito(this, true)">
                    </div>

                    <div class="mb-3">
                        <label for="municipio" class="form-label">Municipio</label>
                        <input type="text" class="form-control" name="municipio" required
                        pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombreMunicipio(this)" onblur="validarNombreMunicipio(this, true)">
                    </div>
                </div>
            </div>

            <div class="text-center mt-3">
                <button type="submit" class="btn btn-success">Guardar Alumno</button>
            </div>
        </form>
        </div>
    </div>

    <div class="card">
        <!-- Título -->
        <div class="card-header bg-dark text-white text-center">
            <h5 class="mb-0">Listado de Alumnos</h5>
        </div>

        <!-- Input de búsqueda -->
        <div class="card-body">
            <div class="row justify-content-center mb-3">
                <div class="col-md-6 position-relative">
                    <i class="ph-fill ph-magnifying-glass position-absolute" style="top: 50%; left: 10px; transform: translateY(-50%); font-size: 1.2rem; color: #888;"></i>
                    <input type="text" id="busquedaAlumnos" class="form-control ps-5 text-center" placeholder="Buscar alumno por nombre, código, email...">
                </div>
            </div>

            <!-- Tabla -->
            <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark text-center">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Distrito</th>
                        <th>Municipio</th>
                        <th>Teléfono</th>
                        <th>Fecha Nacimiento</th>
                        <th>Sexo</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody id="tablaAlumnos">
                    @foreach ($alumnos as $alumno)
                        <tr>
                            <td>{{ $alumno->codigo }}</td>
                            <td>{{ $alumno->nombre }}</td>
                            <td>{{ $alumno->email }}</td>
                            <td>{{ $alumno->direccion }}</td>
                            <td>{{ $alumno->distrito }}</td>
                            <td>{{ $alumno->municipio }}</td>
                            <td>{{ $alumno->telefono }}</td>
                            <td>{{ $alumno->fechanacimiento }}</td>
                            <td>{{ $alumno->sexo }}</td>
                            <td class="text-center d-flex gap-2 justify-content-center">
                                <a href="{{ route('alumnos.edit', $alumno->id) }}" class="btn btn-warning btn-sm">
                                    <i class="ph-fill ph-pencil"></i>
                                </a>
                                <form action="{{ route('alumnos.destroy', $alumno->id) }}" method="POST" onsubmit="return confirm('¿Eliminar este alumno?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm">
                                        <i class="ph-fill ph-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    @if($alumnos->isEmpty())
                        <tr>
                            <td colspan="10" class="text-center">No hay alumnos registrados.</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
@endsection


<script>
    /* Validaciones de formulario de alumnos */
function validarCodigoAlumno(input, mostrarAlerta = false) {
    const codigo = input.value.trim();
    const regexCodigo = /^[A-Za-z]{4}\d{6}$/; // Formato ABCD123456

    if (regexCodigo.test(codigo)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (codigo === '') {
                alertify.error('El codigo no puede estar vacío');
            } else {
                alertify.warning('El codigo debe tener el siguiente formato ABCD123456');
            }
        }
    }
}

function validarNombreAlumno(input, mostrarAlerta = false) {
    const nombre = input.value.trim();
    const regexNombre = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexNombre.test(nombre)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (nombre === '') {
                alertify.error('El nombre no puede estar vacío');
            } else {
                alertify.warning('El nombre debe tener al menos 3 letras');
            }
        }
    }
    
}

function validarEmailAlumno(input, mostrarAlerta = false) {
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

function validarDireccionAlumno(input, mostrarAlerta = false) {
    const direccion = input.value.trim();
    const regexDireccion = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\/\-,.#\s]{5,150}$/;

    if(regexDireccion.test(direccion)){
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(direccion === ''){
                alertify.error('La direccion no puede estar vacia');
            } else {
                alertify.warning('La direccion debe tener al menos 3 letras');
            }
        }
    }
}

function validarNombreDistrito(input, mostrarAlerta = false) {
    const distrito = input.value.trim();
    const regexDistrito = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexDistrito.test(distrito)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (distrito === '') {
                alertify.error('El distrito no puede estar vacío');
            } else {
                alertify.warning('El distrito debe tener al menos 3 letras');
            }
        }
    }
    
}


function validarNombreMunicipio(input, mostrarAlerta = false) {
    const municipio = input.value.trim();
    const regexMunicipio = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexMunicipio.test(municipio)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (municipio === '') {
                alertify.error('El municipio no puede estar vacío');
            } else {
                alertify.warning('El municipio debe tener al menos 3 letras');
            }
        }
    }
    
}

function validarTelefonoAlumno(input, mostrarAlerta = false) {
    const telefono = input.value.trim();
    const regexTelefono = /^[0-9]{4}-[0-9]{4}$/; 

    if(regexTelefono.test(telefono)){        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');    
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(telefono===''){
                alertify.error('El telefono no puede estar vacio');
            } else if(!regexTelefono.test(telefono)){
                alertify.warning('El telefono debe tener el siguiente formato 0000-0000');
                input.value = telefono.replace(/[^0-9]{4}-[0-9]{4}/g, '');
                return false;
            }
        }
    }
}

function validarFechaNacimientoAlumno(input, mostrarAlerta = false) {
    const fechaNacimiento = input.value.trim();
    const regexFechaNacimiento = /^\d{4}-\d{2}-\d{2}$/;

    // Validar el formato AAAA-MM-DD
    if (!regexFechaNacimiento.test(fechaNacimiento)) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (mostrarAlerta) {
            alertify.warning('La fecha de nacimiento debe tener el siguiente formato AAAA-MM-DD');
        }
        return false;
    }

    // Obtener la fecha ingresada y la fecha actual
    const fechaIngresada = new Date(fechaNacimiento);
    const hoy = new Date();

    // Calcular la edad del estudiante
    let edad = hoy.getFullYear() - fechaIngresada.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    // Ajustar la edad si no ha cumplido años este año
    if (mesActual < fechaIngresada.getMonth() || (mesActual === fechaIngresada.getMonth() && diaActual < fechaIngresada.getDate())) {
        edad--;
    }

    // Validar que la fecha no sea futura
    if (fechaIngresada > hoy) {
        if (mostrarAlerta) alertify.error('La fecha de nacimiento no puede ser futura.');
        input.classList.add('is-invalid');
        return false;
    }

    // ✅ Validar que la edad esté entre 15 y 80 años
    if (edad < 15 || edad > 80) {
        if (mostrarAlerta) alertify.error('La edad debe estar entre 15 y 80 años.');
        input.classList.add('is-invalid');
        return false;
    }

    // Si todo es válido, agregar la clase 'is-valid'
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true; // Fecha válida
}

function validarSexoAlumno(input, mostrarAlerta = false) {
    const sexo = input.value.trim();

    if (sexo !== "") {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if (mostrarAlerta) {
            alertify.error('Debe seleccionar un sexo.');
        }
    }
}


</script>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    
    formulario.addEventListener("submit", function (e) {
        let valido = true;

        const campos = formulario.querySelectorAll("input, select");
        campos.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add("is-invalid");
                valido = false;

                if (input.name === "codigo") validarCodigoAlumno(input, true);
                if (input.name === "nombre") validarNombreAlumno(input, true);
                if (input.name === "email") validarEmailAlumno(input, true);
                if (input.name === "fechanacimiento") validarFechaNacimientoAlumno(input, true);
                if (input.name === "sexo") validarSexoAlumno(input, true);
                if (input.name === "telefono") validarTelefonoAlumno(input, true);
                if (input.name === "direccion") validarDireccionAlumno(input, true);
                if (input.name === "distrito") validarNombreDistrito(input, true);
                if (input.name === "municipio") validarNombreMunicipio(input, true);
            }
        });

        if (!valido) {
            e.preventDefault(); // Evita que se envíe el formulario
            alertify.error("Por favor complete correctamente todos los campos.");
        }
    });
});
</script>

<script>
document.addEventListener('DOMContentLoaded', function () {
    // Confirmación al eliminar alumnos
    document.querySelectorAll('.form-eliminar-alumno').forEach(formulario => {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault(); // Previene envío inmediato

            alertify.confirm(
                'Confirmar eliminación',
                '¿Estás seguro de que deseas eliminar este alumno?',
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



<script>
    document.addEventListener('DOMContentLoaded', function () {
        const input = document.getElementById('busquedaAlumnos');
        const filas = document.querySelectorAll('#tablaAlumnos tr');

        input.addEventListener('keyup', function () {
            const filtro = input.value.toLowerCase();

            filas.forEach(fila => {
                const texto = fila.textContent.toLowerCase();
                fila.style.display = texto.includes(filtro) ? '' : 'none';
            });
        });
    });
</script>


<script src="https://unpkg.com/phosphor-icons"></script>
