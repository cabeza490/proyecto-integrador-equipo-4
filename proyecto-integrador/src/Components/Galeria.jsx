import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';

const Galeria = ({ searchTerm = '', selectedCategories = [], setNoResults, setTotalResults }) => {
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

          // Filtrar por categorías seleccionadas
          const filteredByCategory = selectedCategories.length > 0
            ? productos.filter(producto => selectedCategories.includes(producto.categoria_id))
            : productos;

          const images = filteredByCategory.flatMap(producto => producto.imagenes.map(imagen => ({
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
          console.log('Filtered Images:', filteredImages.length);  // Verifica la cantidad de resultados filtrados
          setTotalResults(filteredImages.length); // Actualizar el total de resultados
          setNoResults(filteredImages.length === 0); // Actualizar estado si no hay resultados
        } catch (error) {
          console.error('Error al obtener las imágenes:', error);
          setNoResults(true); // Si ocurre un error, también se considera que no hay resultados
        }
      };

      fetchImages();
    };

    handleResize(); // Set images based on initial screen size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [searchTerm, selectedCategories, setNoResults, setTotalResults]); // Agregar selectedCategories y setTotalResults como dependencias

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
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
        </div>
      ))}
    </div>
  );
};

Galeria.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.number),  // Aceptar un array de IDs de categorías
  setNoResults: PropTypes.func.isRequired,
  setTotalResults: PropTypes.func.isRequired,  // Prop para actualizar el total de resultados
};

export default Galeria;
