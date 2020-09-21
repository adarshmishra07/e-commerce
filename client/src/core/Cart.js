import React, { useState, useEffect } from "react";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";
import Base from "./Base";
import PaymentB from './PaymentB'
import {isAuthenticated} from '../auth/helper/index'

function Cart() {
  const [cartItems, setCartItems] = useState();
  const [reload, setreload] = useState(false);


  useEffect(() => {
    setCartItems(loadCart());
  }, [reload]);

  const loadAllProducts = (cartItems) => {
    return (
      <div>
        {cartItems && cartItems.map((item, index) => {
          return (
            <Card
              product={item}
              removeFromCart={true}
              addtoCart={false}
              key={index}
              setreload={setreload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };


  return (
    <Base title="Cart" description="Your Shopping Cart">
      <div className="row my-4">
        <div className="col-6">
          {cartItems ? loadAllProducts(cartItems) :<h2>Oops !! Cart is Empty</h2>}
        </div>
        <div className="col-6">{isAuthenticated() && cartItems && <PaymentB products={cartItems} setreload={setreload} reload={reload}/>}</div>
      </div>
    </Base>
  );
}

export default Cart;
