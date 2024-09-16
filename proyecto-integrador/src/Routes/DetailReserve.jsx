import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { confirmarReserva, obtenerDetalleReserva } from '../api/reservas-Apis';
import "../Styles/DetailReserve.css"
import Modal from 'react-modal';

const DetailReserve = () => {

    const { id } = useParams();
    const { fecha } = useParams();
    const navigate = useNavigate();

    const [cargando, setCargando] = useState(true);
    const [producto, setProducto] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        imagenes: [{
            url: ""
        }],
        caracteristicas: [{}],
        keywords: ""
    });
    const [fechaReserva, setFechaReserva] = useState()
    const [usuario, setUsuario] = useState({});

    // Objeto de reserva
    const [reserva, setReserva] = useState({
        usuarioId: "",
        productoId: "",
        fecha: ""
    });

    // Estado para modal de reserva
    const [modalReservaOpen, setModalReservaOpen] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUsuario(userData);
        };

        // let nuevaFecha = "2024-09-15T01:14:00Z";
        let timeStamp = new Date();
        // console.log(nuevaFecha);
        // console.log(timeStamp.toISOString());
        setFechaReserva(timeStamp.toISOString().slice(0, 10));

        setReserva({
            usuarioId: usuario.id,
            productoId: id,
            fecha: fechaReserva
        })
        
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                let getProductData = await getProductoById(id);
                setProducto(getProductData);
            } catch (error) {
                console.error("Error al cargar producto");
            };
            // console.log("Producto llamado a la API");
        };
        getData();
    }, [id]);

    useEffect(() => {
        // setFechaReserva(fecha);
    }, [fecha]);

    useEffect(() => {
        setCargando(false);
        // console.log("Producto cargado");
        // console.log(producto);
    }, [producto])

    // Actualizar la reserva con los datos
    
    useEffect(() => {
        // console.log(reserva);
        
        setReserva(prev => {
            return {
                ...prev,
                fecha: fechaReserva}
        });
    }, [fechaReserva])
    
    useEffect(() => {
        // console.log(reserva);
        
        setReserva(prev => {
            return {
                ...prev,
                usuarioId: usuario.id}
        });
    }, [usuario])

    useEffect(() => {
        console.log(reserva);
        
    }, [reserva])


    const handleBackClick = () => {
        navigate(`/detail/${id}`);
    };

    
    // Modal 
    function openModalReserva() {
        setModalReservaOpen(true);
    };
    function afterModalOpen() {

    };
    function closeModal() {
        setModalReservaOpen(false);
        // setModalCategoriaOpen(false);
        // setUpdate(Date.now())
    };

    const handleConfirmarReserva = async () => {

        const confirmar = window.confirm("¿Estas seguro de confirmar la reserva?");
        // const confirmar = false;

        if (confirmar) {
            try {
                
                const responseDetalle = await obtenerDetalleReserva(reserva);
                if (responseDetalle.status === 404) {
                    console.log("Producto o usuario no encontrados");
                    window.alert("Producto o usuario no encontrados");
                    return
                };

                const response = await confirmarReserva(reserva);
                if (response.status === 500) {
                    console.log("Error al confirmar la reserva");
                    window.alert("Error al confirmar la reserva");
                    return
                };

            } catch (error) {
                console.log(error);
            } finally {
                console.log("Reserva realizada con éxito");
                window.alert("Reserva realizada con éxito");
            };
    
        };

        // openModalReserva();

    };

    return (
        <div className='master-container'>
            <div className='reserva-container'>
                {cargando ? 
                <>
                    <p>cargando producto de ID {id}...</p>
                </> : 
                <>
                    {/* Título y flecha de regreso --------------- */}
                    <div className="reserva-title">
                        <h2>Reserva</h2>

                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="goBack"
                            onClick={handleBackClick}
                        />
                    </div>

                    {/* Nombre de producto y fecha de la reserva --------------- */}
                    <div className='bloque-nombre'>
                        <h2>{producto.nombre}</h2>
                        <h4>Día de la reserva: {fechaReserva}</h4>
                    </div>

                    {/* Bloque de imágen y descripción --------------- */}
                    <div className='bloque-img'>
                        <img 
                            src={producto?.imagenes[0].url} 
                            alt="" 
                            width={200}
                        />
                        <p>{producto.descripcion}</p>

                    </div>
                </>}

                {/* Datos del usuario --------------- */}
                <div className='bloque-usuario'>
                    <h2>Tus datos</h2>
                    <p>{usuario.nombre} {usuario.apellido}</p>
                    <p>{usuario.email}</p>
                </div>

                <div className='bloque-btn'>
                    <button 
                        className='reserva-btn'
                        onClick={() => handleConfirmarReserva()}
                    >
                        Confirmar reserva
                    </button>
                </div>

            </div>

            <Modal 
                portalClassName='modal-product'
                isOpen={modalReservaOpen}
                onAfterOpen={afterModalOpen}
                onRequestClose={closeModal}
                contentLabel='Modal create product'
                ariaHideApp={false}
            >
                <p>Mensaje de confirmación</p>
            </Modal>

        
        </div>
    )
};

export default DetailReserve;
