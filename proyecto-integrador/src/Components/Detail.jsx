import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import '../Styles/Detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faBurger, faCookie, faMusic, faLightbulb, faCircleHalfStroke, faEye, faIcons, faPeopleRoof, faGuitar, faVolumeHigh, faPersonDress, faCakeCandles, faHeadphones, faPalette, faCamera, faPeopleGroup, faDrum, faPlay, faChildDress, faIceCream } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
    "https://fontawesome.com/icons/burger?f=classic&s=light": faBurger,
    "https://fontawesome.com/icons/cookie?f=classic&s=solid": faCookie,
    "https://fontawesome.com/icons/music?f=classic&s=solid": faMusic,
    "https://fontawesome.com/icons/circle-half-stroke?f=classic&s=solid": faCircleHalfStroke,
    "https://fontawesome.com/icons/eye?f=classic&s=solid": faEye,
    "https://fontawesome.com/icons/icons?f=classic&s=solid": faIcons,
    "https://fontawesome.com/icons/people-roof?f=classic&s=solid": faPeopleRoof,
    "https://fontawesome.com/icons/guitar?f=classic&s=solid": faGuitar,
    "https://fontawesome.com/icons/volume-high?f=classic&s=solid": faVolumeHigh,
    "https://fontawesome.com/icons/person-dress?f=classic&s=solid": faPersonDress,
    "https://fontawesome.com/icons/cake-candles?f=classic&s=solid": faCakeCandles,
    "https://fontawesome.com/icons/headphones?f=classic&s=solid": faHeadphones,
    "https://fontawesome.com/icons/palette?f=classic&s=solid": faPalette,
    "https://fontawesome.com/icons/camera?f=classic&s=solid": faCamera,
    "https://fontawesome.com/icons/people-group?f=classic&s=solid": faPeopleGroup,
    "https://fontawesome.com/icons/drum?f=classic&s=solid": faDrum,
    "https://fontawesome.com/icons/play?f=classic&s=solid": faPlay,
    "https://fontawesome.com/icons/child-dress?f=classic&s=solid": faChildDress,
    "https://fontawesome.com/icons/ice-cream?f=classic&s=light": faIceCream,
    "https://fontawesome.com/icons/lightbulb?f=classic&s=regular": faLightbulb,
};

const Detail = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState({});

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const getData = async () => {
            let getProductData = await getProductoById(id);
            setProductSelected(getProductData);
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
                    {productSelected.caracteristicas && productSelected.caracteristicas.length > 0 ? (
                        productSelected.caracteristicas.map((caracteristica) => (
                            <div key={caracteristica.id} className="caracteristica-item">
                                <FontAwesomeIcon
                                    icon={iconMap[caracteristica.icono]}
                                    className="caracteristica-icon"
                                />
                                <p>{caracteristica.valor}</p>
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
