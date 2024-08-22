// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../public/search-icon.png';
import '../Styles/UserManagement.css'; 

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

    const handlePermissionToggle = (userId) => {
        const userIndex = users.findIndex(user => user.id === userId);
        const updatedUsers = [...users];

        const user = updatedUsers[userIndex];

        const confirmation = window.confirm("¿Seguro que quiere cambiar permisos de administrador?");

        if (confirmation) {
            user.isAdmin = !user.isAdmin;
            setUsers(updatedUsers);
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
                                className={`permission-button ${user.isAdmin ? 'is-admin' : 'not-admin'}`}
                                onClick={() => handlePermissionToggle(user.id)}
                            >
                                {user.isAdmin ? 'Sí' : 'No'}
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

export default UserManagement;

