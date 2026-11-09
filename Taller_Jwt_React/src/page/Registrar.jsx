import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

function Registrar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('USER'); // Valor por defecto
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setCargando(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rol }),
      });

      // Si el backend responde 201 (Created) o 200 (OK)
      if (response.ok) {
        setMensaje({ tipo: 'exito', texto: '¡Usuario registrado con éxito! Redirigiendo...' });
        
        // Redirigir al login tras 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 10000);
      } else {
        // Si el usuario ya existe u otro error del servidor
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Error al registrar el usuario. Intente de nuevo.');
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message });
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '350px', margin: 'auto', marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Crear Cuenta</h2>
      
      <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <select 
          value={rol} 
          onChange={(e) => setRol(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ padding: '10px', backgroundColor: '#00d2ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Mensajes de Éxito o Error */}
        {mensaje.texto && (
          <p style={{ 
            color: mensaje.tipo === 'exito' ? 'green' : 'red', 
            textAlign: 'center', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {mensaje.texto}
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/login" style={{ color: '#00d2ff', textDecoration: 'none', fontSize: '14px' }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Registrar;