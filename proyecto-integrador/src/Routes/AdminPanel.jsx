// src/Routes/AdminPanel.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AdminPanel.css';
import ListaProductos from '../Components/ListaProductos';
import UserManagement from '../Components/UserManagement';
import EditUserForm from '../Components/EditUserForm'; 
import { useCateringStates } from '../Components/utils/globalContext'; // Asegúrate de la ruta correcta

function AdminPanel() {
    const [activeTab, setActiveTab] = useState(null);
    const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const { state } = useCateringStates();
    const { userData } = state;

    // Fetch user data from API by user ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios');
            const usuarios = response.data;
            // Buscar el usuario logueado por su ID
            const loggedInUser = usuarios.find(usuario => usuario.id === userData.id);
            setUser(loggedInUser);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (userData && userData.id) {
            fetchUserData();
        }
    }, [fetchUserData, userData]);

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
        <div className='admin-panel'>
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
                            <button>Seguridad</button>
                            <button>Tarjetas</button>
                            <button>Privacidad</button>
                            <button>Contacto</button>
                        </div>
                    )}
                    <button className={'tab-button ' + (activeTab === 1 && "tab-selected")}
                        onClick={() => cambiarTab(1)}>
                        Gestión de usuarios
                    </button>
                    {userDropdownVisible && (
                        <UserManagement handleEditClick={handleEditClick} />
                    )}
                    <button className={'tab-button ' + (activeTab === 2 && "tab-selected")}
                        onClick={() => cambiarTab(2)}>
                        Mis publicaciones
                    </button>
                </div>

                {isEditing ? (
    <EditUserForm userData={user} /> // Pasa los datos del usuario directamente
) : (
                    activeTab === 2 && (<ListaProductos />)
                )}
            </section>
        </div>
    );
}

export default AdminPanel;




