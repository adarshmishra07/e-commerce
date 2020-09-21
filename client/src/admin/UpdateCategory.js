import React,{useState,useEffect} from "react";
import {Link,Redirect} from 'react-router-dom'
import { isAuthenticated } from "../auth/helper";
import {getCategory,updateCategory} from './helper/adminapicall'
import Base from "../core/Base";

function UpdateCategory({match}) {
    const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getRedirect, setGetRedirect] = useState(false)

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setName(data.name)
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

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
    updateCategory(match.params.categoryId,user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess("Category Updated");
        setTimeout(() => setGetRedirect(true), 3000)
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

  const updateCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead">Update Category info</div>
          <input
            type="text"
            className="form-control my-3"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary" onClick={onSubmit}>
          Update Category
        </button>
      </form>
    );
  };

  return (
    <Base title="Update Category" description="Update Category Name">
      <div className="row rounded jusify-content-center">
        <div className="col-md-12">
          {goBack()}
          {errorMessage()}
          {successMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    {getRedirect && <Redirect to="/admin/categories"/>}
    </Base>
  );
}

export default UpdateCategory;
