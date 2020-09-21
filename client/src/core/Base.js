import React from "react";
import Navbar from './Navbar'

function Base({
  title = "Title",
  description = "Descripton goes here",
  children,
}) {
  return (
    <div>
        <Navbar/>
        <div className="jumbotron bg-light text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
      <div className="container py-4 my-4" >{children}</div>
      <footer className="footer bg-light text-warn p-4">
        <div className="row justify-content-center">
          <div className="col-12 text-muted text-center">
            Developed by{" "}
            <a
              href="http://linkedin.com/in/adarshmishra07"
              rel="noopener noreferrer"
              target="_blank"
            >
              Adarsh Mishra
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Base;
