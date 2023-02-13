import React, { useState } from 'react';
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



//ACCORDION FUNCTION
function valuetext(value) {
    return `${value}`;
}

const FilterProducts = () => {

    const [stockFilter, setStockFilter] = useState(true);
    const [sizeFilter, setSizeFilter] = useState(true);
    const [priceFilter, setPriceFilter] = useState(true);

    const [value, setValue] = React.useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // COLOR FILTER CONTROLLS
    const [color, setColor] = useState("Red");
    const [colorAlignment, setcolorAlignment] = React.useState('left');
    const handleColorAlignment = (event, newAlignment) => {
        setcolorAlignment(newAlignment);
    };

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
                                <Accordion expanded={stockFilter} sx={{ boxShadow: "none" }} onChange={() => setStockFilter(!stockFilter)}>
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
                                                <FormControlLabel control={<Checkbox size="small" disableRipple defaultChecked />} label="In Stock" /> <span>10</span>
                                            </div>
                                            <div className="flex justify-between">

                                                <FormControlLabel control={<Checkbox size="small" disableRipple />} label="Out of Stock" /> <span>5</span>
                                            </div>
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* SIZE FILTER */}
                                <Accordion expanded={sizeFilter} sx={{ boxShadow: "none" }} onChange={() => setSizeFilter(!sizeFilter)}>
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
                                                <FormControlLabel control={<Checkbox size="small" disableRipple defaultChecked />} label="M" /> <span>10</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple />} label="L" /> <span>5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple />} label="XL" /> <span>5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <FormControlLabel control={<Checkbox size="small" disableRipple />} label="XXL" /> <span>5</span>
                                            </div>
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* COLOR FILTER */}
                                <Accordion expanded={sizeFilter} sx={{ boxShadow: "none" }} onChange={() => setSizeFilter(!sizeFilter)}>
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
                                            exclusive
                                            onChange={handleColorAlignment}
                                            aria-label="text alignment"
                                        >
                                            <ToggleButton value="red" aria-label="left aligned" onClick={() => setColor("Red")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-red-700"></span>
                                            </ToggleButton>
                                            <ToggleButton value="green" aria-label="centered" onClick={() => setColor("Green")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-green-700"></span>

                                            </ToggleButton>
                                            <ToggleButton value="blue" aria-label="right aligned" onClick={() => setColor("Blue")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-blue-700"></span>

                                            </ToggleButton>
                                            <ToggleButton value="black" aria-label="justified" onClick={() => setColor("Black")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-black"></span>
                                            </ToggleButton>
                                            <ToggleButton value="white" aria-label="justified" onClick={() => setColor("White")}>
                                                <span className="font-bold text-sm w-5 h-5 bg-white"></span>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </AccordionDetails>
                                </Accordion>

                                {/* PRICE FILTER */}
                                <Accordion expanded={priceFilter} sx={{ boxShadow: "none" }} onChange={() => setPriceFilter(!priceFilter)}>
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
                                            value={value}
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