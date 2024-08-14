import axios from 'axios'

export const setUser = async (usuario) => {
    try {
        let response = await axios.post('http://localhost:3000/api/register', usuario)
        return response.data
    } catch (error) {
        console.log(error);
    }
}