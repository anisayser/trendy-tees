import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Badge, Box, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import React, { useState } from 'react';
import { FaAngleDown, FaAngleLeft } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import useCountries from "../../hooks/useCountries";
import logo from "../../trendyTees/logo_150x50.png";
import img from "../../trendyTees/1_260x322.jpg";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebaseInit";
import { useGetCartProductsByEmailQuery } from "../../features/cart/cartApi";
import CheckoutFormPartOne from "./CheckoutFormPartOne";

const CheckoutPartOne = () => {
    const [stockFilter, setStockFilter] = useState(false);

    const [user] = useAuthState(auth);

    //CART PRODUCT CONTROLLERS START
    const { data: cartProducts, isLoading: cartIsLoading, isError: cartIsError, error: cartError } = useGetCartProductsByEmailQuery(user?.email);

    //Decide what to render for men
    let content = null;
    if (cartIsLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!cartIsLoading && cartIsError) {
        content = <p className="text-xl font-bold">{cartError.message}</p>
    }
    if (!cartIsLoading && !cartIsError && cartProducts?.length === 0) {
        content = <p className="text-xl font-bold">No Products found</p>
    }
    if (!cartIsLoading && !cartIsError && cartProducts?.length > 0) {
        content = cartProducts?.map(cartProduct => (
            <div key={cartProduct._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                    <Badge badgeContent={cartProduct.product.quantity} color="secondary">
                        <img src={cartProduct.product.image} className="w-16 border p-1 rounded" alt="" />
                    </Badge>
                    <h5>{cartProduct.product.title}</h5>
                </div>
                <h4 className="text-lg font-semibold">${cartProduct.product.price}</h4>
            </div>
        ))
    }
    //TOTAL CALCULATION
    let subTotal = 0;
    const shipping = 5;

    if (cartProducts?.length > 0) {
        for (const products of cartProducts) {
            subTotal += products.product.price * products.product.quantity;
        }
    }
    const tax = subTotal * 0.10;
    const total = subTotal + tax + shipping;

    //CART PRODUCT CONTROLLERS ENDS

    return (
        <div className="container max-w-6xl mx-auto py-16 px-5">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <Link to="/"><img src={logo} className="" alt="" /></Link>
                    <div className="flex items-center space-x-2 lg:space-x-5 py-5 text-sm overflow-x-auto">
                        <Link to={"/"}>Home</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Information</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Shipping</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Payment</Link>
                    </div>

                    {/* MOBILE CHECKOUT PRODUCT DETAILS ACCORDION */}
                    <div className="lg:hidden">
                        <Accordion expanded={stockFilter} sx={{}} onChange={() => setStockFilter(!stockFilter)}>
                            <AccordionSummary
                                expandIcon={<FaAngleDown className="text-black" />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <div className="text-sm font-semibold flex items-center space-x-2">
                                    <BsCart3 className="text-black" /><span>Show Order Summery</span>
                                </div>
                                {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="">
                                    <div className="space-y-5 border-b pb-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-5">
                                                <Badge badgeContent={4} color="secondary">
                                                    <img src={img} className="w-16 border p-1 rounded" alt="" />
                                                </Badge>
                                                <h5>This is the Product Title</h5>
                                            </div>
                                            <h4 className="text-lg font-semibold">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-5">
                                                <Badge badgeContent={4} color="secondary">
                                                    <img src={img} className="w-16 border p-1 rounded" alt="" />
                                                </Badge>
                                                <h5>This is the Product Title</h5>
                                            </div>
                                            <h4 className="text-lg font-semibold">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-5">
                                                <Badge badgeContent={4} color="secondary">
                                                    <img src={img} className="w-16 border p-1 rounded" alt="" />
                                                </Badge>
                                                <h5>This is the Product Title</h5>
                                            </div>
                                            <h4 className="text-lg font-semibold">$3250</h4>
                                        </div>
                                    </div>

                                    <div className="space-y-1 py-5 border-b pb-5">
                                        <div className="flex items-center justify-between">
                                            <p>Subtotal</p>
                                            <h4 className="">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p>Tax</p>
                                            <h4 className="">$50</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p>Shipping</p>
                                            <h4 className="">$80</h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xl">Total</p>
                                            <h4 className="text-2xl">$4180</h4>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                    {/* CHECKOUT FORM PART ONE */}
                    <CheckoutFormPartOne />

                </div>



                <div className="hidden lg:block">
                    <div className="space-y-5 border-b py-5 max-h-96 overflow-hidden hover:overflow-y-scroll">
                        {content}
                    </div>

                    <div className="space-y-1 py-5 border-b pb-5">
                        <div className="flex items-center justify-between">
                            <p>Subtotal</p>
                            <h4 className="">${subTotal}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Tax</p>
                            <h4 className="">${tax}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Shipping</p>
                            <h4 className="">${shipping}</h4>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="text-xl">Total</p>
                            <h4 className="text-2xl">${total.toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CheckoutPartOne;


