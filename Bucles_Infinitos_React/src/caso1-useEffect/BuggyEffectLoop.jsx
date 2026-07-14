import { useState, useEffect } from 'react';

function BuggyEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ERROR: falta el arreglo de dependencias (segundo argumento).
    // Esto hace que el efecto se dispare después de cada render.
    setCount(count + 1);
  }); // <-- sin [] ni [count]: se ejecuta siempre

  return (
    <div className="case-box error">
      <h3>❌ Versión con error</h3>
      <div>
        Contador: <strong>{count}</strong>
      </div>
      <p className="warning">
        Este componente entra en un ciclo de renderizado continuo.
        Si se activas, el contador subirá sin control y la pestaña
        puede volverse lenta o dejar de responder. Se recomienda
        activarlo solo brevemente para observar el comportamiento.
      </p>
    </div>
  );
}

export default BuggyEffectLoop;