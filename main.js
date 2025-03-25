const { createApp, ref } = Vue;
const { v4: uuidv4 } = uuid;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

const app = createApp({
    components: {
        alumno,
        docente,
        materia,
        buscaralumno,
        buscardocente,
        buscarmateria,
        matricula
    },
    data() {
        return {
            forms: {
                alumno: { mostrar: false },
                docente: { mostrar: false }, 
                buscarAlumno: { mostrar: false },
                buscarDocente: { mostrar: false },
                materia: { mostrar: false },
                buscarMateria: { mostrar: false },
                matricula: { mostrar: false },
            },
            online: navigator.onLine,
        };
    },
    methods: {
        buscar(form, metodo) {
            this.$refs[form][metodo]();
        },
        abrirFormulario(componente) {
            Object.keys(this.forms).forEach(key => {
                this.forms[key].mostrar = false;
            });
            this.forms[componente].mostrar = true;
        },
        modificar(form, metodo, datos) {
            this.$refs[form][metodo](datos);
        },
        actualizarEstadoConexion() {
            this.online = navigator.onLine;
            if (this.online) {
                alertify.message("Conectado al servidor");
                // Intentar sincronizar todos los componentes
                if (this.$refs.alumno) this.$refs.alumno.sincronizarAlumnos();
                if (this.$refs.matricula) this.$refs.matricula.sincronizarDatos();
            } else {
                alertify.warning("Modo offline - Trabajando localmente");
            }
        }
    },
    created() {
        db.version(3).stores({
            alumnos: 'codigo_transaccion, idAlumno, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, hash, sincronizado',
            docentes: 'codigo_transaccion, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, hash, sincronizado',
            materias: 'codigo_transaccion, codigo, nombre, uv, hash, sincronizado',
            matricula: '++idMatricula, idAlumno, codigo_transaccion, data, hash, sincronizado'
        });
        
        // Escuchar cambios en la conexión
        window.addEventListener('online', this.actualizarEstadoConexion);
        window.addEventListener('offline', this.actualizarEstadoConexion);
        this.actualizarEstadoConexion();
    },
    beforeUnmount() {
        window.removeEventListener('online', this.actualizarEstadoConexion);
        window.removeEventListener('offline', this.actualizarEstadoConexion);
    }
});

app.mount('#app');
