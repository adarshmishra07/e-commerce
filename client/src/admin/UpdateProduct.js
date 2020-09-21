import React,{useState,useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import { Link ,Redirect} from "react-router-dom";
import Base from "../core/Base";
import {
  getProduct,
  getAllCategories,
  updateProduct,
} from "./helper/adminapicall";

function UpdateProduct({match}) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProdcut: false,
    getRedirect: "",
    formData: "",
  });
  const {
    name,
    price,
    description,
    stock,
    error,
    categories,
    category,
    formData,
    getRedirect,
    createdProdcut,
  } = values;

  const { user, token } = isAuthenticated();

  const preload = (productId) => {
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category._id,
            formData : new FormData(),
          });
          preloadCategories()
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.productId);
    preloadCategories()
  }, []);
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      error: false,
      [name]: value,
      createdProdcut: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId,user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, createdProdcut: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          createdProdcut: data.name,
        });
        setTimeout(() => setValues({...values, getRedirect: true }), 3000)
      }
    });
  };


  const preloadCategories =()=>{
        getAllCategories()
          .then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setValues({categories: data, formData: new FormData() });
            }
          })
          .catch((err) => console.log(err));
      };

  const successMessage = () => {
    return (
      <div
        className="alert alert-dismissible alert-success"
        style={{ display: createdProdcut ? "" : "none" }}
      >
        Product {createdProdcut} Updated Successfully
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const updateProductForm = () => (
    <form>
      <span>Product photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-primary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base title="Update Prodcut" description="Edit Product details">
      <div className="mb-3">
        <Link to="/admin/dashboard" className="btn btn-primary">
          Admin Home
        </Link>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    {getRedirect && <Redirect to="/admin/products"/>}
    </Base>
  );
}

export default UpdateProduct;
