document.getElementById("login").addEventListener("click", () => {
  alert("Lo sentimos! esta funcionalidad aun no esta disponible");
});
document.querySelector(".btn-submit").addEventListener("click", () => {
  Swal.fire({
    title: "<strong> <u>App en desarrollo</u></strong>",
    icon: "info",
    html: `
       Te invitamos a ver <a href="../../index.html"><b>Nuestra lista de productos</b></a>
      `,

    focusConfirm: false,
  });
});

const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener referencias a los campos del formulario
  const firstName = form.elements["first_name"];
  const lastName = form.elements["last_name"];
  const email = form.elements["email"];
  const password = form.elements["password"];

  // Realizar validaciones
  if (!firstName.value.trim()) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  if (!lastName.value.trim()) {
    alert("Por favor, ingresa tu apellido.");
    return;
  }

  if (!email.value.trim()) {
    alert("Por favor, ingresa tu correo electrónico.");
    return;
  }

  // Puedes realizar más validaciones para el formato del correo electrónico, contraseña, etc.

  // Si todas las validaciones pasan, puedes enviar el formulario
  form.submit();
});
