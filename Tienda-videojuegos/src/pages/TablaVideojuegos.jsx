import React from 'react';
import './TablaVideojuegos.css';
import { useNavigate } from 'react-router-dom';

function Videojuegos({ videojuegos, onEliminar }) {

  const navigate = useNavigate();
  
  function manejarEditar(vj){
    navigate('/editar', { state: { juego: vj } });
  }

  return (
    <div className="pantalla-centrada">
      <div className="panel-container">
        
        {/* Encabezado del panel */}
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Panel de Videojuegos</h2>
            <p className="panel-subtitle">
              Gestión y registro total de juegos activos en la plataforma.
            </p>
          </div>
          <div className="panel-badge-total">
            {videojuegos.length} Registros totales
          </div>
        </div>

        {/* Contenedor Grid de Tarjetas */}
        <div className="cards-grid">
          {videojuegos.map((vj) => {
            return (
              <div key={vj.id} className="game-card">
                
                {/* Título y Estado */}
                <div className="game-card-header">
                  <h3 className="game-title">{vj.titulo}</h3>
                  <span className={`status-badge ${vj.disponible ? 'active' : 'inactive'}`}>
                    {vj.disponible ? "Disponible" : "No Disponible"}
                  </span>
                </div>

                {/* Detalles del Juego — TODOS los campos del formulario */}
                <div className="game-details">
                  <div className="game-info-row">
                    <span className="game-info-label">Género:</span>
                    <span className="game-info-value">{vj.genero || "Sin especificar"}</span>
                  </div>
                  
                  <div className="game-info-row">
                    <span className="game-info-label">Plataforma:</span>
                    <span className="game-info-value">{vj.plataforma || "Sin especificar"}</span>
                  </div>

                  <div className="game-info-row">
                    <span className="game-info-label">Año de lanzamiento:</span>
                    <span className="game-info-value">{vj.lanzamiento || "Sin especificar"}</span>
                  </div>

                  <div className="game-info-row">
                    <span className="game-info-label">Fecha de lanzamiento:</span>
                    <span className="game-info-value">
                      {vj.fechaLanzamiento 
                        ? new Date(vj.fechaLanzamiento).toLocaleDateString() 
                        : "Sin especificar"}
                    </span>
                  </div>

                  <div className="game-info-row">
                    <span className="game-info-label">Calificación crítica:</span>
                    <span className="game-info-value">{vj.calificacionCritica ? `${vj.calificacionCritica}/100` : "Sin calificación"}</span>
                  </div>

                  <div className="game-info-row">
                    <span className="game-info-label">Precio:</span>
                    <span className="game-info-value">${vj.precio || "0.00"}</span>
                  </div>

                  <div className="game-info-row">
                    <span className="game-info-label">Sinopsis:</span>
                    <p className="game-info-value sinopsis-text">
                      {vj.sinopsis || "Sin descripción disponible"}
                    </p>
                  </div>
                </div>

                {/* Sección de progreso de juego */}
                <div className="progress-container">
                  <progress 
                    value={vj.progreso || 0} 
                    max="1" 
                    style={{ width: '100%', height: '8px', accentColor: '#1d4ed8' }}
                  />
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                    Progreso: {Math.round((vj.progreso || 0) * 100)}%
                  </span>
                </div>

                {/* Botones de Acción */}
                <div className="action-buttons">
                  <button 
                    onClick={() => manejarEditar(vj)}
                    className="btn btn-edit"
                    title="Editar juego">
                    Editar
                  </button>
                  <button 
                    onClick={() => onEliminar(vj.id)}
                    className="btn btn-delete"
                    title="Eliminar juego">
                    Eliminar
                  </button>
                </div>

              </div>
            );    
          })}
        </div>
      </div>
    </div>
  );
}

export default Videojuegos;
