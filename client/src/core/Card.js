import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Image from "./helper/Image";
import { addItemToCart, removeItemFromCart } from "../core/helper/cartHelper";

function Card({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setreload= f=>f,
}) {
  const [redirect, setredirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Product Name";
  const cardDescription = product
    ? product.description
    : "Product Description goes here!";
  const cardPrice = product ? product.price : "XX";

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addItToCart = () => {
    addItemToCart(product, () => {
      setredirect(true);
    });
  };

  const showAddToCart = (addtoCart) => {
    if (addtoCart) {
      return (
        <button
          onClick={addItToCart}
          className="btn btn-block btn-outline-success my-1"
        >
          Add to Cart
        </button>
      );
    }
  };

  const showRemoveFromCart = (removeFromCart) => {
    if (removeFromCart) {
      return (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setreload(!reload);
          }}
          className="btn btn-block btn-outline-danger my-1"
        >
          Remove from cart
        </button>
      );
    }
  };

  return (
    <div className="card text-white bg-light ">
      {getARedirect(redirect)}
      <div className="card-header bg-dark lead">{cardTitle}</div>
      <div className="card-body">
        <Image product={product} />
        <p className="lead text-dark text-wrap">
          {cardDescription.substring(0, 15).concat("...")}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{cardPrice} Rs</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
