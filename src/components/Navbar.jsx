import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-icon">✅</span>
        Gestion de Tâches
      </NavLink>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            🏠 Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ajouter"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            ➕ Ajouter
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
