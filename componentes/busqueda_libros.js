const buscarLibro = {
    data() {
        return {
            buscar: '',
            buscarTipo: 'titulo',
            libros: [],
        }
    },
    methods: {
        modificarLibro(libro) {
            this.$emit('modificar', libro);
        },
        eliminarLibro(libro) {
            alertify.confirm('Eliminar Libro', `¿Está seguro de eliminar el libro ${libro.titulo}?`, () => {
                db.libros.delete(libro.idLibro);
                this.listarLibros();
                alertify.success(`Libro ${libro.titulo} eliminado`);
            }, () => { });
        },
        async listarLibros() {
            this.libros = await db.libros.filter(libro => libro[this.buscarTipo].toLowerCase().includes(this.buscar.toLowerCase())).toArray();
        },
    },
    created() {
        this.listarLibros();
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
                                    <option value="titulo">TITULO</option>
                                </select>
                            </th>
                            <th colspan="6">
                                <input type="text" @keyup="listarLibros()" v-model="buscar" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>TITULO</th>
                            <th>AUTOR</th>
                            <th>EDITORIAL</th>
                            <th>EDICION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="libro in libros" @click="modificarLibro(libro)" :key="libro.idLibro">
                            <td>{{ libro.codigo }}</td>
                            <td>{{ libro.titulo }}</td>
                            <td>{{ libro.idAutor }}</td>
                            <td>{{ libro.editorial }}</td>
                            <td>{{ libro.edicion }}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarLibro(libro)"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};