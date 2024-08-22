import React from 'react';
import { useCateringStates } from '../Components/utils/globalContext';

const Avatar = () => {
    const { state } = useCateringStates();
    const { userData } = state;

    if (!userData) {
        return null;
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
            </div>
        </div>
    );
};

export default Avatar;
