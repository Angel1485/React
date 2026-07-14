import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideoJuegos.css'

function FormularioVideoJuego({onGuardar}){

    const location = useLocation();
    const navigate = useNavigate();

    const videoJuegoRecuperado = location.state?.juego || null;

    // Fecha máxima permitida: hoy (formato YYYY-MM-DD para el input date)
    const fechaHoy = new Date().toISOString().split("T")[0];

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacionCritica, setCalificacionCritica] = useState("");
    const [precio, setPrecio] = useState(""); 
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("");

    useEffect(()=>{
      if(videoJuegoRecuperado){
        setTitulo(videoJuegoRecuperado.titulo);
        setGenero(videoJuegoRecuperado.genero);
        setPlataforma(videoJuegoRecuperado.plataforma);
        setLanzamiento(videoJuegoRecuperado.lanzamiento);
        setFechaLanzamiento(videoJuegoRecuperado.fechaLanzamiento || "");
        setSinopsis(videoJuegoRecuperado.sinopsis || "");
        setCalificacionCritica(videoJuegoRecuperado.calificacionCritica ?? "");
        setPrecio(videoJuegoRecuperado.precio);
        setDisponible(videoJuegoRecuperado.disponible);
        setProgreso(videoJuegoRecuperado.progreso);
      }else{
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setLanzamiento("");
        setFechaLanzamiento("");
        setSinopsis("");
        setCalificacionCritica("");
        setPrecio("");
        setDisponible(true);
        setProgreso("");
      }
    }, [videoJuegoRecuperado]);

    function manejarGuardar(){
        // Validación: la fecha de lanzamiento no puede ser futura
        if (fechaLanzamiento && fechaLanzamiento > fechaHoy) {
            alert("La fecha de lanzamiento no puede ser una fecha futura.");
            return;
        }

        // Validación: sinopsis entre 10 y 250 caracteres
        if (sinopsis.length < 10 || sinopsis.length > 250) {
            alert("La sinopsis debe tener entre 10 y 250 caracteres.");
            return;
        }

        // Validación: calificación de la crítica entre 1 y 100
        const calificacionNum = Number(calificacionCritica);
        if (calificacionCritica === "" || calificacionNum < 1 || calificacionNum > 100) {
            alert("La calificación de la crítica debe estar entre 1 y 100.");
            return;
        }

        const videoJuego = {
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            fechaLanzamiento: fechaLanzamiento,
            sinopsis: sinopsis,
            calificacionCritica: calificacionNum,
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso)
        };

         onGuardar(videoJuego)
         navigate("/") 
    }

    function manejarCancelar(){
         navigate("/") 
    }

    return(
        <div className="form-container">
            <h2 className="form-title">
              {videoJuegoRecuperado ? "Editar VideoJuego" : "Registrar Nuevo VideoJuego"}
            </h2>
            
            <div className="form-group">
                <label>Nombre del Video Juego</label>
                <input 
                    type="text" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    placeholder="Ej: Dios de la Guerra"
                />
            </div>

            <div className="form-group">
                <label>Genero</label>
                <input
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    placeholder="Ej: Accion"
                    min="18"
                />
            </div>

            <div className="form-group">
                <label>Plataforma</label>
                <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                    <option value="">Selecciona un departamento</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="PlayStation 4">PlayStation 4</option>
                    <option value="PC">PC</option>
                    <option value="Multiplataforma">Multiplataforma</option>
                    <option value="Xbox Series X">Xbox Series X</option>
                </select>
            </div>

            <div className="form-group">
                <label>Año de Lanzamiento</label>
                <input
                    type="text"
                    value={lanzamiento}
                    onChange={(e) => setLanzamiento(e.target.value)}
                    placeholder="Ej: 2020"
                    min="18"
                />
            </div>

            <div className="form-group">
                <label>Fecha de Lanzamiento</label>
                <input
                    type="date"
                    value={fechaLanzamiento}
                    onChange={(e) => setFechaLanzamiento(e.target.value)}
                    max={fechaHoy}
                />
            </div>

            <div className="form-group">
                <label>Sinopsis / Descripción</label>
                <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    placeholder="Escribe una reseña corta del videojuego (10 a 250 caracteres)"
                    minLength={10}
                    maxLength={250}
                    rows={4}
                />
                <small>{sinopsis.length}/250 caracteres</small>
            </div>

            <div className="form-group">
                <label>Calificación de la Crítica</label>
                <input
                    type="number"
                    value={calificacionCritica}
                    onChange={(e) => setCalificacionCritica(e.target.value)}
                    placeholder="Ej: 85 (entre 1 y 100)"
                    min="1"
                    max="100"
                />
            </div>

            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej: 18"
                    min="18"
                />
            </div>

            <div className="form-group">
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={disponible}
                        onChange={(e) => setDisponible(e.target.checked)}
                    />
                    <label htmlFor="activo" className="checkbox-label">
                      Estado: <span className={`status-badge ${disponible ? 'active' : 'inactive'}`}>{disponible ? "Activo" : "Inactivo"}</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Progreso</label>
                <input
                    type="number"
                    value={progreso}
                    onChange={(e) => setProgreso(e.target.value)} 
                    placeholder="Ej: 0.1 a 1"
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={manejarCancelar}>Cancelar</button>
                <button type="button" className="btn-save" onClick={manejarGuardar}>Guardar</button>
            </div>
        </div>
    ) 
}

export default FormularioVideoJuego;