    
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
            
        } else {
            alertify.error("Libro no encontrado");
        }
    },
    modificarLibro(libro) {
        this.accion = 'modificar';
        this.actualizarDatos(libro);
    },
    guardarLibro() {
        let libro = {
            codigo: this.codigo,
            titulo: this.titulo,
            editorial: this.editorial,
            edicion: this.edicion,
        
        };

        // Si estamos modificando, añadimos el id
        if (this.accion === 'modificar' && this.idLibro) {
            libro.idLibro = this.idLibro;
        }
        db.libros.put(libro);
        this.nuevoLibro();
    },
        

    },
    template: `
<div class="row">
    <div class="container col-12 col-md-8">
        <form id="frmLibro" name="frmLibro" @submit.prevent="guardarLibro">
            <div class="card border-dark mb-3 bg-dark">
                <div class="card-header text-white">Registro de Libros</div>
                <div class="card-body bg-light">
                    <div class="row p-1">
                        <div class="col-3 col-md-2">CODIGO/ISBN</div>
                        <div class="col-9 col-md-4">
                            <input required pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{1}" v-model="codigo" type="text" 
                            name="txtCodigoLibro" id="txtCodigoLibro" class="form-control" 
                            oninput="validarCodigo(this)" onblur="validarCodigo(this, true)">
                        </div>
                    </div>

                    <div class="row p-1">
                        <div class="col-3 col-md-2">TITULO</div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zñÑáéíóú ]{5,150}" v-model="titulo" type="text" 
                            name="txtTituloLibro" id="txtTituloLibro" class="form-control"
                            oninput="validarTitulo(this)" onblur="validarTitulo(this, true)">
                        </div>
                    </div>
                    
                    <div class="row p-1">
                        <div class="col-3 col-md-2">EDITORIAL</div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zñÑáéíóú ]{5,150}" v-model="editorial" type="text" 
                            name="txtEditorialLibro" id="txtEditorialLibro" class="form-control"
                            oninput="validarEditorial(this)" onblur="validarEditorial(this, true)">
                        </div>
                    </div>

                    <div class="row p-1">
                        <div class="col-3 col-md-2">EDICIÓN</div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zñÑáéíóú ]{5,150}" v-model="editorial" type="text" 
                            name="txtEditorialLibro" id="txtEditorialLibro" class="form-control"
                            oninput="validarEditorial(this)" onblur="validarEditorial(this, true)">
                        </div>
                    </div>

                </div>
                <div class="card-footer text-center d-flex justify-content-between">
                     <button type="reset" value="Nuevo" class="btn"  @click="nuevoLibro"  style="background-color: #f8bf23;">Nuevo</button>
                     <button type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;">Guardar</button>
                     <button type="button" @click="buscarLibro" class="btn btn-info"> Buscar</button>
                </div>

            </div>
        </form>
    </div>
</div>
`
};


function validarCodigo(input, mostrarAlerta = false) {
    const codigo = input.value.trim();
    const regexCodigo = /^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{1}$/; 

    if(regexCodigo.test(codigo)){        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');    
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(codigo===''){
                alertify.error('El codigo no puede estar vacio');
            } else if(!regexCodigo.test(codigo)){
                alertify.warning('El codigo debe tener el siguiente formato 978-950-563-656-3');
                input.value = codigo.replace(/[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{1}/g, '');
                return false;
            }
        }
    }
}

function validarTitulo(input, mostrarAlerta = false) {
    const titulo = input.value.trim();
    const regexTitulo = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexTitulo.test(titulo)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (titulo === '') {
                alertify.error('El titulo no puede estar vacío');
            } else {
                alertify.warning('El titulo debe tener al menos 3 letras');
            }
        }
    }
    
}