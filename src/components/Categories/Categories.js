import React from 'react';
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import img from "../../trendyTees/bn-1-4_1920x1920.jpg"

const Categories = () => {
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();

    //Decide what to render for categories
    let content = null;
    if (isLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!isLoading && isError) {
        content = <p className="text-xl font-bold">{error.message}</p>
    }
    if (!isLoading && !isError && categories?.length === 0) {
        content = <p className="text-xl font-bold">No Products found</p>
    }
    if (!isLoading && !isError && categories?.length > 0) {
        content = categories?.map(cat => (
            <div key={cat._id} className="relative">
                <img src={cat.image} className="w-full" alt="" />
                <div className="absolute bottom-0 p-2 md:bottom-2 w-full text-center">
                    <Link to={`/category/${cat.title}`}>
                        <button className="bg-[#FFFFFF] w-full md:w-40 py-1 md:py-2 text-base shadow-xl hover:bg-black hover:text-white duration-300 ease-linear">{cat.title}</button>
                    </Link>
                </div>
            </div>
        ))
    }


    return (
        <div className="pb-10">

            <div className="text-center pt-6 pb-8">
                <h2 className="text-xl font-bold">SHOPPING BY CATEGORIES</h2>
                <p className="text-sm">TEEMAX STORE, ALL THE T-SHIRTS, SWEATSHIRTS, HOODIES, TANK TOPS, MUG THAT YOU COULD BE LOOKING FOR</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-0 px-2 md:px-0">
                {content}
            </div>

        </div>
    )
}

export default Categories;