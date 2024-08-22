import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import { useCateringStates } from '../Components/utils/globalContext';

const Avatar = () => {
    const { state } = useCateringStates();
    const { userData } = state;

    if (!userData) {
        return null; // Retorna null si no hay userData
    }

    const getInitials = (nombre, apellido) => {
        const firstInitial = nombre[0].toUpperCase();
        const lastInitial = apellido[0].toUpperCase();
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <div className="profile">
            <div className="avatar">
                {getInitials(userData.nombre, userData.apellido)}
                {userData.rolId === 1 ? <Link to='/adminpanel'>Ir al panel</Link> : null}
            </div>
        </div>
    );
};

export default Avatar;
