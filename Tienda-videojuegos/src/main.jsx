import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TablaVideojuegos from './components/TablaVideojuegos.jsx'
import data from './data/videojuegos.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <StrictMode>
    <TablaVideojuegos videojuegos = {data} />
  </StrictMode>,

)
