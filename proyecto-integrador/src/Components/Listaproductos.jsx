import React from 'react';
import { getProductos, getAllProductos, deleteProducto } from '../api/productos-Apis';
import { useState, useEffect } from 'react';
import "../Styles/Listaproductos.css";
import Modal from 'react-modal';
import CreateEdit from './CreateEdit';
import { getAllCategorias } from '../api/categorias-Apis';
import { getAllCaracteristicas } from '../api/caracteristicas-Apis';


const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [update, setUpdate] = useState(Date.now())

    // Estados para el modal
    const [modalOpen, setModalOpen] = useState(false);

    // Estados para el panel de editar
    const [verEdit, setVerEdit] = useState([]);
    // const [panelHabilitado, setPanelHabilitado] = useState(false)
    let panelHabilitado = false

    // Estados para cargar el modal de editar
    const [crearNuevo, setCrearNuevo] = useState(true);
    const [editProducto, setEditProducto] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        imagenes: [],
        caracteristicas: [{}],
        keywords: ""
    });

    // estados para las características y categorías
    const [listaCategorias, setListaCategorias] = useState([]);
    const [listaCaracteristicas, setListaCaracteristicas] = useState([]);

    const getData = async() => {
        try {
            let getProducts = await getAllProductos(1,99);
            setProductos(getProducts.productos)
        } catch (error) {
            console.error("Error al obtener los productos");
        } finally {
            setCargando(false);
        };
    } ;

    useEffect(() => {
        getData();
    }, [])
    
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
        getData();
    }, [update]);

    useEffect(() => {
        setVerEdit(productos.map(() => false))
    }, [productos])

    useEffect(() => {
        // console.log(verEdit);
        
    }, [verEdit])

    const verPanelCrear = () => {
        setCrearNuevo(true);
        setEditProducto({
            id: "",
            nombre: "",
            descripcion: "",
            categoria_id: 0, //integer
            precio: 0.0, //double
            imagenes: [""],
            caracteristicas: [{}],
            keywords: ""
        });
        openModal();
    }

    const verPanelEditar = (index) => {
        
        // setPanelEditar(!panelEditar);
        setCrearNuevo(false);
        setEditProducto(productos[index]);
        // console.log(editProducto);
        openModal();
        
    };

    useEffect(() => {
        if (panelHabilitado) {
            openModal();
            console.log("hola");
        }
        panelHabilitado = true
        console.log("editProduct actualizado");
        console.log(panelHabilitado);
    }, [editProducto]);

    // Eliminar producto
    const eliminarProducto = async(id) => {
        const confirmar = window.confirm("¿Estas seguro de que quieres eliminar el producto?")

        if (confirmar) {
            try {
                await deleteProducto(id);
            } catch (error) {
                console.log("Error al intentar eliminar el producto")
                return
            } finally {
                setUpdate(Date.now())
            }
            console.log("Producto eliminado correctamente");
            window.alert("Producto eliminado correctamente");
        }

    };

    // Modal 
    function openModal() {
        setModalOpen(true);
    };
    function afterModalOpen() {

    };
    function closeModal() {
        setModalOpen(false);
        setUpdate(Date.now())
    };

    return(
        <>
            {cargando ? (<p>cargando...</p>) : (
                <div className='list-container'>
                    <button className='button-primary create-product' onClick={() => verPanelCrear()}>
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
                                                type='button'
                                                className='button-primary'
                                                onClick={() => verPanelEditar(index)}
                                            >
                                                Editar Producto
                                            </button>

                                            <button 
                                                type='button'
                                                className='button-primary'
                                                onClick={() => eliminarProducto(producto.id)}
                                            >
                                                Eliminar Producto
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
                            nuevoProducto={crearNuevo}
                            editProducto={editProducto}
                            listaCategorias={listaCategorias}
                            listaCaracteristicas={listaCaracteristicas}
                            closeModal={closeModal}
                        />
                    </Modal>
                </div>
            )}
        </>

    )
};

export default ListaProductos;
