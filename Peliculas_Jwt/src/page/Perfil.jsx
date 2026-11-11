import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from "react-router-dom"
import { API_BASE_URL } from '../config/apiConfig';

function Perfil() {

  const [datosPerfil, setDatosPerfil] = useState(null);
  const [error, setError] = useState('');

  // Token para la petición, lo traes del contexto
  const { token, logout} = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Envías el token
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar el perfil, inicie sesion nuevamente');
        }

        const datos = await response.json();
        setDatosPerfil(datos);

      } catch (error) {
        setError(error.message);
      }
    };
    cargarPerfil();
  }, [token]); 

  const manejarLogOut = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log("Error de red al intentar revocar el token");
    }

    logout();
    navigate('.login')
  }

  return ( 
    <div>
        <div>
            <h2>Mi Perfil de Usuario</h2>
        </div>

        {error && <p>(error)</p>} 

        {datosPerfil && (
            <div>
                {/* Muestra los datos que devuelva tu API aquí */}
                <p>{datosPerfil.Mensaje}</p>
                <p>{datosPerfil.Usuario}</p>
                <p>{datosPerfil.rol_detectado}</p>
                <p>{datosPerfil.status}</p>
                {/* <pre>{JSON.stringify(datosPerfil, null, 2)}</pre> */}
            </div>
        )} 
        <div style={{ display: 'flex',  gap: '15px', alignItems: 'center', marginTop: '20px', justifyContent: 'center'}}>
          <button onClick={manejarLogOut} 
                    style={{ padding: '10px', backgroundColor: '#00d2ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar Sesion</button>
            <button onClick={()=> navigate("/vehiculos")}
                    style={{ padding: '10px', backgroundColor: '#00d2ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Gestionar Vehiculos</button>
        </div>
    </div>
  );
}

export default Perfil;