import React, { useState } from "react";

function ProductFilterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    search: "",
    category: "all",
    company: "all",
    order: "a-z",
    price: 65000,
    shipping: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const formatPrice = (price) => `$${(price / 100).toFixed(2)}`;

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-[#f0f6ff] rounded-md px-8 py-4 grid gap-x-4 mb-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <div className="form-control flex flex-col items-start ">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize text-nowrap">
            Search Product
          </span>
        </label>
        <input
          type="search"
          name="search"
          id="search"
          className="input input-bordered input-sm"
          value={formData.search}
          onChange={handleChange}
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
          onChange={handleChange}>
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
          onChange={handleChange}>
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
          onChange={handleChange}>
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="price" className="label cursor-pointer text-nowrap">
          <span className="label-text capitalize">Select Price</span>
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
          onChange={handleChange}
        />
        <div className="w-full flex justify-between text-xs px-2 mt-2">
          <span className="font-bold text-md">$0.00</span>
          <span className="font-bold text-md">Max: $1,000.00</span>
        </div>
      </div>

      <div className="form-control items-center">
        <label htmlFor="shipping" className="label cursor-pointer text-nowrap ">
          <span className="label-text capitalize">Free Shipping</span>
        </label>
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          className="checkbox checkbox-primary checkbox-sm mr-[-50px]"
          checked={formData.shipping}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="btn btn-primary btn-sm px-20">
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
  );
}

export default ProductFilterForm;
