import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUsuario(userData);
        };
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                let getProductData = await getProductoById(id);
                setProducto(getProductData);
            } catch (error) {
                console.log("Error al cargar producto");
            };
            console.log("Producto llamado a la API");
        };
        getData();
    }, [id]);

    useEffect(() => {
        // setFechaReserva(new Date(fecha));
        setFechaReserva(fecha);
    }, [fecha]);

    useEffect(() => {
        setCargando(false);
        console.log("Producto cargado");
        console.log(producto);
    }, [producto])

    const handleBackClick = () => {
        navigate(`/detail/${id}`);
    };

    return (
        <>
            <div className='card_container'>
                {cargando ? 
                <>
                    <p>cargando producto de ID {id}...</p>
                </> : 
                <>
                    <div className="card_title">
                        <h2>Reserva</h2>

                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="goBack"
                            onClick={handleBackClick}
                        />
                    </div>

                    <h2>{producto.nombre}</h2>
                    <h4>Día de la reserva: {fechaReserva}</h4>
                    <div className='card_image'>
                        <img 
                            src={producto?.imagenes[0].url} 
                            alt="" 
                            width={200}
                        />
                        <p>{producto.descripcion}</p>

                    </div>
                </>}

                <h3>Tus datos</h3>
                <p>{usuario.nombre} {usuario.apellido}</p>
                <p>{usuario.email}</p>

                
                <button className='button-primary create-product'>
                    Confirmar reserva
                </button>

            </div>


        
        </>
    )
};

export default DetailReserve;
