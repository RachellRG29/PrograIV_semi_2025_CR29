<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Académico</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Gloock y Comfortaa fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Gloock&display=swap" rel="stylesheet">

    <!-- Iconos de Phosphor -->
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/phosphor.css">
    <!-- AlertifyJS CSS y JS -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
        <!-- icon app sistema academico-->
        <link rel="icon" href="Images/logo_educacion.png">

</head>
<style>
    i{  font-size: 22px; /* Tamaño de los iconos */ }

</style>
<body style="font-family: 'Comfortaa'; font-size: 14px">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div class="d-flex align-items-center">
            <a class="navbar-brand fw-bold text-white me-4" href="{{ url('/') }}">REGISTRO ACADÉMICO</a>
            <ul class="navbar-nav flex-row">
                <li class="nav-item me-3">
                    <a class="nav-link text-white" href="{{ route('alumnos.index') }}">Alumnos</a>
                </li>
                <li class="nav-item me-3">
                    <a class="nav-link text-white" href="{{ route('docentes.index') }}">Docentes</a>
                </li>
                <li class="nav-item me-3">
                    <a class="nav-link text-white" href="{{ route('materias.index') }}">Materias</a>
                </li>
                <li class="nav-item me-3">
                    <a class="nav-link text-white" href="{{ route('matriculaciones.index') }}">Matriculaciones</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="{{ route('inscripciones.index') }}">Inscripciones</a>
                </li>
            </ul>
        </div>
    </nav>

    <main class="container py-4">
        @yield('content')
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/phosphor-icons"></script>
</body>
</html>
