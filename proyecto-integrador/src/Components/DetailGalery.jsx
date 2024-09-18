import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../Styles/DetailGalery.css';

const DetailGalery = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { productSelected } = location.state || {};

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="content">
            <div className="card_container" key={productSelected?.id}>
                <div className="card_title">
                    <h2>Galería de imágenes del producto: {productSelected?.nombre}</h2>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="goBack"
                        onClick={handleBackClick}
                    />
                </div>

                <div className="card_content">
                    <div className="gallery-grid">
                        {productSelected?.imagenes.map((imagen, index) => (
                            <div key={index} className="gallery-image">
                                <img src={imagen.url} alt={`Imagen ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailGalery;
