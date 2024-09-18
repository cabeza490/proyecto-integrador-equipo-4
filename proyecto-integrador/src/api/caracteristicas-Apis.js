import axios from "axios";
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCaracteristicas = async () => {
    try {
        let response = await axios.get(`${API_BASE_URL}/api/caracteristicas`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
}