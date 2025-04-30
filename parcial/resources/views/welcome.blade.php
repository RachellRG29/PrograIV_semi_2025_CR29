<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Gloock y Comfortaa fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Gloock&display=swap" rel="stylesheet" />

    <!-- Iconos de Phosphor -->
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/phosphor.css" />

    <title>Vegánimo parcial2</title>
    <link rel="website icon" href="/Images/Icono_veganimo.svg" />
 
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- AlertifyJS CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />

    <!-- Iconos -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

    <!-- CSS personalizado -->
    <link rel="stylesheet" href="css/register.css" />

    <link rel="website icon" href="Images/Icono_veganimo.svg" />
</head>

<body class="custom-bg d-flex min-vh-100 px-3">
    <!-- Contenedor general -->
    <div class="container position-relative d-flex align-items-center">
        <!-- Card del formulario -->
        <div class="card shadow-lg rounded-4 overflow-hidden custom-form-card p-4">
            <div class="text-center mb-4">
                <div class="logo-container">
                    <div class="img-fluid logo" alt="isotipo">
                        <svg id="Capa_2" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.68 199.52">
                            <g id="Veganimo">
                                <g>
                                    <!-- SVG paths aquí -->
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <h2 class="form-title text-center mb-2">Crea tu cuenta</h2>
            <div class="separator mx-auto mb-4"></div>

            <!-- FORMULARIO con id corregido -->
            <form id="registerForm" method="POST" action="{{ route('register.store') }}">
                @csrf
                <!-- Nombre completo -->
                <div class="mb-3">
                    <label for="fullname" class="form-label">Nombre completo:</label>
                    <input type="text" name="fullname" id="fullname" class="form-control input-border" placeholder="Ingrese su nombre completo" />
                </div>

                <div class="d-flex justify-content-center gap-3">
                    <div class="mb-3 flex-fill">
                        <label for="birthdate" class="form-label">Fecha de nacimiento:</label>
                        <input type="date" name="birthdate" id="birthdate" class="form-control input-border" />
                    </div>

                    <div class="mb-3 flex-fill">
                        <label for="gender" class="form-label">Género:</label>
                        <select name="gender" id="gender" class="form-control input-border custom-select">
                            <option value="" disabled selected>Seleccionar</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Correo:</label>
                    <input type="email" name="email" id="email" class="form-control input-border" placeholder="Ingrese su correo" />
                </div>

                <div class="mb-4 position-relative input-group-container">
                    <label for="password" class="form-label">Contraseña:</label>
                    <div class="position-relative">
                        <input type="password" name="password" id="password" class="form-control input-border" placeholder="Ingrese su contraseña" />
                        <span class="password-toggle-inside" onclick="toggleVisibility('password', this)">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>

                <!-- Confirmar contraseña -->
                <div class="mb-4 position-relative input-group-container">
                    <label for="confirm-password" class="form-label">Confirmar contraseña:</label>
                    <div class="position-relative">
                        <input type="password" id="confirm-password" class="form-control input-border" placeholder="Confirme su contraseña" />
                        <span class="password-toggle-inside" onclick="toggleVisibility('confirm-password', this)">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>

                <div class="text-center">
                    <button id="register-button" type="submit">Registrar</button>
                </div>

                @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif
            </form>

            <div class="text-center mt-3">
                <a href="#" class="text-muted small text-decoration-none">¿Tienes cuenta? Inicia sesión</a>
            </div>
        </div>

        <div class="ladoderecho">
            <div class="contenedor-imagen">
                <img src="https://images.pexels.com/photos/31199411/pexels-photo-31199411/free-photo-of-ensalada-de-aguacate-fresco-y-rucula-en-una-mesa-rustica.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="Imagen" class="img-fluid login-image d-none d-md-block" />
                <a href="/recetas" id="btn-de-recetas" class="boton-ir-recetas">Recetas</a>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Alertify JS -->
    <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

    <!-- Script para mostrar/ocultar contraseñas -->
    <script>
        function toggleVisibility(inputId, iconElement) {
            const input = document.getElementById(inputId);
            const icon = iconElement.querySelector('i');
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';
            icon.classList.toggle('fa-eye-slash', isPassword);
            icon.classList.toggle('fa-eye', !isPassword);
        }
    </script>

    <!-- Alertify mensajes desde backend -->
    <script>
        @if (session('success'))
            alertify.success("{{ session('success') }}");
        @endif

        @if (session('error'))
            alertify.error("{{ session('error') }}");
        @endif
    </script>

    <!-- Tus scripts -->
    <script src="https://unpkg.com/phosphor-icons"></script>
    <script src="js/scripts_crear_receta.js"></script>

    <!-- Validación y Alertify -->
    <script>
        // Funciones para cambiar clases
        function setInvalid(element) {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }

        function setValid(element) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        }

        // Validaciones individuales
        function validateFullname() {
            const input = document.getElementById('fullname');
            const value = input.value.trim();
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü.\s]+$/;
            if (!value || !nameRegex.test(value)) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        function validateBirthdate() {
            const input = document.getElementById('birthdate');
            if (!input.value) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        function validateGender() {
            const input = document.getElementById('gender');
            if (!input.value) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        function validateEmail() {
            const input = document.getElementById('email');
            const value = input.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        function validatePassword() {
            const input = document.getElementById('password');
            if (!input.value || input.value.length < 8) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        function validateConfirmPassword() {
            const input = document.getElementById('confirm-password');
            const password = document.getElementById('password').value;
            if (!input.value || input.value.length < 8 || input.value !== password) {
                setInvalid(input);
                return false;
            }
            setValid(input);
            return true;
        }

        // Eventos para validar 
        document.getElementById('fullname').addEventListener('blur', validateFullname);
        document.getElementById('birthdate').addEventListener('blur', validateBirthdate);
        document.getElementById('gender').addEventListener('change', validateGender);
        document.getElementById('email').addEventListener('blur', validateEmail);
        document.getElementById('password').addEventListener('blur', validatePassword);
        document.getElementById('confirm-password').addEventListener('blur', validateConfirmPassword);

        // Validación al enviar el formulario
        document.getElementById('registerForm').addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateFullname()) {
                alertify.error('El nombre completo solo debe contener letras.');
                return;
            }
            if (!validateBirthdate()) {
                alertify.error('Seleccione una fecha de nacimiento para continuar.');
                return;
            }
            if (!validateGender()) {
                alertify.error('Seleccione un género para continuar.');
                return;
            }
            if (!validateEmail()) {
                alertify.error('Ingrese un correo electrónico válido.');
                return;
            }
            if (!validatePassword()) {
                alertify.error('La contraseña debe tener al menos 8 caracteres.');
                return;
            }
            if (!validateConfirmPassword()) {
                alertify.error('Las contraseñas no coinciden o son menores a 8 caracteres.');
                return;
            }

            // Si pasa todas las validaciones, envía el formulario
            this.submit();
            
        });
    </script>
</body>
</html>


