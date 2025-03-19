const {createApp, ref} = Vue;
const {v4: uuidv4} = uuid;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

const app = createApp({
    components: {
        alumno,
        materia,
        buscaralumno,
        buscarmateria,
        docente,
        buscardocente,
        matricula
        
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                buscarAlumno: {mostrar: false},
                materia: {mostrar: false},
                buscarMateria: {mostrar: false},
                docente: {mostrar: false},
                buscarDocente: {mostrar: false},
                matricula: {mostrar: false},
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
        },
        matricularAlumno(idAlumno) {
            let datos = new FormData();
            datos.append('accion', 'nuevo');
            datos.append('idAlumno', idAlumno);
    
            fetch('backend/matricula.php', {
                method: 'POST',
                body: datos
            })
            .then(response => response.json())
            .then(data => {
                alertify.success("Alumno matriculado exitosamente");
            })
            .catch(error => {
                alertify.error("Error al matricular al alumno");
            });
        }
    },
    created() {
        db.version(1).stores({
            alumnos: 'codigo_transaccion, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo',
            materias: '++idMateria, codigo, nombre, uv',
            matriculas: '++idMatricula, idAlumno, codigo, nombre, email, direccion,  telefono, fechanacimiento, sexo',
            docentes: 'codigo_transaccion, codigo, nombre, direccion, telefono, email, fechanacimiento, sexo'
        });
    }
});
app.mount('#app');
