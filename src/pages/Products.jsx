import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products")
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setProducts(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }
  return (
    <div className="w-full flex flex-wrap items-center mt-5 justify-between gap-5">
      {products.length > 0 &&
        products.map((product, index) => {
          let price = product.attributes.price.toString();

          let formattedPrice =
            price.slice(0, price.length - 2) +
            "." +
            price.slice(price.length - 2);

          return (
            <div
              key={product.id}
              className="flex w-[25%] h-[350px] p-2 rounded-xl flex-col shadow-md items-center gap-2"
              onClick={() => {
                handleRedirect(product.id);
              }}>
              <img
                src={product.attributes.image}
                className="w-full h-[250px] rounded-lg object-cover"
                alt="img"
              />
              <h3 className="font-semibold text-black capitalize">
                {product.attributes.title}
              </h3>
              <h3>${formattedPrice}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
