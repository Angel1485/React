function verificarEdad(edad) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (edad >= 18) {
        resolve("Acceso concedido. Bienvenido a la plataforma");
      } else {
        reject("Acceso denegado. Registro permitido solo para mayores de edad");
      }
    }, 1000); // 1 segundo
  });
}

verificarEdad(20)
  .then((msg) => console.log("✅", msg))
  .catch((err) => console.log("❌", err));

verificarEdad(15)
  .then((msg) => console.log("✅", msg))
  .catch((err) => console.log("❌", err));