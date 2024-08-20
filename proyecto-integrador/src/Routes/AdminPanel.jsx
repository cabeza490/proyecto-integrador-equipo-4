// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../Styles/AdminPanel.css';
import ListaProductos from "../Components/Listaproductos";
import searchIcon from '../../public/search-icon.png';
import axios from 'axios';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState(0);
    const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedPermission, setSelectedPermission] = useState(null);

    const fetchUsers = async (query = '') => {
        try {
            const response = await axios.get(`http://localhost:3000/api/users${query}`);/*aca debes poner la direccions de la api de usuarios registrados*/
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const cambiarTab = (index) => {
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

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            fetchUsers();
        } else {
            fetchUsers(`?search=${searchText}`);
        }
        setSearchText('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handlePermissionChange = (permission) => {
        setSelectedPermission(permission === selectedPermission ? null : permission);
    };

    return (
        <div className='admin-panel'>
            <section className='left-side'>
                <div className='user-avatar'>JP</div>
                <p className='name'>Juan Pérez</p>
                <p className='email'>juanperez@gmail.com</p>
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
                        <div className='user-dropdown'>
                            <h2>Filtrar usuarios registrados</h2>
                            <div className='search-container'>
                                <input
                                    type='text'
                                    className='search-input'
                                    placeholder='Buscar usuarios...'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className='search-button' onClick={handleSearch}>
                                    <img src={searchIcon} alt="search-icon" className='search-icon' />
                                </button>
                            </div>
                            <h2>Usuarios registrados</h2>
                            <div className='user-list'>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <div key={index} className='user-item'>
                                            {user.name} {/* Ajusta esto según la estructura de datos */}
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay usuarios disponibles.</div>
                                )}
                            </div>
                            <div className='permissions-container'>
                                <div className='permission-checkbox-container'>
                                    <input
                                        type='checkbox'
                                        id='assign-admin'
                                        className='permission-checkbox'
                                        checked={selectedPermission === 'assign'}
                                        onChange={() => handlePermissionChange('assign')}
                                    />
                                    <label htmlFor='assign-admin' className='permission-button'>
                                        Asignar permisos de administrador
                                    </label>
                                </div>
                                <div className='permission-checkbox-container'>
                                    <input
                                        type='checkbox'
                                        id='remove-admin'
                                        className='permission-checkbox'
                                        checked={selectedPermission === 'remove'}
                                        onChange={() => handlePermissionChange('remove')}
                                    />
                                    <label htmlFor='remove-admin' className='permission-button'>
                                        Quitar permisos de administrador
                                    </label>
                                </div>
                            </div>
                            <button className='save-button'>Guardar</button>
                        </div>
                    )}
                    <button className={'tab-button ' + (activeTab === 2 && "tab-selected")}
                        onClick={() => cambiarTab(2)}>
                        Mis publicaciones
                    </button>
                </div>
                {activeTab === 2 && (<ListaProductos />)}
            </section>
        </div>
    );
}

export default AdminPanel;






