import axios from "axios";

export const getAllCategorias = async () => {
    try {
        let response = await axios.get(`http://localhost:3000/api/categorias`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
};