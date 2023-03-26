import { ThemeProvider } from "@mui/material";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./admin/Dashboard/Dashboard";
import PrivateRoute from "./admin/PrivateRoute/PrivateRoute";
import AddProduct from "./admin/Products/AddProduct";

import './App.css';
import Layout from "./components/layout/Layout";
import OrderPlaced from "./components/OrderPlaced/OrderPlaced";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import ViewCart from "./components/ViewCart/ViewCart";
import theme from "./MuiStyles/MuiStyles";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import CheckoutPartOne from "./pages/Checkout/CheckoutPartOne";
import FilterProducts from "./pages/FilterProducts";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import { ProSidebarProvider } from 'react-pro-sidebar';

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
          <Route path="category/:slug" element={<FilterProducts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="orderplaced" element={<OrderPlaced />} />
        </Route>

        <Route path="/checkout" element={<CheckoutPartOne />} />

        <Route path="/dashboard" element={<PrivateRoute><ProSidebarProvider><Dashboard /></ProSidebarProvider></PrivateRoute>}>
          <Route path="addproduct" element={<AddProduct />}></Route>
        </Route>

      </Routes>


    </ThemeProvider>
  );
}

export default App;
