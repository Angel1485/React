// src/components/PokemonCard.jsx
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        className="pokemon-img"
      />
      <div className="pokemon-info">
        <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Tipos:</strong> 
          {pokemon.types.map(t => t.type.name).join(', ')}
        </p>
        <p><strong>Habilidades:</strong> 
          {pokemon.abilities.map(a => a.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
