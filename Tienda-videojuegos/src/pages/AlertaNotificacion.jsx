import { useEffect, useState } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, mostrar, onCierre }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mostrar) {
      setVisible(true);
      // Ocultar automáticamente después de 3 segundos
      const temporizador = setTimeout(() => {
        setVisible(false);
        onCierre?.(); // Notificar al padre que se cerró
      }, 6000);

      // Limpiar temporizador si el componente se desmonta
      return () => clearTimeout(temporizador);
    }
  }, [mostrar, onCierre]);

  if (!visible) return null;

  return (
    <div className="alerta-notificacion">
      {mensaje}
    </div>
  );
}

export default AlertaNotificacion;
