    
 const buscaralumno = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            alumnos: [],
        }
    },
    methods: {
        modificarAlumno(alumno){
            this.$emit('modificar', alumno);
        },
        eliminarAlumno(alumno) {
            alertify.confirm('Eliminar Alumno', `¿Esta seguro de eliminar el alumno ${alumno.nombre}?`, () => {
                db.alumnos.delete(alumno.idAlumno);
                this.listarAlumnos();
                alertify.success(`Alumno ${alumno.nombre} eliminado`);
            }, () => { });
        },
        async listarAlumnos() {
            this.alumnos = await db.alumnos.filter(alumno => alumno[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarAlumnos();
    },
    template: `
        <div class="row">
            <div class="col-12">
                <table class="table table-sm table-bordered table-hover table-dark table-striped">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="codigo">CODIGO</option>
                                    <option value="nombre">NOMBRE</option>
                                    <option value="email">EMAIL</option>
                                    <option value="direccion">DIRECCION</option>
                                    <option value="departamento">DEPARTAMENTO</option>
                                    <option value="municipio">MUNICIPIO</option>
                                    <option value="distrito">DISTRITO</option>
                                    <option value="telefono">TELEFONO</option>
                                    <option value="fechanacimiento">FECHA NACIMIENTO</option>
                                    <option value="sexo">SEXO</option>
                                    
                                </select>
                            </th>
                            <th colspan="6">
                                <input type="text" @keyup="listarAlumnos()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>EMAIL</th>
                            <th>DIRECCION</th>
                            <th>DEPARTAMENTO</th>
                            <th>MUNICIPIO</th>
                            <th>DISTRITO</th>
                            <th>TELEFONO</th>
                            <th>FECHA NACIMIENTO</th>
                            <th>SEXO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">
                            <td>{{ alumno.codigo }}</td>
                            <td>{{ alumno.nombre }}</td>
                            <td>{{ alumno.email }}</td>
                            <td>{{ alumno.direccion }}</td>
                            <td>{{ alumno.departamento }}</td>
                            <td>{{ alumno.municipio }}</td>
                            <td>{{ alumno.distrito }}</td>
                            <td>{{ alumno.telefono }}</td>
                            <td>{{ alumno.fechanacimiento }}</td>
                            <td>{{ alumno.sexo }}</td>
                            
                            
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarAlumno(alumno)"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};