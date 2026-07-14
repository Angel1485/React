import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideoJuegos.css'

function FormularioVideoJuego({onGuardar}){

    const location = useLocation();
    const navigate = useNavigate();

    const videoJuegoRecuperado = location.state?.juego || null;

    // Fecha máxima permitida: hoy
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

    // Estado para guardar errores de validación
    const [errores, setErrores] = useState({});

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
        setProgreso(videoJuegoRecuperado.progreso ?? "");
        setErrores({}); // Limpiar errores al cargar
      }else{
        reiniciarCampos();
      }
    }, [videoJuegoRecuperado]);

    const reiniciarCampos = () => {
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
        setErrores({});
    };

    // Función de validación completa
    const validarFormulario = () => {
        const nuevosErrores = {};
        const calificacionNum = Number(calificacionCritica);
        const precioNum = Number(precio);
        const lanzamientoNum = Number(lanzamiento);
        const progresoNum = Number(progreso);

        // Título
        if (!titulo.trim()) {
            nuevosErrores.titulo = "El nombre del videojuego no puede estar vacío";
        }

        // GÉNERO (agregada validación)
        if (!genero.trim()) {
            nuevosErrores.genero = "El género no puede estar vacío";
        }

        // Calificación
        if (!calificacionCritica || isNaN(calificacionNum) || calificacionNum < 1 || calificacionNum > 100) {
            nuevosErrores.calificacionCritica = "La calificación debe ser un número entre 1 y 100";
        }

        // Sinopsis
        if (!sinopsis.trim() || sinopsis.trim().length < 10) {
            nuevosErrores.sinopsis = "La sinopsis debe tener entre 10 y 250 caracteres";
        }
        if (sinopsis.length > 250) {
            nuevosErrores.sinopsis = "La sinopsis no puede superar los 250 caracteres";
        }

        // Precio
        if (!precio || isNaN(precioNum) || precioNum <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }

        // Año de lanzamiento
        if (!lanzamiento || isNaN(lanzamientoNum) || lanzamientoNum < 1950 || lanzamientoNum > new Date().getFullYear()) {
            nuevosErrores.lanzamiento = "Ingresa un año válido";
        }

        // Fecha de lanzamiento
        if (fechaLanzamiento && fechaLanzamiento > fechaHoy) {
            nuevosErrores.fechaLanzamiento = "La fecha no puede ser futura";
        }

        //  PROGRESO (corregida validación y mensaje)
        if (progreso !== "") { // Solo validar si se escribió algo
            if (isNaN(progresoNum) || progresoNum < 0 || progresoNum > 1) {
                nuevosErrores.progreso = "El progreso debe ser un valor entre 0 y 1";
            }
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Manejador de guardado
    function manejarGuardar(e){
        e.preventDefault();

        const formularioValido = validarFormulario();
        if (!formularioValido) return;

        const videoJuego = {
            id: videoJuegoRecuperado ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo.trim(),
            genero: genero.trim(),
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            fechaLanzamiento: fechaLanzamiento,
            sinopsis: sinopsis.trim(),
            calificacionCritica: Number(calificacionCritica),
            precio: Number(precio),
            disponible: disponible,
            progreso: progreso !== "" ? Number(progreso) : 0
        };

        onGuardar(videoJuego);
        navigate("/");
    }

    function manejarCancelar(){
         navigate("/");
    }

    return(
        <form className="form-container" onSubmit={manejarGuardar}>
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
                {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
            </div>

            <div className="form-group">
                <label>Género</label>
                <input
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    placeholder="Ej: Acción, Aventura"
                />
                {/* Mensaje de error para género */}
                {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
            </div>

            <div className="form-group">
                <label>Plataforma</label>
                <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                    <option value="">Selecciona una plataforma</option>
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
                    type="number"
                    value={lanzamiento}
                    onChange={(e) => setLanzamiento(e.target.value)}
                    placeholder="Ej: 2026"
                />
                {errores.lanzamiento && <span className="error-mensaje">{errores.lanzamiento}</span>}
            </div>

            <div className="form-group">
                <label>Fecha de Lanzamiento</label>
                <input
                    type="date"
                    value={fechaLanzamiento}
                    onChange={(e) => setFechaLanzamiento(e.target.value)}
                    max={fechaHoy}
                />
                {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
            </div>

            <div className="form-group">
                <label>Sinopsis / Descripción</label>
                <textarea
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                    placeholder="Escribe una reseña corta del videojuego"
                    rows={4}
                />
                <small>{sinopsis.length}/250 caracteres</small>
                {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
            </div>

            <div className="form-group">
                <label>Calificación de la Crítica</label>
                <input
                    type="number"
                    value={calificacionCritica}
                    onChange={(e) => setCalificacionCritica(e.target.value)}
                    placeholder="Ej: 1 a 100"
                />
                {errores.calificacionCritica && <span className="error-mensaje">{errores.calificacionCritica}</span>}
            </div>

            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej: 19.99"
                />
                {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
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
                    step="0.01"
                    min="0"
                    max="1"
                    value={progreso}
                    onChange={(e) => setProgreso(e.target.value)} 
                    placeholder="Ej: 0.1 a 1"
                />
                {/* Mensaje de error para progreso */}
                {errores.progreso && <span className="error-mensaje">{errores.progreso}</span>}
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={manejarCancelar}>Cancelar</button>
                <button type="submit" className="btn-save">Guardar</button>
            </div>
        </form>
    ) 
}

export default FormularioVideoJuego;
