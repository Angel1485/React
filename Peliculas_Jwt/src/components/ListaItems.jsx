import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/apiConfig';

function ListaItems({ recargar, onEditar }) {
  const [items, setItems] = useState([]);
  const [objectUrls, setObjectUrls] = useState({});
  const [err, setErr] = useState('');

  const { token } = useAuth();

  // ===== Cargar listado =====
  const cargar = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/items/listar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el listado');
      }

      const datos = await response.json();
      setItems(datos);
      cargarImagenes(datos);
    } catch (err) {
      setErr(err.message);
    }
  };

  // ===== Cargar imágenes como Object URL =====
  const cargarImagenes = async (lista) => {
    const urls = {};

    await Promise.all(
      lista.map(async (p) => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/items/${p.id}/foto`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const blob = await response.blob();
            urls[p.id] = URL.createObjectURL(blob);
          }
        } catch {
          // Sin foto → se mostrará placeholder
        }
      })
    );

    // Liberar Object URLs previas
    setObjectUrls((prev) => {
      Object.values(prev).forEach((u) => URL.revokeObjectURL(u));
      return urls;
    });
  };

  useEffect(() => {
    cargar();

    return () => {
      Object.values(objectUrls).forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recargar]);

  // ===== Eliminar =====
  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta película?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar la película');
      }

      if (objectUrls[id]) URL.revokeObjectURL(objectUrls[id]);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div>
      {err && <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>}

      <div className="grid-cards">
        {items.map((p) => (
          <div className="card" key={p.id}>
            {objectUrls[p.id] ? (
              <img src={objectUrls[p.id]} alt={p.titulo} className="card-img" />
            ) : (
              <div className="card-img placeholder">Sin imagen</div>
            )}

            <div className="card-body">
              <h3>{p.titulo}</h3>
              <p>
                <strong>Director:</strong> {p.director}
              </p>

              <div className="card-actions">
                <button className="btn-editar" onClick={() => onEditar(p)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => eliminar(p.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaItems;