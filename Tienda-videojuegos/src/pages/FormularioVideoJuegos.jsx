import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideoJuegos.css'

function FormularioVideoJuego({onGuardar}){

    const location = useLocation();
    const navigate = useNavigate();

    const videoJuegoRecuperado = location.state?.juego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState(""); 
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState("");

    useEffect(()=>{
      if(videoJuegoRecuperado){
        setTitulo(videoJuegoRecuperado.titulo);
        setGenero(videoJuegoRecuperado.genero);
        setPlataforma(videoJuegoRecuperado.plataforma);
        setLanzamiento(videoJuegoRecuperado.lanzamiento);
        setPrecio(videoJuegoRecuperado.precio);
        setDisponible(videoJuegoRecuperado.disponible);
        setProgreso(videoJuegoRecuperado.progreso);
      }else{
        setTitulo("");
        setGenero("");
        setPlataforma("");
        setLanzamiento("");
        setPrecio("");
        setDisponible(true);
        setProgreso("");
      }
    }, [videoJuegoRecuperado]);
    
    function manejarGuardar(){
        const videoJuego = {
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
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
        /* 1. AGREGAMOS CONTENEDOR PRINCIPAL Y TITULO DINÁMICO */
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
                <label>Genero</label>
                <input
                    type="text"
                    value={lanzamiento}
                    onChange={(e) => setLanzamiento(e.target.value)}
                    placeholder="Ej: 2020"
                    min="18"
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

            {/* 2. ENVOLVEMOS LOS BOTONES Y METEMOS CLASES */}
            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={manejarCancelar}>Cancelar</button>
                <button type="button" className="btn-save" onClick={manejarGuardar}>Guardar</button>
            </div>
        </div>
    ) 
}

export default FormularioVideoJuego;