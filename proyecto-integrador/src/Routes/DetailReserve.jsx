// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { confirmarReserva, obtenerDetalleReserva } from '../api/reservas-Apis';
import "../Styles/DetailReserve.css";
import Modal from 'react-modal';
import { useCateringStates } from '../Components/utils/globalContext';

const DetailReserve = () => {
    const { id, fecha } = useParams();
    const navigate = useNavigate();
    
    const { state } = useCateringStates();  // Obtenemos el estado global
    const { userData } = state;  // Datos del usuario desde el estado global

    const [cargando, setCargando] = useState(true);
    const [producto, setProducto] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria_id: 0,
        precio: 0.0,
        imagenes: [{ url: "" }],
        caracteristicas: [{}],
        keywords: ""
    });
    const [fechaReserva, setFechaReserva] = useState();
    const [errorReserva, setErrorReserva] = useState();
    const [reserva, setReserva] = useState({
        usuarioId: "",
        productoId: "",
        fecha: ""
    });

    const [modalReservaOpen, setModalReservaOpen] = useState(false);

    useEffect(() => {
        if (userData) {
            setReserva(prev => ({
                ...prev,
                usuarioId: userData.id
            }));
        }
    }, [userData]);

    useEffect(() => {
        const getData = async () => {
            try {
                const getProductData = await getProductoById(id);
                setProducto(getProductData);
                setFechaReserva(fecha);
            } catch (error) {
                console.error("Error al cargar el producto");
            } finally {
                setCargando(false);
            }
        };
        getData();
    }, [id, fecha]);

    useEffect(() => {
        setReserva(prev => ({
            ...prev,
            fecha: fechaReserva,
            productoId: id
        }));
    }, [fechaReserva, id]);

    const handleBackClick = () => {
        navigate(`/detail/${id}`);
    };

    const handleConfirmarReserva = async () => {
        const confirmar = window.confirm("¿Estas seguro de confirmar la reserva?");
        if (confirmar) {
            try {
                const responseDetalle = await obtenerDetalleReserva(reserva);
                if (responseDetalle.status === 404) {
                    window.alert("Producto o usuario no encontrados");
                    return;
                }

                const response = await confirmarReserva(reserva);
                if (response.status === 500) {
                    window.alert("Error al confirmar la reserva");
                    return;
                }
                window.alert("Reserva realizada con éxito");
            } catch (error) {
                console.error("Error en la reserva:", error);
                setErrorReserva(error);
            } finally {
                openModalReserva();
            }
        }
    };

    // Modal 
    const openModalReserva = () => setModalReservaOpen(true);
    const closeModal = () => setModalReservaOpen(false);

    return (
        <div className='master-container'>
            <div className='reserva-container'>
                {cargando ? (
                    <p>Cargando producto de ID {id}...</p>
                ) : (
                    <>
                        <div className="reserva-title">
                            <h2>Reserva</h2>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="goBack"
                                onClick={handleBackClick}
                            />
                        </div>

                        <div className='bloque-nombre'>
                            <h2>{producto.nombre}</h2>
                            <h4>Día de la reserva: {fechaReserva}</h4>
                            <h4>Precio: $ {producto.precio}</h4>
                        </div>

                        <div className='bloque-nombre'>
                            <h4>Detalle del servicio</h4>
                        </div>
                        <div className='bloque-img'>
                            <img 
                                src={producto?.imagenes[0]?.url} 
                                alt={producto.nombre} 
                                width={200}
                            />
                            <p>{producto.descripcion}</p>
                        </div>
                    </>
                )}

                <div className='bloque-usuario'>
                    <h2>Tus datos</h2>
                    <p>{userData?.nombre} {userData?.apellido}</p>
                    <p>{userData?.email}</p>
                </div>

                <div className='bloque-btn'>
                    <button 
                        className='reserva-btn'
                        onClick={handleConfirmarReserva}
                    >
                        Confirmar reserva
                    </button>
                </div>
            </div>

            <Modal 
                portalClassName='modal-reserva'
                isOpen={modalReservaOpen}
                onRequestClose={closeModal}
                contentLabel='Confirmación de reserva'
                ariaHideApp={false}
            >
                {errorReserva ? (
                    <>
                        <p>Hubo un problema, intente de nuevo más tarde</p>
                        <button className='modalButton' onClick={closeModal}>Volver</button>
                    </>
                ) : (
                    <>
                        <h2>Su reserva se realizó exitosamente</h2>
                        <p>{`La fecha de su reserva es ${reserva.fecha}`}</p>
                        <button className='modalButton' onClick={closeModal}>Volver</button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default DetailReserve;

