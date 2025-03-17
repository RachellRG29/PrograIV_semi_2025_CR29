const buscardocente = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'nombre',
            docentes: [],
        };
    },
    methods: {
        modificarDocente(docente) {
            this.$emit('modificar', docente);
        },
        eliminarDocente(docente) {
            alertify.confirm('Eliminar Docente', `¿Está seguro de eliminar al docente ${docente.nombre}?`, async () => {
                let respuesta = await fetch(`private/modulos/docentes/docente.php?accion=eliminar&docentes=${JSON.stringify(docente)}`),
                    data = await respuesta.json();
                if (data !== true) {
                    alertify.error(data);
                } else {
                    db.docentes.delete(docente.codigo_transaccion);
                    this.listarDocentes();
                    alertify.success(`Docente ${docente.nombre} eliminado`);
                }
            }, () => { });
        },
        async listarDocentes() {
            this.docentes = await db.docentes.filter(docente => docente[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
            if (this.docentes.length < 1) {
                fetch('private/modulos/docentes/docente.php?accion=consultar')
                    .then(response => response.json())
                    .then(data => {
                        this.docentes = data;
                        db.docentes.bulkAdd(data);
                    });
            }
        },
    },
    created() {
        this.listarDocentes();
    },
    template: `
        <div class="row">
            <div class="col-7">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR POR</th>
                            <th>
                                <select v-model="buscarTipo" class="form-control">
                                    <option value="codigo">CÓDIGO</option>
                                    <option value="nombre">NOMBRE</option>
                                    <option value="direccion">DIRECCIÓN</option>
                                    <option value="telefono">TELÉFONO</option>
                                    <option value="email">EMAIL</option>
                                    <option value="fechanacimiento">FECHA NACIMIENTO</option>
                                    <option value="sexo">SEXO</option>
                                </select>
                            </th>
                            <th colspan="5">
                                <input type="text" @keyup="listarDocentes()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCIÓN</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>FECHA NACIMIENTO</th>
                            <th>SEXO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="docente in docentes" @click="modificarDocente(docente)" :key="docente.codigo_transaccion">
                            <td>{{ docente.codigo }}</td>
                            <td>{{ docente.nombre }}</td>
                            <td>{{ docente.direccion }}</td>
                            <td>{{ docente.telefono }}</td>
                            <td>{{ docente.email }}</td>
                            <td>{{ docente.fechanacimiento }}</td>
                            <td>{{ docente.sexo }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarDocente(docente)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};
