import { useState } from 'react';

export default function FixedRerender() {  //Prueba de funcion directa con export default
  const [count, setCount] = useState(0);

  // CORREGIDO: setState ahora vive dentro de un manejador de eventos
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="case-box fixed">
      <h3>✅ Versión corregida</h3>
      <div>
        Contador: <strong>{count}</strong>
      </div>
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
}