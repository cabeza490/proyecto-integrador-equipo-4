import axios from 'axios'
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const obtenerDetalleReserva = async (reserva) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/detalle`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const confirmarReserva = async (reserva) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/confirmar`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fechasReservadas = async (productoId) => {
    try {
        // Realizar la petición GET a la API de fechas reservadas
        let response = await axios.get(`${API_BASE_URL}/api/fechasReservadas/${productoId}`);
        
        // Retornar los datos de la respuesta (array de fechas reservadas)
        return response.data.fechasReservadas;
    } catch (error) {
        console.log('Error al obtener las fechas reservadas:', error);
        throw error;  // Lanzar el error si ocurre
    }
};