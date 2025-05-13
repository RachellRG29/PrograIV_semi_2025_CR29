document.getElementById("formRegistro").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch("registro.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: data.success ? 'success' : 'error',
      title: data.message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    if (data.success) {
      this.reset();
      // Redirigir después de 3 segundos (coincide con el timer del Swal)
      setTimeout(() => {
        window.location.href = "/Login/login.html";
      }, 3000);
    }
  })
  .catch(error => {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: '❌ Error en la conexión con el servidor',
      showConfirmButton: false,
      timer: 3000
    });
  });
});