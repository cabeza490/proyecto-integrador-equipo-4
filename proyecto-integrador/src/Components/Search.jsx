// src/Components/Search.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Search.modules.css'; // Asegúrate de usar el archivo CSS correcto

const Search = ({ setSearchTerm, setSearchDate, onSearch }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSearchChange = (event) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSearchDate(date); // Actualizar la fecha en el estado global cuando se selecciona una nueva fecha
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

