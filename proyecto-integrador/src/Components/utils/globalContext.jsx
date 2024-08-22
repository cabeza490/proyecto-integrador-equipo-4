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

export const initialState = {
  favs: getInitialFavs(),
  cart: [],
  theme: "light",
  userData: ''
};

export const cateringReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITES":
      return { ...state, favs: [...state.favs, action.payload] };
    case "REMOVE_BY_ID":
      let newArr = state.favs.filter((product) => product.id !== action.payload);
      return { ...state, favs: newArr };
    case "REMOVE_ALL":
      return { ...state, favs: [] };
    case "CHANGE_MODE":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
      case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

const CateringContext = ({ children }) => {
  const [state, dispatch] = useReducer(cateringReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs]);

  return (
    <cateringStates.Provider value={{ state, dispatch }}>
      {children}
    </cateringStates.Provider>
  );
};

export default CateringContext;

export const useCateringStates = () => useContext(cateringStates);

export const ThemeWrapper = ({ children, theme }) => {
  const themeClass = theme === 'dark' ? 'dark' : 'light';
  return <div className={themeClass}>{children}</div>;
};
