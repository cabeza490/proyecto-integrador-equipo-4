// src/Routes/Home.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Galeria from '../Components/Galeria';
import '../Styles/Home.css';
import Search from '../Components/Search';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [noResults, setNoResults] = useState(false); // Nuevo estado para controlar si no hay resultados

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString();  // Puedes personalizar el formato de la fecha aquí
    };

    const handleSearch = () => {
        // Aquí puedes agregar cualquier lógica adicional cuando se complete la búsqueda.
        console.log("Búsqueda realizada con éxito.");
    };

    return (
        <main className="main">
            <Search setSearchTerm={setSearchTerm} setSearchDate={setSearchDate} onSearch={handleSearch} />

            {(searchTerm || searchDate) && (
                <>
                    <h2 className="title">
                        Resultados de tu búsqueda: {searchTerm}
                        {searchDate && (
                            <span className="search-date-text">
                                : para la fecha: {formatDate(searchDate)}
                            </span>
                        )}
                    </h2>

                    {noResults ? ( // Mostrar mensaje si no hay resultados
                        <p className="no-results-message">No se encontró ningún producto</p>
                    ) : (
                        <Galeria searchTerm={searchTerm} setNoResults={setNoResults} />
                    )}
                </>
            )}

            <h1 className="title">Recomendados</h1>
            <div style={{ marginTop: '20px' }}>
                <Galeria searchTerm="" />
            </div>
        </main>
    );
}

export default Home;

