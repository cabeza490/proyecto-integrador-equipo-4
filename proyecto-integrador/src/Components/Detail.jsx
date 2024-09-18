import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import musicNote from '/music-note.png';
import tiktok from '/tik-tok.png';
import ligthBulb from '/light-bulb.png';
import ligths from '/lights.png';
import inteligentes from '/lightbulb.png';
import rustico from '/nature.png';
import minimalista from '/alphabetical-letters.png';
import artDeco from '/art-palette.png';
import camera from '/camera.png';
import user from '/user.png';
import mediano from '/group.png';
import grande from '/grande.png';
import muyGrande from '/people.png';
import magia from '/witch-hat.png';
import dance from '/dancing.png';
import karaoke from '/microphone.png';
import sonidoAmbiente from '/waves.png';
import semiFormal from '/blazer.png';
import tematico from '/mask.png';
import sastre from '/needle-with-thread-to-sew-clothes.png';
import verano from '/sunglasses.png';
import invierno from '/scarf.png';
import cookie from '/cookie.png';
import brownie from '/brownie.png';
import mousse from '/mousse.png';
import tartaFrutal from '/cake.png';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import reservas from '../utils/reservas';
import { useCateringStates } from '../Components/utils/globalContext';

// Registrar el idioma español
registerLocale('es', es);

const Detail = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState({});
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { state } = useCateringStates(); // Obtenemos el estado global
    const { userData } = state; // Verificamos si el usuario está logueado

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

    useEffect(() => {
        const reservedDates = reservas.map(reserva => new Date(reserva.fecha_reserva));
        setDisabledDates(reservedDates);
    }, []);

    const isDateDisabled = (date) => {
        return disabledDates.some(disabledDate =>
            disabledDate.toDateString() === date.toDateString()
        );
    };

    const handleDateChange = (date) => {
        if (isDateDisabled(date)) {
            setErrorMessage('Esta fecha ya está reservada y no está disponible');
            setSelectedDate(null);
            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        } else {
            setErrorMessage('');
            setSelectedDate(date);
        }
    };

    const iniciarReserva = () => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().slice(0, 10); // Formatear fecha a "YYYY-MM-DD"
            navigate(`/reserve/${id}/${formattedDate}`);
        } else {
            alert("Por favor selecciona una fecha antes de continuar");
        }
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
                        productSelected.caracteristicas.map((caracteristica) => (
                            <div key={caracteristica.id} className="caracteristica-item">
                                <p>{caracteristica.productos_caracteristicas.valor}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay características disponibles.</p>
                    )}
                </div>
            </div>

            <div className='card_container'>
                <h3>Más detalles y disponibilidad</h3>
                <div className="card_content">
                    <div className="other_information">
                        <p className='none_padding'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati tempore veniam dolorum possimus soluta hic nulla iure quia, maxime magni est ducimus quas quidem illum odit impedit dicta maiores repellat.
                        </p>
                        <p className='none_padding'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos blanditiis debitis totam dicta illo, magnam accusamus fuga doloremque laboriosam necessitatibus sit doloribus nisi. Voluptate culpa illo placeat doloremque, cupiditate nihil?
                        </p>
                    </div>

                    {userData ? (
                        <div className="datepicker-container">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                inline
                                locale="es"
                                minDate={new Date()}
                                dayClassName={date =>
                                    isDateDisabled(date) ? 'disabled-date' : undefined
                                }
                            />
                            {errorMessage && (
                                <p className="errorMessage">{errorMessage}</p>
                            )}
                        </div>
                    ) : (
                        <div className="other_information">
                            <p className='init_sesion'>
                                Debes iniciar sesión para ver las fechas disponibles y hacer una reserva
                            </p>
                        </div>
                    )}
                </div>

                {userData && (
                    <button
                        className='button-reserva'
                        onClick={iniciarReserva}
                    >
                        Reservar
                    </button>
                )}
            </div>
        </div>
    );
};

export default Detail;

