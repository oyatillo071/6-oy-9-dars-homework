import React, { useState, useEffect } from "react";

import "./App.css";
import { Link, NavLink, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentForm from "./pages/PaymentForm";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Cart from "./pages/Cart";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <ErrorPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              {" "}
              <Login />
            </AuthLayout>
          }
        />

        <Route
          index
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/paymentForm"
          element={
            <MainLayout>
              <PaymentForm />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
