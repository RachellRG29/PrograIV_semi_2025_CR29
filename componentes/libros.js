const libro = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idLibro: '',
            codigo: '',
            titulo: '',
            editorial: '',
            edicion: '',
            idAutor: '', // Para almacenar el ID del autor
        }
    },
    methods: {
        nuevoLibro() {
            this.accion = 'nuevo';
            this.idLibro = null;
            this.limpiarFormulario();
        },
        limpiarFormulario() {
            this.codigo = "";
            this.titulo = "";
            this.editorial = "";
            this.edicion = "";
            this.idAutor = "";

            // Limpia las clases de validación visual
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        },
        buscarLibro() {
            this.forms.buscarLibro.mostrar = !this.forms.buscarLibro.mostrar;
            this.$emit('buscar', this.actualizarDatos);
        },
        actualizarDatos(libro) {
            if (libro) {
                this.accion = 'modificar';
                this.idLibro = libro.idLibro;
                this.codigo = libro.codigo || "";
                this.titulo = libro.titulo || "";
                this.editorial = libro.editorial || "";
                this.edicion = libro.edicion || "";
                this.idAutor = libro.idAutor || ""; // Asignar el ID del autor
            } else {
                alertify.error("Libro no encontrado");
            }
        },
        modificarLibro(libro) {
            this.accion = 'modificar';
            this.actualizarDatos(libro);
        },
        guardarLibro() {
            let nuevoLibro = {
                codigo: this.codigo,
                titulo: this.titulo,
                editorial: this.editorial,
                edicion: this.edicion,
                idAutor: this.idAutor // Incluir el ID del autor
            };

            // Si estamos modificando, añadimos el id
            if (this.accion === 'modificar' && this.idLibro) {
                nuevoLibro.idLibro = this.idLibro;
            }
            db.libros.put(nuevoLibro); // Guardar en la base de datos
            this.nuevoLibro(); // Limpiar el formulario
        }
    },
    template: `
        <div class="row">
            <div class="container col-12 col-md-8">
                <form id="frmLibro" name="frmLibro" @submit.prevent="guardarLibro">
                    <div class="card border-dark mb-3 bg-dark">
                        <div class="card-header text-white">Registro de Libros</div>
                        <div class="card-body bg-light">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required pattern="[A-Za-z]{4}[0-9]{6}" v-model="codigo" type="text" 
                                    name="txtCodigoLibro" id="txtCodigoLibro" class="form-control" 
                                    oninput="validarCodigo(this)" onblur="validarCodigo(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">TITULO</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="titulo" type="text" 
                                    name="txtTituloLibro" id="txtTituloLibro" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDITORIAL</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="editorial" type="text" 
                                    name="txtEditorialLibro" id="txtEditorialLibro" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">EDICION</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="edicion" type="text" 
                                    name="txtEdicionLibro" id="txtEdicionLibro" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">ID AUTOR</div>
                                <div class="col-9 col-md-6">
                                    <input required v-model="idAutor" type="text" 
                                    name="txtIdAutor" id="txtIdAutor" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center d-flex justify-content-between">
                             <button type="reset" value="Nuevo" class="btn" @click="nuevoLibro" style="background-color: #f8bf23;">Nuevo</button>
                             <button type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;">Guardar</button>
                             <button type="button" @click="buscarLibro" class="btn btn-info"> Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};

/* Validaciones de formulario de libros */
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