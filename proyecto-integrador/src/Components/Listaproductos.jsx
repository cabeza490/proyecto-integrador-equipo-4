import React from 'react';
import { getProductos, getAllProductos } from '../api/productos-Apis';
import { useState, useEffect } from 'react';
import "../Styles/Listaproductos.css";
import Modal from 'react-modal';
import CreateEdit from './CreateEdit';
import { getAllCategorias } from '../api/categorias-Apis';
import { getAllCaracteristicas } from '../api/caracteristicas-Apis';


const ListaProductos = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    // estados para las características y categorías
    const [listaCategorias, setListaCategorias] = useState([]);
    const [listaCaracteristicas, setListaCaracteristicas] = useState([]);

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

    
    useEffect(() => {

        // Categorías
        const getListaCategorias = async () => {
            try {
                let getListaCategorias = await getAllCategorias();
                setListaCategorias(getListaCategorias);
            } catch (error) {
                console.log("Error al obtener las categorías");
            };
        };
        getListaCategorias();

        // Características
        const getListaCaracteristicas = async () => {
            try {
                let getListaCaracteristicas = await getAllCaracteristicas();
                setListaCaracteristicas(getListaCaracteristicas);
            } catch (error) {
                console.log("Error al obtener las características");
            };
        };
        getListaCaracteristicas();

    }, [])

    // Modal 
    function openModal() {
        setModalOpen(true);
    }
    function afterModalOpen() {

    }
    function closeModal() {
        setModalOpen(false);
    }

    return(
        <>
            {cargando ? (<p>cargando...</p>) : (
                <div className='list-container'>
                    <button className='button-primary create-product' onClick={openModal}>
                        Agregar producto +
                    </button>

                    <table className='list-table'>
                        <thead>
                            <tr>
                            <th>Id</th>
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
                    <Modal portalClassName='modal-product'
                        isOpen={modalOpen}
                        onAfterOpen={afterModalOpen}
                        onRequestClose={closeModal}
                        contentLabel='Modal create product'
                    >
                        <CreateEdit
                            nuevoProducto={true}
                            listaCategorias={listaCategorias}
                            listaCaracteristicas={listaCaracteristicas}
                        />
                    </Modal>
                </div>
            )}
        </>

    )
};

export default ListaProductos;