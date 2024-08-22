// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext'; // Importa el hook para usar el contexto global
import NavbarStyle from '../Styles/Navbar.module.css';
import Avatar from './Avatar';

const Navbar = () => {
    const { state, dispatch } = useCateringStates();
    const { userData } = state; // Obtén userData del estado del contexto global
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Está seguro de cerrar sesión?");
        
        if (confirmLogout) {
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
                {userData ? (
                    <>
                        <Avatar />
                        <button onClick={handleLogout} className={NavbarStyle.logoutButton}>Cerrar sesión</button>
                    </>
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

