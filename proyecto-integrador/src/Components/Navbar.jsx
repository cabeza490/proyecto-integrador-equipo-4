// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext';
import NavbarStyle from '../Styles/Navbar.module.css';
import Avatar from './Avatar';

const Navbar = () => {
    const { state, dispatch } = useCateringStates();
    const { userData } = state;
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Está seguro de cerrar sesión?");
        if (confirmLogout) {
            dispatch({ type: 'CLEAR_USER_DATA' }); // Usar 'CLEAR_USER_DATA' para limpiar el estado y localStorage
            navigate('/');
        }
    };

    return (
        <nav className={NavbarStyle.nav}>
            <a href="/">
                <img src='/logo_lema.png' alt='Logo' className={NavbarStyle.navLogo} />
            </a>
            
            <button 
                className={NavbarStyle.menuButton} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            <div className={`${NavbarStyle.buttons} ${isMenuOpen ? NavbarStyle.menuOpen : ''}`}>
                {userData ? (
                    <div className={NavbarStyle.profileContainer}>
                        <Avatar />
                        <div className={NavbarStyle.logoutContainer}>
                            <button onClick={handleLogout} className={NavbarStyle.logoutButton}>Cerrar sesión</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to='/register' className={NavbarStyle.createAccount}>Crear cuenta</Link>
                        <Link to='/login' className={NavbarStyle.newSesion}>Iniciar sesión</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

