import { Rating } from "@mui/material";
import React from 'react';
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import img from "../../trendyTees/1_260x322.jpg"

const ProductGrid = ({ heading }) => {

    const { pathname } = useLocation();
    // console.log(pathname);


    return (
        <>
            <div className="py-10">
                <div className="container mx-auto px-2 md:px-0">
                    <div className="pb-8">
                        <h2 className={`text-2xl font-bold`}>{heading}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                        {
                            [...Array(4).keys()].map(product => (
                                <div key={product} className={`space-y-2 border p-2 ${pathname === "/products/id" && "border-black"}`}>
                                    <div>
                                        <img src={img} className="w-full" alt="" />
                                    </div>
                                    <div>
                                        <Link to="/products/id">
                                            <h4 className="text-base font-bold">Product Title</h4>
                                        </Link>
                                        <h4 className="text-primary font-bold">$456</h4>
                                    </div>
                                    <div>
                                        <Rating name="read-only" value={3} readOnly size="small" />
                                    </div>
                                    <div>
                                        {/* <button className="bg-black text-white w-full py-1 md:py-2 text-sm md:text-base shadow-xl hover:bg-primary hover:text-white duration-300 ease-linear">Add to cart</button> */}
                                        <button className="w-full relative inline-flex items-center text-center py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                            <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                                <BsCart3 className="text-2xl font-bold hidden sm:block" />
                                            </span>
                                            <span className="relative text-center mx-auto">Add to cart</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductGrid;