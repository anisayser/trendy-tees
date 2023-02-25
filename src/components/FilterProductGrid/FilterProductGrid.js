import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Drawer, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Rating, Select, Slider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from 'react'
import { BiSlider } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { FaAngleDown, FaTrash } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { HiBars4, HiOutlineBars3BottomLeft, HiOutlineBars4 } from "react-icons/hi2";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/products/productsApi";
import img from "../../trendyTees/1_260x322.jpg";
import FilterProduct from "./FilterProduct";


//ACCORDION FUNCTION
function valuetext(value) {
    return `${value}`;
}

const FilterProductGrid = () => {

    const { title } = useParams();

    const [grid, setGrid] = useState("4");

    //CART OPEN CONTROLLERS STARTS
    const [filterState, setFilterState] = useState(false);
    const toggleFilterDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setFilterState(open)
    };
    //CART OPEN CONTROLLERS ENDS


    const [stockFilterAccordion, setStockFilterAccordion] = useState(true);
    const [sizeFilterAccordion, setSizeFilterAccordion] = useState(true);
    const [priceFilterAccordion, setPriceFilterAccordion] = useState(true);

    const [value, setValue] = useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // COLOR FILTER CONTROLLS
    const [color, setColor] = useState("Red");
    const [colorAlignment, setcolorAlignment] = useState('left');
    const handleColorAlignment = (event, newAlignment) => {
        setcolorAlignment(newAlignment);
    };


    // SELECT FILTER CONTROLLS
    const [selectFilter, setSelectFilter] = useState('');
    const handleSelectFilterChange = (event) => {
        setSelectFilter(event.target.value);
    };



    // STOCK, SIZE, COLOR, PRICE filters
    const dispatch = useDispatch();
    const { stockFilter, sizeFilter, colorFilter, priceFilter } = useSelector(state => state.filters);




    //FILTER PRODUCTS
    const { data: filterProducts, isLoading: filterIsLoading, isError: filterIsError, error: filterError } = useGetProductsQuery(`categories=${title}`);
    //Decide what to render for men
    let filterContent = null;
    if (filterIsLoading) {
        filterContent = <p className="text-xl font-bold">Loading....</p>
    }
    if (!filterIsLoading && filterIsError) {
        filterContent = <p className="text-xl font-bold">{filterError.message}</p>
    }
    if (!filterIsLoading && !filterIsError && filterProducts?.length === 0) {
        filterContent = <p className="text-xl font-bold">No Products found</p>
    }
    if (!filterIsLoading && !filterIsError && filterProducts?.length > 0) {
        filterContent = filterProducts?.map(product => <FilterProduct key={product._id} product={product} />)
    }


    return (
        <>
            <div className="px-2 md:px-0">
                {/* <div className="pb-8">
                        <h2 className={`text-2xl font-bold`}>{heading}</h2>
                    </div> */}
                <div className="sortingBox pt-1 pb-6">
                    <div className="flex items-center justify-between">
                        <BiSlider className="text-2xl cursor-pointer lg:hidden" onClick={toggleFilterDrawer("left", true)} />

                        <div className="w-10/12 lg:w-1/2 ml-auto flex items-center space-x-5">
                            <div className="flex items-center space-x-3">
                                <button className="text-lg text-tertiary" onClick={() => setGrid("3")}><TfiLayoutGrid3Alt className="w-5 h-5" /></button>
                                <button className="text-lg text-tertiary" onClick={() => setGrid("4")}><TfiLayoutGrid4Alt className="w-6 h-6" /></button>
                                <button className="text-lg text-tertiary" onClick={() => setGrid("2")}><TfiLayoutGrid2Alt className="w-5 h-5" /></button>
                                <button className="text-lg text-tertiary" onClick={""}><HiBars4 className="w-6 h-6" /></button>
                            </div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectFilter}
                                    label="Filter By"
                                    onChange={handleSelectFilterChange}
                                    size="small"
                                    variant="standard"
                                >
                                    <MenuItem value={10}>Featured</MenuItem>
                                    <MenuItem value={20}>Best Selling</MenuItem>
                                    <MenuItem value={30}>Alphabetically, A-Z</MenuItem>
                                    <MenuItem value={40}>Alphabetically, Z-A</MenuItem>
                                    <MenuItem value={50}>Price Low to High</MenuItem>
                                    <MenuItem value={60}>Price High to Low</MenuItem>
                                    <MenuItem value={70}>Date New to Old</MenuItem>
                                    <MenuItem value={80}>Date Old to New</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>


                    {/* FILTER DRAWER */}
                    <Drawer
                        anchor={"left"}
                        open={filterState}
                        onClose={toggleFilterDrawer("left", false)}
                    >

                        <div className="w-[100vw] sm:w-96">
                            <div className="flex items-center justify-between p-3 bg-primary text-white">
                                <h4>Filters</h4>
                                <GiTireIronCross className="cursor-pointer" onClick={toggleFilterDrawer("left", false)} />
                            </div>

                            <aside>
                                <div className="py-5 flex items-center space-x-5 px-5">
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
                                                    <FormControlLabel control={<Checkbox size="small" disableRipple defaultChecked />} label="In Stock" /> <span>10</span>
                                                </div>
                                                <div className="flex justify-between">

                                                    <FormControlLabel control={<Checkbox size="small" disableRipple />} label="Out of Stock" /> <span>5</span>
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
                                    <Accordion expanded={sizeFilterAccordion} sx={{ boxShadow: "none" }} onChange={() => setSizeFilterAccordion(!sizeFilterAccordion)}>
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
                    </Drawer>



                </div>




                <div className={`grid grid-cols-2 md:grid-cols-${grid} gap-4 md:gap-8 duration-500`}>
                    {filterContent}
                </div>


            </div>
        </>
    )
}

export default FilterProductGrid;