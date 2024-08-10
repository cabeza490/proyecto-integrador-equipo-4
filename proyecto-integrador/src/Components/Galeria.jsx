// src/Components/Galeria.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Galeria.css'; // Importa los estilos CSS
import { Link } from 'react-router-dom';

const Galeria = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let numberOfImages = 8; // Default for desktop and tablets

      if (width <= 480) {
        numberOfImages = 4; // For mobile devices
      }

      // Obtener imágenes desde el backend
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
          setShuffledImages(shuffled.slice(0, numberOfImages));
        } catch (error) {
          console.error('Error al obtener las imágenes:', error);
        }
      };

      fetchImages();
    };

    handleResize(); // Set images based on initial screen size
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

export default Galeria;


