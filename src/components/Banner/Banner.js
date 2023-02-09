import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import img1 from "../../trendyTees/slider-1-1_1920x.jpg";
import img2 from "../../trendyTees/slider-1-2_1920x.jpg";
import img3 from "../../trendyTees/slider-1-3spf_1920x.jpg";

const Banner = () => {
    //SLIDER CONTROLLERS
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='absolute top-[47%] right-0 z-40 text-white'
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <div className="bg-gray-400/30 w-8 h-8 md:w-12 md:h-16 flex items-center justify-center hover:bg-[#FF7038] transition-all ease-in cursor-pointer rounded-l-xl">
                    <FaAngleRight className="text-3xl text-center" />
                </div>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='absolute top-[47%] z-40 text-white'
                style={{ ...style, display: "block" }}
                onClick={onClick}
            >
                <div className="bg-gray-400/30 w-8 h-8 md:w-12 md:h-16 flex items-center justify-center hover:bg-[#FF7038] transition-all ease-in cursor-pointer rounded-r-xl">
                    <FaAngleLeft className="text-3xl text-center" />
                </div>

            </div>
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    return (
        <div className="pt-[58px] lg:pt-0">

            <Slider {...settings}>
                <div>
                    <img src={img1} alt="" />
                </div>
                <div>
                    <img src={img2} alt="" />
                </div>
                <div>
                    <img src={img3} alt="" />
                </div>

            </Slider>

        </div>
    )
}

export default Banner;