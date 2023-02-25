import { Drawer } from "@mui/material";
import React, { useState } from 'react'
import { GiTireIronCross } from "react-icons/gi";
import { Link } from "react-router-dom";

const NavigationDrawer = () => {
    //NAV OPEN CONTROLLERS STARTS
    const [navOpen, setNavOpen] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setNavOpen(open);
    };
    //NAV OPEN CONTROLLERS ENDS
    return (
        <>

            {/* NAVIGATION DRAWER */}
            <Drawer
                anchor={"right"}
                open={navOpen}
                onClose={toggleDrawer("right", false)}
            >
                <div>
                    <div className="flex items-center justify-between p-3 bg-primary text-white">
                        <h4>Main Menu</h4>
                        <GiTireIronCross onClick={toggleDrawer("right", false)} />
                    </div>
                    <div className="w-[100vw] sm:w-52 py-5 flex flex-col space-y-2 divide-y">
                        <Link to={"/category"} className="px-5" onClick={toggleDrawer("right", false)}>Women</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Men</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Youth & Baby</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Home & Living</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Phone Case</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Accessories</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Mugs</Link>
                        <Link to={"/"} className="px-5" onClick={toggleDrawer("right", false)}>Contact Us</Link>
                    </div>
                </div>
            </Drawer>


        </>
    )
}

export default NavigationDrawer;