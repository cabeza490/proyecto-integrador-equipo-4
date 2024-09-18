// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Search.modules.css';
import reservas from '../utils/reservas';
import axios from 'axios';
// Obtener la URL base del backend desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Convertir fechas reservadas a objetos Date
const formattedReservas = reservas.map(reserva => ({
    ...reserva,
    fecha_reserva: new Date(reserva.fecha_reserva)
}));

const Search = ({ setSearchTerm, setSearchDate, onSearch }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const suggestionsListRef = useRef(null); // Referencia para el contenedor de sugerencias

    useEffect(() => {
        // Fetch all products on mount
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/productos?pageSize=1000000`);
                setAllProducts(response.data.productos);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (suggestionsListRef.current && selectedSuggestionIndex >= 0) {
            const selectedItem = suggestionsListRef.current.children[selectedSuggestionIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [selectedSuggestionIndex]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setLocalSearchTerm(value);

        if (value.length > 1) { // Start suggesting only after 2 characters
            const filteredSuggestions = allProducts.filter(product =>
                product.nombre.toLowerCase().includes(value.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(value.toLowerCase()) ||
                (product.keywords && product.keywords.toLowerCase().includes(value.toLowerCase()))
            );

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
            setSelectedSuggestionIndex(-1); // Reset selected suggestion
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1); // Reset selected suggestion
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocalSearchTerm(suggestion.nombre);
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1); // Reset selected suggestion
    };

    const handleDateChange = (date) => {
        if (isDateDisabled(date)) {
            setSelectedDate(null); // Impide la selección de fechas reservadas
        } else {
            setSelectedDate(date);
        }
    };

    const isDateDisabled = (date) => {
        return formattedReservas.some(reserva => {
            const reservaDate = new Date(reserva.fecha_reserva);
            return reservaDate.toDateString() === date.toDateString();
        });
    };

    const handleSearchClick = () => {
        if (!localSearchTerm || !selectedDate) {
            alert("Por favor completar todos los campos para la búsqueda");
            return;
        }

        console.log("Término de búsqueda:", localSearchTerm);
        console.log("Fecha seleccionada:", selectedDate);

        // Asegurarse de que selectedDate es un objeto Date válido
        if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
            console.error("Fecha seleccionada no es válida");
            return;
        }

        // Filtrar los productos que coinciden con el término de búsqueda y no están reservados para la fecha seleccionada
        const filteredProducts = allProducts.filter(product => {
            const matchesKeyword = product.nombre.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    product.descripcion.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    (product.keywords && product.keywords.toLowerCase().includes(localSearchTerm.toLowerCase()));

            console.log("Producto:", product);
            console.log("Coincide con palabra clave:", matchesKeyword);

            // Verificar si el producto está reservado en la fecha seleccionada
            const isAvailable = !formattedReservas.some(reserva => {
                const reservaDate = new Date(reserva.fecha_reserva);
                const selectedDateFormatted = new Date(selectedDate);

                console.log("Reserva:", reserva);
                console.log("Fecha Reserva:", reservaDate.toDateString());
                console.log("Fecha Seleccionada:", selectedDateFormatted.toDateString());

                return reserva.id === product.id &&
                       reservaDate.toDateString() === selectedDateFormatted.toDateString();
            });

            console.log("Disponible en la fecha seleccionada:", isAvailable);

            return matchesKeyword && isAvailable; // Excluye productos reservados
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
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (showSuggestions) {
                    setSelectedSuggestionIndex(prevIndex =>
                        Math.min(prevIndex + 1, suggestions.length - 1)
                    );
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (showSuggestions) {
                    setSelectedSuggestionIndex(prevIndex =>
                        Math.max(prevIndex - 1, 0)
                    );
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[selectedSuggestionIndex]);
                } else {
                    handleSearchClick(); // Ejecutar búsqueda si no hay sugerencia seleccionada
                }
                break;
            default:
                break;
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
                    <ul className="suggestions-list" ref={suggestionsListRef}>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected-suggestion' : ''}`}
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
                        dayClassName={date =>
                            isDateDisabled(date) ? 'disabled-date' : undefined
                        }
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



