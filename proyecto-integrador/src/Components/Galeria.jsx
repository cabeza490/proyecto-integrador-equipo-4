// src/Components/Galeria.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../Styles/Galeria.css'; // Importa los estilos CSS

const images = [
  { src: '/product_img/boda_grande.jpg', title: 'Boda Grande' },
  { src: '/product_img/boda_mediana.jpeg', title: 'Boda Mediana' },
  { src: '/product_img/boda_pequeña.jpg', title: 'Boda Pequeña' },
  { src: '/product_img/cumple_infantil.jpg', title: 'Cumple Infantil' },
  { src: '/product_img/cumple_mediano.jpg', title: 'Cumple Mediano' },
  { src: '/product_img/cumple_pequeño.jpg', title: 'Cumple Pequeño' },
  { src: '/product_img/empresarial_grande.jpeg', title: 'Empresarial Grande' },
  { src: '/product_img/empresarial_mediano.jpg', title: 'Empresarial Mediano' },
  { src: '/product_img/evento_banda.jpg', title: 'Evento Banda' },
  { src: '/product_img/empresarial_pequeño.jpg', title: 'Empresarial Pequeño' },
  { src: '/product_img/evento_dj.jpeg', title: 'Evento DJ' },
  { src: '/product_img/mesa_dulces.jpg', title: 'Mesa Dulces' },
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Galeria = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let numberOfImages = 8; // Default for desktop and tablets

      if (width <= 480) {
        numberOfImages = 4; // For mobile devices
      }
      const shuffled = shuffleArray(images);
      setShuffledImages(shuffled.slice(0, numberOfImages));
    };

    handleResize(); // Set images based on initial screen size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="gallery">
      {shuffledImages.map((image, index) => (
        <div key={index} className="image-card">
          <img src={image.src} alt={`img-${index}`} />
          <div className="image-info">
            <h2>{image.title}</h2>
            <p>20 personas</p>
            <p>Comida a elección standard</p>
            <p>1 postre</p>
            <p>1 mozo</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;
