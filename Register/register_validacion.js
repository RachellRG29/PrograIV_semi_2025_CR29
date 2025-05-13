
/* ---------------------------    VALIDACIÓN DEL NOMBRE COMPLETO -------------------------------------- */
  const fullnameInput = document.getElementById('fullname');
  const fullnameMessage = document.getElementById('fullname-message');
  const registerBtn = document.getElementById('registerBtn');
 

  // Expresión regular: al menos dos palabras, cada una con 3+ letras, separadas por UN solo espacio
  const regex = /^([a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,})(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,})+$/;

  // Función para validar el nombre completo
  function validateFullname(value) {
    value = value.trim().replace(/\s{2,}/g, ' '); // Remover espacios múltiples
    fullnameInput.value = value; // Actualizar valor del input
    return regex.test(value); // Comprobar con el regex
  }

  // Validar el input mientras se escribe
  fullnameInput.addEventListener('input', function () {
    const cleanedValue = this.value.trim().replace(/\s{2,}/g, ' ');
    this.value = cleanedValue;

    // Validación de vacío o formato incorrecto
    if (cleanedValue === "") {
      fullnameMessage.textContent = 'Este campo es obligatorio.';
      fullnameMessage.className = 'form-text mt-1 text-danger';
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      registerBtn.disabled = true;
    } else if (validateFullname(cleanedValue)) {
      fullnameMessage.textContent = 'Datos correctos ✅';
      fullnameMessage.className = 'form-text mt-1 text-success';
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
      registerBtn.disabled = false;
    } else {
      fullnameMessage.textContent = 'Ingrese nombre y apellido, mínimo 3 letras cada uno, sin espacios múltiples.';
      fullnameMessage.className = 'form-text mt-1 text-danger';
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
      registerBtn.disabled = true;
    }
  });

  // Prevenir espacios consecutivos y asegurarnos de que cada palabra tenga al menos 3 letras
  fullnameInput.addEventListener('keydown', function (e) {
    const char = e.key;

    if (
      e.ctrlKey || e.metaKey ||
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)
    ) return;

    if (char === ' ') {
      e.preventDefault(); // evitamos el espacio por defecto

      // Esperamos al siguiente tick para obtener el valor actualizado
      setTimeout(() => {
        const value = fullnameInput.value.trim().replace(/\s{2,}/g, ' ');
        const parts = value.split(' ');
        const lastPart = parts[parts.length - 1] || '';

        // Si última palabra tiene al menos 3 letras, agregamos espacio
        if (lastPart.length >= 3) {
          fullnameInput.value = value + ' ';
        }
      }, 0);

      return;
    }

    // Solo permitir letras
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(char)) {
      e.preventDefault();
    }
  });

  // Validar pegado de texto
  fullnameInput.addEventListener('paste', function (e) {
    const pasted = e.clipboardData.getData('text');

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(pasted)) {
      e.preventDefault();
      fullnameMessage.textContent = 'No se permiten números ni signos al pegar.';
      fullnameMessage.className = 'form-text mt-1 text-danger';
      registerBtn.disabled = true;
      return;
    }

    const cleaned = pasted.trim().replace(/\s{2,}/g, ' ');
    if (!validateFullname(cleaned)) {
      e.preventDefault();
      fullnameMessage.textContent = 'Pegado inválido. Asegúrese de que haya al menos dos palabras de 3 letras.';
      fullnameMessage.className = 'form-text mt-1 text-danger';
      registerBtn.disabled = true;
    }
  });

  // Validar el formulario antes de enviarlo
  form.addEventListener('submit', function (e) {
    const value = fullnameInput.value.trim().replace(/\s{2,}/g, ' ');
    if (!validateFullname(value)) {
      e.preventDefault();
      fullnameMessage.textContent = 'Complete correctamente su nombre completo.';
      fullnameMessage.className = 'form-text mt-1 text-danger';
      registerBtn.disabled = true;
    }
  });



/* -----------------    FUNCIONES DE FECHA DE NACIMIENTO ----------------------- */
  const birthdateInput = document.getElementById('birthdate');
  const messageDiv = document.getElementById('birthdate-message');

  birthdateInput.addEventListener('input', function () {
    const value = this.value;
    const inputDate = new Date(value);
    const today = new Date();

    if (!value) {
      messageDiv.textContent = 'Debe ingresar una fecha de nacimiento.';
      messageDiv.className = 'form-text mt-1 text-danger';
      this.classList.remove('is-valid', 'is-invalid');
      return;
    }

    // Calcular la edad exacta
    const age = today.getFullYear() - inputDate.getFullYear();
    const monthDiff = today.getMonth() - inputDate.getMonth();
    const dayDiff = today.getDate() - inputDate.getDate();
    let is18 = false;

    if (
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    ) {
      is18 = true;
    }

    // Validaciones
    const minDate = new Date('1925-01-01');
    if (inputDate < minDate) {
      messageDiv.textContent = 'La fecha no puede ser menor a 1925.';
      messageDiv.className = 'form-text mt-1 text-danger';
      this.classList.remove('is-valid');
      this.classList.add('is-invalid');
    } else if (!is18) {
      messageDiv.textContent = 'Debe tener al menos 18 años para registrarse.';
      messageDiv.className = 'form-text mt-1 text-danger';
      this.classList.remove('is-valid');
      this.classList.add('is-invalid');
    } else {
      messageDiv.textContent = 'Fecha válida. Todo está correcto ✅';
      messageDiv.className = 'form-text mt-1 text-success';
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
    }
  });

  // Evita mostrar el borde rojo al cargar
  window.addEventListener('DOMContentLoaded', () => {
    birthdateInput.classList.remove('is-invalid', 'is-valid');
  });



/* -----------------    VALIDACIÓN DEL GÉNERO ----------------------- */
  const genderSelect = document.getElementById('gender');
  const genderMessage = document.getElementById('gender-message');
  const form = document.getElementById('registroForm');

  // Al cargar, limpiar estilos
  window.addEventListener('DOMContentLoaded', () => {
    genderSelect.classList.remove('is-valid', 'is-invalid');
    genderMessage.style.display = 'none';
  });

  // Validar al seleccionar una opción
  genderSelect.addEventListener('change', function () {
    if (this.value !== "") {
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
      genderMessage.textContent = 'Selección válida ✅';
      genderMessage.className = 'form-text mt-1 text-success';
      genderMessage.style.display = 'block';
    }
  });

  // Validar al enviar el formulario
  form.addEventListener('submit', function (e) {
    let valid = true;

    // Validación del género
    if (genderSelect.value === "") {
      genderSelect.classList.remove('is-valid');
      genderSelect.classList.add('is-invalid');
      genderMessage.textContent = 'Debe seleccionar un género.';
      genderMessage.className = 'form-text mt-1 text-danger';
      genderMessage.style.display = 'block';
      valid = false;
    }

    // Cancelar envío si algo no es válido
    if (!valid) {
      e.preventDefault();
    }
  });


/*  ---------------------------    FUNCIONES DE CORREO -------------------------------------- */
  const emailInput = document.getElementById('email');
  const emailMessage = document.getElementById('email-message');
  // Expresión regular para correos con extensiones válidas y dominio completo
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|ugb\.edu\.sv|co\.sv|co\.uk|co\.nz|tv|me|int|io|info|us|sg|ca|au)\b$/;

  emailInput.addEventListener('keydown', function (e) {
    // Prevenir el espacio
    if (e.key === ' ') {
      e.preventDefault();
    }
  });

  emailInput.addEventListener('input', function () {
    const value = this.value;

    if (emailRegex.test(value)) {
      emailMessage.textContent = 'Correo válido ✅';
      emailMessage.className = 'form-text mt-1 text-success';
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
    } else {
      emailMessage.textContent = 'Ingrese un correo válido (ejemplo@gmail.com)';
      emailMessage.className = 'form-text mt-1 text-danger';
      this.classList.add('is-invalid');
      this.classList.remove('is-valid');
    }
  });


/*  -----------------    FUNCIONES DE CONTRASERÑA Y CONFIRMAR CONTRASEÑA ----------------------- */
  function toggleVisibility(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
      input.type = "text";
      icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      input.type = "password";
      icon.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }

  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const matchMessage = document.getElementById('match-message');

  const reqLength = document.getElementById('req-length');
  const reqUppercase = document.getElementById('req-uppercase');
  const reqNumber = document.getElementById('req-number');
  const reqSymbol = document.getElementById('req-symbol');
  const reqSpace = document.getElementById('req-space');

  const checkLength = document.getElementById('check-length');
  const checkUppercase = document.getElementById('check-uppercase');
  const checkNumber = document.getElementById('check-number');
  const checkSymbol = document.getElementById('check-symbol');
  const checkSpace = document.getElementById('check-space');

  // Bloquear espacios
  passwordInput.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });

  confirmPasswordInput.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });

  // Verificar todas las validaciones de la contraseña
  function allValidationsPassed() {
    const value = passwordInput.value;
    return (
      value.length >= 6 &&
      /[A-Z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(value) &&
      !/\s/.test(value)
    );
  }

  // Actualizar mensaje y color de validación
  function updateItem(element, isValid, text, checkIcon) {
    element.textContent = text;
    element.className = isValid ? 'text-success' : 'text-danger';
    checkIcon.style.display = isValid ? 'inline' : 'none'; // Mostrar el cheque cuando sea válido
  }

  // Verificar si la contraseña y la confirmación coinciden
  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;

    if (confirm === '') {
      matchMessage.textContent = '';
      confirmPasswordInput.style.borderColor = '';
    } else if (password === confirm && allValidationsPassed()) {
      matchMessage.textContent = 'Las contraseñas coinciden';
      matchMessage.className = 'form-text mt-1 text-success';
      confirmPasswordInput.style.borderColor = 'green';
    } else {
      matchMessage.textContent = 'Las contraseñas no coinciden';
      matchMessage.className = 'form-text mt-1 text-danger';
      confirmPasswordInput.style.borderColor = '';
    }
  }

  // Escuchar cambios en la contraseña
  passwordInput.addEventListener('input', function () {
    const value = this.value;

    // Actualizar las validaciones
    updateItem(reqLength, value.length >= 6, 'Al menos 6 caracteres', checkLength);
    updateItem(reqUppercase, /[A-Z]/.test(value), 'Debe tener al menos una mayúscula', checkUppercase);
    updateItem(reqNumber, /\d/.test(value), 'Debe tener al menos un número', checkNumber);
    updateItem(
      reqSymbol,
      /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(value),
      'Debe tener al menos un signo (!@#$%^&*()[]{};:,.<>?\\| etc.)',
      checkSymbol
    );
    updateItem(reqSpace, !/\s/.test(value), 'No debe tener espacios', checkSpace);

    // Actualizar el borde del input de la contraseña
    if (allValidationsPassed()) {
      passwordInput.style.borderColor = 'green';
    } else {
      passwordInput.style.borderColor = '';
    }

    checkPasswordMatch();
  });

  // Escuchar cambios en la confirmación de la contraseña
  confirmPasswordInput.addEventListener('input', checkPasswordMatch);
