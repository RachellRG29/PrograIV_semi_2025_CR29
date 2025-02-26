    
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
                Ahuachapan: {
                    norte: ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín"],
                    centro: ["Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba"],
                    sur: ["Guaymango", "Jujutla", "San Francisco Menéndez", "San Pedro Puxtla"]
                },
                San_Salvador: {
                    norte: ["Aguilares", "El Paisnal", "Guazapa"],
                    oeste: ["Apopa", "Nejapa"],
                    este: ["Ilopango" , "San Martin", "Soyapango", "Tonacatepeque"],
                    centro: ["Ayuxtepeque", "Mejicanos", "San Salvador", "Cuscatancingo","Ciudad Delgado"],
                    sur: ["Panchilmalco", "Rosario de Mora", "San Marcos", "San Tomás", "Santiago Texacuangos"]
                },
                La_Libertad:{
                    norte: ["Quezaltepeque", "san Matías", "San Pablo Tacachico"],
                    centro: ["San Juan Opico", "Ciudad Arce"],
                    oeste: ["Colón", "Jayaque", "Sacacoyo", "Tepecoyo","Talnique"],
                    este: ["Antiguo Cuscatlán", "Huizucar", "Nuevo Cuscatlán", "San José Villanueva", "Zaragoza"],
                    costa: ["Chiltuipán", "Jicalapa", "La Libertad", "Tamanique", "Teotepeque"],
                    sur: ["Comasagua", "Santa Tecla"]

                }, 
                Chalatenango:{
                    norte: ["La Palma", "Citalá", "San Ignacio"],
                    centro: ["Nueva Concepción", "Tejutla","La Reina", "Agua Caliente", "Dulce Nombre de María", 
                        "El Paraíso", "San Francisco Morazán", "San Rafael", "Santa Rita", "San Fernando"],
                    sur: ["Chalatenango", "Arcatao", "Azacualpa", "Comalapa", "Concepción Quezaltepeque", "El Carrizal", "La Laguna", 
                        "Las Vueltas", "Nombre de Jesús", "Nueva Trinidad", "Ojos de Agua", "Potonico", 
                        "San Antonio de La Cruz", "San Antonio los Ranchos", "San Francisco Lempa", "San Isidro Labrador", "San José Cascasque",
                        "San Miguel de Mercedes", "San José Las Flores", "San Luis del Carmen"]
                }, 
                Cuscatlan:{
                    norte: ["Sushitoto", "San José Guayabal", "Oratorio de Concepción", "San Bartolomé Perulapán", "San Pedro Perulapán"],
                    sur: ["Cojutepeque", "San Rafael Cedros", "Candelaria", "Monte San Juan",
                        "El Carmen", "San Cristobal", "Santa Cruz Michapa", "San Ramón", "El Rosario", "Santa Cruz Analquito", "Tenancingo"]
                },
                Cabañas:{
                    este: ["Sensuntepeque", "Victoria", "Dolores", "Guacotecti","San Isidro"],
                    oeste: ["Ilobasco", "Tejutepeque", "Jutiapa", "Cinquera"]
                },
                La_Paz:{
                    oeste: ["Cuyultitán", "Olocuilta", "San Juan Talpa", "San Luis Talpa", "San Pedro Masahuat","Tahualhuaca","San Francisco Chinameca"],
                    centro: ["El Rosario", "Jerusalén","Mercedes La Ceiba", "Paraiso Osorio", "San Antonio Masahuat", "San Emigdio","San Juan Tepezontes",
                        "San Luis La Herradura","San Miguel Tepezontes","San Pedro Nonualco", "Santa Maria Ostuma", "Santiago Nonualco"],
                    este: ["San Juan Nonualco", "San Rafael Obrajuelo", "Zacatecoluca"]

                }, 
                La_Union:{
                    norte: ["Anamorós", "Bolivar","Concepcion de Oriente","El Sauce",
                        "Lislique","Nueva Esparta","Pasaquina","Polorós",
                        "San José La Fuente","Santa Rosa de Lima"],
                    sur: ["Conchagua","El Carmen","Intipucá","La Unión",
                        "Meanguera del Golfo","San Alejo","Yayantique","Yucuaiqupin"]

                },
                Usulutan:{
                    norte: ["Santiago de María","Alegría","Berlín","Mercedes Umaña","Jucuapa","El Triunfo","Estanzuelas","San Buenaventura","Nueva Granada"],
                    este: ["Usulután","Jucuarán","San Dionisio","Concepción Batres","Santa María","Ozatlán","Tecapán","Santa Elena","California", "Ereguayquín"],
                    oeste: ["Jiquilisco","Puerto El Triunfo","San Agustín","San Francisco Javier"]
                },
                Sonsontate:{
                    norte: ["Juayúa","Nahuizalco","Salcoatitán","Santa Catarina Masuahuat"],
                    centro: ["Sonsonate","Sonzacate","Nahulingo","San Antonio del Monte","Santo Domingo de Guzmán"],
                    este: ["Izalco","Armenia","Caluco","San Julián","Cuisnahuat","Santa Isabel Ishuatán"],
                    oeste: ["Acajutla"],
                },
                Santa_Ana:{
                    norte: ["Masahuat","Metapán","Santa Rosa Guachipilín","Texistepeque"],
                    centro: ["Santa Ana"],
                    este: ["Coatepeque","El Congo"],
                    oeste: ["Candelaria de la Frontera", "Chalhuapa","El Porvenir","San Antonio Pajonal", "San Sebastián Salitrillo","Santiago de la Frontera"]
                },
                San_Vicente:{
                    norte: ["Apastepeque","Santa Clara","San Ildefonso","San Esteban Catarina","San Lorenzo","Santo Domingo"],
                    sur: ["San Vicente", "Guadalupe","Verapaz","Tepetitán","Tecoluca","San Cayateno Istepeque"]
                },
                San_Miguel:{
                    norte: ["Ciudad Barrios","Sesori","Nuevo Eden de San Juan","San Gerardo",
                        "San Luis de la Reina","Carolina","San Antonio del Mosco","Chapeltique"],
                    centro: ["San Miguel","Comacarán","Uluazapa","Moncagua","Quelepa","Chirilagua"],
                    oeste: ["Chinameca","Nueva Guadalupe","Lolotique","San Jorge","San Rafael Oriente","El Tránsito"]
                },
                Morazan:{
                    norte: ["Arambala","Cacaopera","Corinto","El Rosario","Joateca","Jocoatique",
                        "Meanguera","Perquín","San Fernando","San Isidro", "Torola"],
                    sur: ["Chilanga","Delicias de Concepción","El Divisadero","Gualococti",
                        "Guatajiagua","Jocoro","Lolotiquillo","Osicala","San Carlos","San Francisco Gotera",
                        "San Simón","Sensembra","Sociedad","Yamabal","Yoloaiquín"]
                }
            /* https://www.asamblea.gob.sv/node/12806  */

            },


        // Variables para almacenar los municipios y distritos filtrados
        municipiosFiltrados: [],
        distritosFiltrados: []
   
        }
    },
    methods: {
    nuevoAlumno() {
        this.accion = 'nuevo';
        this.idAlumno = null;
        this.limpiarFormulario();
    },
    limpiarFormulario() {
        this.codigo = "";
        this.nombre = "";
        this.email = "";
        this.direccion = "";
        this.departamentoSeleccionado = "";
        this.municipioSeleccionado = "";
        this.distritoSeleccionado = "";
        this.telefono = "";
        this.fechanacimiento = "";
        this.sexo = "";

        this.municipiosFiltrados = [];
        this.distritosFiltrados = [];

        // Limpia las clases de validación visual
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
    },
    buscarAlumno() {
        this.forms.buscarAlumno.mostrar = !this.forms.buscarAlumno.mostrar;
        this.$emit('buscar', this.actualizarDatos);
    },
    actualizarDatos(alumno) {
        if (alumno) {
            this.accion = 'modificar';
            this.idAlumno = alumno.idAlumno;
            this.codigo = alumno.codigo || "";
            this.nombre = alumno.nombre || "";
            this.email = alumno.email || "";
            this.direccion = alumno.direccion || "";
            this.departamentoSeleccionado = alumno.departamento || "";
            this.filtrarMunicipios();
            this.municipioSeleccionado = alumno.municipio || "";
            this.filtrarDistritos();
            this.distritoSeleccionado = alumno.distrito || "";
            this.telefono = alumno.telefono || "";
            this.fechanacimiento = alumno.fechanacimiento || "";
            this.sexo = alumno.sexo || "";
        } else {
            alertify.error("Alumno no encontrado");
        }
    },
    modificarAlumno(alumno) {
        this.accion = 'modificar';
        this.actualizarDatos(alumno);
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
            sexo: this.sexo,
        };

        // Si estamos modificando, añadimos el id
        if (this.accion === 'modificar' && this.idAlumno) {
            alumno.idAlumno = this.idAlumno;
        }
        db.alumnos.put(alumno);
        this.nuevoAlumno();
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
            <div class="container col-12 col-md-8">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3 bg-dark">
                        <div class="card-header text-white">Registro de Alumnos</div>
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
                                    <input required v-model="email" type="text" 
                                    name="txtEmailAlumno" id="txtEmailAlumno" class="form-control"
                                    oninput="validarEmail(this)" onblur="validarEmail(this, true)">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="direccion" type="text" 
                                    name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control"
                                    oninput="validarDireccion(this)" onblur="validarDireccion(this, true)">
                                </div>
                            </div>
                            

                            <!-- DEPARTAMENTO -->
                            <div class="mb-md-4 row">
                                <div class="col-md-4">
                                    <label class="col-form-label">DEPARTAMENTO</label>
                                    <select required v-model="departamentoSeleccionado" @change="filtrarMunicipios" id="txtDepartamentoAlumno" class="form-control">
                                        <option value="">Seleccione un departamento</option>
                                        <option value="Ahuachapan">Ahuachapán</option>
                                        <option value="San_Salvador">San Salvador</option>
                                        <option value="la_Libertad">La libertad</option>
                                        <option value="Chalatenango">Chalatenango</option>
                                        <option value="Cuscatlan">Cuscatlán</option>
                                        <option value="La_Paz">La Paz</option>
                                        <option value="La_Union">La Unión</option>
                                        <option value="Usulutan">Usulután</option>
                                        <option value="Sonsonate">Sonsonate</option>
                                        <option value="Santa_Ana">Santa Ana</option>
                                        <option value="San_Vicente">San Vicente</option>
                                        <option value="San_Miguel">San Miguel</option>
                                        <option value="Morazan">Morazán</option>
                                        
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
                                    <input required pattern="[0-9]{4}-[0-9]{4}" v-model="telefono" type="text"
                                        name="txtTelefonoDocente" id="txtTelefonoDocente" class="form-control"
                                        oninput="validarTelefono(this)" onblur="validarTelefono(this, true)"
                                        placeholder="1234-5678">
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
                             <button type="reset" value="Nuevo" class="btn"  @click="nuevoAlumno"  style="background-color: #f8bf23;">Nuevo</button>
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