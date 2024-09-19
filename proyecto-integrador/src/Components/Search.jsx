import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Search.modules.css';
import axios from 'axios';
import { fechasReservadas } from '../api/reservas-Apis';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Search = ({ setSearchTerm, setSearchDate, onSearch }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const suggestionsListRef = useRef(null);

    useEffect(() => {
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

        if (value.length > 1) {
            const filteredSuggestions = allProducts.filter(product =>
                product.nombre.toLowerCase().includes(value.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(value.toLowerCase()) ||
                (product.keywords && product.keywords.toLowerCase().includes(value.toLowerCase()))
            );

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
            setSelectedSuggestionIndex(-1);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocalSearchTerm(suggestion.nombre);
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
    };

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleSearchClick = async () => {
        if (!localSearchTerm || !selectedDate) {
            alert("Por favor completar todos los campos para la búsqueda");
            return;
        }

        console.log("Término de búsqueda:", localSearchTerm);
        console.log("Fecha seleccionada:", selectedDate);

        if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
            console.error("Fecha seleccionada no es válida");
            return;
        }

        const selectedDateString = selectedDate.toISOString().split('T')[0];

        // Filtrar productos por término de búsqueda
        const filteredProducts = allProducts.filter(product => {
            const matchesKeyword = product.nombre.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    product.descripcion.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
                                    (product.keywords && product.keywords.toLowerCase().includes(localSearchTerm.toLowerCase()));

            console.log("Producto:", product);
            console.log("Coincide con palabra clave:", matchesKeyword);

            return matchesKeyword;
        });

        console.log("Productos filtrados antes de comprobar disponibilidad:", filteredProducts);

        // Obtener productos disponibles
        const availableProducts = await Promise.all(filteredProducts.map(async (product) => {
            try {
                const fechasReservadasParaProducto = await fechasReservadas(product.id);
                const fechasReservadasStrings = fechasReservadasParaProducto.map(fecha => new Date(fecha).toISOString().split('T')[0]);
                const isAvailable = !fechasReservadasStrings.includes(selectedDateString);

                console.log("Fechas Reservadas para el producto:", fechasReservadasStrings);
                console.log("Fecha Seleccionada:", selectedDateString);
                console.log("Disponible en la fecha seleccionada:", isAvailable);

                // Si está disponible, retorna el producto, si no, retorna null
                return isAvailable ? product : null;
            } catch (error) {
                console.error(`Error al obtener fechas reservadas para el producto ${product.id}:`, error);
                return null;
            }
        }));

        // Filtrar productos disponibles
        const finalProducts = availableProducts.filter(product => product !== null);

        console.log("Productos disponibles:", finalProducts);

        if (finalProducts.length === 0) {
            alert("No hay productos disponibles para la búsqueda y la fecha seleccionada.");
        } else {
            setSearchTerm(localSearchTerm);
            setSearchDate(selectedDate);
            onSearch(); // Llamar a onSearch con productos disponibles
        }

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
                    handleSearchClick();
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
