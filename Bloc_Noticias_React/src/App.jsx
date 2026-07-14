import { useState } from 'react'
import './App.css'
import Header from './components/Header'  //Importa lso componentes
import ListaNoticias from './components/ListaNoticias'

function App() {

  return (
     <div className="tablero">
      <Header />  {/*Llama a la clase o componente header*/}
      <ListaNoticias />  {/*Llama a la clase o componente ListaNoticias*/}
    </div>
  )
}

export default App
