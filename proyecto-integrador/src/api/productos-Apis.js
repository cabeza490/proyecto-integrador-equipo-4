import axios from 'axios'
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProductos = async () => {
    try {
        let response = await axios.get(`${API_BASE_URL}/api/productos`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getProductoById = async (id) => {
    try {
        let response = await axios.get(`${API_BASE_URL}/api/productos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllProductos = async (page = 1, pageSize = 10000) => {
    try {
        let response = await axios.get(`${API_BASE_URL}/api/productos?page=${page}&pageSize=${pageSize}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const postProducto = async (rolId, producto) => {
    try {
        let response = await axios.post(
            `${API_BASE_URL}/api/productos`, 
            producto, 
            {
                headers: {
                    'x-user-id': `${rolId}`
                }
        });
        return response.data
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const putProducto = async (id, producto) => {
    try {
        let response = await axios.put(`${API_BASE_URL}/api/productos/${id}`, producto)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// Eliminación de un producto por id
export const deleteProducto = async (id) => {
    try {
        let response = await axios.delete(`${API_BASE_URL}/api/productos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
