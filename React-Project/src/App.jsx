import { useState } from 'react';
import './App.css'; 

function Pelicula({ titulo }) {
  const [esFavorita, setEsFavorita] = useState(false);

  return (
    <p 
      onClick={() => setEsFavorita(!esFavorita)} 
      className={`movie-item ${esFavorita ? 'is-favorite' : ''}`}
    >
      <span>{titulo}</span>
      {esFavorita && <span className="star-icon">⭐</span>}
    </p>
  );
}

function App() {
  const [peliculas, setPeliculas] = useState(["Vengadores DoomsDay", "Matrix", "Inception", "Coco", "Interstellar"]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");

  const agregarPelicula = () => {
    if (nuevoTitulo.trim() === "") return;
    setPeliculas([...peliculas, nuevoTitulo]);
    setNuevoTitulo("");
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Mis Películas Favoritas</h1>

      <div className="input-container">
        <input
          type="text"
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          placeholder="Escribe una nueva película..."
          className="movie-input"
        />
        <button onClick={agregarPelicula} className="btn-add">Agregar</button>
      </div>

      <div className="movies-list">
        {peliculas.map((titulo, index) => (
          <Pelicula key={index} titulo={titulo} />
        ))}
      </div>
    </div>
  );
}

export default App;