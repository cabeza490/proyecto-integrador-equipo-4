import axios from "axios";

export const getAllCaracteristicas = async () => {
    try {
        let response = await axios.get(`http://localhost:3000/api/caracteristicas`);
        return response.data;
    } catch (error) {
        console.log(error);
    };
}