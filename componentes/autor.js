const autor = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            autores: [],
            idAutor: '',
            codigo: '',
            nombre: '',
            pais: '',
            telefono: '',
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
                telefono: this.telefono,
            };
            if (this.accion == 'modificar') {
                autor.idAutor = this.idAutor;
            }
            db.autores.put(autor);
            this.nuevoAutor();
            this.listarAutores();
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
                                <div class="col-9 col-md-8">
                                    <input required v-model="telefono" type="text" name="txtTelefonoAutor" id="txtTelefonoAutor" class="form-control">
                        </div>
                        <div class="card-footer bg-dark text-center">
                 <input type="submit" value="Guardar" class="btn btn-primary mx-4"> 
                <input type="reset" value="Nuevo" class="btn btn-warning mx-4">
                <input type="button" @click="buscarAutor" value="Buscar" class="btn btn-info mx-4">
                        </div>

                    </div>
                </form>
            </div>
        </div>
    `
};


/* validaciones del formulario autores */
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

function validarPais(input, mostrarAlerta = false) {
    const pais = input.value.trim();
    const regexPais = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexPais.test(pais)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (pasi === '') {
                alertify.error('El pais no puede estar vacío');
            } else {
                alertify.warning('El pais debe tener al menos 3 letras');
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
document.addEventListener("DOMContentLoaded", function() {
    const codigoInput = document.getElementById("txtCodigoAutor");
    const nombreInput = document.getElementById("txtNombreAutor");
    const paisInput = document.getElementById("txtPaisAutor");
    const telefonoInput = document.getElementById("txtTelefonoAutor");

    codigoInput.addEventListener("input", function() { validarCodigo(codigoInput, false); });
    codigoInput.addEventListener("blur", function() { validarCodigo(codigoInput, true); });

    nombreInput.addEventListener("input", function() { validarNombre(nombreInput, false); });
    nombreInput.addEventListener("blur", function() { validarNombre(nombreInput, true); });

    paisInput.addEventListener("input", function() { validarPais(uvInput, false); });
    paisInput.addEventListener("blur", function() { validarPais(uvInput, true); });

    telefonoInput.addEventListener("input", function() { validarTelefono(telefonoInput, false); });
    telefonoInput.addEventListener("blur", function() { validarTelefono(telefonoInput, true); });
});