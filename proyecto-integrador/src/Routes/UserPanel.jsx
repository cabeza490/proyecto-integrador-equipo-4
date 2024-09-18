// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../Styles/UserPanel.css';
import EditUserForm from '../Components/EditUserForm'; 
import { useCateringStates } from '../Components/utils/globalContext'; // Asegúrate de la ruta correcta
import Favorites from '../Components/Favorites'; 
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPanel() {
    const [activeTab, setActiveTab] = useState(null);
    const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const { state } = useCateringStates();
    const { userData } = state;
    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/usuarios`);
            const usuarios = response.data;
            // Buscar el usuario logueado por su ID
            const loggedInUser = usuarios.find(usuario => usuario.id === userData.id);
            setUser(loggedInUser);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false); // Marca la carga como completada
        }
    }, [userData.id]); // Dependencia en userData.id

    useEffect(() => {
        if (userData && userData.id) {
            fetchUserData();
        } else {
            setLoading(false); // Marca la carga como completada si no hay datos de usuario
        }
    }, [userData, fetchUserData]); // Añade fetchUserData a las dependencias

    // Verifica si el usuario está logueado y tiene rolId: 1
    if (loading) {
        return <div className="loading-message">Cargando datos...</div>; // Mensaje mientras se cargan los datos
    }

    if (!userData) {
        return <div className="error-message">No hay sesión activa. Inicie sesión para continuar.</div>;
    }

    if (userData.rolId !== 2) {
        return <div className="error-message">No tiene permiso para ingresar.</div>;
    }

    const cambiarTab = (index) => {
        if (isEditing) {
            setIsEditing(false);
            setSelectedUserId(null);
        }

        setActiveTab(index);

        if (index === 0) {
            setInfoDropdownVisible(!infoDropdownVisible);
            setUserDropdownVisible(false);
        } else if (index === 1) {
            setUserDropdownVisible(!userDropdownVisible);
            setInfoDropdownVisible(false);
        } else {
            setInfoDropdownVisible(false);
            setUserDropdownVisible(false);
        }
    };

    const handleEditClick = (userId) => {
        if (activeTab !== null) {
            setActiveTab(null);
            setInfoDropdownVisible(false);
            setUserDropdownVisible(false);
        }

        setSelectedUserId(userId);
        setIsEditing(true);
    };

    const getInitials = (nombre, apellido) => {
        const firstInitial = nombre ? nombre[0].toUpperCase() : ' ';
        const lastInitial = apellido ? apellido[0].toUpperCase() : ' ';
        return `${firstInitial}${lastInitial}`;
    };
    return (
        <>
            <div className='user-panel'>
                <section className='left-side'>
                    <div className='user-avatar'>
                        {user ? getInitials(user.nombre, user.apellido) : 'U'}
                    </div>
                    <p className='name'>
                        {user ? `${user.nombre} ${user.apellido}` : 'Usuario'}
                    </p>
                    <p className='email'>{user ? user.email : ''}</p>
                    {!isEditing && (
                        <button className='edit-button' onClick={() => handleEditClick(user?.id)}>Editar</button>
                    )}
                </section>

                <section className='tabs'>
                    <div className='tab-list'>
                        <button className={'tab-button ' + (activeTab === 0 && "tab-selected")}
                            onClick={() => cambiarTab(0)}>
                            Información
                        </button>
                        {infoDropdownVisible && (
                            <div className='info-dropdown'>
                                <button>Historial de compras</button>
                                <button>Mis reseñas</button>
                                <button className={'info-dropdown ' + (activeTab === 3 && "tab-selected")}
                                onClick={() => cambiarTab(3)}>
                                    Favoritos
                                </button>
                                <button>Seguridad</button>
                                <button>Tarjetas</button>
                                <button>Privacidad</button>
                                <button>Contacto</button>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <EditUserForm userData={user} /> // Pasa los datos del usuario directamente
                    ) : ( activeTab === 3 ? <Favorites /> :
                        null
                    )}
                </section>
            </div>
        </>
    );
}

export default UserPanel;
