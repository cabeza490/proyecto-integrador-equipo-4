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

export const postProducto = async (rolId, producto) => {
    try {
        let response = await axios.post(
            'http://localhost:3000/api/productos', 
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
        let response = await axios.put(`http://localhost:3000/api/productos?id=${id}`, producto)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// Eliminación de un producto por id
export const deleteProducto = async (id) => {
    try {
        let response = await axios.delete(`http://localhost:3000/api/productos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
