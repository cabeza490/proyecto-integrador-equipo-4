import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import CustomOption from './utils/CustomOption';

const CreateEdit = ({nuevoProducto = true, listaCategorias, listaCaracteristicas}) => {
    // Éste comoponente irá dentro de un modal, contendrá un wizard para ayudar en la creación de un producto nuevo o editarlo
    
    // const { nombre, descripcion, categoria_id, precio, imagenes } = req.body;
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
    });

    const [imagenes, setImagenes] = useState([""]);

    const [caracteristicas, setCaracteristicas] = useState([{
        id: "",
        valor: ""
    }]);

    // const [listaCategorias, setListaCategorias] = useState([]);
    
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});
    const [submitMessage, setSubmitMessage] = useState(""); 
    const [isFormValid, setIsFormValid] = useState(false);

    // pciones para el react-form
    const [opcionesCategorias, setOpcionesCategorias] = useState([]);
    const [opcionesCaracteristicas, setOpcionesCaracteristicas] = useState([]);


    const handleChange = (event) => {
        const {name, value} = event.target;

        setProducto((prevState) => ({
            ...prevState,
            [name]: value
        }));
        // console.log(producto);
    };

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
    
    // manejo de las características, array de objetos con nombre, valor e ícono
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
        setOpcionesCategorias(listaCategorias.map((categoria) => ({
            value: categoria.id,
            label: categoria.nombre,
        })));
        // console.log(listaCaracteristicas);
        

        setOpcionesCaracteristicas(listaCaracteristicas.map((caracteristica) => ({
            value: caracteristica.id,
            label: caracteristica.nombre,
            icon: caracteristica.icono
        })));


    }, [])

    // Debugging -------------------------------
    // useEffect(() => {
    //     console.log(listaCategorias);
    // }, [listaCategorias])

    useEffect(() => {
        console.log(producto);
        console.log(imagenes);
        console.log(caracteristicas);
    }, [producto, imagenes, caracteristicas])
    // Debugging -------------------------------

    const handleSubmit = async (event) =>{
        event.preventDefault();
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
                                                <button className='no-style'>UYU</button>
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
                                                        >
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </button>
                                                    }
                                                </div>
                                            ))}
                                            <button onClick={handleAgregarOtraImagen}>Agregar otra imagen</button>
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

                                            {/* <Select 
                                                options={opcionesCategorias}
                                            /> */}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Características</label>
                                        </td>
                                        <td>
                                            {caracteristicas.map((caracteristica, index) => (
                                                <div key={index} className='create-edit-input'>
                                                    {/* <Select
                                                        className='select-caracteristicas'
                                                        options={opcionesCaracteristicas}
                                                        components={{Option: CustomOption}}
                                                    /> */}

                                                    <select 
                                                        className='input-caracteristica'
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
                                                        className='input-caracteristica'
                                                        type="text" 
                                                        placeholder='Detalle...'
                                                        value={caracteristica.valor}
                                                        onChange={(e) => handleChangeCaracteristicasValor(e, index)}
                                                    />
                                                    <button
                                                        onClick={(e) => handleEliminarCaracteristica(e, index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                            
                                            <button
                                                onClick={handleAgregarOtraCaracteristica}
                                            >
                                                Agregar característica
                                            </button>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>
                
                </form>

            </div>
        </>
    )
}

export default CreateEdit
