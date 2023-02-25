import React, { useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDeleteFromCartMutation, useGetCartProductsByEmailQuery, useUpdateCartProductMutation } from "../../features/cart/cartApi";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebaseInit";



const ViewCartData = ({ cartProduct }) => {

    const { product } = cartProduct || {};
    const [user] = useAuthState(auth);


    //QUANTITY CONTROLLERS STARTS
    const [quantity, setQuantity] = useState(product.quantity);
    const handleQuantity = () => {
        if (quantity < 2) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1)
        }
    }
    //QUANTITY CONTROLLERS ENDS


    //TABLE CONTROLLERS START
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#F2F2F2",
            color: "black",
            boxShadow: 0,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({

    }));
    //TABLE CONTROLLERS ENDS




    //HANDLE UPDATE CART PRODUCT QUANTITY START
    const { data: cartProducts, isLoading: cartIsLoading, isError: cartIsError, error: cartError } = useGetCartProductsByEmailQuery(user?.email);
    const existsInCart = cartProducts?.find(cartPro => cartPro.product.productId === product.productId);
    // console.log(existsInCart);

    const [updateCartProduct, { isLoading: updIsLoading, isError: updIsError, error: updError, isSuccess: updIsSuccess }] = useUpdateCartProductMutation();
    const handleQuantityUp = () => {
        setQuantity(quantity + 1);
        if (existsInCart) {
            updateCartProduct({
                id: product.productId,
                data: { ...existsInCart, product: { ...existsInCart.product, quantity: quantity + 1 } }
            })
        }
    }
    const handleQuantityDown = () => {
        handleQuantity();
        if (existsInCart) {
            updateCartProduct({
                id: product.productId,
                data: { ...existsInCart, product: { ...existsInCart.product, quantity: quantity - 1 } }
            })
        }
    }
    //HANDLE UPDATE CART PRODUCT QUANTITY ENDS


    //DELETE FROM CART CONTROLLERS START
    const [deleteFromCart, { isLoading, isError, error, isSuccess }] = useDeleteFromCartMutation();
    const handleCartDelete = () => {
        deleteFromCart(cartProduct?._id);
    }
    //DELETE FROM CART CONTROLLERS ENDS

    // console.log(quantity);

    return (
        <StyledTableRow>
            <StyledTableCell align="left"><IoTrashOutline onClick={handleCartDelete} className="text-xl cursor-pointer" /></StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <img src={product.image} className="w-32" alt="" />
            </StyledTableCell>
            <StyledTableCell align="left">{product.title}</StyledTableCell>
            <StyledTableCell align="left">${product.price}</StyledTableCell>
            <StyledTableCell align="left">
                <div className="flex items-center">
                    {/* <button className="text-lg p-1 border h-7" onClick={() => handleQuantity()}><BiMinus /></button> */}
                    {quantity === 1 ?
                        <button className="text-lg p-1 border h-7"><BiMinus /></button>
                        :
                        <button className="text-lg p-1 border h-7" onClick={handleQuantityDown}><BiMinus /></button>
                    }
                    <input type="text" className="border-t border-b p-1 w-10 h-7 text-center font-bold text-sm" value={quantity} onChange={e => setQuantity(+e.target.value)} />
                    {/* <button className="text-lg p-1 border h-7" onClick={() => setQuantity(quantity + 1)}><BiPlus /></button> */}
                    <button className="text-lg p-1 border h-7" onClick={handleQuantityUp}><BiPlus /></button>
                </div>
            </StyledTableCell>
            <StyledTableCell align="left">${quantity * product.price}</StyledTableCell>
        </StyledTableRow>
    )
}

export default ViewCartData;