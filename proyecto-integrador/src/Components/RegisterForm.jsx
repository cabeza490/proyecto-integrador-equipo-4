import React, { useState } from "react";
import { setUser } from '../api/register-Apis'


const RegisterForm = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        confirmarmail: "",
        password: "",
        confirmarcontraseña: "",
    });

    //const [show, setShow] = useState(false);
    //const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (usuario.nombre.length > 5 && !/^\s/.test(usuario.nombre) && regex.test(usuario.email)) {
            try {
                const usuarioData = {
                    nombre: usuario.nombre,
                    email: usuario.email,
                    password: usuario.password,
                };
                
                console.log("Datos que se envían al backend:", usuarioData); 
    
                const response = await setUser(usuarioData);
            
            } catch (error) {
                
            }
        } else {
          
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={usuario.nombre}
                    onChange={(event) => setUsuario({
                        ...usuario, nombre: event.target.value
                    })} />

                <input type="email" placeholder="Email" value={usuario.email}
                    onChange={(event) => setUsuario({
                        ...usuario, email: event.target.value
                    })} />

                <input type="email" placeholder="Confirmar email" value={usuario.confirmarmail}
                    onChange={(event) => setUsuario({
                        ...usuario, confirmarmail: event.target.value
                    })} />

                <input type="password" placeholder="Contraseña" value={usuario.password}
                    onChange={(event) => setUsuario({
                        ...usuario, password: event.target.value
                    })} />
                <input type="password" placeholder="Confirmar contraseña" value={usuario.confirmarcontraseña}
                    onChange={(event) => setUsuario({
                        ...usuario, confirmarcontraseña: event.target.value
                    })} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegisterForm