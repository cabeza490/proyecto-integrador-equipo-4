import React from 'react';
import { useCateringStates } from '../Components/utils/globalContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../Styles/UserPanel.css';
import '../Styles/Favorites.css'

const Favorites = () => {
    const { state, dispatch } = useCateringStates();
    const { favs, userData } = state;
    const [isEditing, setIsEditing] = useState(false);

    const getInitials = (nombre, apellido) => {
        return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    };

    const handleEditClick = (userId) => {
        console.log(`Edit user with ID: ${userId}`);
    };
    const removeFav = (product) => {
        try {
            dispatch({ type: "REMOVE_BY_ID", payload: product });
            alert(`Se ha eliminado el producto con ID ${product} de la lista de favoritos`)
        } catch (error) {
            alert('Ha habido un error al intentar borrar el producto')
        }
        
    }

    return (
        <div className='user-panel'>
            <section className='left-side'>
                <div className='user-avatar'>
                    {userData ? getInitials(userData.nombre, userData.apellido) : 'U'}
                </div>
                <p className='name'>
                    {userData ? `${userData.nombre} ${userData.apellido}` : 'Usuario'}
                </p>
                <p className='email'>{userData ? userData.email : ''}</p>
                {!isEditing && (
                    <button className='edit-button' onClick={() => handleEditClick(userData?.id)}>
                        Editar
                    </button>
                )}
            </section>
            <section className="favorites">
                <h2>Mis Favoritos</h2>
                <div className="favorites-list">
                    {favs.map((product, index) => (
                        <div key={index} className="favorite-card">
                            <img src={product.src} alt={`favorite-${index}`} />
                            <div className="favorite-info">
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <div className="favorite-buttons">
                                    <button className="delete-button" onClick={() => removeFav(product.id)}>Eliminar</button>
                                    <Link to={`/detail/${product.id}`} className="detail-button">
                                        Ver detalle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
