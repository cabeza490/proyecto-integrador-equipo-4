// src/Routes/Login.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="formulario-container">
      <div className="formulario">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__content">
            <input 
              type="email" 
              placeholder="Email" 
              {...register('email', {
                required: true,
                pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                minLength: 10
              })} 
            />
            {errors.email?.type === "required" && <p>El campo email es requerido</p>}
            {errors.email?.type === "pattern" && <p>El formato del email es incorrecto</p>}
          </div>
          <div className="form__content">
            <input 
              type="password" 
              placeholder="Contraseña" 
              {...register('password', {
                required: true,
                minLength: 8
              })} 
            />
            <span className="icon">&#128065;</span>
            {errors.password?.type === "required" && <p>El campo contraseña es requerido</p>}
            {errors.password?.type === "minLength" && <p>La contraseña debe tener al menos 8 caracteres</p>}
          </div>
          <div className="form__buttons">
            <Link to='/' className="buttons__1">Volver</Link>
            <button type="submit" className="buttons__2">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
