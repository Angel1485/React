import { useState } from 'react'
import data from './data/videojuegos'

function App() {

  const [videojuegos, setVideoJuegos] = useState(data)

  function agregarVideojuego(juegoNuevo) {
    
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((vj) => vj.id !== id);
    setEmpleados(filtrados);
  }

  function editarVideojuego(videojuegoEditado) {
    const actualizados = videojuegos.map((vj) => {
      if (vj.id === videojuegoEditado.id) {
        return videojuegoEditado;
      } else {
        return vj;
      }
    });

    setVideoJuegos(actualizados);
  }

  return 
  
}

export default App
