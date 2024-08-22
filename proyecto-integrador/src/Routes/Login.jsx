import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../api/login-Apis';
import { useCateringStates } from '../Components/utils/globalContext';  // Importa el hook para usar el contexto
import '../Styles/Login.css';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const { state, dispatch } = useCateringStates(); // Obtén la función dispatch del contexto
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const onSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      if (response.status === 200) {
        dispatch({ type: "SET_USER_DATA", payload: response.data }); // Despacha la acción para actualizar los datos del usuario
        console.log(state);
        navigate('/'); 
      } else {
        setLoginError('Datos incorrectos. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setLoginError('Datos incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
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
              type={showPassword ? 'text' : 'password'}  // Cambia el tipo de input según el estado
              placeholder="Contraseña" 
              {...register('password', {
                required: true,
                minLength: 8
              })} 
            />
            <span className="icon" onClick={toggleShowPassword}>
              {showPassword ? '👁️' : '👁️'}  {/* Cambia el ícono dependiendo del estado */}
            </span>
            {errors.password?.type === "required" && <p>El campo contraseña es requerido</p>}
            {errors.password?.type === "minLength" && <p>La contraseña debe tener al menos 8 caracteres</p>}
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
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