/*Corregir los distritos 
Mejorar la busqueda, cajas de texto(opciones o button, fechas de nacimiento con calendario) busqueda interactiva
Agregar eventos js v-on(.stop, .prevent, .capture, .once, .passive, .self, ect)
Modificadores de taclas, keyup, keydown ect
keyup.enter o .13
clases estilos, arreglos(arrays), objetos
estilos(v-bind=style), v-for, v-if, v-else, v-else-if

*/

const {createApp} = Vue;
const Dexie = window.Dexie,
    db = new Dexie('db_academico');

createApp({
    components: {
        alumno,
        materia,
    },
    data() {
        return {
            forms : {
                alumno: {mostrar: false},
                materia: {mostrar: false},
                matricula: {mostrar: false},
            },
        };
    },
    methods: {
        abrirFormulario(componente) {
            this.forms[componente].mostrar = !this.forms[componente].mostrar;
        }
    },
    created() {
        db.version(1).stores({
            alumnos: '++idAlumno, codigo, nombre, direccion, telefono, email',
            materias: '++idMateria, codigo, nombre, uv',
        });
    }
}).mount('#app');