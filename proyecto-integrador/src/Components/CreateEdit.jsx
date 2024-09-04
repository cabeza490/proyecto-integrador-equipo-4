import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { postProducto } from '../api/productos-Apis';


const CreateEdit = ({
    nuevoProducto = true, 
    editProducto = {
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        imagenes: [],
        caracteristicas: [{
            id: "",
            valor: ""
        }]
    }, 
    listaCategorias, 
    listaCaracteristicas
}) => {
    // Éste comoponente irá dentro de un modal, contendrá un wizard para ayudar en la creación de un producto nuevo o editarlo

    const [userData, setUserData] = useState({})
    
    // const { nombre, descripcion, categoria_id, precio, imagenes } = req.body;
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        keywords: ""
    });

    const [imagenes, setImagenes] = useState([""]);

    const [caracteristicas, setCaracteristicas] = useState([{
        id: "",
        valor: ""
    }]);

    const [verMensajeExito, setVerMensajeExito] = useState(false);

    
    // const [errors, setErrors] = useState({});
    // const [valid, setValid] = useState({});
    // const [touched, setTouched] = useState({});
    // const [submitMessage, setSubmitMessage] = useState(""); 
    // const [isFormValid, setIsFormValid] = useState(false);



    const handleChange = (event) => {
        const {name, value} = event.target;

        setProducto((prevState) => ({
            ...prevState,
            [name]: value
        }));
        // console.log(producto);
    };

    const handleChangeKeywords = (event) => {
        const {name, value} = event.target;
        setProducto((prevState) => ({
            ...prevState,
            keywords: value
        }));
    }

    const handleChangeCategoria = (event) => {
        const {name, value} = event.target;
        setProducto((prevState) => ({
            ...prevState,
            categoria_id: value
        }));
    }

    // Manejo de las imágenes, es un array con URLs
    const handleAgregarOtraImagen = () => {
        setImagenes([...imagenes, ""])
        // console.log(imagenes);
    };

    const handleEliminarInput = (index) => {
        let nuevasImagenes = [...imagenes];
        nuevasImagenes.splice(index, 1);
        setImagenes(nuevasImagenes);
    };

    const handleChangeImagen = (event, index) => {
        let nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = event.target.value;
        setImagenes(nuevasImagenes);
        // console.log(imagenes);
    };
    
    // manejo de las características, array de objetos con id y valor
    const handleAgregarOtraCaracteristica = () => {
        setCaracteristicas([...caracteristicas, {
            id: "",
            valor: ""
        }]);
    };

    const handleEliminarCaracteristica = (e, index) => {
        let nuevasCaracteristicas = [...caracteristicas];
        nuevasCaracteristicas.splice(index, 1);
        setCaracteristicas(nuevasCaracteristicas);
    };

    const handleChangeCaracteristicasId = (event, index) => {

        let nuevasCaracteristicas = [...caracteristicas];
        console.log(nuevasCaracteristicas);
        
        nuevasCaracteristicas[index] = {
            ...nuevasCaracteristicas[index],
            id: event.target.value
        }

        setCaracteristicas(nuevasCaracteristicas)
    };

    const handleChangeCaracteristicasValor = (event, index) => {
        
        let nuevasCaracteristicas = [...caracteristicas];
        console.log(nuevasCaracteristicas);
        
        nuevasCaracteristicas[index] = {
            ...nuevasCaracteristicas[index],
            valor: event.target.value
        }
        setCaracteristicas(nuevasCaracteristicas);
    };


    const validate = () => {
        const newErrors = {};
        const newValid = {};


    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUserData(userData);
        }
        console.log(nuevoProducto);
        console.log(editProducto);

        if (nuevoProducto === false) {
            setProducto({
                nombre: editProducto.nombre,
                descripcion: editProducto.descripcion,
                categoria_id: editProducto.categoria_id,
                precio: editProducto.precio
            })
    
            setImagenes(editProducto.imagenes)
            setCaracteristicas(editProducto.caracteristica)
        }
        
    }, [])

    // Debugging -------------------------------
    // useEffect(() => {
    //     console.log(listaCategorias);
    // }, [listaCategorias])

    useEffect(() => {
        console.log(producto);
        console.log(imagenes);
        console.log(caracteristicas);
        setVerMensajeExito(false);
    }, [producto, imagenes, caracteristicas])
    // Debugging -------------------------------

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const nuevoProducto = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                categoria_id: producto.categoria_id,
                precio: producto.precio,
                imagenes: imagenes,
                caracteristicas: caracteristicas,
                keyword: producto.keywords
            };

            console.log(nuevoProducto);
            

            const response = await postProducto(userData.rolId, nuevoProducto);
            if (response.status === 400) {
                console.log("El nombre del producto ya está en uso");
                return;
            }

            console.log("Producto registrado exitosamente");

            setProducto({
                nombre: "",
                descripcion: "",
                categoria_id: 0, //integer
                precio: 0.0, //double
                keywords: ""
            });

            setImagenes([""]);
            
            setCaracteristicas([{
                id: "",
                valor: ""
            }])

            setVerMensajeExito(true);
            console.log("Producto registrado exitosamente");
            

            // resetear estados auxiliares

        } catch (error) {
            console.log(error);
        };
    };

    return (
        <>
            <div className='title'>
                <h1>Agregar producto</h1>
            </div>
            <div className='row'>
                <form onSubmit={handleSubmit}>
                    <table className='row-table'>

                        <tr>
                            <td>
                                <table className='column-table'>
                                    <tr>
                                        <td>
                                            <label>Nombre</label>
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name='nombre'
                                                placeholder='Servicio...'
                                                className='create-edit-input'
                                                value={producto.nombre}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Precio</label>
                                        </td>
                                        <td>
                                            <div className='create-edit-input cost'>
                                                <button 
                                                    className='no-style'
                                                    type="button"
                                                >
                                                    UYU
                                                </button>
                                                <input 
                                                    type="number" 
                                                    name="precio" 
                                                    placeholder='$'
                                                    className='no-style'
                                                    value={producto.precio}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label>Descripción</label>
                                        </td>
                                        <td>
                                            <textarea 
                                                name="descripcion" 
                                                placeholder='descripción del producto'
                                                className='create-edit-input'
                                                value={producto.descripcion}
                                                onChange={handleChange}
                                                >
                                            </textarea>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <label>Keywords</label>
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name='nombre'
                                                placeholder='keyword1, keyword2...'
                                                className='create-edit-input'
                                                value={producto.keywords}
                                                onChange={handleChangeKeywords}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>

                                        <td>
                                            <p>introduce las keywords, separadas por una coma</p>
                                        </td>
                                    </tr>
                                </table>

                            </td>

                            <td>
                                <table className='column-table'>
                                    <tr>
                                        <td>
                                            <label>imágenes</label>
                                        </td>
                                        <td>
                                            {imagenes.map((url, index) => (
                                                <div 
                                                    key={index}
                                                    className='create-edit-input container'
                                                >
                                                    <input 
                                                        type="text"
                                                        name='URLImagen'
                                                        placeholder='URL de la imagen'
                                                        className={`no-style img`}
                                                        value={url}
                                                        onChange={(e) => handleChangeImagen(e, index)}
                                                    />
                                                    {index === 0 ? 
                                                        null :
                                                        <button 
                                                            className='no-style delete-img'
                                                            onClick={() => handleEliminarInput(index)}
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </button>
                                                    }
                                                </div>
                                            ))}
                                            <button 
                                                onClick={handleAgregarOtraImagen}
                                                type="button"
                                                className='create-edit-input add-btn'
                                            >
                                                Agregar otra imagen +
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Categoría</label>
                                        </td>
                                        <td>

                                            <select 
                                                name="categorias" 
                                                id="categorias-select"
                                                className='create-edit-input'
                                                value={producto.categoria_id}
                                                onChange={handleChangeCategoria}
                                            >
                                                <option 
                                                    value=""
                                                    hidden
                                                >
                                                    seleccione la categoría
                                                </option>
                                                {listaCategorias.map((categoria, index) => (
                                                    <option 
                                                        key={index} 
                                                        value={categoria.id}
                                                    >
                                                        {categoria.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Características</label>
                                        </td>
                                        <td>
                                            {caracteristicas.map((caracteristica, index) => (
                                                <div key={index} className='create-edit-input container'>

                                                    <select 
                                                        className='input-caracteristica no-style'
                                                        name="" 
                                                        id=""
                                                        value={caracteristica.id}
                                                        onChange={(e) => handleChangeCaracteristicasId(e, index)}
                                                    >
                                                        <option 
                                                            value=""
                                                        >
                                                            tipo
                                                        </option>
                                                        {listaCaracteristicas.map((caracteristica, index) => (
                                                            <option 
                                                                key={index}
                                                                value={caracteristica.id}
                                                            >
                                                                {caracteristica.nombre}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <input 
                                                        className='input-caracteristica no-style'
                                                        type="text" 
                                                        placeholder='Detalle...'
                                                        value={caracteristica.valor}
                                                        onChange={(e) => handleChangeCaracteristicasValor(e, index)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleEliminarCaracteristica(e, index)}
                                                        className='no-style delete-img'
                                                    >
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </button>
                                                </div>
                                            ))}
                                            
                                            <button
                                                type="button"
                                                className='create-edit-input add-btn'
                                                onClick={handleAgregarOtraCaracteristica}
                                            >
                                                Agregar característica +
                                            </button>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>

                    {verMensajeExito === true ? 
                        <p className='mensaje-exito'>
                            Producto registrado correctamente!
                        </p>: 
                        <p className='mensaje-exito'>
                            {/* editando... */}
                        </p>}

                    <div className='bottom-container'>
                        <button 
                            type='submit'
                            className='button-primary create-edit'
                        >
                            Guardar
                        </button>

                        {/* <button
                            type="button"
                            className='button-primary create-edit'
                        >
                            Volver
                        </button> */}

                    </div>
                
                </form>

            </div>
        </>
    )
}

export default CreateEdit
