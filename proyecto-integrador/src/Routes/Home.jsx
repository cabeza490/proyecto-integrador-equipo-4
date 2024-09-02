import React, { useState } from 'react';
import Galeria from '../Components/Galeria';
import '../Styles/Home.css';
import Search from '../Components/Search';
import Category from '../Components/Category';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]); // Array de objetos de categorías seleccionadas
    const [totalResults, setTotalResults] = useState(0);

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString();  // Puedes personalizar el formato de la fecha aquí
    };

    const handleSearch = () => {
        console.log("Búsqueda realizada con éxito.");
    };

    const handleRemoveCategory = (categoryId) => {
        const updatedCategories = selectedCategories.filter(cat => cat.id !== categoryId);
        setSelectedCategories(updatedCategories); // Actualizar el estado con las categorías restantes
    };

    const handleClearAllFilters = () => {
        setSelectedCategories([]);
        setSearchTerm('');
        setSearchDate(null);
    };

    const areFiltersApplied = () => {
        return searchTerm || searchDate || selectedCategories.length > 0;
    };

    return (
        <main className="main">
            <Search setSearchTerm={setSearchTerm} setSearchDate={setSearchDate} onSearch={handleSearch} />

            <Category onCategorySelect={setSelectedCategories} selectedCategories={selectedCategories} />

            {/* Mostrar resultados filtrados solo si hay filtros aplicados */}
            {areFiltersApplied() && (
                <>
                    <h2 className="title">
                        {searchTerm || searchDate ? (
                            <>
                                Resultados de tu búsqueda: {searchTerm}
                                {searchDate && (
                                    <span className="search-date-text">
                                        : para la fecha: {formatDate(searchDate)}
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                {selectedCategories.length > 0 && (
                                    <span className="search-category-text">
                                        {selectedCategories.map((category, index) => (
                                            <span key={category.id} className="selected-category">
                                                {category.nombre}
                                                <button onClick={() => handleRemoveCategory(category.id)} className="remove-filter-button">✕</button>
                                                {index < selectedCategories.length - 1 && ', '}
                                            </span>
                                        ))}
                                        <span className="result-count">
                                            {`Visualizando ${totalResults} resultados`}
                                        </span>
                                    </span>
                                )}
                            </>
                        )}
                    </h2>

                    {noResults ? (
                        <p className="no-results-message">No se encontró ningún producto</p>
                    ) : (
                        <Galeria
                            searchTerm={searchTerm}
                            selectedCategories={selectedCategories.map(cat => cat.id)}  // Pasar solo los IDs de categorías seleccionadas
                            setNoResults={setNoResults}
                            setTotalResults={setTotalResults}  // Actualiza el total de resultados
                        />
                    )}
                </>
            )}

            {/* Mostrar Recomendados solo si NO hay filtros aplicados */}
            {!areFiltersApplied() && (
                <>
                    <h1 className="title">Recomendados</h1>
                    <div style={{ marginTop: '20px' }}>
                        <Galeria searchTerm="" selectedCategories={[]} /> {/* Recomendados sin filtros */}
                    </div>
                </>
            )}
        </main>
    );
}

export default Home;
