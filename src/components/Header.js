import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AppContext } from "../context/AppContext";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: "10px 24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  toolbarTitle: {
    flex: 1,
    fontFamily: "Dancing Script, cursive",
    fontSize: "2rem",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const { allProducts, setProductList } = useContext(AppContext);
  const allProductsList = allProducts;
  const classes = useStyles();
  const { title } = props;

  const handleOnChange = (e) => {
    const filteredList = allProducts.filter((item) => {
      const inputText = e.target.value.toUpperCase();
      const productName = item.name.toUpperCase();

      return productName.indexOf(inputText) > -1;
    });

    setProductList(filteredList);
};

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          className={classes.toolbarTitle}
        > 
        <a href="/my-fruit-shop-react-app" style={{textDecorationLine:"none", color:"#272727"}}>
          {title}
        </a>
        </Typography>
        <Autocomplete
          id="combo-box-demo"
          options={allProductsList}
          getOptionLabel={(option) => option.name}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              onChange={(event, value) => {
                handleOnChange(event);
              }}
              {...params}
              label="Search for a delicious fruit.."
              variant="outlined"
            />
          )}
        />
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
