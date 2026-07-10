import { useNavigate } from "react-router-dom";
import './NoEncontrada.css'; // Asegúrate de importar el CSS

function NoEncontrada() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-error">404</h1>
                <h2 className="not-found-title">Página No Encontrada</h2>
                <p className="not-found-text">
                    Lo sentimos, el videojuego o la sección que buscas no existe o fue movida.
                </p>
                <button className="btn-home" onClick={() => navigate("/")}>
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
}

export default NoEncontrada;