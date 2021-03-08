import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {AppContext} from '../context/AppContext';
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  tabGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  buttonStyle: {
    color: "red",
  },
}));

export default function Categories({
  getProductList,
  getProductsById,
}) {
  const classes = useStyles();
  const { setAllProducts, setProductList } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState("ALL");

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

    console.log("SELECTEDCATEGORY:", selectedCategory);

  return (
    <div className={classes.tabGrid}>
      <Button
      style={{ border: selectedCategory == "ALL" ? "solid 3px" : "none"}}
        onClick={() => {
            setSelectedCategory("ALL") 
            setProductList([]);
            setAllProducts([]);
            getProductList();
        }}>
        All
      </Button>

      {categories
        ? categories.map((items, key) => (
            <Button 
            key = {key}
            style={{ border: selectedCategory == items.name ? "solid 3px" : "none"}}
            onClick={() => {
                getProductsById(items.name)
                setSelectedCategory(items.name)
                }}>
              {items.name}
            </Button>
          ))
        : "No data available!"}
    </div>
  );
}
