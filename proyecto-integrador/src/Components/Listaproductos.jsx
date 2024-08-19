import React from 'react';
import { getProductos } from '../api/productos-Apis';
import { useState, useEffect } from 'react';
import "../Styles/Listaproductos.css";

const ListaProductos = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const getData = async() => {
            try {
                let getProducts = await getProductos();
                setProductos(getProducts.productos)
            } catch (error) {
                console.error("Error al obtener los productos");
            } finally {
                setCargando(false);
            };
        } 
        getData()
    }, [])
    console.log(productos);
    console.log(productos.length);

    return(
        <>
            {cargando ? (<p>cargando...</p>) : (
                <div className='list-container'>
                    <table className='list-table'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td className='nombre-producto'>
                                    {producto.nombre}
                                </td>
                                <td>
                                    <button>
                                        <img src="../../public/edit-svgrepo-com.svg" 
                                        width="15"
                                        alt="editar elemento" />
                                    </button>
                                    <button>
                                        <img src="../../public/close-svgrepo-com.svg" 
                                        width="15"
                                        alt="eliminar elemento" />
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                </div>
            )}
        </>

    )
};

export default ListaProductos;