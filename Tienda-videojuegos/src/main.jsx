import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TablaVideojuegos from './pages/TablaVideojuegos.jsx'
import FormularioVideoJuego from './pages/FormularioVideoJuegos.jsx'
import data from './data/videojuegos.js'

createRoot(document.getElementById('root')).render(
   <StrictMode>
     <App />
   </StrictMode>,

  // <StrictMode>
  //   <TablaVideojuegos videojuegos = {data} />
  // </StrictMode>,

)
