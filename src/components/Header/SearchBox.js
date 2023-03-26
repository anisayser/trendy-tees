import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetProductsBySearchQuery } from "../../features/products/productsApi";
import img from "../../trendyTees/1_260x322.jpg";

const SearchBox = () => {


    const { searchFilter } = useSelector(state => state.filters);

    const { data: products, isLoading, isError, error } = useGetProductsBySearchQuery(searchFilter);

    //Decide what to render for search
    let content = null;
    if (isLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!isLoading && isError) {
        content = <p className="text-xl font-bold">{error.message}</p>
    }
    if (!isLoading && !isError && products?.length === 0) {
        content = <p className="text-xl font-bold">No Products found</p>
    }
    if (!isLoading && !isError && products?.length > 0) {
        content = products?.map(product => (
            <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-3">
                    <Link to={`/product/${product._id}`}><img src={product.image} className="w-12 border p-1" alt="" /></Link>
                    <Link to={`/product/${product._id}`}><h4>{product.title}</h4></Link>
                </div>
                <Link to={`/product/${product._id}`}><h4 className="text-sm md:text-lg">${product.price}</h4></Link>
            </div>
        ))
    }



    return (
        searchFilter &&
        <div className="p-3 divide-y">
             {content}
        </div>
    
    )
}

export default SearchBox;