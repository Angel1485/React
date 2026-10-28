function consultarClima(ciudad) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos que siempre hay datos
      resolve({
        ciudad: ciudad,
        temperatura: "24°C",
        condicion: "Soleado",
      });
    }, 1500);
  });
}

async function mostrarClima(ciudad) {
  try {
    console.log(`🔎 Consultando clima de ${ciudad}...`);
    const clima = await consultarClima(ciudad);
    console.log(`📍 Ciudad: ${clima.ciudad}`);
    console.log(`🌡️  Temperatura: ${clima.temperatura}`);
    console.log(`☀️  Condición: ${clima.condicion}`);
  } catch (error) {
    console.error("❌ Error al consultar el clima:", error);
  }
}

mostrarClima("Bogotá");