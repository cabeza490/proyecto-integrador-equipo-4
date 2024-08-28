import React from 'react'
import '../Styles/Search.modules.css'

const Search = () => {
    return (
        <div className="search-section">
            <h3 className="search-heading">Encontrá todo lo que necesitás para tu evento</h3>

            <div className="search-bar">
                <input type="text" className="search-input-init" placeholder="Estoy buscando..." />
                <div className="search-date-container">
                    <input type="text" className="search-date" placeholder='Check in' id="in" />
                    <input type="text" className="search-date-out" placeholder='Check out' id="out" />
                    <button className="search-button">
                        <img src='/search-icon.png' alt="search-icon" className='search-icon' />
                </button>
                </div>
               
               
            </div>

            <h3 className="categories-heading">Categorías</h3>
            <div className="category-container">
                <div className="category-item">Sonido</div>
                <div className="category-item">Comida</div>
                <div className="category-item">Decoración</div>
                <div className="category-item">Personal</div>
            </div>
        </div>
    )
}

export default Search