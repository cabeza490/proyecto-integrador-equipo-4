// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Galeria = ({ searchTerm = '', setNoResults, selectedCategories = [], setTotalResults }) => {
  const { state, dispatch } = useCateringStates();
  const { userData } = state
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let numberOfImages = 8; // Default for desktop and tablets

      if (width <= 480) {
        numberOfImages = 4; // For mobile devices
      }

      const fetchImages = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/productos');
          const productos = response.data.productos;
          const images = productos.flatMap(producto => producto.imagenes.map(imagen => ({
            src: imagen.url,
            title: producto.nombre,
            description: producto.descripcion,
            id: producto.id,
            keyword: producto.keyword,
            categoria_id: producto.categoria_id // Incluye la categoría del producto
          })));
          const shuffled = shuffleArray(images);

          // Filtrar por término de búsqueda (título o palabra clave) y categoría
          const filteredImages = shuffled.filter(image => {
            const matchesSearchTerm = searchTerm
              ? image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.keyword.toLowerCase().includes(searchTerm.toLowerCase())
              : true;

            const matchesCategory = selectedCategories.length === 0 ||
              selectedCategories.some(cat => cat === image.categoria_id);

            return matchesSearchTerm && matchesCategory;
          });

          setShuffledImages(filteredImages.slice(0, numberOfImages));
          setNoResults(filteredImages.length === 0);
          setTotalResults(filteredImages.length); // Actualizar el total de resultados
        } catch (error) {
          console.error('Error al obtener las imágenes:', error);
          setNoResults(true);
        }
      };

      fetchImages();
    };

    handleResize(); // Set images based on initial screen size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [searchTerm, selectedCategories, setNoResults, setTotalResults]);

  // Remove all favorites if there's no logged-in user
  useEffect(() => {
    if (!state.userData) {
      dispatch({ type: 'REMOVE_ALL' }); // Elimina todos los favoritos del localStorage si no hay usuario logueado
    }
  }, [state.userData, dispatch]);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  /* useEffect(() => {
    if (userData && userData.id) {
      axios.get(`http://localhost:3000/api/favoritos/${userData.id}`)
        .then(response => {
          setFavoritos(response.data);
          console.log(response.data);
        })
        .catch(error => console.error("Error al obtener favoritos:", error));
    }
  }, [userData]); */
// useEffect para sincronizar favoritos cuando el usuario está logueado
useEffect(() => {
  if (state.userData && state.userData.id) {
    // Solo realiza la petición si el usuario está logueado
    axios.get(`http://localhost:3000/api/favoritos/${state.userData.id}`)
      .then(response => {
        const favoritosIds = response.data
        console.log(favoritosIds);
        // Actualiza el estado global con los favoritos obtenidos
        if(favoritosIds){
            dispatch({ type: 'ADD_FAVORITES', payload: favoritosIds });
          console.log(`Estado global ${state.favs}`);
        }
      })
      .catch(error => console.error("Error al obtener favoritos:", error));
  }
}, [state.userData, dispatch]);

// Función para verificar si un producto está en favoritos
const isFavorite = (product) => {
  return state.favs.some(fav => fav.id === product.id);
};

// Función para agregar/eliminar de favoritos
const toggleFavorito = (productoId) => {
  if (state.userData && state.userData.id) {
    if (isFavorite({ id: productoId })) {
      // Eliminar de favoritos
      dispatch({ type: 'REMOVE_BY_ID', payload: productoId });
      axios.delete(`http://localhost:3000/api/favoritos/${productoId}`, { data: { usuarioId: state.userData.id } })
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => console.error("Error al eliminar favorito:", error));
    } else {
      // Agregar a favoritos
      dispatch({ type: 'ADD_FAVORITES', payload: { id: productoId } });
      axios.post(`http://localhost:3000/api/favoritos`, { usuarioId: state.userData.id, productoId })
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => console.error("Error al añadir favorito:", error));
    }
  } else {
    alert('Necesita iniciar sesión para marcar favoritos');
  }
} 

/*   const handleFavoriteClick = (product) => {
    if (state.userData) {
      if (isFavorite(product)) {
        dispatch({ type: "REMOVE_BY_ID", payload: product.id });
        toggleFavorito(product.id)
      } else {
        dispatch({ type: "ADD_FAVORITES", payload: product });
        toggleFavorito(product.id); // Hacer la llamada a la API solo cuando se agrega o se elimina un favorito
      }
    } else {
      alert("Necesita iniciar sesión para marcar favoritos");
    }
  }; */

  return (
    <div className="gallery">
      {shuffledImages.map((image, index) => (
        <div key={index} className="image-card">
          <img src={image.src} alt={`img-${index}`} />
          <Link to={`/detail/${image.id}`}>
            <div className="image-info">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </Link>
          <button onClick={() => toggleFavorito(image.id)}
            className={`favButton ${isFavorite(image) ? 'favorite' : ''}`}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      ))}
    </div>
  );
};

Galeria.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setNoResults: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setTotalResults: PropTypes.func.isRequired,
};

export default Galeria;
