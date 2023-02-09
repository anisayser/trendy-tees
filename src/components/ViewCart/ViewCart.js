import React, { useState } from 'react'
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import AllHeader from "../Header/AllHeader";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import img from "../../trendyTees/1_260x322.jpg"
import { IoTrashOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProductGrid from "../ProductGrid/ProductGrid";
import { BiMinus, BiPlus } from "react-icons/bi";
import Footer from "../Footer/Footer";

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(<img src={img} className="w-32" alt="" />, "This is the title of the product", 12, 6, 3250),
    createData(<img src={img} className="w-32" alt="" />, "This is the title of the product", 13, 6, 3250),
    createData(<img src={img} className="w-32" alt="" />, "This is the title of the product", 14, 6, 3250),
];

const ViewCart = () => {


    const [quantity, setQuantity] = useState(1);

    const handleQuantity = () => {
        if (quantity < 2) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1)
        }
    }


    return (
        <>

            <div className="pb-10 pt-[58px] lg:pt-0">
                <div className="bg-info px-5">
                    <div className="container mx-auto flex items-center space-x-5 py-5 text-sm ">
                        <Link to={"/"}>Home</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Shopping Cart</Link>
                    </div>
                </div>

                <div className="container mx-auto py-10">
                    <div className="pb-5 lg:pb-10 px-5 lg:px-0">
                        <h2 className="text-base lg:text-2xl font-bold">Shopping Cart</h2>
                    </div>


                    <div>

                        <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-3 lg:col-span-2">
                                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #f2f2f2" }}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell width={10} sx={{ fontWeight: "bold" }}><FaTrash className="text-xl" /></StyledTableCell>
                                                <StyledTableCell width={100} sx={{ fontWeight: "bold" }}>Product</StyledTableCell>
                                                <StyledTableCell width={""} sx={{ fontWeight: "bold" }}></StyledTableCell>
                                                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>Price</StyledTableCell>
                                                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>Qty</StyledTableCell>
                                                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>Total</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="left"><IoTrashOutline className="text-xl cursor-pointer" /></StyledTableCell>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="left">${row.fat}</StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        <div className="flex items-center">
                                                            <button className="text-lg p-1 border h-7" onClick={handleQuantity}><BiMinus /></button>
                                                            <input type="text" className="border-t border-b p-1 w-10 h-7 text-center font-bold text-sm" value={quantity} onChange={e => setQuantity(+e.target.value)} />
                                                            <button className="text-lg p-1 border h-7" onClick={() => setQuantity(quantity + 1)}><BiPlus /></button>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">${row.protein}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className="col-span-3 lg:col-span-1">
                                <div className="border bg-info">

                                    <div className="bg-white p-3">
                                        <h4 className="text-lg">There are two items in your cart.</h4>
                                    </div>
                                    <div className="bg-info p-5 space-y-5">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-base lg:text-lg">Total :</h4>
                                            <h4 className="font-bold text-base lg:text-2xl">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-base lg:text-lg">Shipping :</h4>
                                            <h4 className="text-sm lg:text-base">Shipping & taxes calculated at checkout.</h4>
                                        </div>
                                    </div>

                                    <div className="px-5 space-y-5 pb-5">
                                        <Link to={"/checkout"}>
                                            <button className="w-full bg-primary relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-white border-2 border-primary hover:border-black hover:text-white group hover:bg-primary">
                                                <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-300 ease"></span>

                                                <span className="relative text-center mx-auto">Proceed to Checkout</span>
                                            </button>
                                        </Link>
                                        <button className="w-full bg-white relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-white hover:border-black hover:text-white group hover:bg-white">
                                            <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-300 ease"></span>

                                            <span className="relative text-center mx-auto">Continue Shopping</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* RELATED PRODUCTS */}

                        <div className="py-10">
                            <ProductGrid heading={"Related Products"} />
                        </div>


                    </div>

                </div>

            </div>
            
        </>
    )
}

export default ViewCart;