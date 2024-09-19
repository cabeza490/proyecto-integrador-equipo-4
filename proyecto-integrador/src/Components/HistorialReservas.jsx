// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCateringStates } from '../Components/utils/globalContext';
import { Link } from 'react-router-dom';
import '../Styles/HistorialReservas.css';

// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HistorialReservas = () => {
    const { state } = useCateringStates(); // Obtener el estado global
    const { userData } = state; // Obtener los datos del usuario
    const [reservas, setReservas] = useState([]); // Estado para las reservas
    const [cargando, setCargando] = useState(true); // Estado para la carga
    const [error, setError] = useState(''); // Estado para errores

    // Obtener las reservas al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userData && userData.id) {
                    const response = await axios.get(`${API_BASE_URL}/api/historial/${userData.id}`);
                    const reservasData = response.data;

                    if (reservasData && reservasData.length > 0) {
                        setReservas(reservasData);
                    } else {
                        console.log("No hay reservas en el historial");
                    }
                } else {
                    console.error("ID de usuario no disponible");
                    setError("ID de usuario no disponible.");
                }
            } catch (error) {
                console.error("Error al obtener historial de reservas:", error);
                setError("No se pudo cargar el historial de reservas. Inténtalo de nuevo más tarde.");
            } finally {
                setCargando(false);
            }
        };
        fetchData();
    }, [userData]);

    return (
        <div>
            <section className="historial-reservas">
                <div className="reservas-list">
                    {cargando ? (
                        <p>Cargando reservas...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : reservas.length === 0 ? (
                        <p>No tienes reservas en el historial</p>
                    ) : (
                        reservas.map((reserva, index) => {
                            console.log('Reserva:', reserva); // Verifica los datos aquí
                            return (
                                <div key={index} className="reserva-card-wrapper">
                                    <div className="reserva-header">
                                        <h3>Fecha de reserva: {reserva.fecha_reserva || 'Fecha no disponible'}</h3>
                                    </div>
                                    <div className="reserva-card">
                                        <img
                                            src={reserva.producto && reserva.producto.imagenes && reserva.producto.imagenes.length > 0
                                                ? reserva.producto.imagenes[0].url
                                                : 'default-image.jpg'}
                                            alt={`reserva-${index}`}
                                        />
                                        <div className="reserva-info">
                                            <h3>{reserva.producto ? reserva.producto.nombre : 'Nombre no disponible'}</h3>
                                            <p>{reserva.producto ? reserva.producto.descripcion : 'Descripción no disponible'}</p>
                                            <p><strong>Fecha de uso del servicio:</strong> {reserva.fecha_uso || 'Fecha no disponible'}</p>
                                            <p><strong>Precio:</strong> ${reserva.producto ? reserva.producto.precio : 'Precio no disponible'}</p>
                                            <div className="reserva-buttons">
                                        <Link to={`/detail/${reserva.producto_id}`} className="detail-button">
                                            Ver detalles
                                        </Link>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
};

export default HistorialReservas;
