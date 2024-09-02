import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../Styles/Galeria.css';
import { Link } from 'react-router-dom';

const Galeria = ({ searchTerm = '', selectedCategories = [], setNoResults, setTotalResults }) => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
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

        const filteredImages = searchTerm
          ? images.filter(image => image.title.toLowerCase().includes(searchTerm.toLowerCase()))
          : images;

        setShuffledImages(filteredImages);
        setTotalResults(filteredImages.length);  // Actualizar el total de resultados
        setNoResults(filteredImages.length === 0); // Actualizar estado si no hay resultados
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setNoResults(true); // Si ocurre un error, también se considera que no hay resultados
      }
    };

    fetchImages();
  }, [searchTerm, selectedCategories, setNoResults, setTotalResults]);

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
