import React from 'react';
import './empleados.css';

function Empleados({ empleados, onEliminar, onEditar }) {
  return (
    <div className="pantalla-centrada">
      <div className="panel-container">
        
        {/* Encabezado del panel integrado y centrado con la tabla */}
        <div className="panel-header">
          <div>
            <h2 className="panel-title">👥 Panel de Empleados</h2>
            <p className="panel-subtitle">
              Gestión y registro total de personal activo en la plataforma.
            </p>
          </div>
          <div className="panel-badge-total">
            {empleados.length} Registros totales
          </div>
        </div>

        {/* Contenedor responsivo con scroll lateral */}
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Departamento</th>
                <th>Turno</th>
                <th>Ingreso</th>
                <th>Salario</th>
                <th className="text-center">Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => {
                return (
                  <tr key={emp.id} className="table-row">
                    {/* Nombre */}
                    <td className="col-nombre">{emp.nombre}</td>
                    
                    {/* Edad */}
                    <td>{emp.edad} años</td>
                    
                    {/* Departamento */}
                    <td>{emp.departamento || emp.deepartamento || '—'}</td>
                    
                    {/* Turno */}
                    <td>{emp.turno || emp.Turno || '—'}</td>
                    
                    {/* Fecha Ingreso */}
                    <td className="col-ingreso">{emp.fechaIngreso}</td>
                    
                    {/* Salario */}
                    <td className="col-salario">
                      ${Number(emp.salario).toLocaleString('es-ES')}
                    </td>
                    
                    {/* Estado (Badge estilizado como la foto) */}
                    <td className="text-center">
                      <span className={`status-badge ${emp.activo ? 'active' : 'inactive'}`}>
                        {emp.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    
                    {/* Botones de Acción Sólidos */}
                    <td className="text-right">
                      <div className="action-buttons">
                        <button 
                          onClick={() => onEditar(emp)}
                          className="btn btn-edit"
                          title="Editar empleado"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => onEliminar(emp.id)}
                          className="btn btn-delete"
                          title="Eliminar empleado"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );    
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Empleados;