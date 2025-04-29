import './bootstrap';
import { createApp } from 'vue';
import AlumnoForm from './componentes/AlumnoForm.vue';

const app = createApp({
    data() {
        return {
            componenteActivo: '', // Ningún componente mostrado al inicio
        };
    },
    methods: {
        mostrarComponente(componente) {
            if (this.componenteActivo === componente) {
                // Si ya está abierto, lo cierra
                this.componenteActivo = '';
            } else {
                // Sino, lo muestra
                this.componenteActivo = componente;
            }
        }
    }
});

// Registro global de los componentes que vas usando
app.component('alumno-form', AlumnoForm);

app.mount('#app');
