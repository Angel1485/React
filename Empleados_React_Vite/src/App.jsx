import { useState } from 'react'
import './App.css'
import data from './data/empleados'
import FormularioEmpleado from './pages/formularioEmpleados'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Empleados from './pages/empleados'
import NoEncontrada from './pages/noEncontrada'

function App() {
  
  const [empleados, setEmpleados] = useState(data)

  function agregarEmpleado(empleadoNuevo) {
    setEmpleados([...empleados, empleadoNuevo])
  }

  function eliminarEmpleado(id) {
    const filtrados = empleados.filter((emp) => emp.id !== id);
    setEmpleados(filtrados);
  }

  function editarEmpleado(empleadoEditado) {
    const actualizados = empleados.map((emp) => {
      if (emp.id === empleadoEditado.id) {
        return empleadoEditado;
      } else {
        return emp;
      }
    });
    setEmpleados(actualizados);
  }

  function manejarGuardar(empleado){
    const existe = empleados.find((emp)=> emp.id === empleado.id );
    if(existe){
      editarEmpleado(empleado);
    }else{
      agregarEmpleado(empleado);
    }
  }

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
       
        <Route
          path="/"
          element={
            <Empleados empleados={empleados} onEliminar={eliminarEmpleado} />
          }
        />

        <Route
          path="/nuevo"
          element={<FormularioEmpleado onGuardar={manejarGuardar} />}
        />

        <Route
          path="/editar"
          element={<FormularioEmpleado onGuardar={manejarGuardar} />}
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
