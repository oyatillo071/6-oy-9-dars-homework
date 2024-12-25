import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice";
import { ToastContainer, toast } from "react-toastify";
function Product() {
  const notify = (text) => toast(`${text}`);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [choiseColor, setChoiseColor] = useState(null);
  const [choiseCount, setChoiseCount] = useState(1);

  const counter = useSelector((state) => {
    return state;
  });
  console.log(counter);

  const dispatch = useDispatch();

  function localSave(data, choiseColor, choiseCount) {
    let copied = localStorage.getItem("productsData")
      ? JSON.parse(localStorage.getItem("productsData"))
      : [];

    copied.push({
      data: {
        id: data.id,
        title: data.attributes.title,
        price: data.attributes.price,
        company: data.attributes.company,
        image: data.attributes.image,
        shipping: data.attributes.shipping,
      },
      choiseColor,
      choiseCount,
    });
    notify("Product succesfully added to cart");
    localStorage.setItem("productsData", JSON.stringify(copied));
    dispatch(increment(1));
  }

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
    return (
      <div className="grid place-items-center min-h-[100%]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="my-12 h-full pb-20 container mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <NavLink
              to="/home"
              className="font-sans text-sm   hover:bg-gray-200 "
            >
              Home
            </NavLink>
          </li>
          <li>
            <Link
              to="/products"
              className="font-sans text-sm   hover:bg-gray-200 bg-white"
            >
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
              }}
            >
              {product.attributes.colors.map((value, index) => {
                const isSelected = choiseColor === value;
                return (
                  <label
                    onClick={() => {
                      setChoiseColor(value);
                    }}
                    key={index}
                    htmlFor={`color-${index}`}
                    className="flex items-center"
                  >
                    <div
                      className={`rounded-[50%] w-7 h-7 cursor-pointer border-2 ${
                        isSelected ? "border-black" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: value }}
                    ></div>
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
              onChange={(e) => {
                setChoiseCount(e.target.value);
              }}
              className="select select-secondary select-bordered select-md bg-white border-black outline-none focus:border-black focus:outline-none"
              id="amount"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-10">
            <button
              onClick={(e) => {
                if (!choiseColor || !choiseCount) {
                  notify(
                    "Please select a color and amount before adding to bag."
                  );
                  return;
                }

                localSave(product, choiseColor, choiseCount);
              }}
              className="btn bg-[#463aa1] border-none text-[#dbd4ed] btn-md hover:bg-blue-600 "
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
