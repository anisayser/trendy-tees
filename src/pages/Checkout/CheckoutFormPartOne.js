import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteAllFromCartMutation, useGetCartProductsByEmailQuery } from "../../features/cart/cartApi";
import { useCreateOrderMutation } from "../../features/orders/ordersApi";
import auth from "../../firebaseInit";
import useCountries from "../../hooks/useCountries";

const CheckoutFormPartOne = () => {
    const countries = useCountries();

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const [order, setOrder] = useState([]);

    const handleBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrder = { ...order };
        newOrder[field] = value;
        setOrder(newOrder);
    }

    // console.log(order);

    //CREATE ORDER CONTROLLERS START
    const [deleteAllFromCart, { isLoading: delIsLoading }] = useDeleteAllFromCartMutation();
    const { data: cartProducts, isLoading: cartIsLoading, isError: cartIsError, error: cartError } = useGetCartProductsByEmailQuery(user?.email);
    const [createOrder, { isLoading, isError, error, isSuccess }] = useCreateOrderMutation();
    
    const handleCreateOrder = (e) => {
        e.preventDefault();
        createOrder({
            email: user?.email,
            phone: order?.phone,
            paymentMethod: order?.paymentMethod,
            country: order?.country,
            userName: order?.firstName + " " + order?.lastName,
            shipping: {
                address: order?.address + ", " + order?.appartment,
                city: order?.city,
                postCode: order?.postCode
            },
            products: [...cartProducts]
        })
    }

    useEffect(() => {
        if (!isLoading && !isError && isSuccess) {
            deleteAllFromCart(user?.email);
            navigate("/orderplaced", { replace: true });
        }
    }, [deleteAllFromCart, isLoading, isError, isSuccess, user?.email, navigate]);


    //CREATE ORDER CONTROLLERS ENDS




    return (
        <div>
            <h2 className="text-2xl py-5">Contact Information</h2>

            <div className="space-y-5">
                <TextField name="phone" onBlur={handleBlur} id="outlined-basic" label="Phone Number" variant="outlined" className="w-full" size="small" required />
                <TextField name="email" onBlur={handleBlur} id="outlined-basic" type={"email"} label="Email Address" variant="outlined" className="w-full" size="small" required />
            </div>

            <h2 className="text-2xl py-5">Shipping Address</h2>

            <form onSubmit={handleCreateOrder}>
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
                                    name="country"
                                    onBlur={handleBlur}
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

                            <TextField name="firstName" onBlur={handleBlur} id="outlined-basic" label="First Name" variant="outlined" required className="w-full" size="small" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div>
                            <TextField name="lastName" onBlur={handleBlur} id="outlined-basic" label="Last Name" variant="outlined" className="w-full" size="small" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <TextField name="address" onBlur={handleBlur} id="outlined-basic" label="Address" variant="outlined" required className="w-full" size="small" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <TextField name="appartment" onBlur={handleBlur} id="outlined-basic" label="Appartment, Suit etc." variant="outlined" className="w-full" size="small" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div>
                            <TextField name="city" onBlur={handleBlur} id="outlined-basic" label="City" variant="outlined" className="w-full" required size="small" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div>
                            <TextField name="postCode" onBlur={handleBlur} id="outlined-basic" label="Postal Code" variant="outlined" required className="w-full" size="small" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Payment</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="cod"
                                    name="paymentMethod"
                                    onBlur={handleBlur}
                                >
                                    <FormControlLabel value="cod" control={<Radio />} label="Cash On Delivery" />
                                    <FormControlLabel value="card" control={<Radio />} label="Card" />
                                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center justify-between">
                            <Link to="/viewcart" className="text-blue-500"> <FaAngleLeft className="inline" /> <span>Return to Cart</span></Link>

                            {/* <Link to="/orderplaced"> */}
                            <button type="submit" className="bg-black relative inline-flex items-center text-center px-5 sm:px-12 py-1 overflow-hidden text-lg font-medium text-white border-2 border-black hover:border-black hover:text-black group hover:bg-black">
                                <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-300 ease"></span>

                                <span className="relative text-center mx-auto">Confirm Order</span>
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CheckoutFormPartOne;