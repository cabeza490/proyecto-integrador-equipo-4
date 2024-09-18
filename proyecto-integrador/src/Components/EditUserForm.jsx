// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import FormStyle from "../Styles/EditUserForm.module.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useCateringStates } from '../Components/utils/globalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditUserForm = () => {
    const navigate = useNavigate();
    const { state } = useCateringStates(); // Obtener el estado desde el contexto
    const user = state.userData; // Obtener los datos del usuario desde el estado

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(""); 
    const [, setIsFormValid] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    const validate = useCallback(() => {
        const newErrors = {};
        const newValid = {};

        // Validación de nombre
        if (touched.nombre) {
            if (!usuario.nombre) {
                newErrors.nombre = "El nombre es requerido.";
            } else if (usuario.nombre.length < 2) {
                newErrors.nombre = "El nombre debe tener al menos 2 letras.";
            } else {
                newValid.nombre = true;
            }
        }

        // Validación de apellido
        if (touched.apellido) {
            if (!usuario.apellido) {
                newErrors.apellido = "El apellido es requerido.";
            } else if (usuario.apellido.length < 2) {
                newErrors.apellido = "El apellido debe tener al menos 2 letras.";
            } else {
                newValid.apellido = true;
            }
        }

        // Validación de email
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (touched.email) {
            if (!usuario.email) {
                newErrors.email = "El email es requerido.";
            } else if (!emailRegex.test(usuario.email)) {
                newErrors.email = "El email no es válido.";
            } else {
                newValid.email = true;
            }
        }

        // Validación de nueva contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (touched.newPassword) {
            if (usuario.newPassword && !passwordRegex.test(usuario.newPassword)) {
                newErrors.newPassword = "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
            } else {
                newValid.newPassword = true;
            }
        }

        // Validación de confirmación de contraseña
        if (touched.confirmNewPassword) {
            if (usuario.confirmNewPassword && usuario.newPassword !== usuario.confirmNewPassword) {
                newErrors.confirmNewPassword = "Las nuevas contraseñas no coinciden.";
            } else {
                newValid.confirmNewPassword = true;
            }
        }

        setErrors(newErrors);
        setValid(newValid);

        // Verifica que todos los campos sean válidos
        const isFormValid = Object.keys(newValid).length === 5 && Object.values(newValid).every((value) => value === true);
        setIsFormValid(isFormValid);
    }, [usuario, touched]);

    useEffect(() => {
        validate();
    }, [validate]);

    useEffect(() => {
        if (submitMessage) {
            const timer = setTimeout(() => {
                setSubmitMessage("");
                navigate("/userpanel"); // Navega al UserPanel después de 5 segundos
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submitMessage, navigate]);

    useEffect(() => {
        if (user) {
            setUsuario({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                email: user.email || "",
                newPassword: "",
                confirmNewPassword: "",
            });
        }
    }, [user]);

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

        setIsFormDirty(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormDirty) { // Permitir enviar si el formulario ha sido modificado
            try {
                const response = await axios.put(`${API_BASE_URL}/api/usuarios/${user.id}`, {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    ...(usuario.newPassword && { password: usuario.newPassword }) // Solo incluir la nueva contraseña si se proporciona
                });
                if (response.status === 200) {
                    setSubmitMessage("Sus cambios fueron guardados exitosamente.");
                } else {
                    setSubmitMessage("Hubo un problema al guardar los cambios.");
                }
            } catch (error) {
                console.error("Error al guardar los cambios:", error);
                setSubmitMessage("No se pudo guardar los cambios. Inténtalo de nuevo más tarde.");
            }
        } else {
            setSubmitMessage("No se han realizado cambios.");
        }
    };

    return (
        <form className={FormStyle.registerForm} onSubmit={handleSubmit}>
            <h1 className={FormStyle.title}>Editar usuario</h1>
            
            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    className={`${FormStyle.formInput} ${errors.nombre ? FormStyle.errorInput : ''} ${valid.nombre ? FormStyle.validInput : ''}`}
                    value={usuario.nombre}
                    onChange={handleChange}
                    onBlur={() => setTouched({ ...touched, nombre: true })}
                />
                {errors.nombre && <div className={FormStyle.errorMessage}>{errors.nombre}</div>}
            </div>

            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Apellido:</label>
                <input
                    type="text"
                    name="apellido"
                    className={`${FormStyle.formInput} ${errors.apellido ? FormStyle.errorInput : ''} ${valid.apellido ? FormStyle.validInput : ''}`}
                    value={usuario.apellido}
                    onChange={handleChange}
                    onBlur={() => setTouched({ ...touched, apellido: true })}
                />
                {errors.apellido && <div className={FormStyle.errorMessage}>{errors.apellido}</div>}
            </div>

            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Email:</label>
                <input
                    type="email"
                    name="email"
                    className={`${FormStyle.formInput} ${errors.email ? FormStyle.errorInput : ''} ${valid.email ? FormStyle.validInput : ''}`}
                    value={usuario.email}
                    onChange={handleChange}
                    onBlur={() => setTouched({ ...touched, email: true })}
                />
                {errors.email && <div className={FormStyle.errorMessage}>{errors.email}</div>}
            </div>

            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Nueva contraseña:</label>
                <div className={FormStyle.passwordContainer}>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        className={`${FormStyle.formInput} ${errors.newPassword ? FormStyle.errorInput : ''} ${valid.newPassword ? FormStyle.validInput : ''}`}
                        value={usuario.newPassword}
                        onChange={handleChange}
                        onBlur={() => setTouched({ ...touched, newPassword: true })}
                    />
                    <button type="button" className={FormStyle.showPasswordIcon} onClick={toggleNewPasswordVisibility}>
                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.newPassword && <div className={FormStyle.errorMessage}>{errors.newPassword}</div>}
            </div>

            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Confirmar nueva contraseña:</label>
                <div className={FormStyle.passwordContainer}>
                    <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        className={`${FormStyle.formInput} ${errors.confirmNewPassword ? FormStyle.errorInput : ''} ${valid.confirmNewPassword ? FormStyle.validInput : ''}`}
                        value={usuario.confirmNewPassword}
                        onChange={handleChange}
                        onBlur={() => setTouched({ ...touched, confirmNewPassword: true })}
                    />
                    <button type="button" className={FormStyle.showPasswordIcon} onClick={toggleConfirmNewPasswordVisibility}>
                        <FontAwesomeIcon icon={showConfirmNewPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.confirmNewPassword && <div className={FormStyle.errorMessage}>{errors.confirmNewPassword}</div>}
            </div>

            <button type="submit" className={FormStyle.submitButton} disabled={!isFormDirty}>
                Guardar cambios
            </button>

            {submitMessage && <div className={FormStyle.submitMessage}>{submitMessage}</div>}
        </form>
    );
};

export default EditUserForm;
