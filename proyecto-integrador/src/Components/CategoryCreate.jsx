import React, { useEffect, useState } from 'react';
import { createCategoria } from '../api/categorias-Apis';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { tr } from 'date-fns/locale';

const CategoryCreate = ({listaCategorias, closeModal}) => {

    const [categoriaNueva, setCategoriaNueva] = useState({
        titulo: "",
        descripcion: "",
        imagen: ""
    });
    const [tituloCorrecto, setTituloCorrecto] = useState(true);
    const [descripcionCorrecta, setDescripcionCorrecta] = useState(true);
    const [imagenCorrecta, setImagenCorrecta] = useState(true);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCategoriaNueva((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };



    useEffect(() => {
        console.log(categoriaNueva);
    }, [categoriaNueva]);

    const validate = () => {

        if (categoriaNueva.titulo === "") {
            setTituloCorrecto(false);
            window.alert("Error: Por favor ingrese un título");
            return false;
        } else {
            setTituloCorrecto(true);
        };

        if (categoriaNueva.descripcion === "") {
            setDescripcionCorrecta(false);
            window.alert("Error: Por favor ingrese una descripción");
            return false;
        } else {
            setDescripcionCorrecta(true);
        };
        if (categoriaNueva.imagen === "") {
            setImagenCorrecta(false);
            window.alert("Error: Por favor ingrese una URL de imágen");
            return false;
        } else {
            setImagenCorrecta(true);
        };

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirm = window.confirm("¿Seguro que quieres crear la nueva categoría?");

        const isValid = validate();

        if (confirm & isValid) {
            try {
                const response = await createCategoria(categoriaNueva);
                if (response.status === 500) {
                    console.log("Error al crear categoría");
                    window.alert("Error al crear categoría")
                    return;
                }
            } catch (error) {
                console.log(error);
            };
    
            console.log("Categoría creada exitosamente!");
            window.alert("Categoría creada exitosamente")
            closeModal();
        };


    };

  return (
    <div className='create-categry-content'>
        <h2>Crear nueva categoría</h2>

        <form onSubmit={handleSubmit}>
            <table>
                <tbody>

                    <tr>
                        <td>
                            <label>Título</label>
                        </td>
                        <td>
                            <input 
                                type="text"
                                name='titulo'
                                placeholder='Nombre de la categoría'
                                className={tituloCorrecto ? "create-edit-input" : "create-edit-input invalid"}
                                value={categoriaNueva.titulo}
                                onChange={handleChange} 
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Descripción</label>
                        </td>
                        <td>
                            <textarea 
                                name="descripcion"
                                placeholder='descripción de la categoría'
                                className={descripcionCorrecta ? "create-edit-input" : "create-edit-input invalid"}
                                value={categoriaNueva.descripcion}
                                onChange={handleChange}
                            ></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Imágen</label>

                        </td>
                        <td>
                            <input 
                                type="text"
                                name='imagen'
                                placeholder='URL de la imágen representativa'
                                className={imagenCorrecta ? "create-edit-input" : "create-edit-input invalid"}
                                value={categoriaNueva.imagen}
                                onChange={handleChange} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div className='bloque-btn'>
                <button
                    type='submit'
                    className='button-primary create-edit'
                >
                    crear categoría
                </button>
            </div>

        </form>
    </div>
  );
};

export default CategoryCreate;
