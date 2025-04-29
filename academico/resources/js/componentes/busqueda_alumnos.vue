<template>
    <div class="row">
      <div class="col-12">
        <table class="table table-sm table-bordered table-hover table-dark table-striped">
          <thead>
            <!-- Fila de búsqueda -->
            <tr class="bg-white text-dark align-middle">
              <th class="text-center">BUSCAR POR</th>
              <th class="p-1" colspan="2">
                <select v-model="buscarTipo" class="form-select form-select-sm">
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
              <th class="p-1" colspan="8">
                <input
                  type="text"
                  v-model="buscar"
                  @input="filtrarAlumnos"
                  class="form-control form-control-sm"
                  placeholder="Buscar..."
                >
              </th>
            </tr>
            <!-- Encabezados -->
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
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alumno in alumnosFiltrados" :key="alumno.idAlumno" @click="modificarAlumno(alumno)">
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
                <button class="btn btn-danger btn-sm" @click.stop="eliminarAlumno(alumno)">
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        buscar: '',
        buscarTipo: 'nombre',
        alumnos: [],
        alumnosFiltrados: [],
        form: {},
        mostrarBusqueda: false,
      };
    },
    methods: {
      listarAlumnos() {
        axios.get('http://127.0.0.1:8000/api/alumnos')
          .then(response => {
            this.alumnos = response.data;
            this.alumnosFiltrados = response.data; // Inicialmente todos
          })
          .catch(error => {
            console.error(error);
          });
      },
      filtrarAlumnos() {
        const busqueda = this.buscar.toLowerCase();
        this.alumnosFiltrados = this.alumnos.filter(alumno => {
          const valor = (alumno[this.buscarTipo] || '').toString().toLowerCase();
          return valor.includes(busqueda);
        });
      },
      modificarAlumno(alumno) {
        this.$emit('modificar', alumno);  
        this.mostrarBusqueda = false;
      },
      eliminarAlumno(alumno) {
        alertify.confirm('Eliminar Alumno', `¿Está seguro de eliminar el alumno ${alumno.nombre}?`, () => {
          axios.delete(`/alumnos/${alumno.idAlumno}`)
            .then(() => {
              this.listarAlumnos();
              alertify.success(`Alumno ${alumno.nombre} eliminado`);
            })
            .catch(error => {
              console.error(error);
              alertify.error('Error al eliminar alumno');
            });
        }, () => {});
      }
    },
    created() {
      this.listarAlumnos();
    }
  };
  </script>
  