import { Rating } from "@mui/material";
import React from 'react';
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import img from "../../trendyTees/1_260x322.jpg"
import Product from "./Product";

const ProductGrid = ({ heading, products }) => {

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
                            products?.map(product => <Product key={product._id} product={product} />)
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductGrid;