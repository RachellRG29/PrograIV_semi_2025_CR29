/*Corregir los distritos 
Mejorar la busqueda, cajas de texto(opciones o button, fechas de nacimiento con calendario) busqueda interactiva
Agregar eventos js v-on(.stop, .prevent, .capture, .once, .passive, .self, ect)
Modificadores de taclas, keyup, keydown ect
keyup.enter o .13
clases estilos, arreglos(arrays), objetos
estilos(v-bind=style), v-for, v-if, v-else, v-else-if

*/

const { createApp } = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            codigo: '',
            nombre: '',
            email: '',
            direccion: '',
            municipio: '',
            distrito: '',
            telefono: '',
            fechanacimiento: '',
            sexo: '',
            distritoSeleccionado: '',
            municipioSeleccionado: '',
            municipios: {
                "Distrito Central": ["San Salvador", "Soyapango", "Mejicanos", "Apopa"],
                "Distrito Occidental": ["Santa Ana", "Ahuachapán", "Chalchuapa", "Metapán"],
                "Distrito Oriental": ["San Miguel", "Usulután", "La Unión", "Jiquilisco"],
                "Distrito Paracentral": ["San Vicente", "Cojutepeque", "Zacatecoluca", "Ilobasco"]
            },
            municipiosFiltrados: [],
            busquedadeAlumno: ''
        };
    },
    methods: {
        busquedaAlumno() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                let alumno = JSON.parse(valor);
                
                if (alumno.nombre.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.codigo.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.email.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.direccion.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.municipio.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.distrito.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.telefono.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.fechanacimiento.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.sexo.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                ) {
                    this.alumnos.push(alumno);
                }
            }
        },
        filtrarMunicipios() {
            this.municipiosFiltrados = this.municipios[this.distritoSeleccionado] || [];
            this.municipioSeleccionado = '';
        },
        eliminarAlumno(alumno) {
            if (confirm(`¿Está seguro de eliminar al alumno ${alumno.nombre}?`)) {
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
            }
        },
        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.email = alumno.email;
            this.direccion = alumno.direccion;
            this.municipio = alumno.municipio;
            this.distrito = alumno.distrito;
            this.telefono = alumno.telefono;
            this.fechanacimiento = alumno.fechanacimiento;
            this.sexo = alumno.sexo;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                email: this.email,
                direccion: this.direccion,
                municipio: this.municipioSeleccionado, // Asignamos municipio seleccionado
                distrito: this.distritoSeleccionado, // Asignamos distrito seleccionado
                telefono: this.telefono,
                fechanacimiento: this.fechanacimiento,
                sexo: this.sexo
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


function validarCodigo(input, mostrarAlerta = false) {
    const codigo = input.value.trim();
    const regexCodigo = /^[A-Za-z]{4}\d{6}$/; // Formato ABCD123456

    if (regexCodigo.test(codigo)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (codigo === '') {
                alertify.error('El codigo no puede estar vacío');
            } else {
                alertify.warning('El codigo debe tener el siguiente formato ABCD123456');
            }
        }
    }
}

function validarNombre(input, mostrarAlerta = false) {
    const nombre = input.value.trim();
    const regexNombre = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexNombre.test(nombre)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (nombre === '') {
                alertify.error('El nombre no puede estar vacío');
            } else {
                alertify.warning('El nombre debe tener al menos 3 letras');
            }
        }
    }
    
}

function validarEmail(input, mostrarAlerta = false) {
    const email = input.value.trim();
    const regexEmail = /^[a-zA-Z0-9._-]+@(ugb\.edu\.sv|gmail\.com)$/;

    if (regexEmail.test(email)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if (mostrarAlerta) {
            if (email === '') {
                alertify.error('El email no puede estar vacío');
            } else {
                alertify.warning('El email debe ser institucional (@ugb.edu.sv) o de Gmail (@gmail.com)');
            }
        }
    }
}

function validarDireccion(input) {
    const direccion = input.value.trim();
    const regexDireccion = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\/\-,.#\s]+$/;

    if(regexDireccion.test(direccion)){
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(direccion === ''){
                alertify.error('La direccion no puede estar vacia');
            } else {
                alertify.warning('La direccion debe tener al menos 3 letras');
            }
        }
    }
}

function validarTelefono(input){
    const telefono = input.value.trim();
    const regexTelefono = /^[0-9]{4}-[0-9]{4}$/;

    if(regexTelefono.test(telefono)){        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');    
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(telefono===''){
                alertify.error('El telefono no puede estar vacio');
            } else if(!regexTelefono.test(telefono)){
                alertify.warning('El telefono debe tener el siguiente formato 0000-0000');
                input.value = telefono.replace(/[^0-9]{4}-[0-9]{4}/g, '');
                return false;
            }
        }
    }

}



/*const {createApp} = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            codigo: '',
            nombre: '',
            email: '',
            direccion: '',
            municipio: '',
            departamento: '',
            distrito: '',
            telefono: '',
            fechanacimiento: '',
            sexo: ''   
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
                    || alumno.codigo.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.email.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.direccion.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.municipio.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.departamento.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.distrito.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.telefono.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.fechanacimiento.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    || alumno.sexo.toLowerCase().includes(this.busquedadeAlumno.toLowerCase())
                    
                ) {
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
            this.email = alumno.email;
            this.direccion = alumno.direccion;
            this.municipio = alumno.municipio;
            this.departamento = alumno.departamento;
            this.distrito = alumno.distrito;
            this.telefono = alumno.telefono;
            this.fechanacimiento = alumno.fechanacimiento;
            this.sexo = alumno.sexo;   
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                email: this.email,
                direccion: this.direccion,
                municipio: this.municipio,
                departamento: this.departamento,
                distrito: this.distrito,
                telefono: this.telefono,
                fechanacimiento: this.fechanacimiento,
                sexo: this.sexo   
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
        },
        
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');



function validarCodigo(input, mostrarAlerta = false) {
    const codigo = input.value.trim();
    const regexCodigo = /^[A-Za-z]{4}\d{6}$/; // Formato ABCD123456

    if (regexCodigo.test(codigo)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (codigo === '') {
                alertify.error('El codigo no puede estar vacío');
            } else {
                alertify.warning('El codigo debe tener el siguiente formato ABCD123456');
            }
        }
    }
}

function validarNombre(input, mostrarAlerta = false) {
    const nombre = input.value.trim();
    const regexNombre = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if (regexNombre.test(nombre)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        if (mostrarAlerta) {
            if (nombre === '') {
                alertify.error('El nombre no puede estar vacío');
            } else {
                alertify.warning('El nombre debe tener al menos 3 letras');
            }
        }
    }
    
}

function validarEmail(input, mostrarAlerta = false) {
    const email = input.value.trim();
    const regexEmail = /^[a-zA-Z0-9._-]+@(ugb\.edu\.sv|gmail\.com)$/;

    if (regexEmail.test(email)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if (mostrarAlerta) {
            if (email === '') {
                alertify.error('El email no puede estar vacío');
            } else {
                alertify.warning('El email debe ser institucional (@ugb.edu.sv) o de Gmail (@gmail.com)');
            }
        }
    }
}

function validarDireccion(input) {
    const direccion = input.value.trim();
    const regexDireccion = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\/\-,.#\s]+$/;

    if(regexDireccion.test(direccion)){
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(direccion === ''){
                alertify.error('La direccion no puede estar vacia');
            } else {
                alertify.warning('La direccion debe tener al menos 3 letras');
            }
        }
    }
}

function validarTelefono(input){
    const telefono = input.value.trim();
    const regexTelefono = /^[0-9]{4}-[0-9]{4}$/;

    if(regexTelefono.test(telefono)){        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');    
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if(mostrarAlerta){
            if(telefono===''){
                alertify.error('El telefono no puede estar vacio');
            } else if(!regexTelefono.test(telefono)){
                alertify.warning('El telefono debe tener el siguiente formato 0000-0000');
                input.value = telefono.replace(/[^0-9]{4}-[0-9]{4}/g, '');
                return false;
            }
        }
    }

}*/



/* Validaciones con alerta normal*/
/*function validarCodigo(input) {
    const codigo = input.value.trim();
    const regexCodigo = /^[A-Za-z]{4}\d{6}$/; //Formato ABCD123456

    if(codigo === ''){
        alert('El codigo no puede estar vacio');
        return false;
    } else if(codigo.length > 10 || !regexCodigo.test(codigo)){
        alert('El codigo debe tener el formato ABCD123456');
        input.value = codigo.slice(0, 10);
        return false;
    } 
    return true;
    
}

function validarNombre(input){
    const nombre = input.value.trim();
    const regexNombre = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,150}$/;

    if(nombre === ''){
        alert('El nombre no puede estar vacio');
        return false;    
    } else if(!regexNombre.test(nombre)){
        alert('El nombre debe tener al menos 3 letras');     
        input.value = nombre.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g, '');
        return false;
    }
    return true;

}

function validarEmail(input) {
    const email = input.value.trim();
    const regexEmail = /^[a-zA-Z0-9._-]+@(ugb\.edu\.sv|gmail\.com)$/;

    if (email === '') {
        alert('El email no puede estar vacío');
        return false;
    } else if (!regexEmail.test(email)) {
        alert('El email debe ser institucional (@ugb.edu.sv) o de Gmail (@gmail.com)');
        input.value = '';
        return false;
    }
    return true;
}

function validarDireccion(input) {
    const direccion = input.value.trim();
    const regexDireccion = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9\/\-,.#\s]+$/;

    if (direccion === '') {
        alert('La dirección no puede estar vacía');
        return false;
    } else if (!regexDireccion.test(direccion)) {
        alert('La dirección contiene caracteres inválidos');
        return false;
    }
    return true;
}

function validarTelefono(input){
    const telefono = input.value.trim();
    const regexTelefono = /^[0-9]{4}-[0-9]{4}$/;

    if(telefono===''){  
        alert('El telefono no puede estar vacio');
        return false;    
    } else if(!regexTelefono.test(telefono)){
        alert('El telefono debe tener el siguiente formato 0000-0000');
        input.value = telefono.replace(/[^0-9]{4}-[0-9]{4}/g, '');
        return false;
    }
    return true;
}
   
*/