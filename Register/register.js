document.getElementById("formRegistro").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita la recarga

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
      this.reset(); // Limpia el formulario si se guardó correctamente
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