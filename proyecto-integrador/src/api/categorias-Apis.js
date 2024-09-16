import axios from "axios";

export const getAllCategorias = async () => {
    try {
        let response = await axios.get(`http://localhost:3000/api/categorias`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};

export const createCategoria = async (categoria) => {
    try {
        let response = await axios.post(`http://localhost:3000/api/categorias`, categoria);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};