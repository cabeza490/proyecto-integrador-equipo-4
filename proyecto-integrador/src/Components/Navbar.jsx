import React from 'react'
import NavbarStyle from "../Styles/Navbar.module.css"

const Navbar = () => {

    return (
        <nav>
            <a href="/">
                <img src='../../public/logo_lema.png' alt='Logo'  className={NavbarStyle.navLogo}/>
            </a>

            <div className={NavbarStyle.buttons}>
                <button className={NavbarStyle.createAccount}>Crear cuenta</button>
                <button className={NavbarStyle.newSesion}>Iniciar sesión</button>
            </div>
        </nav>
    )
}

export default Navbar