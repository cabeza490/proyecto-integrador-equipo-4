import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { postProducto, putProducto, getProductoById } from '../api/productos-Apis';


const CreateEdit = ({
    nuevoProducto = true, 
    editProducto = {
        id: "",
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        imagenes: ["", ""],
        caracteristicas: [{
            id: "",
            valor: ""
        },
        {
            id: "",
            valor: ""
        }],
        keywords: ""
    }, 
    listaCategorias, 
    listaCaracteristicas,
    closeModal
}) => {
    // Éste comoponente irá dentro de un modal

    const [userData, setUserData] = useState({})
    
    // const { nombre, descripcion, categoria_id, precio, imagenes } = req.body;
    // const [producto, setProducto] = useState({
    //     nombre: "",
    //     descripcion: "",
    //     categoria_id: 0, //integer
    //     precio: 0.0, //double
    //     keywords: ""
    // });

    const [producto, setProducto] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
        keywords: ""}
    );

    const [imagenes, setImagenes] = useState([""]);

    const [caracteristicas, setCaracteristicas] = useState([{
        id: "",
        valor: ""
    }]);

    const [verMensajeExito, setVerMensajeExito] = useState(false);

    const [cargando, setCargando] = useState(true)

    const [valid, setValid] = useState({
        nombre: true,
        precio: true,
        descripcion: true,
        keywords: true,
        imagenes: true,
        categoria: true,
        caracteristicas: true,
        caracteristicasUnicas: true
    });


    
    // const [errors, setErrors] = useState({});
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

        setValid({
            nombre: true,
            precio: true,
            descripcion: true,
            keywords: true,
            imagenes: true,
            categoria: true,
            caracteristicas: true,
            caracteristicasUnicas: true
        });

        let isValid = true;

        if (producto.nombre === "") {
            setValid((prev) => ({
                ...prev,
                nombre: false
            }));
            isValid = false;
        }; 

        if (producto.precio === 0) {
            setValid((prev) => ({
                ...prev,
                precio: false
            }));
            isValid = false;
        }; 
        
        if (producto.descripcion === "") {
            setValid((prev) => ({
                ...prev,
                descripcion: false
            }));
            isValid = false;
        }; 
        
        if (producto.keywords === "") {
            setValid((prev) => ({
                ...prev,
                keywords: false
            }));
            isValid = false;
        };
        
        // if (imagenes[0] === "") {
        //     setValid((prev) => ({
        //         ...prev,
        //         imagenes: false
        //     }));
        //     isValid = false;
        // };

        if (imagenes.some(imagen => imagen === "")) {
            setValid((prev) => ({
                ...prev,
                imagenes: false
            }));
            isValid = false;
        };
        
        if (producto.categoria_id === 0 || 
            producto.categoria_id === "") {
            setValid((prev) => ({
                ...prev,
                categoria: false
            }));
            isValid = false;
        } ;
        
        // if (caracteristicas[0].id === "") {
        //     setValid((prev) => ({
        //         ...prev,
        //         caracteristicas: false
        //     }));
        //     isValid = false;
        // } 

        // Características con id vacío
        if (caracteristicas[0].id === "") {
            setValid((prev) => ({
                ...prev,
                caracteristicas: false
            }));
            isValid = false;
            console.log("característica con id vacío");
        };

        if (caracteristicas.some(item => item.id === "")) {
            setValid((prev) => ({
                ...prev,
                caracteristicas: false
            }));
            isValid = false;
            console.log("característica con id vacío");
        };
        
        // Características con valor vacío
        if (caracteristicas[0].valor === "") {
            setValid((prev) => ({
                ...prev,
                caracteristicas: false
            }));
            isValid = false;
            console.log("característica con valor vacío");
        }
        
        if (caracteristicas.some(item => item.valor === "")) {
            setValid((prev) => ({
                ...prev,
                caracteristicas: false
            }));
            isValid = false;
            console.log("característica con valor vacío");
        }

        // ver características duplicadas
        const idsSet = new Set();
        let hasDuplicates = false;

        for (const item of caracteristicas) {
        if (idsSet.has(item.id)) {
            hasDuplicates = true;
            break;
        }
        idsSet.add(item.id);
        }

        if (hasDuplicates) {
            console.log("Hay IDs duplicados.");
            setValid((prev) => ({
                ...prev,
                caracteristicasUnicas: false
            }));
            isValid = false;
        } else {
            console.log("Todos los IDs son únicos.");
        }

        return isValid;

    };

    useEffect(() => {
        console.log(valid);
    }, [valid])

    useEffect(() => {
        // console.log(producto);
    }, [producto]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUserData(userData);
        }
        console.log(nuevoProducto);
        console.log(editProducto);

        if (nuevoProducto === false) {
            const getData = async() => {
                try {
                    let productoAEditar = await getProductoById(editProducto.id);
                    
                    
                    setProducto(productoAEditar);
                    setImagenes(productoAEditar.imagenes.map((e) => e.url));
                    setCaracteristicas([...productoAEditar.caracteristicas.map((carac) => ({
                        id: carac.id,
                        valor: carac.productos_caracteristicas.valor
                    }))]);
                } catch (error) {
                    console.error("Error al obtener el producto");
                } finally {
                    setCargando(false);
                    // console.log(producto);
                    
                };
            } ;
            getData();
        } else {
            const setData = async() => {
                try {
                    setProducto({
                        nombre: editProducto.nombre,
                        descripcion: editProducto.descripcion,
                        categoria_id: editProducto.categoria_id,
                        precio: editProducto.precio,
                        keywords: editProducto.keywords
                    })
                    setImagenes(editProducto.imagenes)
                    setCaracteristicas(editProducto.caracteristicas)
                } catch (error) {
                    console.error("Error al setear el producto");
                } finally {
                    setCargando(false);
                }
            };
            setData();
            handleAgregarOtraCaracteristica();
        }

        console.log(valid.name === true);
        
        // setCargando(false)
        
    }, [])

    // Debugging -------------------------------
    // useEffect(() => {
    //     console.log(listaCategorias);
    // }, [listaCategorias])

    // useEffect(() => {
    //     console.log(producto);
    //     console.log(imagenes);
    //     console.log(caracteristicas);
    //     // setVerMensajeExito(false);
    //     // setCargando(false)
    // }, [producto, imagenes, caracteristicas])
    // Debugging -------------------------------

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (validate()) {
            try {
                const nuevoProductoCrearEdit = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    categoria_id: producto.categoria_id,
                    precio: producto.precio,
                    imagenes: imagenes,
                    caracteristicas: caracteristicas,
                    keywords: producto.keywords
                };
    
                console.log(nuevoProductoCrearEdit);
                
                if (nuevoProducto) {
                    
                    const response = await postProducto(userData.rolId, nuevoProductoCrearEdit);
                    if (response.status === 400) {
                        console.log("El nombre del producto ya está en uso");
                        window.alert("El nombre del producto ya está en uso");
                        return;
                    }
                    
                } else {
    
                    const response = await putProducto(editProducto.id, nuevoProductoCrearEdit);
                    if (response.status === 404) {
                        console.log("Error: Producto no encontrado");
                        window.alert("Error: Producto no encontrado");
                        return;
                    }
    
                }
                
    
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
                if (nuevoProducto) {
    
                    window.alert("Producto registrado exitosamente");
                    console.log("Producto registrado exitosamente");
    
                } else {
    
                    window.alert("Producto actualizado exitosamente");
                    console.log("Producto actualizado exitosamente");
    
                }
                
    
                // resetear estados auxiliares
    
                // Cerrar el modal
                closeModal();
    
            } catch (error) {
                console.log(error);
            };
        } else {
            window.alert("Algunos campos son incorrectos.")
        };

    };

    return (
        <>
            <div className='title'>
                {nuevoProducto === true ? <h1>Agregar producto</h1> : <h1>Editar producto</h1>}
                {/* <h1>Agregar producto</h1> */}
            </div>
            {cargando ? "" : <div className='row'>
                <form onSubmit={handleSubmit}>
                    <table className='row-table'>
                        <tbody>
                            <tr>
                                <td>
                                    <table className='column-table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>Nombre</label>
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        name='nombre'
                                                        placeholder='Servicio...'
                                                        className={valid.nombre ? "create-edit-input" : "create-edit-input invalid"}
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
                                                    <div 
                                                        className={valid.precio ? "create-edit-input cost" : "create-edit-input cost invalid"}
                                                    >
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
                                                        className={valid.descripcion ? "create-edit-input" : "create-edit-input invalid"}
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
                                                        className={valid.keywords ? "create-edit-input" : "create-edit-input invalid"}
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
                                        </tbody>
                                    </table>

                                </td>

                                <td>
                                    <table className='column-table'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>imágenes</label>
                                                </td>
                                                <td>
                                                    {imagenes.map((url, index) => (
                                                        <div 
                                                            key={index}
                                                            className={valid.imagenes ? "create-edit-input container" : "create-edit-input container invalid"}
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
                                                    <p className='error-msg'>
                                                        {valid.imagenes ? "" : "algunos campos están vacíos"}
                                                    </p>
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
                                                        className={valid.categoria ? "create-edit-input" : "create-edit-input invalid"}
                                                        value={producto.categoria_id}
                                                        onChange={handleChangeCategoria}
                                                    >
                                                        <option 
                                                            value="seleccione la categoría"
                                                            hidden
                                                        >
                                                            seleccione la categoría
                                                        </option>
                                                        {listaCategorias.map((categoria, index) => (
                                                            <option 
                                                                key={index} 
                                                                value={categoria.id}
                                                            >
                                                                {categoria.titulo}
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
                                                    {caracteristicas?.map((caracteristica, index) => (
                                                        <div 
                                                            key={index} 
                                                            className={(valid.caracteristicas && valid.caracteristicasUnicas) ? "create-edit-input container" : "create-edit-input container invalid"}
                                                        >

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
                                                            
                                                            {index > 1 ? 
                                                                <button
                                                                type="button"
                                                                onClick={(e) => handleEliminarCaracteristica(e, index)}
                                                                className='no-style delete-img'
                                                            >
                                                                <FontAwesomeIcon icon={faXmark} />
                                                            </button> : 
                                                                null
                                                            }
                                                            {/* <button
                                                                type="button"
                                                                onClick={(e) => handleEliminarCaracteristica(e, index)}
                                                                className='no-style delete-img'
                                                            >
                                                                <FontAwesomeIcon icon={faXmark} />
                                                            </button> */}

                                                        </div>
                                                    ))}
                                                    
                                                    <p className='error-msg'>
                                                        {valid.caracteristicas ? "" : "algunos campos están vacíos"}
                                                    </p>
                                                    <p className='error-msg'>
                                                        {valid.caracteristicasUnicas ? "" : "hay dos o más características que tienen el mismo tipo"}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className='create-edit-input add-btn'
                                                        onClick={handleAgregarOtraCaracteristica}
                                                    >
                                                        Agregar característica +
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>

                        </tbody>
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

            </div>}
        </>
    )
}

export default CreateEdit