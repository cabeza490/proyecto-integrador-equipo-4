import React from 'react'
import { Link } from 'react-router-dom'
import NavbarStyle from "../Styles/Navbar.module.css"

const Navbar = () => {

    return (
        <nav>
            <a href="/">
                <img src='../../public/logo_lema.png' alt='Logo'  className={NavbarStyle.navLogo}/>
            </a>

            <div className={NavbarStyle.buttons}>
                <button className={NavbarStyle.createAccount}>Crear cuenta</button>
                <Link to='/login' className={NavbarStyle.newSesion}>Iniciar sesión</Link>
            </div>
        </nav>
    )
}

export default Navbar