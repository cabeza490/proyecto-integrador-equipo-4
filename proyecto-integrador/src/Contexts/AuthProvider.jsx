// src/Contexts/AuthProvider.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AuthContext from './AuthContext'; // Asegúrate de que la ruta sea correcta

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });
            if (response.status === 200) {
                const loggedInUser = response.data.user;
                setUser(loggedInUser);
                setIsAuthenticated(true);
                localStorage.setItem('userId', loggedInUser.id); // Guarda el ID del usuario logueado
            } else {
                console.error('No tienes permisos para acceder como usuario.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('userId'); // Elimina el ID del usuario al cerrar sesión
    };

    useEffect(() => {
        const verifyLogin = async () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/usuarios/${storedUserId}`);
                    if (response.status === 200) {
                        const userData = response.data;
                        setUser(userData);
                        setIsAuthenticated(true);
                        console.log('User verified:', userData); // Debug
                    }
                } catch (error) {
                    console.error('Error verifying login:', error.message);
                }
            }
        };

        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
