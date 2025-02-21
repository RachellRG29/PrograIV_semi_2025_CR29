    
 const alumno = {
    data() {
        return {
            accion: 'nuevo',
            alumnos: [],
            idAlumno: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: ''
        }
    },
    methods: {
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.idAlumno = alumno.idAlumno;
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
            if (this.accion == 'modificar') {
                alumno.idAlumno = this.idAlumno;
            }
            db.alumnos.put(alumno);
            this.nuevoAlumno();
            this.listarAlumnos();
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.idAlumno = '';
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.telefono = '';
            this.email = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAlumno" name="frmAlumno" @submit.prevent="guardarAlumno">
                    <div class="card border-dark mb-3">
                        <div class="card-header bg-dark text-white">Registro de Alumnos</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">CODIGO</div>
                                <div class="col-9 col-md-4">
                                    <input required v-model="codigo" type="text" name="txtCodigoAlumno" id="txtCodigoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">NOMBRE</div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zñÑáéíóú ]{3,150}" v-model="nombre" type="text" name="txtNombreAlumno" id="txtNombreAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">DIRECCION</div>
                                <div class="col-9 col-md-8">
                                    <input required v-model="direccion" type="text" name="txtDireccionAlumno" id="txtDireccionAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">TELEFONO</div>
                                <div class="col-9 col-md-4">
                                    <input v-model="telefono" type="text" name="txtTelefonoAlumno" id="txtTelefonoAlumno" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">EMAIL</div>
                                <div class="col-9 col-md-6">
                                    <input v-model="email" type="text" name="txtEmailAlumno" id="txtEmailAlumno" class="form-control">
                                </div>
                            </div>
                        </div>
                            <div class="card-footer text-center d-flex justify-content-between">
                                <button type="reset" value="Nuevo" class="btn" style="background-color: #f8bf23;">Nuevo</button>
                                <button type="submit" value="Guardar" class="btn btn-primary">Guardar</button>
                                <button type="button" value="Buscar"  @click="buscarAlumno" class="btn btn-info" style="background-color:rgb(203, 212, 250);">Buscar</button>
                            </div>
                    </div>
                </form>
            </div>
            
    `
};