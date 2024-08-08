// src/Routes/Home.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Galeria from '../Components/Galeria';
import '../Styles/Home.css'; // Importa los estilos

function Home() {
    return (
        <main className="main">
            <h1 className="title">Recomendados</h1>
            <Galeria />
        </main>
    );
}

export default Home;




