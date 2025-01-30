const {createApp} = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: ''
        }
    },
    methods: {
        busquedaAlumno() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                let alumno = JSON.parse(valor);
                if (alumno.nombre.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.direccion.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.telefono.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.email.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())) {
                    this.alumnos.push(alumno);
                }
            }
            
        },
        eliminarAlumno(alumno) {
            if (confirm(`¿Esta seguro de eliminar el alumno ${alumno.nombre}?`)){ 
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
            }
        },
        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                email: this.email
            };
            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');