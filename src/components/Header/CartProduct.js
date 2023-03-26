import { Badge } from "@mui/material";
import React from 'react'
import { IoMdTrash } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useDeleteFromCartMutation } from "../../features/cart/cartApi";

const CartProduct = ({ cartProduct }) => {

    const [deleteFromCart, { isLoading, isError, error, isSuccess }] = useDeleteFromCartMutation();

    const handleCartDelete = () => {
        deleteFromCart(cartProduct?._id);
    }


    const { image, title, price, quantity } = cartProduct?.product || {};
    return (
        <div className="flex items-center justify-between">
            <div className="flex space-x-3">
                <Badge badgeContent={quantity} color="secondary">
                    <img src={image} className="w-16 border p-1 rounded" alt="" />
                </Badge>
                <div>
                    <h5>{title}</h5>
                    <h4 className=""> <span>${price}</span> x <span>{quantity}</span></h4>
                </div>
            </div>
            <button onClick={handleCartDelete}><IoMdTrash className="text-2xl text-tertiary" /></button>
        </div>
    )
}

export default CartProduct;