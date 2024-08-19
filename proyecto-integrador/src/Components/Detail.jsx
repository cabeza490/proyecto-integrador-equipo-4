import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../api/productos-Apis';
import '../Styles/Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState({});

    useEffect(() => {
        const getData = async () => {
            let getProductData = await getProductoById(id);
            setProductSelected(getProductData);
        };
        getData();
    }, [id]);

    return (
        <div className="content">
            <div className="card_container" key={productSelected.id}>
                <div className="card_title">
                    <h2>{productSelected.nombre || 'Título del servicio'}</h2>
                    <Link to={`/`}>Volver al Inicio</Link>
                </div>
                <div className="card_content">
                    <div className="card_image">
                        {productSelected.imagenes && productSelected.imagenes.length > 0 ? (
                            <img src={productSelected.imagenes[0].url} alt={productSelected.nombre} />
                        ) : (
                            <div className="placeholder_image"></div>
                        )}
                    </div>
                    <p>{productSelected.descripcion || 'Descripción del servicio.'}</p>
                </div>
            </div>

            <div className="card_container">
                <h3>Más detalles</h3>
                <p>Aquí irá más información que se pueda tomar desde la BBDD, como el precio.</p>
            </div>

            <div className="card_container">
                <h3>Características</h3>
                <div className='caracteristicas'>
                    <p>
                        Apto vegano
                    </p>
                    
                    <p>
                        Personal calificado
                    </p>
                   
                    <p>
                        Característica
                    </p>
                    
                    <p>
                        Característica
                    </p>
                    <p>
                        Apto celíaco
                    </p>
                    <p>
                        Bebida incluida
                    </p>
                    <p>
                        Característica
                    </p>
                    <p>
                        Característica
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Detail;
