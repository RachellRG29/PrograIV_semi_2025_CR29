    
 const buscardocente = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            docentes: [],
        }
    },
    methods: {
        modificarDocente(docente){
            this.$emit('modificar', docente);
        },
        eliminarDocente(docente) {
            alertify.confirm('Eliminar Docente', `¿Está seguro de eliminar al docente ${docente.nombre}?`, () => {
                db.docentes.delete(docente.idDocente);
                this.listarDocentes();
                alertify.success(`Docente ${docente.nombre} eliminado`);
            }, () => { });
        },
        async listarDocentes() {
            this.docentes = await db.docentes.filter(docente => docente[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarDocentes();
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
                                <input type="text" @keyup="listarDocentes()" v-model="buscar" class="form-control">
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
                        <tr v-for="docente in docentes" @click="modificarDocente(docente)" :key="docente.idDocente">
                            <td>{{ docente.codigo }}</td>
                            <td>{{ docente.nombre }}</td>
                            <td>{{ docente.email }}</td>
                            <td>{{ docente.direccion }}</td>
                            <td>{{ docente.departamento }}</td>
                            <td>{{ docente.municipio }}</td>
                            <td>{{ docente.distrito }}</td>
                            <td>{{ docente.telefono }}</td>
                            <td>{{ docente.fechanacimiento }}</td>
                            <td>{{ docente.sexo }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarDocente(docente)"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};