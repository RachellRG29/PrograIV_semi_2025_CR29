    
 const materia = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            materias: [],
            idMateria: '',
            codigo: '',
            nombre: '',
            uv: '',
        }
    },
    methods: {
        buscarMateria() {
            this.forms.buscarMateria.mostrar = !this.forms.buscarMateria.mostrar;
            this.$emit('buscar');
        },
        modificarMateria(materia) {
            this.accion = 'modificar';
            this.idMateria = materia.idMateria;
            this.codigo = materia.codigo;
            this.nombre = materia.nombre;
            this.uv = materia.uv;
        },
        guardarMateria() {
            let materia = {
                codigo: this.codigo,
                nombre: this.nombre,
                uv: this.uv
            };
            if (this.accion == 'modificar') {
                materia.idMateria = this.idMateria;
            }
            db.materias.put(materia);
            this.nuevoMateria();
            this.listarMaterias();
        },
        nuevoMateria() {
            this.accion = 'nuevo';
            this.idMateria = '';
            this.codigo = '';
            this.nombre = '';
            this.uv = '';
        }
    },
    template: `
           <div class="row justify-content-center">
            <div class="col-md-6">

            
                <form id="frmMateria" name="frmMateria" @submit.prevent="guardarMateria">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Materias</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="codigo" type="text" name="txtCodigoMateria" id="txtCodigoMateria" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" name="txtNombreMateria" id="txtNombreMateria" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">UV</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="uv" type="text" name="txtUVMateria" id="txtUVMateria" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-dark text-center">
                 <input type="submit" value="Guardar" class="btn btn-primary mx-4"> 
                <input type="reset" value="Nuevo" class="btn btn-warning mx-4">
                <input type="button" @click="buscarMateria" value="Buscar" class="btn btn-info mx-4">
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

document.addEventListener("DOMContentLoaded", function() {
    const codigoInput = document.getElementById("txtCodigoMateria");
    const nombreInput = document.getElementById("txtNombreMateria");
    const uvInput = document.getElementById("txtUVMateria");

    codigoInput.addEventListener("input", function() { validarCodigo(codigoInput, false); });
    codigoInput.addEventListener("blur", function() { validarCodigo(codigoInput, true); });

    nombreInput.addEventListener("input", function() { validarNombre(nombreInput, false); });
    nombreInput.addEventListener("blur", function() { validarNombre(nombreInput, true); });

    uvInput.addEventListener("input", function() { validarUV(uvInput, false); });
    uvInput.addEventListener("blur", function() { validarUV(uvInput, true); });
});

