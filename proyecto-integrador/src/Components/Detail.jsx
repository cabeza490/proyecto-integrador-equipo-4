import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import '../Styles/Detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faBurger, faCookie, faMusic, faLightbulb,
    faCircleHalfStroke, faEye, faIcons, faPeopleRoof, faGuitar,
    faVolumeHigh, faPersonDress, faCakeCandles, faHeadphones, faPalette,
    faCamera, faPeopleGroup, faDrum, faPlay, faChildDress, faIceCream,
    faSun, faCompactDisc, faAppleWhole, faMugSaucer, faLemon,
    faSnowflake, faExpand, faCameraRetro, faFileImage, faFaceGrinTears,
    faBell, faCubes, faVideo
} from '@fortawesome/free-solid-svg-icons';
import chiliSauceIcon from '/chili-sauce.png';
import musicNote from '/music-note.png'
import tiktok from '/tik-tok.png'
import ligthBulb from '/light-bulb.png'
import ligths from '/lights.png'
import inteligentes from '/lightbulb.png'
import rustico from '/nature.png'
import minimalista from '/alphabetical-letters.png'
import artDeco from '/art-palette.png'
import camera from '/camera.png'
import user from '/user.png'
import mediano from '/group.png'
import grande from '/grande.png'
import muyGrande from '/people.png'
import magia from '/witch-hat.png'
import dance from '/dancing.png'
import karaoke from '/microphone.png'
import sonidoAmbiente from '/waves.png'
import semiFormal from '/blazer.png'
import tematico from '/mask.png'
import sastre from '/needle-with-thread-to-sew-clothes.png'
import verano from '/sunglasses.png'
import invierno from '/scarf.png'
import cookie from '/cookie.png'
import brownie from '/brownie.png'
import mousse from '/mousse.png'
import tartaFrutal from '/cake.png'

// Mapeo de nombres de íconos en FontAwesome
const iconMap = {
    "burger": faBurger,
    "cookie": faCookie,
    "music": faMusic,
    "circle-half-stroke": faCircleHalfStroke,
    "eye": faEye,
    "icons": faIcons,
    "people-roof": faPeopleRoof,
    "guitar": faGuitar,
    "volume-high": faVolumeHigh,
    "person-dress": faPersonDress,
    "cake-candles": faCakeCandles,
    "headphones": faHeadphones,
    "lightbulb": faLightbulb,
    "palette": faPalette,
    "camera": faCamera,
    "people-group": faPeopleGroup,
    "drum": faDrum,
    "play": faPlay,
    "child-dress": faChildDress,
    "ice-cream": faIceCream,
    "sun": faSun,
    "compact-disc": faCompactDisc,
    "apple-whole": faAppleWhole,
    "mug-saucer": faMugSaucer,
    "lemon": faLemon,
    "snowflake": faSnowflake,
    "expand": faExpand,
    "camera-retro": faCameraRetro,
    "file-image": faFileImage,
    "face-grin-tears": faFaceGrinTears,
    "bell": faBell,
    "cubes": faCubes,
    "video": faVideo,
};

// Mapeo de íconos de Flaticon con rutas locales
const iconMapFlaticon = {
    "https://www.flaticon.com/free-icon/chili-sauce_4443380?term=spicy+sauce+chili&page=1&position=2&origin=search&related_id=4443380": chiliSauceIcon,
    "https://www.flaticon.com/free-icon/music-note_651717?related_id=651717": musicNote,
    "https://www.flaticon.com/free-icon/tik-tok_3046120?related_id=3046120": tiktok,
    "https://www.flaticon.com/free-icon/light-bulb_5506369?term=bulb&page=1&position=34&origin=search&related_id=5506369": ligthBulb,
    "https://www.flaticon.com/free-icon/lights_17256570?term=bulb&page=1&position=9&origin=search&related_id=17256570": ligths,
    "https://www.flaticon.com/free-icon/lightbulb_7491930?term=bulb+wifi&page=1&position=10&origin=search&related_id=7491930": inteligentes,
    "https://www.flaticon.com/free-icon/nature_14464590?term=rustic+decoration&page=1&position=2&origin=search&related_id=14464590": rustico,
    "https://www.flaticon.com/free-icon/alphabetical-letters_11147454?term=minimalist&page=1&position=32&origin=search&related_id=11147454": minimalista,
    "https://www.flaticon.com/free-icon/paint_103410?term=art+and+deco&page=1&position=1&origin=search&related_id=103410": artDeco,
    "https://www.flaticon.com/free-icon/camera_17610448?term=camera&page=1&position=13&origin=search&related_id=17610448": camera,
    "https://www.flaticon.com/free-icon/user_456212?term=users&page=1&position=1&origin=search&related_id=456212": user,
    "https://www.flaticon.com/free-icon/group_3394785?term=users&page=1&position=59&origin=search&related_id=3394785": mediano,
    "https://www.flaticon.com/free-icon/group_681494?term=users&page=1&position=7&origin=search&related_id=681494": grande,
    "https://www.flaticon.com/free-icon/people_9942543?term=team&page=1&position=31&origin=tag&related_id=9942543": muyGrande,
    "https://www.flaticon.com/free-icon/witch-hat_2316838?term=hat+wizard&page=1&position=6&origin=search&related_id=2316838": magia,
    "https://www.flaticon.com/free-icon/dancing_2410394?term=dance&page=1&position=4&origin=search&related_id=2410394": dance,
    "https://www.flaticon.com/free-icon/microphone_2168497?term=microphone&page=1&position=8&origin=search&related_id=2168497": karaoke,
    "https://www.flaticon.com/free-icon/waves_17468930?term=waves&page=1&position=1&origin=search&related_id=17468930": sonidoAmbiente,
    "https://www.flaticon.com/free-icon/blazer_14299588?term=tuxedo&related_id=14299588":semiFormal,
    "https://www.flaticon.com/free-icon/mask_3743249?term=theater+masks&page=1&position=14&origin=search&related_id=3743249":tematico,
    "https://www.flaticon.com/free-icon/needle-with-thread-to-sew-clothes_27046?term=needle&page=1&position=1&origin=search&related_id=27046":sastre,
    "https://www.flaticon.com/free-icon/sunglasses_139929?term=sunglasses&related_id=139929":verano,
    "https://www.flaticon.com/free-icon/scarf_6251858?related_id=6251858":invierno,
    "https://www.flaticon.com/free-icon/cookie_14226985?term=cookies&related_id=14226985":cookie,
    "https://www.flaticon.com/free-icon/brownie_7647922?term=brownies&page=1&position=6&origin=search&related_id=7647922":brownie,
    "https://www.flaticon.com/free-icon/mousse_1351331?term=mousse&page=1&position=2&origin=search&related_id=1351331":mousse,
    "https://www.flaticon.com/free-icon/cake_2682340?term=cake&page=1&position=1&origin=search&related_id=2682340":tartaFrutal,


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

    const extractFontAwesomeIconName = (url) => {
        const match = url.match(/icons\/([^?]+)/);
        return match ? match[1] : null;
    };

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

            <div className="card_container">
                <h3>Características</h3>
                <div className="caracteristicas">
                    {productSelected.caracteristicas && productSelected.caracteristicas.length > 0 ? (
                        productSelected.caracteristicas.map((caracteristica) => {
                            const iconName = extractFontAwesomeIconName(caracteristica.icono);
                            const flaticonUrl = caracteristica.icono;

                            return (
                                <div key={caracteristica.id} className="caracteristica-item">
                                    {iconMap[iconName] ? (
                                        <FontAwesomeIcon
                                            icon={iconMap[iconName]}
                                            className="caracteristica-icon"
                                        />
                                    ) : (
                                        <img
                                            src={iconMapFlaticon[flaticonUrl]}
                                            alt={caracteristica.valor}
                                            className="caracteristicas-img"
                                        />
                                    )}
                                    <p>{caracteristica.valor}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay características disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detail;
