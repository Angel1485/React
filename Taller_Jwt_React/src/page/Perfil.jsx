import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from '../config/apiConfig';

function Perfil() {

  const [datosPerfil, setDatosPerfil] = useState(null);
  const [error, setError] = useState('');

  // Si necesitas el token para la petición, lo traes del contexto
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
        // Aquí se completa la línea que faltaba en tu imagen
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

  // Renderizado de prueba mientras cargan los datos
  //if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  //if (!datosPerfil) return <p>Cargando perfil...</p>;

  return ( 
    <div>
        <div>
            <h2>Mi Perfil de Usuario</h2>
            <button onClick={manejarLogOut}>Cerrar Sesion</button>
        </div>

        {error && <p>(error)</p>} 

        {datosPerfil && (
            <div>
                {/* Muestra los datos que devuelva tu API aquí */}
                <p>{datosPerfil.Mensaje}</p>
                <p>{datosPerfil.Usuario}</p>
                <p>{datosPerfil.rol_detectado}</p>
                <p>{datosPerfil.status}</p>
                <pre>{JSON.stringify(datosPerfil, null, 2)}</pre>
            </div>
        )} 
    </div>
  );
}

export default Perfil;