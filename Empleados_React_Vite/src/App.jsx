import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import data from './data/empleados'

function App() {
  
  const [empleados, setEmpleados] = useState(data)

  function agregarEmpleado(empleadoNuevo) {
    
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

  return 
}

export default App
