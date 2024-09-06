import React, { useState, useEffect } from "react";
import { setUser } from '../api/register-Apis';
import FormStyle from '../Styles/RegisterForm.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        confirmarmail: "",
        password: "",
        confirmarcontraseña: "",
        rolId: 2
    });

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(""); 
    const [isFormValid, setIsFormValid] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validate = () => {
        const newErrors = {};
        const newValid = {};

        if (touched.nombre) {
            if (!usuario.nombre) {
                newErrors.nombre = "El nombre es requerido.";
            } else if (usuario.nombre.length < 2) {
                newErrors.nombre = "El nombre debe tener al menos 2 letras.";
            } else {
                newValid.nombre = true;
            }
        }

        if (touched.apellido) {
            if (!usuario.apellido) {
                newErrors.apellido = "El apellido es requerido.";
            } else if (usuario.apellido.length < 2) {
                newErrors.apellido = "El apellido debe tener al menos 2 letras.";
            } else {
                newValid.apellido = true;
            }
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (touched.email) {
            if (!usuario.email) {
                newErrors.email = "El email es requerido.";
            } else if (!emailRegex.test(usuario.email)) {
                newErrors.email = "El email no es válido.";
            } else {
                newValid.email = true;
            }
        }

        if (touched.confirmarmail) {
            if (!usuario.confirmarmail) {
                newErrors.confirmarmail = "La confirmación de email es requerida.";
            } else if (usuario.email !== usuario.confirmarmail) {
                newErrors.confirmarmail = "Los emails no coinciden.";
            } else {
                newValid.confirmarmail = true;
            }
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (touched.password) {
            if (!usuario.password) {
                newErrors.password = "La contraseña es requerida.";
            } else if (!passwordRegex.test(usuario.password)) {
                newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
            } else {
                newValid.password = true;
            }
        }

        if (touched.confirmarcontraseña) {
            if (!usuario.confirmarcontraseña) {
                newErrors.confirmarcontraseña = "La confirmación de contraseña es requerida.";
            } else if (usuario.password !== usuario.confirmarcontraseña) {
                newErrors.confirmarcontraseña = "Las contraseñas no coinciden.";
            } else {
                newValid.confirmarcontraseña = true;
            }
        }

        setErrors(newErrors);
        setValid(newValid);

        const isFormValid = Object.keys(newValid).length === 6 && Object.values(newValid).every((value) => value === true);
        setIsFormValid(isFormValid);
    };

    useEffect(() => {
        validate();
    }, [usuario, touched]);

    useEffect(() => {
        if (submitMessage) {
            const timer = setTimeout(() => {
                setSubmitMessage("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [submitMessage]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUsuario((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setTouched((prevState) => ({
            ...prevState,
            [name]: true,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        validate();

        if (Object.keys(errors).length === 0) {
            try {
                const usuarioData = {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    password: usuario.password,
                    rolId: usuario.rolId,
                };

                const response = await setUser(usuarioData);
                if (response.status === 400) {
                    setSubmitMessage("El email ya está registrado.");
                    return;
                }

                setSubmitMessage("Usuario registrado exitosamente.");

                // Resetear el formulario
                setUsuario({
                    nombre: "",
                    apellido: "",
                    email: "",
                    confirmarmail: "",
                    password: "",
                    confirmarcontraseña: "",
                });

                setTouched({});
                setValid({});
                setIsFormValid(false);
                setShowPassword(false);
                setShowConfirmPassword(false);

                // Esperar 5 segundos y redirigir al login
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } catch (error) {
                setSubmitMessage("El email ya está registrado.");
            }
        }
    };

    return (
        <div className={FormStyle.formContainer}>
            <form onSubmit={handleSubmit} className={FormStyle.registerForm}>
                <h3 className={FormStyle.title}>Crear cuenta</h3>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className={`${FormStyle.formInput} ${touched.nombre && (errors.nombre ? FormStyle.errorInput : valid.nombre ? FormStyle.validInput : '')}`}
                    value={usuario.nombre}
                    onChange={handleChange}
                />
                {errors.nombre && <p className={FormStyle.errorMessage}>{errors.nombre}</p>}

                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    className={`${FormStyle.formInput} ${touched.apellido && (errors.apellido ? FormStyle.errorInput : valid.apellido ? FormStyle.validInput : '')}`}
                    value={usuario.apellido}
                    onChange={handleChange}
                />
                {errors.apellido && <p className={FormStyle.errorMessage}>{errors.apellido}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`${FormStyle.formInput} ${touched.email && (errors.email ? FormStyle.errorInput : valid.email ? FormStyle.validInput : '')}`}
                    value={usuario.email}
                    onChange={handleChange}
                />
                {errors.email && <p className={FormStyle.errorMessage}>{errors.email}</p>}

                <input
                    type="email"
                    name="confirmarmail"
                    placeholder="Confirmar email"
                    className={`${FormStyle.formInput} ${touched.confirmarmail && (errors.confirmarmail ? FormStyle.errorInput : valid.confirmarmail ? FormStyle.validInput : '')}`}
                    value={usuario.confirmarmail}
                    onChange={handleChange}
                />
                {errors.confirmarmail && <p className={FormStyle.errorMessage}>{errors.confirmarmail}</p>}

                <div className={FormStyle.passwordContainer}>
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Contraseña"
                        className={`${FormStyle.formInput} ${touched.password && (errors.password ? FormStyle.errorInput : valid.password ? FormStyle.validInput : '')}`}
                        value={usuario.password}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className={FormStyle.showPasswordIcon}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                {errors.password && <p className={FormStyle.errorMessage}>{errors.password}</p>}

                <div className={FormStyle.passwordContainer}>
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmarcontraseña" placeholder="Confirmar contraseña"
                        className={`${FormStyle.formInput} ${touched.confirmarcontraseña && (errors.confirmarcontraseña ? FormStyle.errorInput : valid.confirmarcontraseña ? FormStyle.validInput : '')}`}
                        value={usuario.confirmarcontraseña}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className={FormStyle.showPasswordIcon}
                        onClick={toggleConfirmPasswordVisibility}
                    />
                </div>
                {errors.confirmarcontraseña && <p className={FormStyle.errorMessage}>{errors.confirmarcontraseña}</p>}

                {submitMessage && (
                    <p className={submitMessage.includes("exitosamente") ? FormStyle.successMessage : FormStyle.errorMessageValid}>
                        {submitMessage}
                    </p>
                )}

                <div className={FormStyle.formButtons}>
                    <button type="button" className={FormStyle.backButton} onClick={handleBackClick}>Volver</button>
                    <button type="submit" className={FormStyle.submitButton} disabled={!isFormValid}>Crear cuenta</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;

