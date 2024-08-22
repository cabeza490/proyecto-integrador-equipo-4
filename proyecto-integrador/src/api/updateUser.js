import axios from 'axios';

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/usuarios/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};
