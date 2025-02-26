const { createApp, ref } = Vue;
const Dexie = window.Dexie;
const db = new Dexie('db_codigo_estudiante');

const app = createApp({
    components: {
        autor,
        libros, 
        buscarautor,
        buscarlibros,

    },
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                libros: { mostrar: false }, 
                buscarAutor: { mostrar: false },
                buscarLibros: { mostrar: false },
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
           // alumnos: '++idAlumno, codigo, nombre, email, direccion, departamento, municipio, distrito, telefono, fechanacimiento, sexo',
           // docentes: '++idDocente, codigo, nombre, email, direccion, departamento, municipio, distrito, telefono, fechanacimiento, sexo', 
           

        });
    }
});

app.mount('#app');