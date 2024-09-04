import { createContext, useContext, useEffect, useReducer } from "react";

export const cateringStates = createContext();

const getInitialFavs = () => {
  const favs = localStorage.getItem('favs');
  try {
    return JSON.parse(favs) || []; // Si el parseo falla o el valor es null, retornar un array vacío
  } catch (error) {
    return []; // Si hay un error en el parseo, retornar un array vacío
  }
};

const getInitialUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const initialState = {
  favs: getInitialFavs(),
  cart: [],
  theme: "light",
  userData: getInitialUserData()
};

export const cateringReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITES":
      return { ...state, favs: [...state.favs, action.payload] };
    case "REMOVE_BY_ID":
      return { ...state, favs: state.favs.filter(product => product.id !== action.payload) };
    case "REMOVE_ALL":
      return { ...state, favs: [] };
    case "CHANGE_MODE":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    case "CLEAR_USER_DATA":
      return { ...state, userData: null };
    default:
      return state;
  }
};

const CateringContext = ({ children }) => {
  const [state, dispatch] = useReducer(cateringReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    if (state.userData) {
      localStorage.setItem('userData', JSON.stringify(state.userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [state.userData]);

  return (
    <cateringStates.Provider value={{ state, dispatch }}>
      {children}
    </cateringStates.Provider>
  );
};

export default CateringContext;

export const useCateringStates = () => useContext(cateringStates);

