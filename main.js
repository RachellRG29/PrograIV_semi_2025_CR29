const { createApp, ref } = Vue;
const Dexie = window.Dexie;
const db = new Dexie('db_academico');

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
        };
    },
    methods: {
        buscar(form, metodo) {
            if (this.$refs[form]) {
                this.$refs[form][metodo]();
            }
        },
        abrirFormulario(componente) {
            
            Object.keys(this.forms).forEach(key => {
                this.forms[key].mostrar = false;
            });
        
            this.forms[componente].mostrar = true;
        },
        modificar(form, metodo, datos) {
            if (this.$refs[form]) {
                this.$refs[form][metodo](datos);
            }
        }
    },
    created() {
        db.version(1).stores({
            alumnos: '++idAlumno, codigo, nombre, email, direccion, departamento, municipio, distrito, telefono, fechanacimiento, sexo',
            docentes: '++idDocente, codigo, nombre, email, direccion, departamento, municipio, distrito, telefono, fechanacimiento, sexo', 
            materias: '++idMateria, codigo, nombre, uv',
            matriculas: '++idMatricula, idAlumno, codigo, nombre, email, direccion, departamento, municipio, distrito, telefono, fechanacimiento, sexo',

        });
    }
});

app.mount('#app');
