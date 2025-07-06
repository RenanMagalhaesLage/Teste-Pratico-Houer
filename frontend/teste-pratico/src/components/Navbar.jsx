import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/home">Instalações Escolares</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            to="/home"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/importar"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            aria-current="page"
          >
            <i className="bi bi-upload me-2"></i>
            Importar CSV
          </NavLink>
        </li>
      </ul>

      {/* Itens à direita */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
