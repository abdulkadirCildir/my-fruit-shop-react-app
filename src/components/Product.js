import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
require("dotenv").config();

const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    width: 220,
    boxShadow: "0.3rem 0.3rem 0.9rem rgba(0,0,0,0.1)",
    borderRadius: "10px",
    // transform: "scale(0.5)",
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

export default function Product({ post }) {
  const classes = useStyles();
  const [product, setProduct] = useState();
  const ref = useRef();


  const getProduct = async (val) => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}${val}`
      const result = await axios.get(url);
      if(ref.current == true){
        setProduct(result?.data);
      }
      // console.log("RESULT_DATA:", result?.data)
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    ref.current = true
    getProduct(post.product_url);
    return () => ref.current = false
  }, [post.product_url]);


  return (
    <Card className={classes.root}>
      {product ? (
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              product.photo_url
                ? `${process.env.REACT_APP_API_BASE_URL}${product.photo_url}`
                : "https://cortelia-systems.com/uploads/categories/Spare%20Parts_1608196111.png"
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.price + " ???"}
            </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        "loading"
      )}
      <CardActions>
        <Button size="small" color="primary">
          Product Details
        </Button>
      </CardActions>
    </Card>
  );
}
