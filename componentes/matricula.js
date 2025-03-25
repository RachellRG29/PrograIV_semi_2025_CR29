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
            try {
                if (navigator.onLine) {
                    const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultar');
                    if (!response.ok) throw new Error('Error en la respuesta del servidor');
                    
                    const alumnosMySQL = await response.json();
                    const alumnosParaIndexedDB = alumnosMySQL.map(alumno => ({
                        ...alumno,
                        idAlumno: alumno.idAlumno ? String(alumno.idAlumno) : uuidv4(), // Convertimos a string si es necesario
                        sincronizado: 1 
                    }));
                    
                    await db.alumnos.bulkPut(alumnosParaIndexedDB);
                }
            } catch (error) {
                console.error("Error al listar alumnos:", error);
            }
            
            const todosLosAlumnos = await db.alumnos.toArray();
            const alumnosMatriculados = await db.matricula.toArray();
            this.alumnos = todosLosAlumnos.filter(alumno =>
                !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
            );
        },
        
        async listarMatriculados() {
            try {
                if (navigator.onLine) {
                    const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultarMatriculados');
                    if (!response.ok) throw new Error('Error en la respuesta del servidor');
                    
                    const matriculadosMySQL = await response.json();
                    if (matriculadosMySQL.length > 0) {
                        await db.matricula.clear();
                        await db.matricula.bulkPut(matriculadosMySQL);
                    }
                }
            } catch (error) {
                console.error("Error al listar matriculados:", error);
            }
            
            this.matriculados = await db.matricula.toArray();
        },
        
        async matricularAlumno(idAlumno, materias) {
            if (!idAlumno) {
                console.error("Error: idAlumno es inválido", idAlumno);
                return;
            }
        
            idAlumno = String(idAlumno); // Convertimos a string si es necesario
        
            const existe = await db.matricula.where('idAlumno').equals(idAlumno).first();
            if (existe) {
                console.warn("El alumno ya está matriculado:", idAlumno);
                return;
            }
        
            await db.matricula.add({ idAlumno, materias });
            console.log("Alumno matriculado con éxito:", idAlumno);
        }
        ,
        
        async quitarMatriculacion(matriculado) {
            alertify.confirm('Confirmar eliminación', `¿Eliminar la matrícula de ${matriculado.nombre}?`, async () => {
                await db.matricula.where('idAlumno').equals(matriculado.idAlumno).delete();
                
                if (navigator.onLine) {
                    try {
                        await fetch(`private/modulos/matriculas/matricula.php?accion=eliminar&matricula=${encodeURIComponent(JSON.stringify({idAlumno: matriculado.idAlumno}))}`);
                    } catch (error) {
                        console.error("Error al eliminar en el servidor:", error);
                    }
                }
                
                alertify.success(`La matrícula de ${matriculado.nombre} ha sido eliminada.`);
                await this.actualizarLista();
            }, () => alertify.message('Acción cancelada'));
        },
        
        async sincronizarDatos() {
            if (!navigator.onLine) return;
            
            try {
                const matriculasPendientes = await db.matricula.where('sincronizado').equals(0).toArray();
                for (const matricula of matriculasPendientes) {
                    const response = await fetch(`private/modulos/matriculas/matricula.php?accion=matricular&matricula=${encodeURIComponent(JSON.stringify(matricula))}`);
                    const result = await response.json();
                    
                    if (result === true) {
                        await db.matricula.update(matricula.codigo_transaccion, { sincronizado: 1 });
                    }
                }
                
                alertify.success("Datos sincronizados correctamente");
                await this.actualizarLista();
            } catch (error) {
                console.error("Error en sincronización:", error);
                alertify.error("Error al sincronizar datos");
            }
        },
        
        async actualizarLista() {
            await this.listarAlumnos();
            await this.listarMatriculados();
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
        
        setInterval(async () => {
            if (navigator.onLine) {
                await this.sincronizarDatos();
            }
        }, 30000);
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
                    <input type='text' v-model='filtroAlumnos' class='form-control mb-3 shadow-sm' placeholder='Buscar por código o nombre'>
                    
                    <div class="table-responsive">
                        <table class='table table-hover table-bordered shadow-sm'>
                            <thead class="table-danger">
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='alumno in alumnosFiltrados' :key='alumno.idAlumno'>
                                    <td>{{ alumno.codigo }}</td>
                                    <td>{{ alumno.nombre }}</td>
                                    <td>
                                        <button class='btn btn-primary btn-sm shadow-sm' @click="matricularAlumno(alumno)">
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
                    <input type='text' v-model='filtroMatriculados' class='form-control mb-3 shadow-sm' placeholder='Buscar por código o nombre'>
                    
                    <div class="table-responsive">
                        <table class='table table-hover table-bordered shadow-sm'>
                            <thead class="table-primary">
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='matriculado in matriculadosFiltrados' :key='matriculado.idAlumno'>
                                    <td>{{ matriculado.codigo }}</td>
                                    <td>{{ matriculado.nombre }}</td>
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
            </div>
        </div>
    `
};