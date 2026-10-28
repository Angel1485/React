function retirarDinero(monto) {
  const saldoDisponible = 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (monto <= saldoDisponible) {
        const saldoRestante = saldoDisponible - monto;
        resolve(`Retiro exitoso de $${monto}. Saldo restante: $${saldoRestante}`);
      } else {
        reject(`Fondos insuficientes. Límite de retiro: $500`);
      }
    }, 1500); // 1.5 segundos
  });
}

// Caso exitoso
retirarDinero(200)
  .then((mensaje) => console.log("✅", mensaje))
  .catch((error) => console.log("❌", error));

// Caso fallido
retirarDinero(600)
  .then((mensaje) => console.log("✅", mensaje))
  .catch((error) => console.log("❌", error));