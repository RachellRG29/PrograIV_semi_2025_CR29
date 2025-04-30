<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="css/crear-recetas.css" />

    <!-- Gloock y Comfortaa fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Gloock&display=swap" rel="stylesheet" />

    <!-- AlertifyJS CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />

    <!-- Iconos de Phosphor -->
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/phosphor.css" />

    <title>Crear recetas</title>
    <link rel="website icon" href="/Images/Icono_veganimo.svg" />
</head>
<body>
    <div class="contenedor-crear-recetas">
        <div class="cont-cc">
            <h2 class="lbl_crear_receta">Crear receta</h2>
            <div class="linea-cr"></div>
        </div>

        <!-- FORMULARIO con id para validar -->
        <form id="crearRecetaForm" method="POST" action="{{ route('recetas.store') }}" enctype="multipart/form-data">
            @csrf

            <!-- Primera Sección: Nombre, Descripción, Tiempo, Dificultad -->
            <div class="zona-principal">
                <div class="zona-izquierda">
                    <div class="mb-3">
                        <label for="name-receta" class="form-label">Nombre de receta:</label>
                        <input type="text" id="name-receta" name="nombre" class="form-control input-border" placeholder="Ingrese el nombre de la receta" />
                    </div>

                    <div class="mb-3">
                        <label for="description-receta" class="form-label">Descripción:</label>
                        <textarea id="description-receta" name="descripcion" class="form-control input-border textarea-fija" rows="4" placeholder="Describa la receta"></textarea>
                    </div>

                    <div class="tiempo-dificultad">
                        <div class="tiempo">
                            <label class="form-label">Tiempo de preparación:</label>
                            <input type="text" name="tiempo_preparacion" class="form-control input-border" placeholder="Ej: 30 minutos" />
                        </div>

                        <div class="separador-vertical"></div>

                        <div class="dificultad">
                            <label class="form-label">Dificultad:</label>
                            <div class="dificultad-con-icono">
                                <i class="ph ph-square-fill" id="icon-dificultad" style="font-size: 24px; color: green;"></i>
                                <select id="select-dificultad" name="dificultad" class="form-control input-border" onchange="cambiarColorIcono()">
                                    <option value="" disabled selected>Seleccionar dificultad</option>
                                    <option value="Baja">Baja</option>
                                    <option value="Media">Media</option>
                                    <option value="Alta">Alta</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="zona-derecha">
                    <div class="imagen-receta">
                        <label class="form-label lbl-seleccionar-imagen">Seleccionar imagen:</label>

                        <div id="img-container-receta" class="img-container">
                            <i class="ph ph-image icono-placeholder"></i>
                            <img id="preview-imagen-receta" style="display: none; max-width: 100%; height: auto;" />
                            <input type="file" id="input-imagen-receta" name="imagen" accept="image/*" style="display: none;" />
                        </div>
                    </div>

                    <div class="estrellas">
                        <i class="ph ph-star" style="font-size: 24px;"></i>
                        <i class="ph ph-star" style="font-size: 24px;"></i>
                        <i class="ph ph-star" style="font-size: 24px;"></i>
                        <i class="ph ph-star" style="font-size: 24px;"></i>
                        <i class="ph ph-star" style="font-size: 24px;"></i>
                    </div>
                </div>
            </div>

            <!-- Ingredientes -->
            <div class="cont-ingred">
                <h2 class="lbl_ingredientes">Ingredientes</h2>
                <div class="linea-ingred"></div>
            </div>

            <div class="zona-ingredientes">
                <div id="lista-ingredientes" class="lista-dinamica">
                    <input type="text" name="ingredientes[]" class="form-control input-border" placeholder="Ingrediente 1" />
                </div>
                <button type="button" onclick="agregarIngrediente()" class="btn-agregar btn-agregar-ingrediente">Añadir más</button>
            </div>

            <!-- Pasos -->
            <div class="cont-pasos">
                <h2 class="lbl_pasos">Pasos</h2>
                <div class="linea-pasos"></div>
            </div>

            <div class="zona-pasos">
                <div id="lista-pasos" class="lista-dinamica">
                    <div class="paso-item">
                        <div class="paso-imagen-small" onclick="this.querySelector('input').click()">
                            <i class="ph ph-image icono-placeholder"></i>
                            <img class="img-preview" style="display:none;" />
                            <input type="file" accept="image/*" class="input-paso-img" style="display:none;" onchange="mostrarPreviewPaso(this, this.previousElementSibling)" />
                        </div>
                        <input type="text" name="pasos[]" class="form-control input-border paso-input" placeholder="Paso 1" />
                    </div>
                </div>
                <button type="button" onclick="agregarPaso()" class="btn-agregar btn-agregar-paso">Añadir más</button>
            </div>

            <!-- Botón Guardar -->
            <div class="boton-guardar">
                <button type="submit" class="btn-guardar">Guardar receta</button>
            </div>
        </form>
    </div>

    <!-- Cargar AlertifyJS primero -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

    <!-- Después correr alertify.success o alertify.error -->
    <script>
        @if (session('success'))
            alertify.success("{{ session('success') }}");
        @endif

        @if (session('error'))
            alertify.error("{{ session('error') }}");
        @endif
    </script>

    <!-- Luego tus propios scripts -->
    <script src="https://unpkg.com/phosphor-icons"></script>
    <script src="js/scripts_crear_receta.js"></script>

    <!-- Validación con AlertifyJS -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            function setInvalid(input) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
            function setValid(input) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            }

            // Validaciones
            function validateNombre() {
                const input = document.getElementById('name-receta');
                const value = input.value.trim();
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü.,/\s]+$/;
                if (!value || !regex.test(value)) {
                    setInvalid(input);
                    return false;
                }
                setValid(input);
                return true;
            }

            function validateDescripcion() {
                const input = document.getElementById('description-receta');
                const value = input.value.trim();
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9.,/\s]+$/;
                if (!value || !regex.test(value)) {
                    setInvalid(input);
                    return false;
                }
                setValid(input);
                return true;
            }

            function validateTiempo() {
                const input = document.querySelector('input[name="tiempo_preparacion"]');
                const value = input.value.trim();
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9.,/\s]+$/;
                if (!value || !regex.test(value)) {
                    setInvalid(input);
                    return false;
                }
                setValid(input);
                return true;
            }

            function validateDificultad() {
                const input = document.getElementById('select-dificultad');
                if (!input.value) {
                    setInvalid(input);
                    return false;
                }
                setValid(input);
                return true;
            }

            function validateIngredientes() {
                let valid = true;
                const inputs = document.querySelectorAll('input[name="ingredientes[]"]');
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9.,/\s]+$/;
                inputs.forEach(input => {
                    const value = input.value.trim();
                    if (!value || !regex.test(value)) {
                        setInvalid(input);
                        valid = false;
                    } else {
                        setValid(input);
                    }
                });
                return valid;
            }

            function validatePasos() {
                let valid = true;
                const inputs = document.querySelectorAll('input[name="pasos[]"]');
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9.,/\s]+$/;
                inputs.forEach(input => {
                    const value = input.value.trim();
                    if (!value || !regex.test(value)) {
                        setInvalid(input);
                        valid = false;
                    } else {
                        setValid(input);
                    }
                });
                return valid;
            }

            // Eventos blur para validación instantánea
            document.getElementById('name-receta').addEventListener('blur', validateNombre);
            document.getElementById('description-receta').addEventListener('blur', validateDescripcion);
            document.querySelector('input[name="tiempo_preparacion"]').addEventListener('blur', validateTiempo);
            document.getElementById('select-dificultad').addEventListener('change', validateDificultad);

            // Delegación para ingredientes y pasos dinámicos
            document.getElementById('lista-ingredientes').addEventListener('blur', function (e) {
                if (e.target.matches('input[name="ingredientes[]"]')) validateIngredientes();
            }, true);
            document.getElementById('lista-pasos').addEventListener('blur', function (e) {
                if (e.target.matches('input[name="pasos[]"]')) validatePasos();
            }, true);

            // Validación al enviar el formulario
            document.getElementById('crearRecetaForm').addEventListener('submit', function (e) {
                e.preventDefault();

                if (!validateNombre()) {
                    alertify.error('El nombre de la receta solo debe contener letras.');
                    return;
                }
                if (!validateDescripcion()) {
                    alertify.error('La descripción solo debe contener letras y números.');
                    return;
                }
                if (!validateTiempo()) {
                    alertify.error('El tiempo de preparación solo puede contener letras y números. ');
                    return;
                }
                if (!validateDificultad()) {
                    alertify.error('Debe seleccionar un nivel de dificultad.');
                    return;
                }
                if (!validateIngredientes()) {
                    alertify.error('Cada ingrediente solo puede contener letras y números.');
                    return;
                }
                if (!validatePasos()) {
                    alertify.error('Cada paso solo puede contener letras y números.');
                    return;
                }

                // Si todo está bien, envía el formulario
                this.submit();
            });
        });
    </script>
</body>
</html>
