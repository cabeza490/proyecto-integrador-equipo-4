// src/Components/Galeria.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { getProductos } from '../api/productos-Apis';

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
  const [productSelected, setProductSelected] = useState([])
  const {id} = useParams()
  useEffect(() => {
    const shuffled = shuffleArray(images);
    setShuffledImages(shuffled.slice(0, 9));
    console.log(getProductos());
  }, []);
  
    useEffect(() => {
        const getData = async() => {
            let getProductData = await getProductoById(id);
            setProductSelected(getProductData)
        } 
        getData()
        console.log(productSelected);
    }, [id])

  return (
    <div style={galleryStyle}>
      {shuffledImages.map((image, index) => (
        <div key={index} style={imageCardStyle(index)}>
          <img src={image.src} alt={`img-${index}`} style={imageStyle} />
          <div style={imageInfoStyle}>
            <h2 style={titleStyle}>{image.title}</h2>
            <p style={textStyle}>20 personas</p>
            <p style={textStyle}>Comida a elección standard</p>
            <p style={textStyle}>1 postre</p>
            <p style={textStyle}>1 mozo</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
};

const imageCardStyle = (index) => ({
  display: index >= 4 && window.innerWidth <= 480 ? 'none' : 'flex',
  flexDirection: 'column',
  border: '1px solid #ddd',
  borderRadius: '10px',
  overflow: 'hidden',
  backgroundColor: 'white',
  color: 'black',
  margin: '5px',
});

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const imageInfoStyle = {
  padding: '10px',
  textAlign: 'center',
};

const titleStyle = {
  margin: '0',
  fontSize: '18px',
};

const textStyle = {
  margin: '5px 0',
};

export default Galeria;
