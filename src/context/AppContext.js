import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppContextProvider = ({ children }) => {
    const [productList, setProductList] = useState();
  
    return <Provider value={{ productList, setProductList }}>{children}</Provider>;
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};