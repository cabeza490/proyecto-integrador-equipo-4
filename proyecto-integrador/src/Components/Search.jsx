// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Search.modules.css';
import reservas from '../utils/reservas';

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
        setSelectedDate(date); // Actualiza el estado local
    };

    const handleSearchClick = () => {
        if (!localSearchTerm || !selectedDate) {
            alert("Por favor completar todos los campos para la búsqueda");
            return;
        }

        console.log("Término de búsqueda:", localSearchTerm);
        console.log("Fecha seleccionada:", selectedDate);

        // Filtrar los productos que coinciden con el término de búsqueda y no están reservados para la fecha seleccionada
        const filteredProducts = allProducts.filter(product => {
            const matchesKeyword = product.nombre.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    product.descripcion.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    (product.keyword && product.keyword.toLowerCase().includes(localSearchTerm.toLowerCase()));

            console.log("Producto:", product);
            console.log("Coincide con palabra clave:", matchesKeyword);

            // Verificar si el producto está reservado en la fecha seleccionada
            const isAvailable = reservas.some(reserva => 
                reserva.id === product.id &&
                new Date(reserva.fecha_reserva).toDateString() === selectedDate.toDateString()
            );

            console.log("Disponible en la fecha seleccionada:", !isAvailable);

            return matchesKeyword && !isAvailable; // Excluye productos reservados
        });

        console.log("Productos filtrados:", filteredProducts);

        if (filteredProducts.length === 0) {
            alert("No hay productos disponibles para la búsqueda y la fecha seleccionada.");
        } else {
            setSearchTerm(localSearchTerm);
            setSearchDate(selectedDate);
            onSearch(); // Llamar a onSearch
        }

        // Ocultar las sugerencias después de hacer la búsqueda
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick(); // Ejecutar búsqueda al presionar Enter
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




