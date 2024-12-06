import React, { useState, useEffect } from "react";

function Cart() {
  const [copied, setCopied] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 5.0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const productsData = localStorage.getItem("productsData")
      ? JSON.parse(localStorage.getItem("productsData"))
      : [];
    setCopied(productsData);
  }, []);

  useEffect(() => {
    const subtotal = copied.reduce(
      (sum, item) => sum + item.data.price * item.choiseCount,
      0
    );
    const shipping = 5.0;
    const tax = (subtotal * 10) / 100;
    const total = subtotal + shipping + tax;
    setTotals({ subtotal, shipping, tax, total });
  }, [copied]);

  const formatPrice = (price) => {
    const priceStr = price.toString();
    return (
      priceStr.slice(0, priceStr.length - 2) +
      "." +
      priceStr.slice(priceStr.length - 2)
    );
  };

  if (copied.length === 0) {
    return <div>No items in the cart</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="border-b border-base-300 mb-7 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>
      <div className="lg:grid lg:grid-cols-12 gap-6 px-11">
        <div className="lg:col-span-8">
          {copied.map((value, index) => (
            <article
              key={index}
              className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
              <img
                src={value.data.image}
                alt={value.data.title}
                className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
              />
              <div className="sm:ml-16 sm:w-48">
                <h3 className="capitalize font-medium">{value.data.title}</h3>
                <h4 className="mt-2 capitalize text-sm text-neutral-content">
                  {value.data.company}
                </h4>
                <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                  Color:
                  <span
                    className="badge badge-sm"
                    style={{
                      backgroundColor: value.choiseColor,
                    }}></span>
                </p>
              </div>
              <div className="sm:ml-12">
                <div className="form-control max-w-xs">
                  <label htmlFor={`amount-${index}`} className="label p-0">
                    <span className="label-text">Amount</span>
                  </label>
                  <select
                    id={`amount-${index}`}
                    value={value.choiseCount}
                    onChange={(e) => {
                      const updatedCart = [...copied];
                      updatedCart[index].choiseCount = Number(e.target.value);
                      setCopied(updatedCart);
                      localStorage.setItem(
                        "productsData",
                        JSON.stringify(updatedCart)
                      );
                    }}
                    className="mt-2 select select-base select-bordered select-xs">
                    {Array.from({ length: 20 }, (value, i) => i + 1).map(
                      (num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <button
                  onClick={() => {
                    const updatedCart = copied.filter(
                      (value, i) => i !== index
                    );
                    setCopied(updatedCart);
                    localStorage.setItem(
                      "productsData",
                      JSON.stringify(updatedCart)
                    );
                  }}
                  className="mt-2 link link-primary link-hover text-sm">
                  Remove
                </button>
              </div>
              <p className="font-medium sm:ml-auto">
                ${formatPrice(value.data.price * value.choiseCount)}
              </p>
            </article>
          ))}
        </div>

        <div className="lg:col-span-4 lg:pl-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Subtotal</span>
                <span className="font-medium">
                  ${formatPrice(totals.subtotal)}
                </span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Shipping</span>
                <span className="font-medium">
                  ${totals.shipping.toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Tax</span>
                <span className="font-medium">${formatPrice(totals.tax)}</span>
              </p>
              <p className="flex justify-between text-sm mt-4 pb-2">
                <span>Order Total</span>
                <span className="font-medium">
                  ${formatPrice(totals.total)}
                </span>
              </p>
            </div>
          </div>
          <a className="btn btn-primary btn-block mt-8" href="/login">
            Please Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cart;
