import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">GestorApp</span>
      <div className="navbar-links">
        <Link to="/" className="navbar-link navbar-btn">Juegos</Link>
        <Link to="/nuevo" className="navbar-link navbar-btn">Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;