// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crea el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    // Supongamos que tienes una función para obtener la información del usuario logueado
    const fetchUser = async () => {
        try {
            // Cambia esto por la ruta correcta a tu API
            const response = await axios.get('http://localhost:3000/api/usuarios');
            const users = response.data;
            // Aquí deberías tener alguna forma de identificar al usuario logueado, por ejemplo:
            const loggedInUser = users.find(user => user.id === 1); // Ejemplo para ID fijo, cambia según tu lógica
            setUser(loggedInUser);
            setUserId(loggedInUser ? loggedInUser.id : null);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userId }}>
            {children}
        </AuthContext.Provider>
    );
};



