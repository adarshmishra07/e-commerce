import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
            setError()
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.message)
          preload()
        }
      })
      .catch((err) => console.log(err));
  };
  const successMessage = () => {
    return (
      <div
        className="alert alert-dismissible alert-success"
        style={{ display: success ? "" : "none" }}
      >
          <button type="button" className="close" data-dismiss="alert" onClick={()=>setSuccess()}>&times;</button>

        {success}
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger alert-dismissable"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showProducts = () => {
    return (
      <div className="row">
        {products &&
          products.map((product, index) => {
            return (
              <div className="col-12" key={index}>
                <div className="row text-center mb-2 ">
                  <div className="col-4">
                    <h4 className=" text-left">{product.name}</h4>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/update/product/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <Base
      title="Manage Products"
      description="Manage all the Products on the Store"
    >
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="text-center my-3">Total Products {products.length}</h2>
      {errorMessage()}
      {successMessage()}
      {showProducts()}
    </Base>
  );
}

export default ManageProducts;
