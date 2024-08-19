import React, {useEffect, useState} from "react";
import { usuariosPH } from "../utils/usuarios";


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
                    <table className='list-table'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre} {usuario.apellido}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                </div>
            )}
        </>
    )
}

export default ListaUsuarios;