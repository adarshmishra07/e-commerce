import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../core/helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState();

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Home"
      description="Welcome to the ecommerce site this is a Dumy Website"
    >
      <div className="row my-4">
        {products &&
          products.map((product, index) => {
            return (
              <div className="col-12 col-md-4  my-3 text-center" key={index}>
                {" "}
                <Card product={product} />
              </div>
            );
          })}
      </div>
    </Base>
  );
}

export default Home;
