// src/components/PokemonList.jsx
import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, loading, error }) => {
  // Manejo de estados de carga y error
  if (loading) return <div className="loading">Cargando Pokémon...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-grid">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
