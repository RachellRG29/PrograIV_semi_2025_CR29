
<template>
    <div class="container mt-4 p-4 rounded shadow-sm bg-white">
      <h2 class="mb-4 text-center">Registro de Alumnos</h2>
  
      <form @submit.prevent="guardarAlumno">
        <div class="row g-3">
          <!-- Columna izquierda -->
          <div class="col-md-6">
            <label class="form-label">Código:</label>
            <input type="text" v-model="form.codigo" class="form-control" required />
  
            <label class="form-label mt-3">Nombre:</label>
            <input type="text" v-model="form.nombre" class="form-control" required />
  
            <label class="form-label mt-3">Email:</label>
            <input type="email" v-model="form.email" class="form-control" required />
  
            <label class="form-label mt-3">Fecha de Nacimiento:</label>
            <input type="date" v-model="form.fechanacimiento" class="form-control" required />
  
            <label class="form-label mt-3">Sexo:</label>
            <select v-model="form.sexo" class="form-select" required>
              <option disabled value="">Seleccione</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>
  
          <!-- Columna derecha -->
          <div class="col-md-6">
            <label class="form-label">Teléfono:</label>
            <input type="text" v-model="form.telefono" class="form-control" required />
  
            <label class="form-label mt-3">Dirección:</label>
            <input type="text" v-model="form.direccion" class="form-control" required />
  
            <label class="form-label mt-3">Departamento:</label>
            <select v-model="departamentoSeleccionado" class="form-select" required>
              <option disabled value="">Seleccione</option>
              <option v-for="(d, index) in Object.keys(municipios)" :key="index" :value="d">
                {{ d.replace(/_/g, ' ') }}
              </option>
            </select>
  
            <label class="form-label mt-3">Distrito:</label>
            <select v-model="form.distrito" class="form-select" required :disabled="!departamentoSeleccionado">
              <option disabled value="">Seleccione</option>
              <option
                v-for="distrito in Object.keys(municipios[departamentoSeleccionado] || {})"
                :key="distrito"
                :value="distrito"
              >
                {{ distrito.replace(/_/g, ' ') }}
              </option>
            </select>
  
            <label class="form-label mt-3">Municipio:</label>
            <select
              v-model="municipioSeleccionado"
              class="form-select"
              required
              :disabled="!form.distrito"
            >
              <option disabled value="">Seleccione</option>
              <option
                v-for="muni in municipios[departamentoSeleccionado]?.[form.distrito] || []"
                :key="muni"
                :value="muni"
              >
                {{ muni }}
              </option>
            </select>
          </div>
        </div>
  
        <!-- Footer del formulario -->
        <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <button type="button" class="btn btn-warning" @click="resetFormulario">Limpiar Formulario</button>
          <button type="submit" class="btn btn-primary">Guardar Alumno</button>
          <button type="button" class="btn btn-secondary" @click="buscarAlumno">Buscar Alumno</button>
        </div>
      </form>

       <!-- Formulario de búsqueda (mini formulario) -->
        <div v-if="mostrarBusqueda" class="mt-4">
            <BusquedaAlumnos @modificar="modificarAlumno" />
        </div>
  
      <div v-if="mensaje" class="alert alert-success mt-4">
        {{ mensaje }}
      </div>
    </div>
  </template>
  
  
  <script>
    import axios from 'axios';
    import BusquedaAlumnos from './busqueda_alumnos.vue'; 
    
    export default {
        components: {
            BusquedaAlumnos  
        },
        data() {
        return {
            mostrarBusqueda: false, 
            form: {
            idAlumno: null,
            codigo: '',
            nombre: '',
            email: '',
            direccion: '',
            departamento: '',
            municipio: '',
            distrito: '',
            telefono: '',
            fechanacimiento: '',
            sexo: ''
            },
            mensaje: '',
            departamentoSeleccionado: '',
            municipioSeleccionado: '',
            municipios: {
            Ahuachapan: {
                norte: ["Atiquizaya", "El Refugio", "San Lorenzo", "Turín"],
                centro: ["Ahuachapán", "Apaneca", "Concepción de Ataco", "Tacuba"],
                sur: ["Guaymango", "Jujutla", "San Francisco Menéndez", "San Pedro Puxtla"]
            },
            San_Salvador: {
                norte: ["Aguilares", "El Paisnal", "Guazapa"],
                oeste: ["Apopa", "Nejapa"],
                este: ["Ilopango", "San Martin", "Soyapango", "Tonacatepeque"],
                centro: ["Ayuxtepeque", "Mejicanos", "San Salvador", "Cuscatancingo", "Ciudad Delgado"],
                sur: ["Panchimalco", "Rosario de Mora", "San Marcos", "San Tomás", "Santiago Texacuangos"]
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
            
            }
        };
        },
        watch: {
        departamentoSeleccionado(newVal) {
            this.form.departamento = newVal;
            this.municipioSeleccionado = '';
            this.form.municipio = '';
            this.form.distrito = '';
        },
        municipioSeleccionado(newVal) {
            this.form.municipio = newVal;
            this.form.distrito = '';

                if (this.departamentoSeleccionado && newVal) {
                    const distritos = this.municipios[this.departamentoSeleccionado];
                    for (const [distrito, lista] of Object.entries(distritos)) {
                    if (lista.includes(newVal)) {
                        this.form.distrito = distrito;
                        break;
                    }
                    }
                }
            }
        },
        methods: {
            guardarAlumno() {
                if (this.form.idAlumno) {
                    // Si existe ID, es una actualización
                    axios.put(`/alumnos/${this.form.idAlumno}`, this.form)
                        .then(response => {
                            alertify.success(response.data.mensaje || 'Alumno actualizado con éxito');
                            this.mensaje = response.data.mensaje || 'Alumno actualizado con éxito';
                            this.resetFormulario();
                        })
                        .catch(error => {
                            alertify.error('Error al actualizar el alumno');
                            console.error(error.response?.data || error);
                        });
                } else {
                    // Si no hay ID, es un nuevo registro
                    axios.post('/alumnos', this.form)
                        .then(response => {
                            alertify.success(response.data.mensaje || 'Alumno guardado con éxito');
                            this.mensaje = response.data.mensaje || 'Alumno guardado con éxito';
                            this.resetFormulario();
                        })
                        .catch(error => {
                            alertify.error('Error al guardar el alumno');
                            console.error(error.response?.data || error);
                        });
                }
            },

        resetFormulario() {
            this.form = {
                idAlumno: null,
                codigo: '',
                nombre: '',
                email: '',
                direccion: '',
                departamento: '',
                municipio: '',
                distrito: '',
                telefono: '',
                fechanacimiento: '',
                sexo: ''
            };
            this.departamentoSeleccionado = '';
            this.municipioSeleccionado = '';
        },
            modificarAlumno(alumno) {
                this.form = { ...alumno };
                this.departamentoSeleccionado = alumno.departamento;
                this.municipioSeleccionado = alumno.municipio;
                this.mostrarBusqueda = false; 
            },

            buscarAlumno() {
                //alertify.message('Funcionalidad de búsqueda aún no implementada.');
                this.mostrarBusqueda = true;
            }
        },
        computed: {
        distritosDisponibles() {
            const mapa = this.municipios[this.departamentoSeleccionado] || {};
            return Object.entries(mapa)
            .filter(([_, lista]) => lista.includes(this.municipioSeleccionado))
            .map(([distrito]) => distrito);
        }
    }
}
  </script>
  