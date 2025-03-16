    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            alumno : {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                fechanacimiento:'',
                sexo:'',
                codigo_transaccion: uuidv4()
            },
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = {...alumno};
        },
        guardarAlumno() {
            let alumno = {...this.alumno};
            db.alumnos.put(alumno);
            fetch(`private/modulos/alumnos/alumno.php?accion=${this.accion}&alumnos=${JSON.stringify(alumno)}`)
                .then(response => response.json())
                .then(data => {
                    if( data != true ){
                        alertify.error(data);
                    }else{
                        this.nuevoAlumno();
                        this.$emit('buscar');
                    }
                })
                .catch(error => console.log(error));
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno = {
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                fechanacimiento:'',
                sexo:'',
                codigo_transaccion: uuidv4()
            };
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Alumnos</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="alumno.codigo" type="text" name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control"
                                    pattern="[A-Za-z]{4}[0-9]{6}" oninput="validarCodigo(this)"  onblur="validarCodigo(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="alumno.nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno" class="form-control"
                                    pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombre(this)" onblur="validarNombre(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="alumno.direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control"
                                     oninput="validarDireccion(this)" onblur="validarDireccion(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="alumno.telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control"
                                    oninput="validarTelefono(this)" onblur="validarTelefono(this, true)"
                                    pattern="[0-9]{4}-[0-9]{4}" placeholder="1234-5678">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="alumno.email" type="text" name="txtEmailAlumno" id="txtEmailAlumno" class="form-control"
                                    oninput="validarEmail(this)" onblur="validarEmail(this, true)">
                                </div>
                            </div>

                              <div class="mb-md-4 row">
                                <!-- FECHA NACIMIENTO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">FECHA NACIMIENTO</label>
                                    <input required v-model="alumno.fechanacimiento" type="date" id="txtFechaNacimientoAlumno" 
                                        class="form-control" onblur="validarFechaNacimiento(this, true)">
                                </div>

                                <!-- SEXO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">SEXO</label>
                                    <select required v-model="alumno.sexo" id="txtSexoAlumno" class="form-control" 
                                        oninput="validarSexo(this)" onblur="validarSexo(this, true)">
                                        <option value="">Seleccione una opción</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div class="card-footer bg-dark text-center d-flex justify-content-between">
                            <input type="reset" value="Nuevo" class="btn btn-warning"  style="background-color: #f8bf23;">
                            <input type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;"> 
                            <input type="button" @click="buscarAlumno" value="Buscar" class="btn btn-info">
                        </div>

                    </div>
                </form>
            </div>
        </div>
    `
};

/* Validaciones de formulario de alumnos */
function validarCodigo(input, mostrarAlerta = false) {
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

function validarNombre(input, mostrarAlerta = false) {
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

function validarEmail(input, mostrarAlerta = false) {
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

function validarDireccion(input, mostrarAlerta = false) {
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

function validarTelefono(input, mostrarAlerta = false) {
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

function validarFechaNacimiento(input, mostrarAlerta = false) {
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

function validarSexo(input, mostrarAlerta = false) {
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