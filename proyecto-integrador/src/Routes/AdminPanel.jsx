// src/Routes/AdminPanel.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../Styles/AdminPanel.css';
import ListaProductos from '../Components/ListaProductos';
import UserManagement from '../Components/UserManagement';
import EditUserForm from '../Components/EditUserForm'; 
import { useAuth } from '../Contexts/useAuth'; // Asegúrate de la ruta correcta

function AdminPanel() {
    const [activeTab, setActiveTab] = useState(null);
    const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const { user } = useAuth(); // Asegúrate de obtener el usuario

    console.log('User:', user);

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

    return (
        <div className='admin-panel'>
            <section className='left-side'>
                <div className='user-avatar'>{user ? user.nombre[0] : 'U'}</div>
                <p className='name'>{user ? user.nombre : 'Usuario'}</p>
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
                    <EditUserForm userId={selectedUserId} />
                ) : (
                    activeTab === 2 && (<ListaProductos />)
                )}
            </section>
        </div>
    );
}

export default AdminPanel;
