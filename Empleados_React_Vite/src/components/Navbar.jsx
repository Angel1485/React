import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">GestorApp</span>
      <div className="navbar-links">
        <Link to="/" className="navbar-link navbar-btn">Empleados</Link>
        <Link to="/nuevo" className="navbar-link navbar-btn">Nuevo Empleado</Link>
      </div>
    </nav>
  );
}

export default Navbar;