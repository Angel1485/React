import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import { getPokemonList } from './services/pokemonApi';
import './index.css';

function App() {
  // Estados para manejar datos, carga y errores de la app
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ejecutar la consulta al cargar la aplicación
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const data = await getPokemonList(50);  //Debe cuadrar con el numero PokemonApi de la clase
        setPokemons(data);
        setError(null);
      } catch (err) {
        setError("No se pudo cargar la lista de Pokémon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Header />
        <PokemonList 
          pokemons={pokemons} 
          loading={loading} 
          error={error} 
        />
      </main>
    </div>
  );
}

export default App;
