import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";

function AdminDashBoard() {
  const {
    user: { name, email },
  } = isAuthenticated();

  const sideBar = () => {
    return (
      <div className="card bg-primary">
        <div className="card-header ">Admin Menu</div>

        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/create/category">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/categories">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const mainBar = () => {
    return (
      <div className="card mb-4">
        <div className="card-header">Admin Information </div>
        <div className="list-group">
          <li className="list-group-item">
            <span className="badge badge-primary mr-2 ">Name :</span> <span className="text-capitalize"> {name}</span>
          </li>
          <li className="list-group-item">
            <span className="badge badge-primary mr-2 ">Email :</span> {email}
          </li>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all products here "
    >
      <div className="row">
        <div className="col-3">{sideBar()}</div>
        <div className="col-9">{mainBar()}</div>
      </div>
    </Base>
  );
}

export default AdminDashBoard;
