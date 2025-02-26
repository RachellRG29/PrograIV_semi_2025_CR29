const { createApp, ref } = Vue;
const Dexie = window.Dexie;
const db = new Dexie('db_codigo_estudiante');

db.version(1).stores({
    libros: '++idLibro, idAutor, codigo, titulo, editorial, edicion',
    autores: '++idAutor, codigo, nombre, pais, telefono'
});

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
    }
});

app.mount('#app');
