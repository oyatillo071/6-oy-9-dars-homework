import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink,Link, useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setProduct(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const formatPrice = (price) => {
    const priceStr = price.toString();
    return (
      priceStr.slice(0, priceStr.length - 2) +
      "." +
      priceStr.slice(priceStr.length - 2)
    );
  };
  if (!product || !product.attributes) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-12 h-full pb-20 container mx-auto">
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <NavLink
              to="/home"
              className="font-sans text-sm   hover:bg-gray-200 ">
              Home
            </NavLink>
          </li>
          <li>
            <Link
              to="/products"
              className="font-sans text-sm   hover:bg-gray-200 bg-white">
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={product.attributes.image}
          alt={product.attributes.title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        <div>
          <h1 className="capitalize text-3xl font-bold">
            {product.attributes.title}
          </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {product.attributes.company}
          </h4>
          <p className="mt-3 text-xl">
            ${formatPrice(product.attributes.price)}
          </p>
          <p className="mt-6 leading-8">{product.attributes.description}</p>

          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <form
              className="flex items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              {product.attributes.colors.map((value, index) => {
                return (
                  <label
                    key={index}
                    htmlFor={`color-${index}`}
                    className="flex items-center">
                    <div
                      className="rounded-full w-7 h-7 cursor-pointer border-2 border-gray-300"
                      style={{ backgroundColor: value }}></div>
                    <input
                      type="radio"
                      id={`color-${index}`}
                      name="color"
                      className="hidden"
                      value={value}
                    />
                  </label>
                );
              })}
            </form>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md bg-white border-black outline-none focus:border-black focus:outline-none"
              id="amount">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-10">
            <button className="btn bg-[#463aa1] border-none text-[#dbd4ed] btn-md ">
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
