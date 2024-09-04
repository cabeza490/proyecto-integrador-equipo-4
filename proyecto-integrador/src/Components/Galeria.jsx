import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Galeria = ({ searchTerm = '', setNoResults }) => {
  const { state, dispatch } = useCateringStates();
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
            id: producto.id
          })));
          const shuffled = shuffleArray(images);

          const filteredImages = searchTerm
            ? shuffled.filter(image => image.title.toLowerCase().includes(searchTerm.toLowerCase()))
            : shuffled;

          setShuffledImages(filteredImages.slice(0, numberOfImages));
          setNoResults(filteredImages.length === 0);
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
  }, [searchTerm, setNoResults]);

  useEffect(() => {
    console.log("Favoritos actualizados:", state.favs);
  }, [state.favs]);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleFavoriteClick = (product) => {
    if (isFavorite(product)) {
      dispatch({ type: "REMOVE_BY_ID", payload: product.id });
    } else {
      dispatch({ type: "ADD_FAVORITES", payload: product });
    }
  };

  const isFavorite = (product) => {
    return state.favs.some(fav => fav.id === product.id);
  };

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
          <button 
            onClick={() => handleFavoriteClick(image)} 
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
};

export default Galeria;
