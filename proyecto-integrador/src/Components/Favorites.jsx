// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCateringStates } from '../Components/utils/globalContext';
import { Link} from 'react-router-dom';
import '../Styles/Favorites.css';
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Favorites = () => {
    const { state, dispatch } = useCateringStates();
    const { userData } = state;
    const [favoritos, setFavoritos] = useState([]);

    // Obtener los favoritos al cargar el componente
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/favoritos/${userData.id}`)
            .then(response => {
                const favoritosData = response.data;

                // Verificar si hay favoritos antes de hacer el dispatch
                if (favoritosData && favoritosData.length > 0) {
                    setFavoritos(favoritosData);
                    dispatch({type: "REMOVE_ALL"})
                    dispatch({ type: "ADD_FAVORITES", payload: favoritosData });
                } else {
                    console.log("No hay favoritos");
                }
            })
            .catch(error => console.error("Error al obtener favoritos:", error));
    }, [userData.id, dispatch]);
    // Función para eliminar un favorito del estado global y del backend
    const toggleFavorito = (productoId) => {
        console.log("Datos enviados a la API:", { usuarioId: state.userData.id, productoId });
        axios.post(`${API_BASE_URL}/api/favoritos`, { usuarioId: state.userData.id, productoId })
            .then(response => {
                console.log(response.data.message);

                // Eliminar el producto del estado local y global después de la respuesta exitosa
                setFavoritos(favoritos.filter(product => product.id !== productoId));
                dispatch({ type: 'REMOVE_BY_ID', payload: productoId });
            })
            .catch(error => console.error("Error al eliminar favorito:", error));
    };

    return (
        <div>
            <section className="favorites">
                <div className="favorites-list">
                {favoritos.length === 0 ? (<p>No hay ningún elemento favorito</p>) : (
                    favoritos.map((product, index) => (
                        <div key={index} className="favorite-card">
                            <img src={product.imagenes.length > 0 ? product.imagenes[0].url : 'default-image.jpg'} alt={`favorite-${index}`} />
                            <div className="favorite-info">
                                <h3>{product.nombre}</h3>
                                <p>{product.descripcion}</p>
                                <div className="favorite-buttons">
                                    <button className="delete-button" onClick={() => toggleFavorito(product.id)}>Eliminar</button>
                                    <Link to={`/detail/${product.id}`} className="detail-button">
                                        Ver detalle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    </div>
);
};

export default Favorites;
