// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Search.modules.css'; // Asegúrate de usar el archivo CSS correcto

const Search = ({ setSearchTerm, setSearchDate, onSearch }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        // Fetch all products on mount
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/productos');
                setAllProducts(response.data.productos);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setLocalSearchTerm(value);

        if (value.length > 1) { // Start suggesting only after 2 characters
            const filteredSuggestions = allProducts.filter(product =>
                product.nombre.toLowerCase().includes(value.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(value.toLowerCase()) ||
                (product.keyword && product.keyword.toLowerCase().includes(value.toLowerCase()))
            );

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocalSearchTerm(suggestion.nombre);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); // Solo actualiza el estado local
    };

    const handleSearchClick = () => {
        if (!localSearchTerm || !selectedDate) {
            alert("Por favor completar todos los campos para la búsqueda");
        } else {
            setSearchTerm(localSearchTerm);
            setSearchDate(selectedDate);
            onSearch(); // Llamar a onSearch
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick(); // Ejecutar búsqueda al presionar Enter
        }
    };

    const handleDatePickerKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.stopPropagation(); // Evitar que el evento 'Enter' se propague
            event.preventDefault(); // Evitar el comportamiento predeterminado
        }
    };

    return (
        <div className="search-section">
            <h3 className="search-heading">Encuentra todo lo que necesitas para tu evento</h3>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input-init"
                    placeholder="Estoy buscando..."
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                {showSuggestions && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                {suggestion.nombre}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="search-date-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText="Fecha"
                        className="search-date"
                        id="date"
                        onKeyDown={handleDatePickerKeyDown} // Manejar evento onKeyDown
                    />
                    <button className="search-button" onClick={handleSearchClick}>
                        <img src='/search-icon.png' alt="search-icon" className='search-icon' />
                    </button>
                </div>
            </div>
        </div>
    );
};

Search.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    setSearchDate: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Search;


