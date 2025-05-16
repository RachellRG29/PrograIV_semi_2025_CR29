document.getElementById("formRegistro").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);

  fetch("registro.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Configuración de Toast para todos los mensajes
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: data.icon || (data.success ? 'success' : 'error'),
      title: data.message
    });

    if (data.success && data.redirect) {
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 3000); // Redirigir después de 3 segundos
    }
  })
  .catch(error => {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'Error en la conexión con el servidor',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  });
});