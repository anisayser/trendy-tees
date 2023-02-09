import React from 'react';
import img from "../../trendyTees/bn-1-4_1920x1920.jpg"

const Categories = () => {
    return (
        <div className="pb-10">

            <div className="text-center pt-6 pb-8">
                <h2 className="text-xl font-bold">SHOPPING BY CATEGORIES</h2>
                <p className="text-sm">TEEMAX STORE, ALL THE T-SHIRTS, SWEATSHIRTS, HOODIES, TANK TOPS, MUG THAT YOU COULD BE LOOKING FOR</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-0 px-2 md:px-0">
                {
                    [...Array(6).keys()].map(cat => (
                        <div key={cat} className="relative">
                            <img src={img} className="w-full" alt="" />
                            <div className="absolute bottom-0 p-2 md:bottom-2 w-full text-center">
                                <button className="bg-[#FFFFFF] w-full md:w-40 py-1 md:py-2 text-base shadow-xl hover:bg-black hover:text-white duration-300 ease-linear">Men</button>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Categories;