import { useState, useEffect } from 'react';

function FixedEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // CORREGIDO: condición de control + dependencia estable
    if (count < 5) {
      const timer = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 500);

      // función de limpieza: evita ejecuciones colgantes
      return () => clearTimeout(timer);
    }
  }, [count]); // <-- Arreglo de dependencias simepre se tiene que colocar

  const reiniciar = () => setCount(0);

  return (
    <div className="case-box fixed">
      <h3>✅ Versión corregida</h3>
      <div>
        Contador: <strong>{count}</strong>{' '}
        {count >= 5 && <span className="badge">Detenido</span>}
      </div>
      <button onClick={reiniciar}>Reiniciar contador</button>
    </div>
  );
}

export default FixedEffectLoop;