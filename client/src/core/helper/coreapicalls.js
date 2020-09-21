import { API } from "../../backend";


//GET ALL PRODUCTS

export const getAllProducts = () => {
    return fetch(`${API}products`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };