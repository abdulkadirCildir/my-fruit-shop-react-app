import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import axios from "axios";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function Product2({ categoryUrl, post }) {
  const classes = useStyles();
  const [product, setProduct] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getProduct = async (
    url = `${process.env.REACT_APP_API_BASE_URL}${post.product_url}`
  ) => {
    try {
      const result = await axios.get(url);
      setProduct(result?.data);
    } catch ({ response }) {
      if (response) {
        console.log(response.data.non_field_errors[0]);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
              {product.price + " €"}
            </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        "loading"
      )}
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="false" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Product Details
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
