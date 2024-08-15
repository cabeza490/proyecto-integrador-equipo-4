// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/useAuth'; 
import NavbarStyle from '../Styles/Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Está seguro de cerrar sesión?");
    
    if (confirmLogout) {
      logout();
      navigate('/');
    }
  };

  return (
    <nav className={NavbarStyle.nav}>
      <a href="/">
        <img src='../../public/logo_lema.png' alt='Logo' className={NavbarStyle.navLogo} />
      </a>

      <div className={NavbarStyle.buttons}>
        <Link to='/register' className={NavbarStyle.createAccount}>Crear cuenta</Link>
        {!isAuthenticated ? (
          <Link to='/login' className={NavbarStyle.newSesion}>Iniciar sesión</Link>
        ) : (
          <button onClick={handleLogout} className={NavbarStyle.logoutButton}>Cerrar sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

