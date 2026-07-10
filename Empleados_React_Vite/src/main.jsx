import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Empleados from './pages/empleados.jsx'
// import data from './data/empleados.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <App />
  </StrictMode>,  
  // <StrictMode>
  //   <Empleados empleados={data}/>
  // </StrictMode>,

)
