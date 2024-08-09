import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductoById } from '../api/productos-Apis'
import '../Styles/Detail.css'

const Detail = () => {
    const {id} = useParams()
    const [productSelected, setProductSelected] = useState({})

    useEffect(() => {
        const getData = async() => {
            let getProductData = await getProductoById(id);
            setProductSelected(getProductData)
        } 
        getData()
    }, [id])
    console.log(productSelected);

    return(
        <>
            <div className='card_container' key={productSelected.id}>

                <div className="card_title">
                    <h2>{productSelected.nombre}</h2>
                    <Link to={`/`}>Volver al Inicio</Link>
                </div>
                <div className='card_content'>
                    <div className="card_image">
                        {productSelected.imagenes && productSelected.imagenes.length > 0 && (
                            <img src={productSelected.imagenes[0].url} alt={productSelected.nombre} />
                            )}
                    </div>
                    <p>{productSelected.descripcion}</p>
                </div>
            </div>
        </>

    )
}

export default Detail