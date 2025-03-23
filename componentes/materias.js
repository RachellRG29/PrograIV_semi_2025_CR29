    
 const materia = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            materia : {
                codigo: '',
                nombre: '',
                uv:'',
                codigo_transaccion: uuidv4()
            },
        }
    },
    methods: {
        buscarMateria() {
            this.forms.buscarMateria.mostrar = !this.forms.buscarMateria.mostrar;
            this.$emit('buscar');
        },
        modificarMateria(materia) {
            this.accion = 'modificar';
            this.materia = {...materia};
        },
        guardarMateria() {
            let materia = {...this.materia};
        
            // Generar hash para la seguridad
            materia.hash = CryptoJS.SHA256(JSON.stringify({
                codigo: materia.codigo,
                nombre: materia.nombre,
                uv: materia.uv
            })).toString();
        
            db.materias.put(materia).then(() => {
                console.log("Materia guardada en IndexedDB:", materia);
                alertify.success("Materia guardada en IndexedDB.");
        
                // Guardar en MySQL
                fetch(`private/modulos/materias/materia.php?accion=${this.accion}&materias=${JSON.stringify(materia)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data !== true) {
                            alertify.error(data);
                        } else {
                            this.nuevoMateria();
                            this.$emit('buscar');
                        }
                    })
                    .catch(error => console.error("Error al guardar en MySQL:", error));
            }).catch(error => {
                console.error("Error al guardar en IndexedDB:", error);
                alertify.error("No se pudo guardar en IndexedDB.");
            });
        }
        ,
        nuevoMateria() {
            this.accion = 'nuevo';
            this.materia = {
                codigo: '',
                nombre: '',
                uv: '',
                codigo_transaccion: uuidv4()
            };
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmMateria" name="frmMateria" @submit.prevent="guardarMateria">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Materias</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="materia.codigo" type="text" name="txtCodigoMateria" id="txtCodigoMateria" class="form-control"
                                     oninput="validarCodigoMateria(this)"  onblur="validarCodigoMateria(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="materia.nombre" type="text" name="txtNombreMateria" id="txtNombreMateria" class="form-control"
                                    pattern="[A-Za-zñÑáéíóú ]{3,150}" oninput="validarNombreMateria(this)" onblur="validarNombreMateria(this, true)">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">UV</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="materia.uv" type="text" name="txtUVMateria" id="txtUVMateria" class="form-control"
                                     oninput="validarUV(this)" onblur="validarUV(this, true)">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center d-flex justify-content-between">
                            <input type="reset" value="Nuevo" class="btn btn-warning" style="background-color: #f8bf23;">
                            <input type="submit" value="Guardar" class="btn btn-primary"  style="color: #000000;"> 
                            <input type="button" @click="buscarMateria" value="Buscar" class="btn btn-info">
                        </div>

                    </div>
                </form>
            </div>
        </div>
    `
};

/* validaciones del formulario materias */
function validarCodigoMateria(input, mostrarAlerta = false) {
    const codigo = input.value.trim();
    const regexCodigo = /^\d{3,4}$/; //

    if (regexCodigo.test(codigo)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (uv === '') {
                alertify.error('La UV no puede estar vacía');
            } else {
                alertify.warning('La UV solo permite dos números');
            }
        }
    }
}

function validarNombreMateria(input, mostrarAlerta = false) {
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

function validarUV(input, mostrarAlerta = false) {
    const uv = input.value.trim();
    const regexUV = /^\d{1,2}$/; // Solo permite uno o dos números

    if (regexUV.test(uv)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (uv === '') {
                alertify.error('La UV no puede estar vacía');
            } else {
                alertify.warning('La UV solo permite dos números');
            }
        }
    }
}