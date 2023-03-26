import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddToTheCartMutation, useGetCartProductsByEmailQuery, useUpdateCartProductMutation } from "../../features/cart/cartApi";
import auth from "../../firebaseInit";

const Product = ({ product }) => {


    const { pathname } = useLocation();
    const [user] = useAuthState(auth);
    
    const navigate = useNavigate();
    const { data: cartProducts, isLoading: cartIsLoading, isError: cartIsError, error: cartError } = useGetCartProductsByEmailQuery(user?.email);
    const [addToTheCart, { isLoading, isError, error, isSuccess }] = useAddToTheCartMutation();
    const [updateCartProduct, { isLoading: updIsLoading, isError: updIsError, error: updError, isSuccess: updIsSuccess }] = useUpdateCartProductMutation();


    // console.log(cartProducts);
    const existsInCart = cartProducts?.find(cartPro => cartPro.product.productId === product._id);
    // console.log("exists in Cart", existsInCart);


    const handleAddToCart = () => {
        const newCartPro = { ...product };
        delete newCartPro._id;
        if (!user?.email) {
            navigate("/login")
        } else {

            if (existsInCart) {
                updateCartProduct({
                    id: product._id,
                    data: { ...existsInCart, product: { ...existsInCart.product, quantity: existsInCart.product.quantity + 1 } }
                })
            } else {
                addToTheCart({
                    email: user?.email,
                    product: { ...newCartPro, quantity: 1, productId: product._id }
                });
            }
        }
    }



    return (
        <div className={`space-y-2 border p-2 ${pathname === "/products/id" && "border-black"}`}>
            <div>
                <img src={product.image} className="w-full" alt="" />
            </div>
            <div>
                <Link to={`/product/${product._id}`}>
                    <h4 className="text-base font-bold">{product.title}</h4>
                </Link>
                <h4 className="text-primary font-bold">${product.price}</h4>
            </div>
            <div>
                <Rating name="read-only" value={3} readOnly size="small" />
            </div>
            <div>
                {/* <button className="bg-black text-white w-full py-1 md:py-2 text-sm md:text-base shadow-xl hover:bg-primary hover:text-white duration-300 ease-linear">Add to cart</button> */}
                {!isLoading ?
                    <button onClick={handleAddToCart} className="w-full relative inline-flex items-center text-center py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                        <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <BsCart3 className="text-2xl font-bold hidden sm:block" />
                        </span>
                        <span className="relative text-center mx-auto">Add to cart</span>
                    </button>
                    :
                    <button className="w-full pt-2 border-2 border-black bg-black">
                        <CircularProgress style={{ width: "20px", height: "20px" }} />
                    </button>
                }

            </div>
        </div>
    )
}

export default Product;