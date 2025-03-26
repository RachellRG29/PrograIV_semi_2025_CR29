const matricula = {
    data: () => ({
        alumnos: [],
        matriculados: [],
        filtroAlumnos: '',
        filtroMatriculados: ''
    }),

    methods: {
        async listarAlumnos() {
            try {
                if (navigator.onLine) {
                    const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultar');
                    if (!response.ok) throw new Error('Error en la respuesta');
                    
                    const alumnosMySQL = await response.json();
                    await db.alumnos.clear();
                    await db.alumnos.bulkPut(alumnosMySQL.map(a => ({
                        ...a,
                        idAlumno: String(a.idAlumno),
                        sincronizado: 1
                    })));
                }
            } catch (error) {
                console.error("Error al listar alumnos:", error);
            }
            
            const todosAlumnos = await db.alumnos.toArray();
            const idsMatriculados = new Set((await db.matricula.toArray()).map(m => m.idAlumno));
            this.alumnos = todosAlumnos.filter(a => !idsMatriculados.has(a.idAlumno));
        },

        async listarMatriculados() {
            try {
                if (navigator.onLine) {
                    const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultarMatriculados');
                    if (!response.ok) throw new Error('Error en la respuesta');
                    
                    const matriculadosMySQL = await response.json();
                    // Eliminar solo los sincronizados para mantener los locales
                    await db.matricula.where('sincronizado').equals(1).delete();
   
                    const matriculasUnicas = this.eliminarDuplicados(matriculadosMySQL, 'idAlumno');
                    await db.matricula.bulkPut(matriculasUnicas.map(m => ({
                        ...m,
                        idAlumno: String(m.idAlumno),
                        sincronizado: 1
                    })));
                }
            } catch (error) {
                console.error("Error al listar matriculados:", error);
            }
            
            const todosMatriculados = await db.matricula.toArray();
            this.matriculados = this.eliminarDuplicados(todosMatriculados, 'idAlumno');
        },

        eliminarDuplicados(array, key) {
            const seen = new Set();
            return array.filter(item => {
                const value = item[key];
                if (seen.has(value)) {
                    return false;
                }
                seen.add(value);
                return true;
            });
        },

        async matricularAlumno(alumno) {
            if (!alumno?.idAlumno) {
                alertify.error("Alumno inválido");
                return;
            }

            // Verificar si ya está matriculado
            const yaMatriculado = this.matriculados.some(m => m.idAlumno === String(alumno.idAlumno));
            if (yaMatriculado) {
                alertify.warning("Este alumno ya está matriculado");
                return;
            }

            const matriculaData = {
                idAlumno: String(alumno.idAlumno),
                codigo_transaccion: uuidv4(),
                hash: uuidv4(),
                data: JSON.stringify(alumno),
                sincronizado: 0,
                nombre: alumno.nombre,
                codigo: alumno.codigo
            };

            try {
                await db.matricula.add(matriculaData);
                if (navigator.onLine) {
                    const success = await this.sincronizarMatricula(matriculaData);
                    if (success) {
                        await db.matricula.update(matriculaData.codigo_transaccion, { sincronizado: 1 });
                    }
                }

                alertify.success(`Alumno ${alumno.nombre} matriculado`);
                await this.actualizarLista();
            } catch (error) {
                console.error("Error al matricular:", error);
                alertify.error("Error al matricular");
            }
        },
        async sincronizarMatricula(matricula) {
            try {
                const response = await fetch(
                    `private/modulos/matriculas/matricula.php?accion=matricular&matricula=${
                        encodeURIComponent(JSON.stringify(matricula))
                    }`
                );
                return await response.json();
            } catch (error) {
                console.error("Error en sincronización:", error);
                return false;
            }
        },

        async quitarMatriculacion({ idAlumno, codigo_transaccion, nombre, sincronizado }) {
            alertify.confirm('Confirmar', `¿Eliminar matrícula de ${nombre}?`, async () => {
                await db.matricula.where('codigo_transaccion').equals(codigo_transaccion).delete();
                
                if (navigator.onLine && sincronizado === 1) {
                    await fetch(
                        `private/modulos/matriculas/matricula.php?accion=eliminar&matricula=${
                            encodeURIComponent(JSON.stringify({idAlumno}))
                        }`
                    );
                }
                
                alertify.success(`Matrícula de ${nombre} eliminada`);
                await this.actualizarLista();
            }, () => alertify.message('Cancelado'));
        },

        async sincronizarDatos() {
            if (!navigator.onLine) return;
            
            try {
                const pendientes = await db.matricula.where('sincronizado').equals(0).toArray();
                for (const mat of pendientes) {
                    if (await this.sincronizarMatricula(mat)) {
                        await db.matricula.update(mat.codigo_transaccion, { sincronizado: 1 });
                    }
                }
                await this.actualizarLista();
                alertify.success("Datos sincronizados");
            } catch (error) {
                console.error("Error sincronizando:", error);
                alertify.error("Error al sincronizar");
            }
        },

        actualizarLista() {
            return Promise.all([this.listarAlumnos(), this.listarMatriculados()]);
        }
    },

    computed: {
        alumnosFiltrados() {
            const filtro = this.filtroAlumnos.toLowerCase();
            return this.alumnos.filter(a => 
                a.nombre.toLowerCase().includes(filtro) || 
                a.codigo.toLowerCase().includes(filtro)
            );
        },
        matriculadosFiltrados() {
            const filtro = this.filtroMatriculados.toLowerCase();
            return this.matriculados.filter(m => 
                (m.nombre || '').toLowerCase().includes(filtro) || 
                (m.codigo || '').toLowerCase().includes(filtro)
            );
        }
    },

    created() {
        this.actualizarLista();
        setInterval(this.sincronizarDatos, 30000);
    },

    template: `
        <div class='container mt-4'>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="text-primary fw-bold m-0">Matrícula de Alumnos</h5>
                <button class='btn btn-success shadow-sm' @click='sincronizarDatos'>
                    <i class="bi bi-arrow-repeat"></i> Sincronizar
                </button>
            </div>
            
            <div class="row">
                <div class="col-md-6 mb-4">
                    <h5 class="text-danger fw-bold">Alumnos Disponibles</h5>
                    <input v-model='filtroAlumnos' class='form-control mb-3 shadow-sm' placeholder='Buscar...'>
                    
                    <div class="table-responsive">
                        <table class='table table-hover table-bordered shadow-sm'>
                            <thead class="table-danger">
                                <tr><th>Código</th><th>Nombre</th><th>Acción</th></tr>
                            </thead>
                            <tbody>
                                <tr v-for='a in alumnosFiltrados' :key='a.idAlumno'>
                                    <td>{{ a.codigo }}</td>
                                    <td>{{ a.nombre }}</td>
                                    <td>
                                        <button class='btn btn-primary btn-sm shadow-sm' @click="matricularAlumno(a)">
                                            <i class="bi bi-person-plus"></i> Matricular
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <h5 class="text-primary fw-bold">Alumnos Matriculados</h5>
                    <input v-model='filtroMatriculados' class='form-control mb-3 shadow-sm' placeholder='Buscar...'>
                    
                    <div class="table-responsive">
                        <table class='table table-hover table-bordered shadow-sm'>
                            <thead class="table-primary">
                                <tr><th>Código</th><th>Nombre</th><th>Acción</th></tr>
                            </thead>
                            <tbody>
                                <tr v-for='m in matriculadosFiltrados' :key='m.codigo_transaccion'>
                                    <td>{{ m.codigo }}</td>
                                    <td>{{ m.nombre }}</td>
                                    <td>
                                        <button class='btn btn-danger btn-sm shadow-sm' @click="quitarMatriculacion(m)">
                                            <i class="bi bi-trash"></i> Quitar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
};
