import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import '../Styles/Detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState({});
    const [displayedFeatures, setDisplayedFeatures] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const getData = async () => {
            let getProductData = await getProductoById(id);
            console.log("Product data", getProductData);
            setProductSelected(getProductData);

            if (getProductData.caracteristicas && getProductData.caracteristicas.length > 0) {
                const shuffledFeatures = getProductData.caracteristicas
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 8);
                setDisplayedFeatures(shuffledFeatures);
            }
        };
        getData();
    }, [id]);

    return (
        <div className="content">
            <div className="card_container" key={productSelected.id}>
                <div className="card_title">
                    <h2>{productSelected.nombre || 'Título del servicio'}</h2>

                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="goBack"
                        onClick={handleBackClick}
                    />
                </div>
                <div className="card_content">
                    <div className="card_image">
                        {productSelected.imagenes && productSelected.imagenes.length > 0 ? (
                            <img src={productSelected.imagenes[0].url} alt={productSelected.nombre} />
                        ) : (
                            <div className="placeholder_image"></div>
                        )}
                    </div>
                    <p>{productSelected.descripcion || 'Descripción del servicio.'}</p>
                </div>
            </div>

            {/*<div className="card_container">
                <h3>Más detalles</h3>
                <p>Aquí irá más información que se pueda tomar desde la BBDD, como el precio.</p>
            </div>*/}

            <div className="card_container">
                <h3>Características</h3>
                <div className="caracteristicas">
                    {displayedFeatures.length > 0 ? (
                        displayedFeatures.map((caracteristica) => (
                            <div key={caracteristica.id} className="caracteristica-item">
                                <span className="caracteristica-icon">{caracteristica.icono}</span>
                                <p>{caracteristica.nombre}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay características disponibles.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Detail;
