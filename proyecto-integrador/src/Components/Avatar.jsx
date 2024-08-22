import React from 'react';
import { useCateringStates } from '../Components/utils/globalContext'; // Importa el hook para usar el contexto global

const Avatar = () => {
    const { state } = useCateringStates(); //
    const userData = state.userData; // 

    if (!userData) {
        return null; // No renderiza nada si no hay userData
    }

    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <div className="profile">
            <div className="avatar">
                {getInitials(userData.nombre)}
            </div>
            <span>{userData.nombre}</span>
        </div>
    );
};

export default Avatar;
