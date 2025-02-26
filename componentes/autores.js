    
 const autor = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            autores: [],
            idAutor: '',
            codigo: '',
            nombre: '',
            pais:'',
            telefono:''    
        }
    },
    methods: {
        buscarAutor() {
            this.forms.buscarAutor.mostrar = !this.forms.buscarAutor.mostrar;
            this.$emit('buscar');
        },
        modificarAutor(autor) {
            this.accion = 'modificar';
            this.idAutor = autor.idAutor;
            this.codigo = autor.codigo;
            this.nombre = autor.nombre;
            this.pais = autor.pais; 
            this.telefono = autor.telefono;

        },
        guardarAutor() {
            let autor = {
                codigo: this.codigo,
                nombre: this.nombre,
                pais: this.pais,
                telefono: this.telefono
            };
            if (this.accion == 'modificar') {
                autor.idAutor = this.idAutor;
            }
            db.autores.put(autor);
            this.nuevoAutor();
            this.listarAutor();
        },
        nuevoAutor() {
            this.accion = 'nuevo';
            this.idAutor = '';
            this.codigo = '';
            this.nombre = '';
            this.pais = '';
            this.telefono = '';
        }
    },
    template: `
           <div class="row justify-content-center">
            <div class="col-md-6">

            
                <form id="frmAutor" name="frmAutor" @submit.prevent="guardarAutor">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Autores</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="codigo" type="text" name="txtCodigoAutor" id="txtCodigoAutor" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" name="txtNombreAutor" id="txtNombreAutor" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">PAIS</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="pais" type="text" name="txtPaisAutor" id="txtPaisAutor" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input required pattern="[0-9]{4}-[0-9]{4}" v-model="telefono" type="text"
                                        name="txtTelefonoAutor" id="txtTelefonoAutor" class="form-control"
                                        oninput="validarTelefono(this)" onblur="validarTelefono(this, true)"
                                        placeholder="1234-5678">
                                </div>
                            </div>


                        </div>
                        <div class="card-footer text-center d-flex justify-content-between">
                             <button type="reset" value="Nuevo" class="btn"  @click="nuevoAutor"  style="background-color: #f8bf23;">Nuevo</button>
                             <button type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;">Guardar</button>
                             <button type="button" @click="buscarAutor" class="btn btn-info"> Buscar</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    `
};


/* validaciones del formulario materias */
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
                alertify.error('El código no puede estar vacío');
            } else {
                alertify.warning('El código debe tener el siguiente formato ABCD123456');
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


