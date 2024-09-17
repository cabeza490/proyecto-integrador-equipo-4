import axios from 'axios'
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const obtenerDetalleReserva = async (reserva) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/detalle`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};


export const confirmarReserva = async (reserva) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/confirmar`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

export const fechasDisponibles = async (consulta) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/fechasDisponibles`, consulta);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};