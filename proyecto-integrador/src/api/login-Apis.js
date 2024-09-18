import axios from 'axios';
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userLogin = async (usuario) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/login`, usuario);
        console.log('Inicio de sesión exitoso');
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};