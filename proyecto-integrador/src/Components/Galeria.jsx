import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Galeria = ({ searchTerm = '', setNoResults, selectedCategories = [], setTotalResults }) => {
  const { state, dispatch } = useCateringStates();
  const { favs } = state;
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(8);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Nuevo estado para guardar favoritos

  // ------------------------------------------------------------------------
  // Esto es para testear de que levante la variable de entorno
  // console.log(`URL de la API: ${API_BASE_URL}/api/productos`);
  // ------------------------------------------------------------------------
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/productos?pageSize=1000000`);
        const productos = response.data.productos;
        const allImages = productos.flatMap(producto => producto.imagenes.map(imagen => ({
          src: imagen.url,
          title: producto.nombre,
          description: producto.descripcion,
          id: producto.id,
          keywords: producto.keywords,
          categoria_id: producto.categoria_id
        })));

        const filteredImages = allImages.filter(image => {
          const matchesSearchTerm = searchTerm
            ? image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              image.keywords.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

          const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.some(cat => cat === image.categoria_id);

          return matchesSearchTerm && matchesCategory;
        });

        const shuffledImages = shuffleArray(filteredImages);

        setImages(shuffledImages);
        setNoResults(shuffledImages.length === 0);
        setTotalResults(shuffledImages.length);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setNoResults(true);
      }
    };

    fetchImages();
  }, [searchTerm, selectedCategories, setNoResults, setTotalResults]);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerPage(window.innerWidth <= 1000 ? 4 : 8);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Está seguro de cerrar sesión?");
    if (confirmLogout) {
        dispatch({ type: 'CLEAR_USER_DATA' }); // Usar 'CLEAR_USER_DATA' para limpiar el estado y localStorage
        dispatch
        navigate('/');
    }
};
  // useEffect para sincronizar favoritos cuando el usuario está logueado y validar los favoritos
  useEffect(() => {
    if (state.userData && state.userData.id) {
      // Solo realiza la petición si el usuario está logueado
      axios.get(`${API_BASE_URL}/api/favoritos/${state.userData.id}`)
        .then(response => {
          const favoritosIds = response.data;

          // Actualiza el estado global con los favoritos obtenidos
          if (favoritosIds) {
            dispatch({type: 'REMOVE_ALL'})
            dispatch({ type: 'ADD_FAVORITES', payload: favoritosIds });

            // Crear un objeto para almacenar el estado de favorito de cada imagen
            const favoriteObj = {};
            images.forEach(image => {
              favoriteObj[image.id] = favoritosIds.some(fav => fav.id === image.id);
            });

            setFavoriteStatus(favoriteObj); // Actualizar el estado de favoritos
          }
          if(!state.userData){
            axios.get(`${API_BASE_URL}/api/productos?pageSize=1000000`)
          }
        })
        .catch(error => console.error("Error al obtener favoritos:", error));
    }
  }, [state.userData, dispatch, images]); // Dependencias incluyen `images`

  // Función para agregar/eliminar de favoritos
  const toggleFavorito = (productoId) => {
    console.log("Datos enviados a la API:", { usuarioId: state.userData.id, productoId });
    axios.post(`${API_BASE_URL}/api/favoritos`, { usuarioId: state.userData.id, productoId })
      .then(response => {
        console.log(response.data.message);
        // Actualizar el estado local para reflejar el cambio en favoritos
        setFavoriteStatus(prevState => ({
          ...prevState,
          [productoId]: !prevState[productoId]
        }));
        axios.get(`${API_BASE_URL}/api/productos?pageSize=1000000`)
      })
      
      .catch(error => console.error("Error al eliminar favorito:", error));
  };

  const nextPage = () => {
    if ((currentPage + 1) * imagesPerPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentImages = images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);

  return (
    <div>
      <div className="gallery">
        {currentImages.map((image, index) => (
          <div key={index} className="image-card">
            <img src={image.src} alt={`img-${index}`} />
            <Link to={`/detail/${image.id}`}>
              <div className="image-info">
                <h2>{image.title}</h2>
                <p>{image.description}</p>
              </div>
            </Link>
            <button
              onClick={() => toggleFavorito(image.id)}
              className={`favButton ${favoriteStatus[image.id] && state.userData? 'favorite' : ''}`}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <span className="page-number">{currentPage + 1}</span> {/* Muestra el número de página */}

        <button onClick={nextPage} disabled={(currentPage + 1) * imagesPerPage >= images.length}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
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
