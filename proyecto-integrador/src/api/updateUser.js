// updateUser.js
export const updateUser = async (id, userData) => {
    const response = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
    }

    return response.json();
};



