import React, { useState, useEffect, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import axios from "axios";
import ProductList from "./components/ProductList";
import {AppContext} from './context/AppContext';
require("dotenv").config();

const App = () => {
  const { allProducts, setAllProducts, nextUrl, setNextUrl } = useContext(AppContext);
  // const [search, setSearch] = useState();

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async (
    url = `${process.env.REACT_APP_API_BASE_URL}/shop/products/`
  ) => {
    try {
      const result = await axios.get(url);
      setAllProducts(result?.data?.products);
      // console.log("RESULTS:", result)
      if (result?.data?.meta?.next_url) {
        setNextUrl(
          `${process.env.REACT_APP_API_BASE_URL}` + result?.data?.meta?.next_url
        );
      } else {
        setNextUrl(null);
      }
    } catch ({ response }) {
      if (response) {
        console.log(response?.data?.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  const handleLoadMore = async () => {
    const result = await axios.get(nextUrl);
    setAllProducts([...allProducts, ...result?.data?.products]);
    // console.log("RESULT:", result)
    if (result?.data?.meta?.next_url) {
      setNextUrl(
        `${process.env.REACT_APP_API_BASE_URL}` + result?.data?.meta?.next_url
      );
    } else {
      setNextUrl(null);
    }
  };

  // console.log("NEXTURL:", nextUrl);
  // console.log("ALLPRODUCTS:", allProducts)

  return (
    <React.Fragment>
        <CssBaseline />
        <Header title="My Fruit Shop" />
        <Container maxWidth="lg">
          {allProducts?.length == 0 ? (
            "Loading" ) : (
            <ProductList
              getProductList={getProductList}
              loadMore={handleLoadMore}
              hasNext={!!nextUrl}
            />
          )}
        </Container>
    </React.Fragment>
  );
};

export default App;
