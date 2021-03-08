import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const AppContext = createContext();

const { Provider } = AppContext;
function AppContextProvider({children}) {
    const [allProducts, setAllProducts] = useState();
    const [nextUrl, setNextUrl] = useState();
    const [productList, setProductList] = useState();
    
  
    return (
    <Provider value={{ allProducts, setAllProducts, nextUrl, setNextUrl, productList, setProductList }}>
        {children}
    </Provider>
    );
};

export default AppContextProvider;


AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};