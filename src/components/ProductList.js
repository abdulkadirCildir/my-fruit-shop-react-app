import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
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

export default function ProductList({ productList, hasNext, loadMore }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const categoriesUrl = "/shop/categories/";

  const getCategories = async (
    url = `${process.env.REACT_APP_API_BASE_URL}${categoriesUrl}`
  ) => {
    try {
      const result = await axios.get(url);
      setCategories(result?.data?.categories);
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Tabs className={classes.mainGrid}>
      <TabList className={classes.tabGrid}>
        <Tab>All</Tab>
        {categories
          ? categories.map((items) => <Tab>{items.name}</Tab>)
          : "No data available!"}
      </TabList>
      <TabPanel className={classes.productStyle}>
        {!productList
          ? "Loading..."
          : productList.map((innerItems, id) => (
            <Product key={id} post={innerItems} />
          ))}
      </TabPanel>

      {categories
        ? categories.map((items) => (
            <TabPanel className={classes.productStyle}>
              {productList
          ? productList.map((innerItems, id) => (
              <Product key={id} categoryUrl={items.category_url} post={innerItems} />
            ))
          : "No data available"}
            </TabPanel>
          ))
        : "No data available!"}
        
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
          <Box p={1}>
          {hasNext ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => loadMore()}
            >
              View More
            </Button>
          ) : <Button style={{display:"none"}}/>}
        </Box>
      </Box>
    </Tabs>
  );
}
