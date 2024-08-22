import axios from 'axios';

export const userLogin = async (usuario) => {
    try {
        let response = await axios.post('http://localhost:3000/api/login', usuario);
        console.log('Inicio de sesión exitoso');
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};