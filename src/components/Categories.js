import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Product from "./Product";
import axios from "axios";
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

export default function Categories({
  getProductList,
  setProductList,
  setAllProducts,
  productsById,
}) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  const categoriesUrl = "/shop/categories/";

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async (
    url = `${process.env.REACT_APP_API_BASE_URL}${categoriesUrl}`
  ) => {
    try {
      const result = await axios.get(url);
      setCategories(result?.data?.categories);
      //   console.log("CATEGORIES:", result?.data.categories);
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  //   console.log("CATEGORY_FIRST_NAME:", categories);

  return (
    <div className={classes.tabGrid}>
      <Button
        onClick={() => {
          setProductList([]);
          setAllProducts([]);
          getProductList();
        }}
      >
        All
      </Button>
      {categories
        ? categories.map((items) => (
            <Button onClick={() => productsById(items.name)}>
              {items.name}
            </Button>
          ))
        : "No data available!"}
    </div>
  );
}
