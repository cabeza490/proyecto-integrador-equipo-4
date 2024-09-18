import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';
import { useCateringStates } from '../Components/utils/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Galeria = ({ searchTerm = '', setNoResults, selectedCategories = [], setTotalResults }) => {
  const { state, dispatch } = useCateringStates();
  const { favs } = state;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos?pageSize=1000000');
        const productos = response.data.productos;

        // Agrupar las imágenes por product_id
        const productosConImagenes = productos.map(producto => ({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          keywords: producto.keywords,
          categoria_id: producto.categoria_id,
          imagenes: producto.imagenes.map(imagen => imagen.url), // Array de URLs de imágenes
        }));

        const filteredProducts = productosConImagenes.filter(producto => {
          const matchesSearchTerm = searchTerm
            ? producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              producto.keywords.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

          const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.some(cat => cat === producto.categoria_id);

          return matchesSearchTerm && matchesCategory;
        });

        const shuffledProducts = shuffleArray(filteredProducts);

        setProducts(shuffledProducts);
        setNoResults(shuffledProducts.length === 0);
        setTotalResults(shuffledProducts.length);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setNoResults(true);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategories, setNoResults, setTotalResults]);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(window.innerWidth <= 1000 ? 4 : 8);
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

  useEffect(() => {
    if (state.userData && state.userData.id) {
      axios.get(`http://localhost:3000/api/favoritos/${state.userData.id}`)
        .then(response => {
          const favoritosIds = response.data;

          if (favoritosIds) {
            dispatch({ type: 'REMOVE_ALL' });
            dispatch({ type: 'ADD_FAVORITES', payload: favoritosIds });

            const favoriteObj = {};
            products.forEach(product => {
              favoriteObj[product.id] = favoritosIds.some(fav => fav.id === product.id);
            });

            setFavoriteStatus(favoriteObj);
          }
          // Verificación de usuario no logueado
          if (!state.userData) {
            axios.get('http://localhost:3000/api/productos?pageSize=1000000');
          }
        })
        .catch(error => console.error("Error al obtener favoritos:", error));
    }
  }, [state.userData, dispatch, products]);

  const toggleFavorito = (productoId) => {
    console.log("Datos enviados a la API:", { usuarioId: state.userData.id, productoId });
    axios.post(`http://localhost:3000/api/favoritos`, { usuarioId: state.userData.id, productoId })
      .then(response => {
        console.log(response.data.message);
        setFavoriteStatus(prevState => ({
          ...prevState,
          [productoId]: !prevState[productoId]
        }));
        axios.get('http://localhost:3000/api/productos?pageSize=1000000'); // Solicitud adicional
      })
      .catch(error => console.error("Error al eliminar favorito:", error));
  };

  const nextPage = () => {
    if ((currentPage + 1) * productsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  return (
    <div>
      <div className="gallery">
        {currentProducts.map((producto, index) => (
          <div key={index} className="image-card">
            <img src={producto.imagenes[0]} alt={`img-${index}`} />
            <Link to={`/detail/${producto.id}`}>
              <div className="image-info">
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
              </div>
            </Link>
            <button
              onClick={() => toggleFavorito(producto.id)}
              className={`favButton ${favoriteStatus[producto.id] && state.userData ? 'favorite' : ''}`}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <span className="page-number">{currentPage + 1}</span>

        <button onClick={nextPage} disabled={(currentPage + 1) * productsPerPage >= products.length}>
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