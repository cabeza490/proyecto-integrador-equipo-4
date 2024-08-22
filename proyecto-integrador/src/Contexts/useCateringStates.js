import { useContext } from 'react';
import { CateringContext } from '../Components/utils/globalContext'; // Ajusta la ruta según tu estructura de carpetas

export const useCateringStates = () => {
    const context = useContext(CateringContext);
    if (!context) {
        throw new Error('useCateringStates must be used within a CateringProvider');
    }
    return context;
};
