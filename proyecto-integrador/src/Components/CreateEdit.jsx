import React, { useState } from 'react'

const CreateEdit = () => {
    // Éste comoponente irá dentro de un modal, contendrá un wizard para ayudar en la creación de un producto nuevo o editarlo
    
    // const { nombre, descripcion, categoria_id, precio, imagenes } = req.body;
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        categoria_id: 0, //integer
        precio: 0.0, //double
    });

    const [imagenes, setImagenes] = useState(["", "", "", "", ""]);

    function handleAgregarOtraImagen() {
        setImagenes([...imagenes, ""])
    }

    function handleEliminarInput(index) {
        let nuevasImagenes = [...imagenes];
        nuevasImagenes.splice(index, 1);
        setImagenes(nuevasImagenes);
    }

    function handleChangeImagen(event, index) {
        let nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = event.target.value;
        setImagenes(nuevasImagenes);
        console.log(imagenes);
        
    }

    const [wizardStep, setWizardStep] = useState (0);
    // let wizardStep = 3;

    function retrocederStep(){
        wizardStep === 0 ? wizardStep : setWizardStep(wizardStep - 1) ;
    }

    function avanzarStep(){
        wizardStep === 4 ? wizardStep : setWizardStep(wizardStep + 1) ;
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setProducto((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className='steps-guide'>
                <h1>Lista de pasos</h1>
            </div>
            <div className='steps-container'>
                <form action="">

                    <div className={`step-page  ${wizardStep === 0 ? "active-step" : (wizardStep < 0 ? "future-step" : "past-step")}`}>

                        <h4>Introduzca el nombre del producto</h4>
                        <input 
                            type="text" 
                            name='nombre'
                            placeholder='Nombre del producto'
                            className=''
                            value={producto.nombre}
                            onChange={handleChange}
                        />

                        <h4>Seleccione la categoría</h4>
                        <select name="categorias" id="categorias-select">
                            <option value="">opción</option>
                        </select>
                    </div>

                    <div className={`step-page  ${wizardStep === 1 ? "active-step" : (wizardStep < 1 ? "future-step" : "past-step")}`}>
                        <h4>Introduzca el precio del producto</h4>
                        <input 
                            type="number" 
                            name="precio" 
                            placeholder='$'
                            className=''
                            value={producto.precio}
                            onChange={handleChange}
                        />
                        <h4>Introduzca una descripción</h4>
                        <textarea 
                            name="descripcion" 
                            placeholder='descripción del producto'
                            className=''
                            value={producto.descripcion}
                            onChange={handleChange}
                            >
                        </textarea>
                    </div>

                    <div className={`step-page  ${wizardStep === 2 ? "active-step" : (wizardStep < 2 ? "future-step" : "past-step")}`}>
                        <h3>características</h3>
                        <p>WIP</p>
                    </div>
                    
                    <div className={`step-page  ${wizardStep === 3 ? "active-step" : (wizardStep < 3 ? "future-step" : "past-step")}`}>
                        <h3>imágenes</h3>
                        <h4>Imágen principal</h4>
                        {imagenes.map((url, index) => (
                            <div key={index}>
                                <input 
                                    type="text"
                                    name='URLImagen'
                                    placeholder='URL de la imagen'
                                    className=''
                                    value={url}
                                    onChange={(e) => handleChangeImagen(e, index)}
                                />
                                {/* <button onClick={handleEliminarInput}>X</button> */}
                            </div>
                        ))}
                        {/* <button onClick={handleAgregarOtraImagen}>Agregar otra imagen</button> */}
                    </div>
                    
                    <div className={`step-page  ${wizardStep === 4 ? "active-step" : (wizardStep < 4 ? "future-step" : "past-step")}`}>
                        <h3>revisión</h3>
                    </div>

                </form>

            </div>
            <div>
                <button onClick={retrocederStep}>retroceder</button>
                <button onClick={avanzarStep}>avanzar</button>
            </div>
        </>
    )
}

export default CreateEdit
