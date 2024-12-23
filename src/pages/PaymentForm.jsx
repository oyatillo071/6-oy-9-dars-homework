import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function PaymentForm() {
  const notify = (text) => toast(`${text}`);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.cardNumber === "") {
      newErrors.cardNumber = "Kartangiz raqami kiritilmagan.";
    } else if (formData.cardNumber.length !== 16) {
      newErrors.cardNumber = "Kartangiz raqami 16 ta raqam bo'lishi kerak.";
    }

    if (formData.cardHolder === "") {
      newErrors.cardHolder = "Kartani egasi nomi kiritilmagan.";
    }

    if (formData.expirationDate === "") {
      newErrors.expirationDate = "Yakunlanish sanasi kiritilmagan.";
    } else {
      const parts = formData.expirationDate.split("/");
      if (
        parts.length !== 2 ||
        parts[0].length !== 2 ||
        parts[1].length !== 2
      ) {
        newErrors.expirationDate =
          "Yakunlanish sanasi MM/YY formatida bo'lishi kerak.";
      } else {
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        if (month < 1 || month > 12) {
          newErrors.expirationDate = "Yakunlanish sanasi to'g'ri emas. (OY)";
        } else if (year < 20 || year > 30) {
          newErrors.expirationDate = "Yakunlanish sanasi o'tgan.(YIL)";
        }
      }
    }

    if (formData.cvv === "") {
      newErrors.cvv = "CVV raqami kiritilmagan.";
    } else if (isNaN(formData.cvv)) {
      newErrors.cvv = "CVV raqami faqat raqam bo'lishi kerak.";
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV raqami 3 ta raqam bo'lishi kerak.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.values(validationErrors).every((value) => value.length === 0)) {
      notify("Thanks for choice us");
      setSuccess(true);
      localStorage.setItem("productsData", []);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container mx-auto p-8">
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
        transition={Bounce}
      />
      {success ? (
        <div className="card bg-base-100 shadow-lg p-8 h-full flex flex-col justify-center text-center">
          <h4 className="text-2xl font-bold text-green-500">
            To'lov muvaffaqiyatli bajarildi!
          </h4>
          <NavLink to="/home" className="btn btn-primary btn-block mt-4">
            Bosh sahifa
          </NavLink>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="card w-96 mx-auto bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
        >
          <h4 className="text-2xl font-bold text-center">To'lov formasi</h4>

          <div className="form-control">
            <label htmlFor="cardNumber" className="label">
              <span className="label-text text-nowrap ">Kartangiz raqami</span>
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              className="input input-bordered"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm">{errors.cardNumber}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="cardHolder" className="label">
              <span className="label-text text-nowrap">Kartani egasi</span>
            </label>
            <input
              type="text"
              name="cardHolder"
              id="cardHolder"
              className="input input-bordered"
              value={formData.cardHolder}
              onChange={handleInputChange}
            />
            {errors.cardHolder && (
              <span className="text-red-500 text-sm">{errors.cardHolder}</span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="expirationDate" className="label">
              <span className="label-text text-nowrap">
                Yakunlanish sanasi (MM/YY)
              </span>
            </label>
            <input
              type="text"
              name="expirationDate"
              id="expirationDate"
              placeholder="MM/YY"
              className="input input-bordered"
              value={formData.expirationDate}
              onChange={handleInputChange}
            />
            {errors.expirationDate && (
              <span className="text-red-500 text-sm">
                {errors.expirationDate}
              </span>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="cvv" className="label">
              <span className="label-text text-nowrap">CVV</span>
            </label>
            <input
              type="password"
              name="cvv"
              id="cvv"
              className="input input-bordered"
              value={formData.cvv}
              onChange={handleInputChange}
            />
            {errors.cvv && (
              <span className="text-red-500 text-sm">{errors.cvv}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            To'lash
          </button>
        </form>
      )}
    </div>
  );
}

export default PaymentForm;
