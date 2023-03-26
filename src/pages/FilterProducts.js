import React, { useEffect, useState } from 'react';
import { BiSlider } from "react-icons/bi";
import { FaAngleDown, FaTrash } from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import FilterProductGrid from "../components/FilterProductGrid/FilterProductGrid";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Checkbox, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { filterByColor, filterBySize, filterByStock, removeSizeFilter, removeStockFilter, filterByPriceStart, filterByPriceEnd } from "../features/filters/filtersSlice";



//ACCORDION FUNCTION
function valuetext(value) {
    return `${value}`;
}

const FilterProducts = () => {

    const [stockFilterAccordion, setStockFilterAccordion] = useState(true);
    const [sizeFilterAccordion, setSizeFilterAccordion] = useState(true);
    const [colorFilterAccordion, setColorFilterAccordion] = useState(true);
    const [priceFilterAccordion, setPriceFilterAccordion] = useState(true);

    const [priceValues, setPriceValues] = React.useState([5, 200]);
    const handleChange = (event, newValue) => {
        setPriceValues(newValue);
    };


    // COLOR FILTER CONTROLLS
    const [color, setColor] = useState("Red");
    const [colorAlignment, setcolorAlignment] = React.useState(() => []);
    const handleColorAlignment = (event, newFormats) => {
        setcolorAlignment(newFormats);
    };
    // console.log(colorAlignment);


    // STOCK, SIZE, COLOR, PRICE filters || FILTER STATES
    const dispatch = useDispatch();
    const { stockFilter, sizeFilter, colorFilter } = useSelector(state => state.filters);
    // console.log(colorFilter);

    //STOCK FILTER STARTS/******************* */
    const [inStock, setInStock] = useState(false);
    const [outStock, setOutStock] = useState(false);
    const handleInStockFilter = (e) => {
        setInStock(e.target.checked);
    }
    const handleOutStockFilter = (e) => {
        setOutStock(e.target.checked);
    }
    useEffect(() => {
        if (inStock) {
            if (!stockFilter.includes("in-stock")) {
                dispatch(filterByStock("in-stock"))
            }
        } else if (!inStock) {
            if (stockFilter.includes("in-stock")) {
                dispatch(removeStockFilter("in-stock"))
            }
        }
        if (outStock) {
            if (!stockFilter.includes("out-of-stock")) {
                dispatch(filterByStock("out-of-stock"))
            }
        } else if (!outStock) {
            if (stockFilter.includes("out-of-stock")) {
                dispatch(removeStockFilter("out-of-stock"))
            }
        }
    }, [inStock, outStock, stockFilter, dispatch]);
    //STOCK FILTER ENDS/******************* **********************/

    //SIZE FILTER STARTS/******************* */
    const handleSizeFilter = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            dispatch(filterBySize(value))
        } else {
            dispatch(removeSizeFilter(value))
        }
    }
    //SIZE FILTER ENDS/******************* ***********************/

    //COLOR FILTER STARTS/******************* */
    useEffect(() => {
        dispatch(filterByColor([...colorAlignment]))
    }, [colorAlignment, dispatch])
    //COLOR FILTER ENDS/******************* ***********************/

    //PRICE FILTER STARTS/******************* */
    useEffect(() => {
        dispatch(filterByPriceStart(priceValues[0]));
        dispatch(filterByPriceEnd(priceValues[1]));
    }, [priceValues, dispatch]);
    //PRICE FILTER ENDS/******************* ***********************/






    // console.log(priceValues);





    return (
        <div className="pt-[58px] lg:pt-0">

            <div className="bg-info py-5">
                <div className="container mx-auto">
                    <div className="flex items-center px-5 md:px-0 space-x-5 text-sm">
                        <Link to={"/"}>Home</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Category</Link>
                        {/* <p><VscTriangleRight /></p>
                        <Link to={"/"}>Product Title</Link> */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-10">
                <div className="flex items-start lg:space-x-10">

                    <div className="w-[30%] hidden lg:block">
                        <aside>

                            <div className="flex items-center space-x-2 pb-5 border-b">
                                <BiSlider className="text-xl" />
                                <h2 className="text-lg lg:text-2xl">Filter By</h2>
                            </div>

                            <div className="py-5 flex items-center space-x-5">
                                <button className="flex items-center space-x-1 text-lg"><FaTrash /><span>Clear Filters</span></button>
                            </div>

                            <div>
                                {/* STOCK FILTER */}
                                <Accordion expanded={stockFilterAccordion} sx={{ boxShadow: "none" }} onChange={() => setStockFilterAccordion(!stockFilterAccordion)}>
                                    <AccordionSummary
                                        expandIcon={<FaAngleDown className="text-black" />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <div className="text-lg font-semibold flex items-center space-x-2">
                                            <HiOutlineBars3BottomLeft className="text-black" /><span>Availability</span>
                                        </div>
                                        {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" value="in-stock" disableRipple onChange={handleInStockFilter} />} label="In Stock" /> <span>10</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" value="out-of-stock" onChange={handleOutStockFilter} disableRipple />} label="Out of Stock" /> <span>5</span>
                                            </div>
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* SIZE FILTER */}
                                <Accordion expanded={sizeFilterAccordion} sx={{ boxShadow: "none" }} onChange={() => setSizeFilterAccordion(!sizeFilterAccordion)}>
                                    <AccordionSummary
                                        expandIcon={<FaAngleDown className="text-black" />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <div className="text-lg font-semibold flex items-center space-x-2">
                                            <HiOutlineBars3BottomLeft className="text-black" /><span>Size</span>
                                        </div>
                                        {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple value={"M"} onChange={handleSizeFilter} />} label="M" /> <span>10</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple value={"L"} onChange={handleSizeFilter} />} label="L" /> <span>5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple value={"XL"} onChange={handleSizeFilter} />} label="XL" /> <span>5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple value={"XXL"} onChange={handleSizeFilter} />} label="XXL" /> <span>5</span>
                                            </div>
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* COLOR FILTER */}
                                <Accordion expanded={colorFilterAccordion} sx={{ boxShadow: "none" }} onChange={() => setColorFilterAccordion(!colorFilterAccordion)}>
                                    <AccordionSummary
                                        expandIcon={<FaAngleDown className="text-black" />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <div className="text-lg font-semibold flex items-center space-x-2">
                                            <HiOutlineBars3BottomLeft className="text-black" /><span>Color</span>
                                        </div>
                                        {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ToggleButtonGroup
                                            size="small"
                                            // color="primary"
                                            value={colorAlignment}
                                            // exclusive
                                            onChange={handleColorAlignment}
                                            aria-label="text formatting"
                                        >
                                            <ToggleButton value="red" aria-label="red" onClick={() => setColor("Red")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-red-700"></span>
                                            </ToggleButton>
                                            <ToggleButton value="green" aria-label="green" onClick={() => setColor("Green")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-green-700"></span>

                                            </ToggleButton>
                                            <ToggleButton value="blue" aria-label="blue" onClick={() => setColor("Blue")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-blue-700"></span>

                                            </ToggleButton>
                                            <ToggleButton value="black" aria-label="black" onClick={() => setColor("Black")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-black"></span>
                                            </ToggleButton>
                                            <ToggleButton value="white" aria-label="white" onClick={() => setColor("White")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-white"></span>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* PRICE FILTER */}
                                <Accordion expanded={priceFilterAccordion} sx={{ boxShadow: "none" }} onChange={() => setPriceFilterAccordion(!priceFilterAccordion)}>
                                    <AccordionSummary
                                        expandIcon={<FaAngleDown className="text-black" />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <div className="text-lg font-semibold flex items-center space-x-2">
                                            <HiOutlineBars3BottomLeft className="text-black" /><span>Price</span>
                                        </div>
                                        {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Slider
                                            getAriaLabel={() => 'Price range'}
                                            max={500}
                                            value={priceValues}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                        />
                                    </AccordionDetails>
                                </Accordion>

                            </div>


                        </aside>
                    </div>

                    <div className="w-full lg:w-[70%]">

                        <FilterProductGrid />

                    </div>
                </div>
            </div>


        </div>
    )
}

export default FilterProducts;