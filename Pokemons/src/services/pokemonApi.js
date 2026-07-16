// src/services/pokemonApi.js

// Obtener lista básica de Pokémon
export const getPokemonList = async (limit = 20) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) throw new Error("Error al obtener la lista");
    const data = await response.json();

    // Para obtener datos completos de cada uno
    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );
    return detailedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
