import React, { useState, useEffect } from "react";

import img from "../images/img.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://strapi-store-server.onrender.com/api/products?featured=true"
      )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setProducts(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }
  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-full  container mx-auto  gap-7 justify-between">
        <div className="w-[500px]">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing the way people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link
            to="./products"
            className="bg-blue-600 px-4 py-3 text-[#dbe1ff]  rounded-md">
            OUR PRODUCTS
          </Link>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box  w-[600px] h-[500px]   space-x-4 p-4">
          <div className="carousel-item">
            <img src={img} className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src={img2} className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src={img3} className="rounded-box" />
          </div>
          <div className="carousel-item">
            <img src={img4} className="rounded-box" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-16 py-5 mb-8">
        <div className="border-b border-base-300 pb-5  ">
          <h2 className="text-3xl font-medium tracking-wider capitalize">
            featured products
          </h2>
        </div>

        <div className="w-full flex flex-wrap items-center mt-16 justify-between gap-5">
          {products.length > 0 &&
            products.map((product, index) => {
              let price = product.attributes.price.toString();

              let formattedPrice =
                price.slice(0, price.length - 2) +
                "." +
                price.slice(price.length - 2);

              return (
                <div
                  key={index}
                  className="flex w-[30%] h-[350px] p-2 rounded-xl flex-col shadow-md items-center gap-2"
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
      </div>
    </>
  );
}

export default Home;
