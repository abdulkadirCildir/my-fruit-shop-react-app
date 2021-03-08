import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Product from "./Product";
import Categories from "./Categories";
import axios from "axios";
import {AppContext} from '../context/AppContext';
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  tabGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  productStyle: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
}));

export default function ProductList({
  getProductList,
  hasNext,
  loadMore,
}) {
  const classes = useStyles();
  const { allProducts, setNextUrl, productList, setProductList } = useContext(AppContext);

  const categoriesUrl = "/shop/categories/";

  useEffect(() => {
    setProductList(allProducts);
  }, [allProducts]);


  const getProductsById = async (name) => {
    try {
      const url =
        `${process.env.REACT_APP_API_BASE_URL}${categoriesUrl}` + name;
      const { data } = await axios.get(url);
      console.log("DATA:", data);
      setProductList(data?.products);
      setNextUrl(null);
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  return (
    <div className={classes.mainGrid}>
      <Categories
        getProductList={getProductList}
        getProductsById={getProductsById}
      />
      <div className={classes.productStyle}>
        {!productList
          ? "Loading..."
          : productList.map((innerItems, id) => (
              <Product key={id} post={innerItems} />
            ))}
      </div>

      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="none">
        <Box p={1}>
          {hasNext ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => loadMore()}
            >
              View More
            </Button>
          ) : (
            <Button style={{ display: "none" }} />
          )}
        </Box>
      </Box>
    </div>
  );
}
