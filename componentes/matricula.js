const matricula = {
    data() {
        return {
            alumnos: [],
            matriculados: [],
            filtroAlumnos: '',
            filtroMatriculados: ''
        };
    },
    methods: {
        async listarAlumnos() {
            const todosLosAlumnos = await db.alumnos.toArray();
            const alumnosMatriculados = await db.matriculas.toArray();
            
            this.alumnos = todosLosAlumnos.filter(alumno =>
                !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
            );
        },
        async listarMatriculados() {
            this.matriculados = await db.matriculas.toArray();
        },
        async matricularAlumno(alumno) {
            const existe = await db.matriculas.where('idAlumno').equals(alumno.idAlumno).first();
            if (existe) {
                alertify.warning(`El alumno ${alumno.nombre} ya está matriculado.`);
                return;
            }

            await db.matriculas.put({
                idAlumno: alumno.idAlumno,
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                email: alumno.email,
                direccion: alumno.direccion,
                departamento: alumno.departamento,
                municipio: alumno.municipio,
                distrito: alumno.distrito,
                telefono: alumno.telefono,
                fechanacimiento: alumno.fechanacimiento,
                sexo: alumno.sexo
            });

            alertify.success(`El alumno ${alumno.nombre} ha sido matriculado.`);
            await this.actualizarLista();
        },
        async quitarMatriculacion(alumno) {
            const existe = await db.matriculas.where('idAlumno').equals(alumno.idAlumno).first();
            if (!existe) {
                alertify.warning(`El alumno ${alumno.nombre} no está matriculado.`);
                return;
            }
        
            alertify.confirm(
                'Confirmar eliminación',
                `¿Estás seguro de que deseas quitar la matriculación de ${alumno.nombre}?`,
                async () => {
                    await db.matriculas.where('idAlumno').equals(alumno.idAlumno).delete();
                    alertify.success(`La matriculación del alumno ${alumno.nombre} ha sido eliminada.`);
                    await this.actualizarLista();
                },
                () => {
                    alertify.message('Acción cancelada');
                }
            );
        },
        
        async actualizarLista() {
            await this.listarAlumnos();
            await this.listarMatriculados();
            alertify.message('Datos actualizados correctamente');
        }
    },        
    computed: {
        alumnosFiltrados() {
            return this.alumnos.filter(alumno => 
                alumno.nombre.toLowerCase().includes(this.filtroAlumnos.toLowerCase()) ||
                alumno.codigo.toLowerCase().includes(this.filtroAlumnos.toLowerCase())
            );
        },
        matriculadosFiltrados() {
            return this.matriculados.filter(matriculado => 
                matriculado.nombre.toLowerCase().includes(this.filtroMatriculados.toLowerCase()) ||
                matriculado.codigo.toLowerCase().includes(this.filtroMatriculados.toLowerCase())
            );
        }
    },
    created() {
        this.actualizarLista();
    },
    template: `
        <div class='container mt-4'>
            <h5 class="text-primary fw-bold">Buscar Alumno para Matricular</h5>
            <input type='text' v-model='filtroAlumnos' class='form-control mb-3 shadow-sm' placeholder='馃攷 Buscar por c贸digo o nombre'>

            <button class='btn btn-secondary shadow-lg fw-bold' @click='actualizarLista'>
                <i class="bi bi-arrow-clockwise"></i> Actualizar Datos
            </button>

            <h5 class="mt-4 text-danger fw-bold">Lista de Alumnos (No Matriculados)</h5>
            <div class="table-responsive">
                <table class='table table-hover table-bordered shadow-sm'>
                    <thead class="table-danger">
                        <tr>
                            <th>C贸digo</th><th>Nombre</th><th>Email</th><th>Direcci贸n</th>
                            <th>Departamento</th><th>Municipio</th><th>Distrito</th>
                            <th>Tel茅fono</th><th>Fecha Nacimiento</th><th>Sexo</th><th>Acci贸n</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='alumno in alumnosFiltrados' :key='alumno.idAlumno'>
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
                                <button class='btn btn-primary btn-sm shadow-sm' @click="matricularAlumno(alumno)">
                                    <i class="bi bi-person-check"></i> Matricular
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h5 class="mt-4 text-primary fw-bold">Buscar Alumno Matriculado</h5>
            <input type='text' v-model='filtroMatriculados' class='form-control mb-3 shadow-sm' placeholder='馃攷 Buscar por c贸digo o nombre'>

            <h5 class="mt-4 text-primary fw-bold">Alumnos Matriculados</h5>
            <div class="table-responsive">
                <table class='table table-hover table-bordered shadow-sm'>
                    <thead class="table-primary">
                        <tr>
                            <th>C贸digo</th><th>Nombre</th><th>Email</th><th>Direcci贸n</th>
                            <th>Departamento</th><th>Municipio</th><th>Distrito</th>
                            <th>Tel茅fono</th><th>Fecha Nacimiento</th><th>Sexo</th><th>Acci贸n</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='matriculado in matriculadosFiltrados' :key='matriculado.idAlumno'>
                            <td>{{ matriculado.codigo }}</td>
                            <td>{{ matriculado.nombre }}</td>
                            <td>{{ matriculado.email }}</td>
                            <td>{{ matriculado.direccion }}</td>
                            <td>{{ matriculado.departamento }}</td>
                            <td>{{ matriculado.municipio }}</td>
                            <td>{{ matriculado.distrito }}</td>
                            <td>{{ matriculado.telefono }}</td>
                            <td>{{ matriculado.fechanacimiento }}</td>
                            <td>{{ matriculado.sexo }}</td>
                            <td>
                                <button class='btn btn-danger btn-sm shadow-sm' @click="quitarMatriculacion(matriculado)">
                                    <i class="bi bi-trash"></i> Quitar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};
