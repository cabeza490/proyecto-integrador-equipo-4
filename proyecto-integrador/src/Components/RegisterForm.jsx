import React, { useState } from "react";
import { setUser } from '../api/register-Apis'
import FormStyle from '../Styles/RegisterForm.module.css';

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
        <div className={FormStyle.formContainer}>
            <form onSubmit={handleSubmit} className={FormStyle.registerForm}>
                <h3 className={FormStyle.title}>Crear cuenta</h3>
                <input type="text" placeholder="Nombre" className={FormStyle.formInput} value={usuario.nombre}
                    onChange={(event) => setUsuario({
                        ...usuario, nombre: event.target.value
                    })} />
                
                <input type="text" placeholder="Apellido" className={FormStyle.formInput} value={usuario.apellido}
                    onChange={(event) => setUsuario({
                        ...usuario, apellido: event.target.value
                    })} />

                <input type="email" placeholder="Email" className={FormStyle.formInput} value={usuario.email}
                    onChange={(event) => setUsuario({
                        ...usuario, email: event.target.value
                    })} />

                <input type="email" placeholder="Confirmar email" className={FormStyle.formInput} value={usuario.confirmarmail}
                    onChange={(event) => setUsuario({
                        ...usuario, confirmarmail: event.target.value
                    })} />

                <input type="password" placeholder="Contraseña" className={FormStyle.formInput} value={usuario.password}
                    onChange={(event) => setUsuario({
                        ...usuario, password: event.target.value
                    })} />
                <input type="password" placeholder="Confirmar contraseña" className={FormStyle.formInput} value={usuario.confirmarcontraseña}
                    onChange={(event) => setUsuario({
                        ...usuario, confirmarcontraseña: event.target.value
                    })} />

                 <div className={FormStyle.formButtons}>
                    <button type="button" className={FormStyle.backButton}>Volver</button>
                    <button type="submit" className={FormStyle.submitButton}>Crear cuenta</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm