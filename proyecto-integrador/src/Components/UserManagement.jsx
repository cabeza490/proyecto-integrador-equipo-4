// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa prop-types
import axios from 'axios';
import searchIcon from '../../public/search-icon.png';
import '../Styles/UserManagement.css'; 

// eslint-disable-next-line no-unused-vars
function UserManagement({ handleEditClick }) {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Fetch users from API
    const fetchUsers = async (query = '') => {
        try {
            const response = await axios.get(`http://localhost:3000/api/usuarios${query}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = async () => {
        const formattedQuery = searchText.trim()
            ? `?search=${encodeURIComponent(searchText)}`
            : '';
        await fetchUsers(formattedQuery);
        setSearchText(''); // Clear the search text after search
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handlePermissionToggle = async (userId) => {
        const userIndex = users.findIndex(user => user.id === userId);
        const updatedUsers = [...users];
        const user = updatedUsers[userIndex];

        // Determine the new rolId
        const newRolId = user.rolId === 1 ? 2 : 1; // Toggle between 1 and 2

        const confirmation = window.confirm("¿Seguro que quiere cambiar permisos de administrador?");

        if (confirmation) {
            try {
                // Call the backend to update the role
                await axios.put('http://localhost:3000/api/usuarios/cambiar-rol', {
                    id: userId, // Asegúrate de enviar el id
                    rolId: newRolId // Asegúrate de enviar rolId en lugar de nuevoRolId
                });

                // Update the local state
                updatedUsers[userIndex] = { ...user, rolId: newRolId };
                setUsers(updatedUsers);

                // Show success message based on new rolId
                const message = newRolId === 1 
                    ? "Permisos de administrador agregados exitosamente" 
                    : "Permisos de administrador eliminados exitosamente";
                    
                alert(message);
            } catch (error) {
                console.error('Error al cambiar el rol:', error);
            }
        }
    };

    return (
        <div className='user-dropdown'>
            <div className='search-container'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Buscar por nombre, apellido o email...'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className='search-button' onClick={handleSearch}>
                    <img src={searchIcon} alt="search-icon" className='search-icon' />
                </button>
            </div>

            <div className='header-container'>
                <h2>Usuarios registrados</h2>
                <h2 className='admin-permissions-title'>Permisos de administrador</h2>
            </div>

            <div className='user-list'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className='user-item'>
                            {user.nombre} {user.apellido}
                            <button
                                className={`permission-button ${user.rolId === 1 ? 'is-admin' : 'not-admin'}`}
                                onClick={() => handlePermissionToggle(user.id)}
                            >
                                {user.rolId === 1 ? 'Sí' : 'No'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No hay usuarios disponibles.</div>
                )}
            </div>
        </div>
    );
}

// Define la validación de propiedades
UserManagement.propTypes = {
    handleEditClick: PropTypes.func
};

export default UserManagement;

