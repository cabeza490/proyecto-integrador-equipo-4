import React from 'react';
import { getProductos, getAllProductos } from '../api/productos-Apis';
import { useState, useEffect } from 'react';
import "../Styles/Listaproductos.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

const ListaProductos = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const getData = async() => {
            try {
                let getProducts = await getAllProductos(1,99);
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
                            {productos.length > 0 ?
                            (productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td className='nombre-producto'>
                                    {producto.nombre}
                                </td>
                                <td>
                                    <button className='button-primary'>Editar
                                        {/* <FontAwesomeIcon icon={faPen} fixedWidth /> */}
                                    </button>
                                    <button className='button-primary'>Eliminar
                                        {/* <FontAwesomeIcon icon={faXmark} fixedWidth  /> */}
                                    </button>
                                </td>
                            </tr>)
                            )): (<p>No se encontraron productos</p>)}
                        </tbody>
                    </table> 
                    <button className='button-primary create-product'>+</button>
                </div>
            )}
        </>

    )
};

export default ListaProductos;