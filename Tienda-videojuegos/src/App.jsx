import { useState, useEffect } from 'react'
import data from './data/videojuegos'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TablaVideojuegos from './pages/TablaVideojuegos'
import FormularioVideoJuego from './pages/FormularioVideoJuegos';
import NoEncontrada from './pages/noEncontrada'
import AlertaNotificacion from './pages/AlertaNotificacion'; // Importar

function App() {

  const [videojuegos, setVideoJuegos] = useState(() => {
    const guardados = localStorage.getItem("lista_videojuegos");
    // Si existe y NO está vacío → lo usamos
    if (guardados) {
      const datosGuardados = JSON.parse(guardados);
      if (datosGuardados.length > 0) {
        return datosGuardados;
      }
    }
    // Si no existe o está vacío → cargamos siempre data
    return data;
  });

  // Este efecto se queda igual
  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);


   // Estados para controlar la alerta
  const [alerta, setAlerta] = useState({
    visible: false,
    mensaje: ""
  });

  // Función para mostrar la alerta fácilmente
  function mostrarAlerta(mensaje) {
    setAlerta({ visible: true, mensaje });
  }

  // Función para cerrar la alerta
  function cerrarAlerta() {
    setAlerta({ visible: false, mensaje: "" });
  }

  function agregarVideojuego(juegoNuevo) {
    setVideoJuegos([...videojuegos, juegoNuevo])
    mostrarAlerta("✅ Videojuego agregado correctamente");
  }

  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((vj) => vj.id !== id);
    setVideoJuegos(filtrados);
    mostrarAlerta("🗑️ Videojuego eliminado correctamente");
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
    mostrarAlerta("✏️ Videojuego actualizado correctamente");
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
      {/* Componente de alerta */}
      <AlertaNotificacion 
        mensaje={alerta.mensaje} 
        mostrar={alerta.visible} 
        onCierre={cerrarAlerta}
      />

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
