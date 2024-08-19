import React, {useEffect, useState} from "react";
import { usuariosPH } from "../utils/usuarios";
import "../Styles/ListaUsuarios.css"


const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // traer usuarios desde la BBDD
        //momentáneamente usamos un placeholder
        setUsuarios(usuariosPH);
        setCargando(false);
    }, []);
    console.log(usuarios);

    return(
        <>
            {cargando ? (<p>Cargando datos de usuarios...</p>) : (
                <div className='list-container'>
                    <ol className="list-usuarios">
                        {usuarios.map(usuario => (
                            <li key={usuario.id} id={usuario.id}>
                                {usuario.nombre} {usuario.apellido}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </>
    )
}

export default ListaUsuarios;