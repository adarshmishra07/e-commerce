import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getMeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

function PaymentB({ products, setreload = f => f, reload = undefined}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    instance: {},
    error: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBDI = () => {
    return (
      <div>
        {info.clientToken !== null && products!== undefined && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({
            ...info,
            success: response.success,
            loading: false,
          });
          const orderData = {
              products : products,
              transaction_id : response.transaction.id,
              amount : response.transaction.amount
          }
          createOrder(userId,token,orderData)
          cartEmpty(()=>{
          })
          setreload(!reload)

        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div className="text-center">
      <h3>Cart Total Amount {products && getAmount()} Rs</h3>
      {showBDI()}
    </div>
  );
}

export default PaymentB;
