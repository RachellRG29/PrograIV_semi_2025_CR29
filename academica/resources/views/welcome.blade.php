<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Aplicacion academica - Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

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

        <!-- Style -->
        <link rel="stylesheet" href="style_index.css">

    </head>

    <body class="bg-[#FDFDFC] ">
    <div id="app" ref="app">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style="background: linear-gradient(90deg, #133E87 20%, #03346E 80%);">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img width="180px" src="{{ asset('img/logo_ugb_.png') }}" alt="Logo UGB" class="navbar_logo">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" @click="abrirFormulario('alumno')" href="#">Alumno</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="abrirFormulario('materia')" href="#">Materia</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="abrirFormulario('docente')" href="#">Docente</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="abrirFormulario('matricula')" href="#">Matrícula</a>
                            </li>
                           
                        </ul>
                        <!--<span id="estadoConexion" class="badge bg-danger">Offline</span>-->
                    </div>
                </div>
            </nav>
        </div>
   
    </body>
</html>
