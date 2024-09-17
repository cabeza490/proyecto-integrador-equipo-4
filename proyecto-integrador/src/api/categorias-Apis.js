import axios from "axios";
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCategorias = async () => {
    try {
        let response = await axios.get(`${API_BASE_URL}/api/categorias`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

export const createCategoria = async (categoria) => {
    try {
        let response = await axios.post(`${API_BASE_URL}/api/categorias`, categoria);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};