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
    const handleLogin = async (e) => {
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
            navigate('/gestion');

        } catch (err) {
            setErr(err.message);
        }
    };


  return (
     <div className="login-container">
      <h2>🎬 Login - Películas</h2>
      
      <form onSubmit={handleLogin}>
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
        <button type="submit">Ingresar</button>
        
        {err && <p className="error-msg">{err}</p>}
      </form>
      
      <div className="login-link-container">
        <Link to="/registrar" className="login-link">
          ¿No tienes cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );

} export default Login;