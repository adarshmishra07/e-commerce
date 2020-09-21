import React, { useState, useEffect }  from "react";
import Base from "../core/Base";
import {Link} from 'react-router-dom'
import { getAllCategories,deleteCategory } from "./helper/adminapicall";
import {isAuthenticated} from '../auth/helper/index'

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError();
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.message);
          preload();
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
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          onClick={() => setSuccess()}
        >
          &times;
        </button>

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

  const showCategories = () => {
    return (
      <div className="row">
        {categories &&
          categories.map((category, index) => {
            return (
              <div className="col-12" key={index}>
                <div className="row text-center mb-2 ">
                  <div className="col-4">
                    <h4 className=" text-left">{category.name}</h4>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/update/category/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
                      }}
                      className="btn btn-danger"
                    >
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
      description="Manage all the Categories on the Store"
    >
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="text-center my-3">Total Categories {categories.length}</h2>
      {errorMessage()}
      {successMessage()}
      {showCategories()}
    </Base>
  );
}

export default ManageCategories;
