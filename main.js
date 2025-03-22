const {createApp, ref} = Vue;
const {v4: uuidv4} = uuid;
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
            forms : {
                alumno: { mostrar: false },
                docente: { mostrar: false }, 
                buscarAlumno: { mostrar: false },
                buscarDocente: { mostrar: false },
                materia: { mostrar: false },
                buscarMateria: { mostrar: false },
                matricula: { mostrar: false },
            },
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
        }
    
    },
    created() {
        db.version(1).stores({
            alumnos: 'codigo_transaccion, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, hash', /*no poner idAlumno */
            docentes:'codigo_transaccion, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo, hash',
            materias: 'codigo_transaccion, codigo, nombre, uv, hash',
            matricula: '++idMatricula, idAlumno, codigo_transaccion, data, hash'

        });
    }
});
app.mount('#app');