import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/apiConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
 
    //Manejar el boton
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const datos = await response.json();

            login(datos.token);
            navigate('/perfil');

        } catch (err) {
            setErr(err.message);
        }
    };


  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Usuario"
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
        {err && <p style={{ color: 'red', fontSize: '12px' }}>{err}</p>}
        <button type="submit">Ingresar</button>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={() => navigate('/registrar')} style={{ padding: '10px', backgroundColor: '#00d2ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </form>
    </div>
  );

}

export default Login;