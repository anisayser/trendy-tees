import { ThemeProvider } from "@mui/material";
import React from 'react';
import { Route, Routes } from "react-router-dom";

import './App.css';
import Layout from "./components/layout/Layout";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import ViewCart from "./components/ViewCart/ViewCart";
import theme from "./MuiStyles/MuiStyles";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import CheckoutPartOne from "./pages/Checkout/CheckoutPartOne";
import FilterProducts from "./pages/FilterProducts";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="viewcart" element={<ViewCart />} />
          <Route path="category/:title" element={<FilterProducts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPartOne />} />

      </Routes>


    </ThemeProvider>
  );
}

export default App;
