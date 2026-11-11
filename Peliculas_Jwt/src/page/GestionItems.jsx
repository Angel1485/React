import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/apiConfig';
import ListaItems from '../components/ListaItems';

function GestionItems() {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [foto, setFoto] = useState(null);
  const [err, setErr] = useState('');
  const [recargar, setRecargar] = useState(0);
  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();
  const { token, logout } = useAuth();

  // ===== Crear pelicula =====
  const handleCrear = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('director', director);
      if (foto) formData.append('foto', foto);

      const response = await fetch(`${API_BASE_URL}/auth/items/registrar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar la película');
      }

      // limpiar formulario
      setTitulo('');
      setDirector('');
      setFoto(null);
      e.target.reset(); // limpia el input file
      setRecargar((n) => n + 1);
    } catch (err) {
      setErr(err.message);
    }
  };

  // ===== Abrir modal de edicion =====
  const abrirEdicion = (pelicula) => {
    setEditando(pelicula);
    setTitulo(pelicula.titulo);
    setDirector(pelicula.director);
    setFoto(null);
    setErr('');
  };

  // ===== Guardar edicion =====
  const handleEditar = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('director', director);
      if (foto) formData.append('foto', foto);

      const response = await fetch(`${API_BASE_URL}/auth/items/${editando.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar la película');
      }

      setEditando(null);
      setTitulo('');
      setDirector('');
      setFoto(null);
      setRecargar((n) => n + 1);
    } catch (err) {
      setErr(err.message);
    }
  };

  // ===== Cerrar sesion =====
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="gestion-container">
      <div className="header-gestion">
        <h1>🎬 Gestión de Películas</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      {/* Formulario de creación */}
      <form className="form-crear" onSubmit={handleCrear}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
        />
        <button type="submit">Agregar Película</button>
      </form>

      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}

      {/* Grid de Cards */}
      <ListaItems recargar={recargar} onEditar={abrirEdicion} />

      {/* Modal de edicion */}
      {editando && (
        <div className="modal-overlay" onClick={() => setEditando(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Editar: {editando.titulo}</h2>
            <form onSubmit={handleEditar}>
              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
              <label>Nueva foto (opcional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files[0])}
              />
              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditando(null)}>
                  Cancelar
                </button>
              </div>
            </form>
            {err && <p style={{ color: 'red' }}>{err}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionItems;