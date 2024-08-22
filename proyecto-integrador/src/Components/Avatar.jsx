import React from 'react';
import { useCateringStates } from '../Components/utils/globalContext';
import { Link } from 'react-router-dom';


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
    console.log('Renderizando Avatar con userData:', userData);
    
    return (
        <div className="profile">
            <div className="avatar">
                {getInitials(userData.nombre, userData.apellido)}
                {userData.rolId === 1 ? <Link to='/adminpanel'>Ir al panel</Link> : null}
            </div>
        </div>
    );
}
    
export default Avatar;