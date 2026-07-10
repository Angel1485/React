import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './formularioEmpleados.css'

function FormularioEmpleado({onGuardar}){

    const location = useLocation();
    const navigate = useNavigate();

    const empleadoRecuperado = location.state?.empleado || null;

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [turno, setTurno] = useState("");
    const [activo, setActivo] = useState(true); 
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [salario, setSalario] = useState("");

    useEffect(()=>{
      if(empleadoRecuperado){
        setNombre(empleadoRecuperado.nombre);
        setEdad(empleadoRecuperado.edad);
        setDepartamento(empleadoRecuperado.departamento);
        setTurno(empleadoRecuperado.turno);
        setActivo(empleadoRecuperado.activo);
        setFechaIngreso(empleadoRecuperado.fechaIngreso);
        setSalario(empleadoRecuperado.salario);
      }else{
        setNombre("");
        setEdad("");
        setDepartamento("");
        setTurno("");
        setActivo(true);
        setFechaIngreso("");
        setSalario("");
      }
    }, [empleadoRecuperado]);
    

    function manejarGuardar(){
        const empleado = {
            id: empleadoRecuperado !== null && empleadoRecuperado !== undefined ? empleadoRecuperado.id : Date.now(),
            nombre: nombre,
            edad: Number(edad),
            departamento: departamento,
            turno: turno,
            activo: activo,
            fechaIngreso: fechaIngreso,
            salario: Number(salario)
        };

         onGuardar(empleado)
         navigate("/") 
    }

    function manejarCancelar(){
         navigate("/") 
    }

    return(
        /* 1. AGREGAMOS CONTENEDOR PRINCIPAL Y TITULO DINÁMICO */
        <div className="form-container">
            <h2 className="form-title">
              {empleadoRecuperado ? "Editar Empleado" : "Registrar Nuevo Empleado"}
            </h2>
            
            <div className="form-group">
                <label>Nombre Completo</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Ej: Juan Pérez"
                />
            </div>

            <div className="form-group">
                <label>Edad</label>
                <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ej: 25"
                    min="18"
                />
            </div>

            <div className="form-group">
                <label>Departamento</label>
                <select value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                    <option value="">Selecciona un departamento</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Tecnologia">Sistemas / TI</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Finanzas">Finanzas</option>
                </select>
            </div>

            <div className="form-group">
                <label>Turno</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                        type="radio"
                        name="turno"
                        value="Mañana"
                        checked={turno === "Mañana"}
                        onChange={(e) => setTurno(e.target.value)}
                        />
                        Mañana
                    </label>

                    <label className="radio-label">
                        <input
                        type="radio"
                        name="turno"
                        value="Tarde"
                        checked={turno === "Tarde"}
                        onChange={(e) => setTurno(e.target.value)}
                        />
                        Tarde
                    </label>

                    <label className="radio-label">
                        <input
                        type="radio"
                        name="turno"
                        value="Noche"
                        checked={turno === "Noche"}
                        onChange={(e) => setTurno(e.target.value)}
                        />
                        Noche
                    </label>
                </div>
            </div>

            <div className="form-group">
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={activo}
                        onChange={(e) => setActivo(e.target.checked)}
                    />
                    <label htmlFor="activo" className="checkbox-label">
                      Estado: <span className={`status-badge ${activo ? 'active' : 'inactive'}`}>{activo ? "Activo" : "Inactivo"}</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Fecha de ingreso</label>
                <input
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)} 
                />
            </div>

            <div className="form-group">
                <label>Salario mensual</label>
                <input
                    type="number"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Ej: 2500"
                    min="0" 
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

export default FormularioEmpleado;