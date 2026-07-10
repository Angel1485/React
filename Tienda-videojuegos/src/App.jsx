import { useState } from 'react'
import data from './data/videojuegos'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TablaVideojuegos from './pages/TablaVideojuegos'
import FormularioVideoJuego from './pages/FormularioVideoJuegos';
import NoEncontrada from './pages/noEncontrada'

function App() {

  const [videojuegos, setVideoJuegos] = useState(data)

  function agregarVideojuego(juegoNuevo) {
    setVideoJuegos([...videojuegos, juegoNuevo])
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((vj) => vj.id !== id);
    setVideoJuegos(filtrados);
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

  function manejarGuardar(videoJuego){
    const existe = videojuegos.find((vj)=> vj.id === videoJuego.id );
    if(existe){
      editarVideojuego(videoJuego);
    }else{
      agregarVideojuego(videoJuego);
    }
  }

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
       
        <Route
          path="/"
          element={
            <TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminarVideojuego} />
          }
        />

          <Route
          path="/nuevo"
          element={<FormularioVideoJuego onGuardar={manejarGuardar} />}
        />

        <Route
          path="/editar"
          element={<FormularioVideoJuego onGuardar={manejarGuardar} />}
        /> 

        <Route
          path="*"
          element={<NoEncontrada />}
        />

      </Routes>
    </BrowserRouter>
  )
  
}

export default App
