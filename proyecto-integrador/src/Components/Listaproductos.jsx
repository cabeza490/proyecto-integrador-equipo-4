import React from 'react';
import { getProductos, getAllProductos } from '../api/productos-Apis';
import { useState, useEffect } from 'react';
import "../Styles/Listaproductos.css";
import Modal from 'react-modal';
import CreateEdit from './CreateEdit';
import { getAllCategorias } from '../api/categorias-Apis';
import { getAllCaracteristicas } from '../api/caracteristicas-Apis';


const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [verEdit, setVerEdit] = useState([]);
    const [panelEditar, setPanelEditar] = useState(false)

    // Estados para cargar el modal de editar
    const [crearNuevo, setCrearNuevo] = useState(true);
    const [editProducto, setEditProducto] = useState({
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        imagenes: [],
        caracteristicas: [{}]
    });
    let productoAEditar = {}

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
    // console.log(productos);
    // console.log(productos.length);

    
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

    useEffect(() => {
        setVerEdit(productos.map(() => false))
    }, [productos])

    useEffect(() => {
        console.log(verEdit);
        
    }, [verEdit])

    const verPanelCrear = () => {
        setCrearNuevo(true);
        setEditProducto({});
        openModal();
    }

    const verPanelEditar = (index) => {
        // setCrearNuevo(false);
        // setEditProducto(productos[index]);
        // productoAEditar = productos[index];
        // console.log(productoAEditar);


        let arrayNuevo = verEdit;
        console.log("array :", arrayNuevo);
        
        arrayNuevo[index] = !arrayNuevo[index];
        // console.log(arrayNuevo);
        
        setVerEdit(arrayNuevo);
        console.log("hola", verEdit);
        
        setPanelEditar(!panelEditar);
        
    }

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
                    <button className='button-primary create-product' onClick={verPanelCrear}>
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
                            {productos.length > 0 ?(
                                
                                productos.map((producto, index) => (
                                    <>
                                    <tr key={producto.id}>
                                        <td className='list-cell'>{producto.id}</td>
                                        <td className='nombre-producto list-cell'>
                                            {producto.nombre}
                                        </td>
                                        <td className='list-cell'>
                                            <button 
                                                className='button-primary'
                                                onClick={() => verPanelEditar(index)}
                                            >
                                                Editar
                                            </button>
                                            <button className='button-primary'>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                    {/* <tr
                                        className={verEdit[index] ? "edit-container":"hidden-row"}
                                    >
                                        <td colSpan={3}>
                                            <div
                                            >
                                                <CreateEdit
                                                    nuevoProducto={false}
                                                    editProducto={producto[index]}
                                                    listaCategorias={listaCategorias}
                                                    listaCaracteristicas={listaCaracteristicas}
                                                />
                                            </div>
                                            
                                        </td>
                                    </tr> */}
                                    </>
                                )
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
                            editProducto={editProducto}
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