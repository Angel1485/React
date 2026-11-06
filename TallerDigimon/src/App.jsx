import { useEffect, useState } from 'react';
import './App.css'
import DigimonCard from './components/DigimonCard';

function App() {

  const [digimons, setDigimons] = useState([]);

  useEffect(() => {
    const obtenerDigimons = async () => {
        const response = await fetch('https://digi-api.com/api/v1/digimon?pageSize=30');  //Aqui tambien cambai para la limitacion es pageSize en ves de limit
        const datos = await response.json();
        setDigimons(datos.content);  // Se cambia dependiendo la Api de results a content
    }
    obtenerDigimons();
  }, []);

  return( 
    // Agregamos CSS a los div"
    <div className="container"> 
      <h1>Lista de Digimons</h1>
      <div className="grid-digimons">
        {digimons.map((digimon)=>{
          return <DigimonCard key = {digimon.name} digi={digimon}/>
        })}
      </div>
    </div> 
  );
}

export default App;
