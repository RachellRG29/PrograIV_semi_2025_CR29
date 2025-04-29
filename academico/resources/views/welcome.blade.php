<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Sistema Academico - Laravel </title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        <!-- Google Fonts - Outfit -->
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
        <!-- CSS -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css" />
        <!-- Default theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.min.css" />
        <!-- Semantic UI theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/semantic.min.css" />
        <!-- Bootstrap theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <!-- Style -->
        <link rel="stylesheet" href="css/style_index.css">
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <!-- icon app sistema academico-->
        <link rel="icon" href="Images/logo_educacion.png">

    </head>

    <body> 

    <div id="app">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg border-bottom border-body" data-bs-theme="dark" style="background: linear-gradient(90deg, #133E87 20%, #03346E 80%);">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img width="200" src="Images/logo_educacion.png" class="navbar_logo" style="width: 4rem;">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="mostrarComponente('alumnos')">Alumnos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="mostrarComponente('materias')">Materias</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="mostrarComponente('docentes')">Docentes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="mostrarComponente('matricula')">Matrícula</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="mostrarComponente('inscripcion')">Inscripción</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <!-- CONTENIDO QUE CAMBIA -->
        <div class="container mt-4">
            <alumno-form v-if="componenteActivo === 'alumnos'"></alumno-form>
            <!-- Aquí más formularios cuando los agregues -->
        </div>

    </div>

    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/alertify.min.js"></script>
    <script src="https://unpkg.com/dexie/dist/dexie.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    @vite('resources/js/app.js')


    </body>


</html>
