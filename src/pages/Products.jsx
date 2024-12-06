import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(0);

  const [formData, setFormData] = useState({
    search: "",
    category: "all",
    company: "all",
    order: "a-z",
    price: 65000,
    shipping: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    axios
      .get(
        `https://strapi-store-server.onrender.com/api/products?search=${formData.search}&category=${formData.category}&company=${formData.company}&order=${formData.order}&price=${formData.price}&page=${page}`
      )
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          console.log(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [search, page]);

  const formatPrice = (price) => `$${(price / 100).toFixed(2)}`;

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="grid place-items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <div className="text-center py-10">No products found.</div>
      </div>
    );
  }

  return (
    <div className="container px-10 mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={(e) => {
          e.preventDefault();
        }}
        className="bg-[#f0f6ff] rounded-md px-8 py-4 grid gap-x-4 mb-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <div className="form-control flex flex-col items-start">
          <label htmlFor="search" className="label text-nowrap">
            <span className="label-text capitalize">Search Product</span>
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="input input-bordered input-sm"
            value={formData.search}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="category" className="label text-nowrap">
            <span className="label-text capitalize">Select Category</span>
          </label>
          <select
            name="category"
            id="category"
            className="select select-bordered select-sm"
            value={formData.category}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}>
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="company" className="label text-nowrap">
            <span className="label-text capitalize">Select Company</span>
          </label>
          <select
            name="company"
            id="company"
            className="select select-bordered select-sm"
            value={formData.company}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}>
            <option value="all">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="order" className="label text-nowrap">
            <span className="label-text capitalize">Sort By</span>
          </label>
          <select
            name="order"
            id="order"
            className="select select-bordered select-sm"
            value={formData.order}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="price" className="label text-nowrap">
            <span className="label-text capitalize">Price Range</span>
            <span>{formatPrice(formData.price)}</span>
          </label>
          <input
            type="range"
            name="price"
            id="price"
            min="0"
            max="100000"
            step="1000"
            className="range range-primary range-sm"
            value={formData.price}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          />
          <div className="w-full flex justify-between text-xs px-2 mt-2">
            <span>$0.00</span>
            <span>Max: $1,000.00</span>
          </div>
        </div>

        <div className="form-control">
          <label
            htmlFor="shipping"
            className="label cursor-pointer text-nowrap">
            <span className="label-text capitalize">Free Shipping</span>
          </label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            className="checkbox checkbox-primary checkbox-sm"
            checked={formData.shipping}
            onChange={(e) => {
              handleInputChange(e);
              e.preventDefault();
            }}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              setSearch((prev) => prev + 1);
            }}
            type="submit"
            className="btn btn-primary btn-sm px-20">
            Search
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                search: "",
                category: "all",
                company: "all",
                order: "a-z",
                price: 65000,
                shipping: false,
              })
            }
            className="btn btn-accent btn-sm px-20">
            Reset
          </button>
        </div>
      </form>

      <div className="w-full flex flex-wrap items-center justify-between gap-5 mt-5">
        {products.map((product) => {
          const price = product.attributes.price.toString();
          const formattedPrice =
            price.slice(0, price.length - 2) +
            "." +
            price.slice(price.length - 2);

          return (
            <div
              key={product.id}
              className="flex w-[25%] h-[350px] p-2 rounded-xl flex-col shadow-md items-center gap-2"
              onClick={() => navigate(`/products/${product.id}`)}>
              <img
                src={product.attributes.image}
                className="w-full h-[250px] rounded-lg object-cover"
                alt={product.attributes.title}
              />
              <h3 className="font-semibold text-black capitalize">
                {product.attributes.title}
              </h3>
              <h3>${formattedPrice}</h3>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4  mt-8 mb-12">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-sm btn-outline">
          Previous
        </button>
        <div className="flex items-center border bg-slate-500 overflow-hidden rounded-lg">
          <span
            className="hover:bg-gray-700 cursor-pointer   py-1 px-3 "
            onClick={(e) => {
              e.preventDefault();
              setPage(1);
            }}>
            1
          </span>
          <span
            className="hover:bg-gray-700 cursor-pointer   py-1 px-3 "
            onClick={(e) => {
              e.preventDefault();
              setPage(2);
            }}>
            2
          </span>
          <span
            className="hover:bg-gray-700 cursor-pointer   py-1 px-3 "
            onClick={(e) => {
              e.preventDefault();
              setPage(3);
            }}>
            3
          </span>
        </div>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, 3))}
          className="btn btn-sm btn-outline">
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
