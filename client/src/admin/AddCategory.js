import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mb-3">
        <Link to="/admin/dashboard" className="btn btn-primary">
          Admin Home
        </Link>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess("Category Created");
      }
    });
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error} .
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        {success} .
      </div>
    );
  };

  const addCatForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead">Enter the Category</div>
          <input
            type="text"
            className="form-control my-3"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
            placeholder="For Ex: Electronics "
          />
        </div>
        <button className="btn btn-outline-primary" onClick={onSubmit}>
          Create Category
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Create Categories for your products"
    >
      <div className="row rounded jusify-content-center">
        <div className="col-md-12">
          {goBack()}
          {errorMessage()}
          {successMessage()}
          {addCatForm()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
