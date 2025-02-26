const { createApp, ref } = Vue;
const Dexie = window.Dexie;
const db = new Dexie('db_codigo_estudiantes');

const app = createApp({
    components: {
        autor,
        libro, 
        buscarautor,
        buscarlibro
    },
    data() {
        return {
            forms: {
                autor: { mostrar: false },
                libro: { mostrar: false }, 
                buscarAutor: { mostrar: false },
                buscarLibro: { mostrar: false },
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
            autores: '++idAutor, codigo, nombre, pais, telefono',
            libros: '++idLibro, idAutor, codigo, titulo, editorial, edicion'
        });
    }
});

app.mount('#app');