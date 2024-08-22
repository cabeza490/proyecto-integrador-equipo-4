import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/useAuth'; 
import { useCateringStates } from '../Components/utils/globalContext'; // Importa el hook para usar el contexto global
import NavbarStyle from '../Styles/Navbar.module.css';
import Avatar from './Avatar';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const { state, dispatch } = useCateringStates();
    const { userData } = state; // Obtén userData del estado del contexto global
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Está seguro de cerrar sesión?");
        
        if (confirmLogout) {
            logout();
            dispatch({ type: "SET_USER_DATA", payload: null }); // Opcional: Resetea userData al hacer logout
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
