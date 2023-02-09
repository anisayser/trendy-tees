import React from 'react';
import img from "../../trendyTees/bn-1-7_1920x1920.webp";
import img1 from "../../trendyTees/bn-1-8_1920x1920.webp";
import img2 from "../../trendyTees/bn-1-9_1920x1920.webp";
import img3 from "../../trendyTees/bn-1-10_1920x1920.webp";

const EventGrid = () => {
    return (
        <div className="py-10">

            <div className="container mx-auto">
                <div className="pb-2 md:pb-10">
                    <img src={img} className="w-full" alt="" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 lg:gap-12">
                    <div className="relative">
                        <img src={img1} className="w-full" alt="" />
                        <div className="absolute bottom-5 w-full text-center">
                            <button className="bg-[#FFFFFF] w-40 py-2 text-base shadow-xl hover:bg-black hover:text-white duration-300 ease-linear">Cat Lovers</button>
                        </div>
                    </div>
                    <div className="relative">
                        <img src={img2} className="w-full" alt="" />
                        <div className="absolute bottom-5 w-full text-center">
                            <button className="bg-[#FFFFFF] w-40 py-2 text-base shadow-xl hover:bg-black hover:text-white duration-300 ease-linear">Special Event</button>
                        </div>
                    </div>
                    <div className="relative">
                        <img src={img3} className="w-full" alt="" />
                        <div className="absolute bottom-5 w-full text-center">
                            <button className="bg-[#FFFFFF] w-40 py-2 text-base shadow-xl hover:bg-black hover:text-white duration-300 ease-linear"> Your Babies</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventGrid;