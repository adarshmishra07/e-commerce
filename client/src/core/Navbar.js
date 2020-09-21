import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout,isAuthenticated } from "../auth/helper";

const currentTab = (history,path)=>{
    if(history.location.pathname ===path){
        return {color : "#000"}
    }else{
        return {color : ""}
    }
}

function Navbar({history}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        E-Commerce
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link style={currentTab(history,"/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role===0 && <li className="nav-item">
            <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
          </li>}
          {isAuthenticated() && isAuthenticated().user.role===1 && <li className="nav-item">
            <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Dashboard</Link>
          </li>}
          
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
              <i className="fa fa-shopping-cart"></i>
            </Link>
          </li>
          {!isAuthenticated() && <li className="nav-item">
            <Link style={currentTab(history,'/signup')} className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>}
          {!isAuthenticated() && <li className="nav-item">
            <Link style={currentTab(history,'/signin')} className="nav-link" to="/signin">
              Sign In
            </Link>
          </li>}
          {isAuthenticated() && <li className="nav-item">
            <Link onClick={signout} to="/" className="nav-link">
              Sign Out
            </Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
