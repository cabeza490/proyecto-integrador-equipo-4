import axios from 'axios'


export const userLogin = async(usuario) => {
    try {
        let response = await axios.post('http://localhost:3000/api/login', usuario) 
        console.log('Inicio de sesion exitoso');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}