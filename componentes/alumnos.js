    
 const alumno = {
    props: ['forms'],
    data() {
        return {
            accion: 'nuevo',
            idAlumno: '',
            codigo: '',
            nombre: '',
            email: '',
            direccion: '',
            telefono: '',
            fechanacimiento: '',
            sexo: '',
            // Datos de los municipios por departamento
            departamentoSeleccionado: '',
            municipioSeleccionado: '',
            distritoSeleccionado: '',
            municipios: {
                dep_ahuachapan: {
                    norte: ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín"],
                    centro: ["Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba"],
                    sur: ["Guaymango", "Jujutla", "San Francisco Menéndez", "San Pedro Puxtla"]
                },
                dep_sanSalvador: {
                    norte: ["Aguilares", "El Paisnal", "Guazapa"],
                    oeste: ["Apopa", "Nejapa"],
                    este: ["Ilopango" , "San Martin", "Soyapango", "Tonacatepeque"],
                    centro: ["Ayuxtepeque", "Mejicanos", "San Salvador", "Cuscatancingo","Ciudad Delgado"],
                    sur: ["Panchilmalco", "Rosario de Mora", "San Marcos", "San Tomás", "Santiago Texacuangos"]
                },
                dep_laLibertad:{
                    norte: ["Quezaltepeque", "san Matías", "San Pablo Tacachico"],
                    centro: ["San Juan Opico", "Ciudad Arce"],
                    oeste: ["Colón", "Jayaque", "Sacacoyo", "Tepecoyo","Talnique"],
                    este: ["Antiguo Cuscatlán", "Huizucar", "Nuevo Cuscatlán", "San José Villanueva", "Zaragoza"],
                    costa: ["Chiltuipán", "Jicalapa", "La Libertad", "Tamanique", "Teotepeque"],
                    sur: ["Comasagua", "Santa Tecla"]

                }, 
                dep_chalatenango:{
                    norte: ["La Palma", "Citalá", "San Ignacio"],
                    centro: ["Nueva Concepción", "Tejutla","La Reina", "Agua Caliente", "Dulce Nombre de María", 
                        "El Paraíso", "San Francisco Morazán", "San Rafael", "Santa Rita", "San Fernando"],
                    sur: ["Chalatenango", "Arcatao", "Azacualpa", "Comalapa", "Concepción Quezaltepeque", "El Carrizal", "La Laguna", 
                        "Las Vueltas", "Nombre de Jesús", "Nueva Trinidad", "Ojos de Agua", "Potonico", 
                        "San Antonio de La Cruz", "San Antonio los Ranchos", "San Francisco Lempa", "San Isidro Labrador", "San José Cascasque",
                        "San Miguel de Mercedes", "San José Las Flores", "San Luis del Carmen"]
                }, 
                dep_cuscatlan:{

                },
                dep_laPaz:{

                }, 
                dep_laUnion:{

                },
                dep_usulutan:{},
                dep_sonsontate:{},
                dep_santaAna:{},
                dep_sanVicente:{},
                dep_sanMiguel:{},
                dep_morazan:{}
    /* https://www.asamblea.gob.sv/node/12806  */

            },


        // Variables para almacenar los municipios y distritos filtrados
        municipiosFiltrados: [],
        distritosFiltrados: []
   
        }
    },
    methods: {
        buscarAlumno() {
            this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
            this.$emit('buscar');
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.idAlumno = alumno.idAlumno;
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.email = alumno.email;
            this.direccion = alumno.direccion;
            this.departamentoSeleccionado = alumno.departamento;
            this.municipioSeleccionado = alumno.municipio;
            this.distritoSeleccionado = alumno.distrito;
            this.telefono = alumno.telefono;
            this.fechanacimiento = alumno.fechanacimiento;
            this.sexo = alumno.sexo;

        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                email: this.email,
                direccion: this.direccion,
                departamento: this.departamentoSeleccionado,
                municipio: this.municipioSeleccionado,
                distrito: this.distritoSeleccionado,
                telefono: this.telefono,
                fechanacimiento: this.fechanacimiento,
                sexo: this.sexo   
            };
            if (this.accion == 'modificar') {
                alumno.idAlumno = this.idAlumno;
            }
            db.alumnos.put(alumno);
            this.nuevoAlumno();
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.idAlumno = '';
            this.codigo = '';
            this.nombre = '';
            this.email = '';
            this.direccion = '';
            this.departamentoSeleccionado = '';
            this.municipioSeleccionado = '';
            this.distritoSeleccionado = '';
            this.telefono = '';
            this.fechanacimiento = '';
            this.sexo = '';
            
        },
        /* Filtrar municipios */
        filtrarMunicipios() {
            // Comprobamos si se ha seleccionado un departamento
            if (this.departamentoSeleccionado) {
                // Filtramos los municipios del departamento seleccionado
                this.municipiosFiltrados = Object.keys(this.municipios[this.departamentoSeleccionado]);
                this.municipioSeleccionado = '';  // Resetear municipio
                this.distritosFiltrados = [];     // Resetear distritos
                this.distritoSeleccionado = '';   // Resetear distrito
            } else {
                this.municipiosFiltrados = [];
                this.distritosFiltrados = [];
            }
        },

        // Filtra los distritos según el municipio seleccionado
        filtrarDistritos() {
            if (this.municipioSeleccionado && this.departamentoSeleccionado) {
                // Filtramos los distritos del municipio seleccionado dentro del departamento
                this.distritosFiltrados = this.municipios[this.departamentoSeleccionado][this.municipioSeleccionado] || [];
            } else {
                this.distritosFiltrados = [];
            }
            this.distritoSeleccionado = '';
        }

    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3 bg-dark">
                        <div class="card-header">Registro de Alumnos</div>
                        <div class="card-body bg-light">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required pattern="[A-Za-z]{4}[0-9]{6}" v-model="codigo" type="text" 
                                    name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control" 
                                    oninput="validarCodigo(this)"  onblur="validarCodigo(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" 
                                    name="txtNombreAlumno" id="txtNombreAlumno" class="form-control"
                                    oninput="validarNombre(this)" onblur="validarNombre(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="email" type="text" 
                                    name="txtEmailAlumno" id="txtEmailAlumno" class="form-control"
                                    oninput="validarEmail(this)" onblur="validarEmail(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="direccion" type="text" 
                                    name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control">
                                </div>
                            </div>
                            

                            <!-- DEPARTAMENTO -->
                            <div class="mb-md-4 row">
                                <div class="col-md-4">
                                    <label class="col-form-label">DEPARTAMENTO</label>
                                    <select required v-model="departamentoSeleccionado" @change="filtrarMunicipios" id="txtDepartamentoAlumno" class="form-control">
                                        <option value="">Seleccione un departamento</option>
                                        <option value="dep_ahuachapan">Ahuachapán</option>
                                        <option value="dep_sanSalvador">San Salvador</option>
                                        <option value="dep_laLibertad">La libertad</option>
                                        <option value="dep_chalatenango">Chalatenango</option>
                                        <option value="dep_cuscatlan">Cuscatlán</option>
                                        <option value="dep_laPaz">La Paz</option>
                                        <option value="dep_laUnion">La Unión</option>
                                        <option value="dep_usulutan">Usulután</option>
                                        <option value="dep_sonsonate">Sonsonate</option>
                                        <option value="dep_santaAna">Santa Ana</option>
                                        <option value="dep_sanVicente">San Vicente</option>
                                        <option value="dep_sanMiguel">San Miguel</option>
                                        <option value="dep_morazan">Morazán</option>
                                        
                                    </select>
                                </div>
                            
                                <!-- MUNICIPIO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">MUNICIPIO</label>
                                    <select required v-model="municipioSeleccionado" @change="filtrarDistritos" id="txtMunicipioAlumno" class="form-control">
                                        <option value="">Seleccione un municipio</option>
                                        <option v-for="municipio in municipiosFiltrados" :key="municipio" :value="municipio">
                                            {{ municipio }}
                                        </option>
                                    </select>
                                </div>

                                <!-- DISTRITO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">DISTRITO</label>
                                    <select required v-model="distritoSeleccionado" id="txtDistritoAlumno" class="form-control">
                                        <option value="">Seleccione un distrito</option>
                                        <option v-for="distrito in distritosFiltrados" :key="distrito" :value="distrito">
                                            {{ distrito }}
                                        </option>
                                    </select>
                                </div>

                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="telefono" type="text" 
                                    name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control">
                                </div>
                            </div>

                            <div class="mb-md-4 row">
                                <!-- FECHA NACIMIENTO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">FECHA NACIMIENTO</label>
                                    <input required v-model="fechanacimiento" type="date" id="txtFechaNacimientoAlumno" 
                                        class="form-control" onblur="validarFechaNacimiento(this)">
                                </div>

                                <!-- SEXO -->
                                <div class="col-md-4">
                                    <label class="col-form-label">SEXO</label>
                                    <select required v-model="sexo" id="txtSexoAlumno" class="form-control">
                                        <option value="">Seleccione una opción</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                        <div class="card-footer text-center d-flex justify-content-between">
                             <button type="reset" value="Nuevo" class="btn" style="background-color: #f8bf23;">Nuevo</button>
                             <button type="submit" value="Guardar" class="btn btn-primary" style="color: #000000;">Guardar</button>
                             <button type="button" @click="buscarAlumno" class="btn btn-info"> Buscar</button>
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