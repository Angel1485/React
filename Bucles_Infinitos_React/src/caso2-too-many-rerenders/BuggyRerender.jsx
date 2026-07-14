import { useState } from 'react';

function BuggyRerender() {
  const [count, setCount] = useState(0);

  // ERROR: actualización de estado en el cuerpo del componente,
  // fuera de un evento o un efecto controlado.
  setCount(count + 1);

  //Este mensaje nunca llegar a mostrarse, porque antes de que React termine de renderizar el componente, ya está entrando en un ciclo infinito debido a setCount(count + 1).
  return (
    <div className="case-box error">
      <h3>❌ Versión con error</h3>
      <div>
        Contador: <strong>{count}</strong>
      </div>
    </div>
  );
}

export default BuggyRerender;