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
       /* async listarAlumnos() {
            try {
                // Primero intentamos obtener de MySQL
                const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultar');
                const alumnosMySQL = await response.json();
                
                // Si hay conexión y obtenemos datos, actualizamos IndexedDB
                if (response.ok && alumnosMySQL.length > 0) {
                    await db.alumnos.clear();
                    await db.alumnos.bulkPut(alumnosMySQL);
                }
                
                // Obtenemos todos los alumnos de IndexedDB
                const todosLosAlumnos = await db.alumnos.toArray();
                const alumnosMatriculados = await db.matricula.toArray();
                
                this.alumnos = todosLosAlumnos.filter(alumno =>
                    !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
                );
            } catch (error) {
                console.error("Error al listar alumnos:", error);
                // Si falla la conexión, usamos solo IndexedDB
                const todosLosAlumnos = await db.alumnos.toArray();
                const alumnosMatriculados = await db.matricula.toArray();
                
                this.alumnos = todosLosAlumnos.filter(alumno =>
                    !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
                );
            }
        },*/
        async listarAlumnos() {
            try {
                const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultar');
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const alumnosMySQL = await response.json();
                
                if (alumnosMySQL && alumnosMySQL.length > 0) {
                    // Asegurarnos que cada alumno tenga idAlumno
                    const alumnosParaIndexedDB = alumnosMySQL.map(alumno => ({
                        ...alumno,
                        idAlumno: alumno.idAlumno || uuidv4(), // Si no tiene id, generamos uno
                        sincronizado: 1 // Marcamos como sincronizado
                    }));
                    
                    await db.alumnos.bulkPut(alumnosParaIndexedDB);
                }
                 // Obtenemos de IndexedDB
                 const todosLosAlumnos = await db.alumnos.toArray();
                 const alumnosMatriculados = await db.matricula.toArray();
                 
                 this.alumnos = todosLosAlumnos.filter(alumno =>
                     !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
                 );
             } catch (error) {
                 console.error("Error al listar alumnos:", error);
                 // Modo offline: usamos solo IndexedDB
                 const todosLosAlumnos = await db.alumnos.toArray();
                 const alumnosMatriculados = await db.matricula.toArray();
                 
                 this.alumnos = todosLosAlumnos.filter(alumno =>
                     !alumnosMatriculados.some(matriculado => matriculado.idAlumno === alumno.idAlumno)
                 );
                 if (!navigator.onLine) {
                    alertify.warning("Modo offline: mostrando datos locales");
                } else {
                    alertify.error("Error al cargar alumnos del servidor");
                }
            }
        }
        ,
        async listarMatriculados() {
            try {
                // Primero intentamos obtener de MySQL
                const response = await fetch('private/modulos/matriculas/matricula.php?accion=consultarMatriculados');
                const matriculadosMySQL = await response.json();
                
                // Si hay conexión y obtenemos datos, actualizamos IndexedDB
                if (response.ok && matriculadosMySQL.length > 0) {
                    await db.matricula.clear();
                    await db.matricula.bulkPut(matriculadosMySQL);
                }
                
                // Obtenemos de IndexedDB
                this.matriculados = await db.matricula.toArray();
            } catch (error) {
                console.error("Error al listar matriculados:", error);
                // Si falla la conexión, usamos solo IndexedDB
                this.matriculados = await db.matricula.toArray();
            }
        },
        
        async matricularAlumno(alumno) {
            const existe = await db.matricula.where('idAlumno').equals(alumno.idAlumno).first();
            if (existe) {
                alertify.warning(`El alumno ${alumno.nombre} ya está matriculado.`);
                return;
            }
        
            const transaccion = uuidv4();
            const datosMatricula = {
                idAlumno: alumno.idAlumno,
                codigo: alumno.codigo,
                nombre: alumno.nombre,
                direccion: alumno.direccion,
                telefono: alumno.telefono,
                email: alumno.email,
                fechanacimiento: alumno.fechanacimiento,
                sexo: alumno.sexo,
                codigo_transaccion: transaccion,
                hash: CryptoJS.SHA256(JSON.stringify(alumno)).toString()
            };
        
            // Guardar en IndexedDB primero
            await db.matricula.put(datosMatricula);
            
            try {
                // Intentar guardar en MySQL
                const response = await fetch(`private/modulos/matriculas/matricula.php?accion=matricular&matricula=${encodeURIComponent(JSON.stringify(datosMatricula))}`);
                const result = await response.json();
                
                if (result !== true) {
                    alertify.error("No se pudo guardar en el servidor. Los datos se guardaron localmente.");
                } else {
                    alertify.success(`El alumno ${alumno.nombre} ha sido matriculado.`);
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                alertify.warning("No hay conexión. Los datos se guardaron localmente y se sincronizarán cuando haya conexión.");
            }
            
            await this.actualizarLista();
        },
        
        async quitarMatriculacion(matriculado) {
            alertify.confirm(
                'Confirmar eliminación',
                `¿Estás seguro de que deseas quitar la matriculación de ${matriculado.nombre}?`,
                async () => {
                    // Eliminar de IndexedDB primero
                    await db.matricula.where('idAlumno').equals(matriculado.idAlumno).delete();
                    
                    try {
                        // Intentar eliminar de MySQL
                        const response = await fetch(`private/modulos/matriculas/matricula.php?accion=eliminar&matricula=${encodeURIComponent(JSON.stringify({idAlumno: matriculado.idAlumno}))}`);
                        const result = await response.json();
                        
                        if (result !== true) {
                            alertify.error("No se pudo eliminar en el servidor. Se eliminó solo localmente.");
                        } else {
                            alertify.success(`La matriculación del alumno ${matriculado.nombre} ha sido eliminada.`);
                        }
                    } catch (error) {
                        console.error("Error al conectar con el servidor:", error);
                        alertify.warning("No hay conexión. La eliminación se realizó solo localmente.");
                    }
                    
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
        },
        
        async sincronizarDatos() {
            try {
                // Sincronizar alumnos pendientes
                const alumnosPendientes = await db.alumnos.where('sincronizado').equals(0).toArray();
                for (const alumno of alumnosPendientes) {
                    const response = await fetch(`private/modulos/alumnos/alumno.php?accion=${alumno.accion || 'nuevo'}&alumnos=${encodeURIComponent(JSON.stringify(alumno))}`);
                    const result = await response.json();
                    
                    if (result === true) {
                        // Actualizamos el estado de sincronización
                        await db.alumnos.update(alumno.codigo_transaccion, { sincronizado: 1 });
                    } else {
                        console.error("Error al sincronizar alumno", alumno);
                        alertify.warning(`Error al sincronizar alumno: ${alumno.nombre}`);
                    }
                }
                
                // Sincronizar matrículas pendientes
                const matriculasPendientes = await db.matricula.where('sincronizado').equals(0).toArray();
                for (const matricula of matriculasPendientes) {
                    const response = await fetch(`private/modulos/matriculas/matricula.php?accion=matricular&matricula=${encodeURIComponent(JSON.stringify(matricula))}`);
                    const result = await response.json();
                    
                    if (result === true) {
                        // Actualizamos el estado de sincronización
                        await db.matricula.update(matricula.codigo_transaccion, { sincronizado: 1 });
                    } else {
                        console.error("Error al sincronizar matrícula", matricula);
                        alertify.warning(`Error al sincronizar matrícula para el alumno ${matricula.nombre}`);
                    }
                }
                
                alertify.success("Datos sincronizados correctamente");
                await this.actualizarLista();
            } catch (error) {
                console.error("Error en sincronización:", error);
                alertify.error("Error al sincronizar datos");
            }
        }
        
    },        
    
    computed: {
        alumnosFiltrados() {
            return (this.alumnos || []).filter(alumno => 
                alumno.nombre.toLowerCase().includes(this.filtroAlumnos.toLowerCase()) ||
                alumno.codigo.toLowerCase().includes(this.filtroAlumnos.toLowerCase())
            );
        },
        matriculadosFiltrados() {
            return (this.matriculados || []).filter(matriculado => 
                matriculado.nombre.toLowerCase().includes(this.filtroMatriculados.toLowerCase()) ||
                matriculado.codigo.toLowerCase().includes(this.filtroMatriculados.toLowerCase())
            );
        }
    },
    
    created() {
        this.actualizarLista();
        
        // Verificar conexión periódicamente
        setInterval(async () => {
            try {
                await fetch('private/modulos/matriculas/matricula.php?accion=ping');
                // Si hay conexión, sincronizar
                await this.sincronizarDatos();
            } catch (error) {
                console.log("Sin conexión, trabajando en modo offline");
            }
        }, 30000); // Cada 30 segundos
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