import React from 'react'
import NavbarStyle from "../Styles/Navbar.module.css"

const Navbar = () => {

    return (
        <nav>
            <h4>ACA VA EL LOGO</h4>

            <div className={NavbarStyle.buttons}>
                <h4>BOTON 1</h4>
                <h4>BOTON 2</h4>
            </div>
        </nav>
    )
}

export default Navbar