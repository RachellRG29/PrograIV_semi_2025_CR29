
const docente = { 
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            docente : {
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
        buscarDocente() {
            this.forms.buscarDocente.mostrar = !this.forms.buscarDocente.mostrar;
            this.$emit('buscar');
        },
        modificarDocente(docente) {
            this.accion = 'modificar';
            this.docente = {...docente};
        },
        guardarDocente() {
            let docente = {...this.docente};
        
            // Generar hash para la seguridad
            docente.hash = CryptoJS.SHA256(JSON.stringify({
                codigo: docente.codigo,
                nombre: docente.nombre,
                direccion: docente.direccion,
                telefono:  docente.telefono,
                email: docente.email,
                fechanacimiento: docente.fechanacimiento,
                sexo: docente.sexo
            })).toString();
        
            db.docentes.put(docente).then(() => {
                console.log("Docente guardado en IndexedDB:", docente);
                alertify.success("Docente guardado en IndexedDB.");
        
                // Guardar en MySQL
                fetch(`private/modulos/docentes/docente.php?accion=${this.accion}&docentes=${JSON.stringify(docente)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data !== true) {
                            alertify.error(data);
                        } else {
                            this.nuevoDocente();
                            this.$emit('buscar');
                        }
                    })
                    .catch(error => console.error("Error al guardar en MySQL:", error));
            }).catch(error => {
                console.error("Error al guardar en IndexedDB:", error);
                alertify.error("No se pudo guardar en IndexedDB.");
            });
        },
        
        nuevoDocente() {
            this.accion = 'nuevo';
            this.docente = {
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
                <form id="frmDocente" name="frmDocente" @submit.prevent="guardarDocente">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Docentes</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="docente.codigo" type="text" name="txtCodigoDocente" id="txtCodigoDocente" class="form-control"
                                    pattern="[A-Za-z]{4}[0-9]{6}" oninput="validarCodigoDocente(this)" onblur="validarCodigoDocente(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="docente.nombre" type="text" name="txtNombreDocente" id="txtNombreDocente" class="form-control"
                                    pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombreDocente(this)" onblur="validarNombreDocente(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="docente.direccion" type="text" name="txtDireccionDocente" id="txtDireccionDocente" class="form-control"
                                     oninput="validarDireccionDocente(this)" onblur="validarDireccionDocente(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="docente.telefono" type="text" name="txtTelefonoDocente" id="txtTelefonoDocente" class="form-control"
                                    oninput="validarTelefonoDocente(this)" onblur="validarTelefonoDocente(this, true)"
                                    pattern="[0-9]{4}-[0-9]{4}" placeholder="1234-5678">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="docente.email" type="text" name="txtEmailDocente" id="txtEmailDocente" class="form-control"
                                    oninput="validarEmailDocente(this)" onblur="validarEmailDocente(this, true)">
                                </div>
                            </div>
                            <div class="mb-md-4 row">
                                <div class="col-md-4">
                                    <label class="col-form-label">FECHA NACIMIENTO</label>
                                    <input required v-model="docente.fechanacimiento" type="date" id="txtFechaNacimientoDocente" 
                                        class="form-control" oninput="validarFechaNacimientoDocente(this)" onblur="validarFechaNacimientoDocente(this, true)">
                                </div>
                                <div class="col-md-4">
                                    <label class="col-form-label">SEXO</label>
                                    <select required v-model="docente.sexo" id="txtSexoDocente" class="form-control" 
                                        oninput="validarSexoDocente(this)" onblur="validarSexoDocente(this, true)">
                                        <option value="">Seleccione una opción</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center d-flex justify-content-between">
                            <input type="reset" value="Nuevo" class="btn btn-warning" style="background-color: #f8bf23;">
                            <input type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;"> 
                            <input type="button" @click="buscarDocente" value="Buscar" class="btn btn-info">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};


/* Validaciones de formulario de docentes */
function validarCodigoDocente(input, mostrarAlerta = false) {
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

function validarNombreDocente(input, mostrarAlerta = false) {
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

function validarDireccionDocente(input, mostrarAlerta = false) {
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

function validarTelefonoDocente(input, mostrarAlerta = false) {
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

function validarFechaNacimientoDocente(input, mostrarAlerta = false) {
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

    // ✅ Validar que la edad esté entre 23 es decir recien egresado y 80 años
    if (edad < 23 || edad > 80) {
        if (mostrarAlerta) alertify.error('La edad debe estar entre 23 y 80 años.');
        input.classList.add('is-invalid');
        return false;
    }

    // Si todo es válido, agregar la clase 'is-valid'
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true; // Fecha válida
}

function validarSexoDocente(input, mostrarAlerta = false) {
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
