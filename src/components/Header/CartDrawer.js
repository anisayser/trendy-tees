import { Badge, Drawer } from "@mui/material";
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCart3 } from "react-icons/bs";
import { GiTireIronCross } from "react-icons/gi";
import { IoMdTrash } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCartProductsByEmailQuery } from "../../features/cart/cartApi";
import { openCart } from "../../features/NavToggles/NavToggle.slice";
import auth from "../../firebaseInit";
import img from "../../trendyTees/1_260x322.jpg";
import CartProduct from "./CartProduct";


const CartDrawer = () => {

    const dispatch = useDispatch();
    const [user] = useAuthState(auth);

    //CART OPEN CONTROLLERS STARTS
    const { cartOpen } = useSelector(state => state.navToggle);
    const toggleCartDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(openCart(open))
    };
    //CART OPEN CONTROLLERS ENDS

    const { data: cartProducts, isLoading, isError, error } = useGetCartProductsByEmailQuery(user?.email);
    // console.log("cart Products", cartProducts);

    //Decide what to render for men
    let content = null;
    if (isLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!isLoading && isError) {
        content = <p className="text-xl font-bold">{error.message}</p>
    }
    if (!isLoading && !isError && cartProducts?.length === 0) {
        content = <p className="text-xl font-bold">No Products found</p>
    }
    if (!isLoading && !isError && cartProducts?.length > 0) {
        content = cartProducts?.map(product => <CartProduct key={product._id} cartProduct={product} />)
    }




    //TOTAL CALCULATION
    let subTotal = 0;
    let total = 0;
    let tax = 0;
    let shipping = 0;

    if (cartProducts?.length > 0) {
        for (const products of cartProducts) {
            subTotal += products.product.price * products.product.quantity;
        }
    }






    return (
        <>

            {/* CART DRAWER */}
            <Drawer
                anchor={"right"}
                open={cartOpen}
                onClose={toggleCartDrawer("right", false)}
            >
                <div>
                    <div className="flex items-center justify-between p-3 bg-primary text-white">
                        <h4>Cart Products</h4>
                        <GiTireIronCross className="cursor-pointer" onClick={toggleCartDrawer("right", false)} />
                    </div>
                    <div className="w-[100vw] sm:w-96 py-5 flex flex-col space-y-2 divide-y">

                        <div className="px-3 space-y-3">
                            {content}
                        </div>

                        <div className="px-5">
                            <div className="flex items-center justify-between pt-3">
                                <h4 className="text-lg">Total : </h4>
                                <h4 className="text-lg">${subTotal}</h4>
                            </div>
                        </div>



                        <div className="px-5 pt-5">
                            <Link to="/viewcart">
                                <button onClick={toggleCartDrawer("right", false)} className="w-full relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                        <BsCart3 className="text-2xl font-bold" />
                                    </span>
                                    <span className="relative text-center mx-auto">View Cart</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Drawer>


        </>
    )
}

export default CartDrawer;