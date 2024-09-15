import axios from 'axios'

export const obtenerDetalleReserva = async (reserva) => {
    try {
        let response = await axios.post(`http://localhost:3000/api/detalle`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};


export const confirmarReserva = async (reserva) => {
    try {
        let response = await axios.post(`http://localhost:3000/api/confirmar`, reserva);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

export const fechasDisponibles = async (consulta) => {
    try {
        let response = await axios.post(`http://localhost:3000/api/fechasDisponibles`, consulta);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};