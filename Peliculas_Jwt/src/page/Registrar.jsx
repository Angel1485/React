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
        
        // Redirigir al login tras 2 segundos (antes tenías 10000)
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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
    <div className="login-container">
      <h2>Crear Cuenta</h2>
      
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select 
          value={rol} 
          onChange={(e) => setRol(e.target.value)}
          style={{ padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid #d1d5db', background: '#f9fafb' }}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Mensajes de Éxito o Error */}
        {mensaje.texto && (
          <p style={{ 
            color: mensaje.tipo === 'exito' ? '#10b981' : '#dc2626', 
            textAlign: 'center', 
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            {mensaje.texto}
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem' }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Registrar;