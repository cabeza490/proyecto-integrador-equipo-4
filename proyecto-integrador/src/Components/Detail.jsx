import { useState } from 'react'
import { useEffect } from 'react'
import {productos} from '../utils/productos'
import '../Styles/Detail.css'



const Detail = () => {
    
        return(
            <div>
                {productos.map(
                    producto => (
                        <div className='card_container' key={producto.id}>
                            <img src={producto.img}/>
                            <h2>{producto.titulo}</h2>
                            <h4>Postres: {producto.postre}</h4>
                            <h4>Capacidad {producto.personas}</h4>
                            <h4>Mozos: {producto.mozo}</h4>
                            <p>{producto.descripcion}</p>
                        </div>
                    )
                )}
            </div>
        )
    
}

export default Detail