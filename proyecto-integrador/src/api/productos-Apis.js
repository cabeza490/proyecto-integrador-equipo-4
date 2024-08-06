import axios from 'axios'

export const getProductos = async () => {
    try {
        let response = await axios.get('http://localhost:8080/productos')
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getProductosById = async (id) => {
    try {
        let response = await axios.get(`http://localhost:8080/productos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}