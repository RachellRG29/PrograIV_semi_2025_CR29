const autor = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idAutor: '',
            codigo: '',
            nombre: '',
            pais: '',
            telefono: '',
        }
    },
    methods: {
        nuevoAutor() {
            this.accion = 'nuevo';
            this.idAutor = null;
            this.limpiarFormulario();
        },
        limpiarFormulario() {
            this.codigo = "";
            this.nombre = "";
            this.pais = "";
            this.telefono = "";

            // Limpia las clases de validación visual
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        },
        buscarAutor() {
            this.forms.buscarAutor.mostrar = !this.forms.buscarAutor.mostrar;
            this.$emit('buscar', this.actualizarDatos);
        },
        actualizarDatos(autor) {
            if (autor) {
                this.accion = 'modificar';
                this.idAutor = autor.idAutor;
                this.codigo = autor.codigo || "";
                this.nombre = autor.nombre || "";
                this.pais = autor.pais || "";
                this.telefono = autor.telefono || "";
            } else {
                alertify.error("Autor no encontrado");
            }
        },
        modificarAutor(autor) {
            this.accion = 'modificar';
            this.actualizarDatos(autor);
        },
        guardarAutor() {
            let nuevoAutor = {
                codigo: this.codigo,
                nombre: this.nombre,
                pais: this.pais,
                telefono: this.telefono
            };

            // Si estamos modificando, añadimos el id
            if (this.accion === 'modificar' && this.idAutor) {
                nuevoAutor.idAutor = this.idAutor;
            }
            db.autores.put(nuevoAutor); // Guardar en la base de datos
            this.nuevoAutor(); // Limpiar el formulario
        }
    },
    template: `
        <div class="row">
            <div class="container col-12 col-md-8">
                <form id="frmAutor" name="frmAutor" @submit.prevent="guardarAutor">
                    <div class="card border-dark mb-3 bg-dark">
                        <div class="card-header text-white">Registro de Autores</div>
                        <div class="card-body bg-light">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required pattern="[A-Za-z]{4}[0-9]{6}" v-model="codigo" type="text" 
                                    name="txtCodigoAutor" id="txtCodigoAutor" class="form-control" 
                                    oninput="validarCodigo(this)" onblur="validarCodigo(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" 
                                    name="txtNombreAutor" id="txtNombreAutor" class="form-control"
                                    oninput="validarNombre(this)" onblur="validarNombre(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">PAIS</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="pais" type="text" 
                                    name="txtPaisAutor" id="txtPaisAutor" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="telefono" type="text" 
                                    name="txtTelefonoAutor" id="txtTelefonoAutor" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center d-flex justify-content-between">
                             <button type="reset" value="Nuevo" class="btn" @click="nuevoAutor" style="background-color: #f8bf23;">Nuevo</button>
                             <button type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;">Guardar</button>
                             <button type="button" @click="buscarAutor" class="btn btn-info"> Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};

/* Validaciones de formulario de autores */
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