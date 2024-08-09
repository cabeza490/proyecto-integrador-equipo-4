// src/Routes/Home.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Galeria from '../Components/Galeria';
import '../Styles/Home.css'; // Importa los estilos
import Search from '../Components/Search';

function Home() {

    

    return (
        <main className="main">
            <Search/>
            <h1 className="title">Recomendados</h1>

            <div><Galeria /></div>

        </main>
        
    );
}

export default Home;

