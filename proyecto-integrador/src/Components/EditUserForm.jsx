// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { updateUser } from '../api/updateUser';
import FormStyle from "../Styles/EditUserForm.module.css"; 
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EditUserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del usuario desde la URL

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(""); 
    const [isFormValid, setIsFormValid] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
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

        // Validación de la contraseña actual
        if (touched.currentPassword) {
            if (!usuario.currentPassword) {
                newErrors.currentPassword = "La contraseña actual es requerida.";
            }
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (touched.newPassword) {
            if (!usuario.newPassword) {
                newErrors.newPassword = "La nueva contraseña es requerida.";
            } else if (!passwordRegex.test(usuario.newPassword)) {
                newErrors.newPassword = "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
            } else {
                newValid.newPassword = true;
            }
        }

        if (touched.confirmNewPassword) {
            if (!usuario.confirmNewPassword) {
                newErrors.confirmNewPassword = "La confirmación de la nueva contraseña es requerida.";
            } else if (usuario.newPassword !== usuario.confirmNewPassword) {
                newErrors.confirmNewPassword = "Las nuevas contraseñas no coinciden.";
            } else {
                newValid.confirmNewPassword = true;
            }
        }

        setErrors(newErrors);
        setValid(newValid);

        const isFormValid = Object.keys(newValid).length === 4 && Object.values(newValid).every((value) => value === true);
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

    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                console.error("ID de usuario no está definido");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
                setUsuario({
                    nombre: response.data.nombre,
                    apellido: response.data.apellido,
                    email: response.data.email,
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                setSubmitMessage("Error al obtener datos del usuario.");
            }
        };

        fetchUserData();
    }, [id]);

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
        if (isFormValid) {
            try {
                await updateUser(id, usuario);
                setSubmitMessage("Usuario actualizado exitosamente.");
                navigate("/admin");
            } catch (error) {
                setSubmitMessage("Error al actualizar usuario.");
                console.error("Error updating user:", error);
            }
        } else {
            setSubmitMessage("Por favor, corrija los errores en el formulario.");
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
                <label className={FormStyle.formLabel}>Contraseña actual:</label>
                <div className={FormStyle.passwordContainer}>
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        className={`${FormStyle.formInput} ${errors.currentPassword ? FormStyle.errorInput : ''}`}
                        value={usuario.currentPassword}
                        onChange={handleChange}
                        onBlur={() => setTouched({ ...touched, currentPassword: true })}
                    />
                    <button type="button" className={FormStyle.showPasswordIcon} onClick={toggleCurrentPasswordVisibility}>
                        <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {errors.currentPassword && <div className={FormStyle.errorMessage}>{errors.currentPassword}</div>}
            </div>

            <div className={FormStyle.formGroup}>
                <label className={FormStyle.formLabel}>Nueva contraseña:</label>
                <div className={FormStyle.passwordContainer}>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        className={`${FormStyle.formInput} ${errors.newPassword ? FormStyle.errorInput : ''}`}
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
                        className={`${FormStyle.formInput} ${errors.confirmNewPassword ? FormStyle.errorInput : ''}`}
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

            <button type="submit" className={FormStyle.submitButton} disabled={!isFormValid}>
                Guardar
            </button>

            {submitMessage && <div className={FormStyle.submitMessage}>{submitMessage}</div>}
        </form>
    );
};

export default EditUserForm;

