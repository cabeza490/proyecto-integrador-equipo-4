// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../Styles/AdminPanel.css';
import ListaProductos from "../Components/Listaproductos";
import ListaUsuarios from '../Components/ListaUsuarios';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState(0);

    const cambiarTab = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className='admin-panel'>

                <section className='left-side'>
                    <div className='user-avatar'>JP</div>
                    <p className='name'>Juan Pérez</p>  
                    <p className='email'>juanperez@gmail.com</p>
                </section>

                <section className='tabs'>

                    <div className='tab-list'>
                        <button className={'tab-button '+(activeTab === 0 && "tab-selected")}
                        onClick={() => cambiarTab(0)}>
                            Información
                        </button>
                        <button className={'tab-button '+(activeTab === 1 && "tab-selected")}
                        onClick={() => cambiarTab(1)}>
                            Gestión de usuarios
                        </button>
                        <button className={'tab-button '+(activeTab === 2 && "tab-selected")}
                        onClick={() => cambiarTab(2)}>
                            Listar productos
                        </button>
                    </div>
                        {activeTab === 2 && (<ListaProductos />)}
                        {activeTab === 1 && (<ListaUsuarios />)}                                                 

                </section>
            </div>
        </>
    );
}

export default AdminPanel;

