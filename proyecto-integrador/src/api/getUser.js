// getUser.js
export const getUser = async (id) => {
    const response = await fetch(`/api/usuarios/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
    }
    return response.json();
};
