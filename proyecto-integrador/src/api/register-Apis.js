import axios from 'axios'
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const setUser = async (usuario) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/register`, usuario);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}