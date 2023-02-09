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

const CheckoutPartOne = () => {
    const countries = useCountries();
    const [stockFilter, setStockFilter] = useState(false);

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
                        <Accordion expanded={stockFilter} sx={{  }} onChange={() => setStockFilter(!stockFilter)}>
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

                    <div>
                        <h2 className="text-2xl py-5">Contact Information</h2>

                        <div className="space-y-5">
                            <TextField id="outlined-basic" label="Phone Number" variant="outlined" className="w-full" size="small" required />
                            <TextField id="outlined-basic" type={"email"} label="Email Address" variant="outlined" className="w-full" size="small" required />
                        </div>

                        <h2 className="text-2xl py-5">Shipping Address</h2>
                        <form action="">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <Autocomplete
                                        id="country-select-demo"
                                        sx={{ width: "100%" }}
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                {option.label} ({option.code}) +{option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                required
                                                {...params}
                                                label="Choose a country"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <TextField id="outlined-basic" label="First Name" variant="outlined" required className="w-full" size="small" />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <TextField id="outlined-basic" label="Last Name" variant="outlined" className="w-full" size="small" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div>
                                        <TextField id="outlined-basic" label="Address" variant="outlined" required className="w-full" size="small" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div>
                                        <TextField id="outlined-basic" label="Appartment, Suit etc." variant="outlined" className="w-full" size="small" />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <TextField id="outlined-basic" label="City" variant="outlined" className="w-full" required size="small" />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <TextField id="outlined-basic" label="Postal Code" variant="outlined" required className="w-full" size="small" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center justify-between">
                                        <Link to="/viewcart" className="text-blue-500"> <FaAngleLeft className="inline" /> <span>Return to Cart</span></Link>

                                        <button className="bg-black relative inline-flex items-center text-center px-5 sm:px-12 py-1 overflow-hidden text-lg font-medium text-white border-2 border-black hover:border-black hover:text-black group hover:bg-black">
                                            <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-300 ease"></span>

                                            <span className="relative text-center mx-auto">Continue to Checkout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>



                <div className="hidden lg:block">
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

            </div>

        </div>
    )
}

export default CheckoutPartOne;


