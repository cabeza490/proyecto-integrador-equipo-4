import axios from 'axios'

export const getProductos = async () => {
    try {
        let response = await axios.get('http://localhost:3000/api/productos')
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getProductoById = async (id) => {
    try {
        let response = await axios.get(`http://localhost:3000/api/productos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllProductos = async (page = 1, pageSize = 10) => {
    try {
        let response = await axios.get(`http://localhost:3000/api/productos?page=${page}&pageSize=${pageSize}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}