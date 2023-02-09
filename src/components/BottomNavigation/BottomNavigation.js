import { Avatar, Divider, Drawer, ListItemIcon, MenuItem } from "@mui/material";
import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { FiLogOut, FiTriangle, FiUser } from "react-icons/fi";
import { GiTireIronCross } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openCart, openMobileSearch } from "../../features/NavToggles/NavToggle.slice";

const BottomNavigation = () => {

    const dispatch = useDispatch();
    const { cartOpen, mobileSearchBox } = useSelector(state => state.navToggle);

    //USER DRAWER OPEN CONTROLLERS STARTS
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const toggleUserDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setUserMenuOpen(open);
    };
    //USER DRAWER OPEN CONTROLLERS ENDS

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        < >

            <div className="w-full fixed bottom-0 p-2 bg-white z-50 border-t flex items-center justify-center space-x-8 lg:hidden">
                <div className="text-2xl">
                    <Link to={"/"}><AiOutlineHome /></Link>
                </div>
                <div className="text-2xl cursor-pointer" onClick={toggleUserDrawer("left", true)}>
                    <FiUser />
                </div>
                <div className="text-2xl cursor-pointer" onClick={() => dispatch(openCart(!cartOpen))}>
                    <BsCart3 />
                </div>
                <div className="text-2xl cursor-pointer" onClick={() => dispatch(openMobileSearch(!mobileSearchBox))}>
                    <GoSearch />
                </div>
                <div className="text-2xl cursor-pointer" onClick={goToTop}>
                    <FiTriangle />
                </div>
            </div>

            {/* USER DRAWER */}
            <Drawer
                anchor={"left"}
                open={userMenuOpen}
                onClose={toggleUserDrawer("left", false)}
            >
                <div>
                    <div className="flex items-center justify-between p-3 bg-primary text-white">
                        <h4>Main Menu</h4>
                        <GiTireIronCross onClick={toggleUserDrawer("left", false)} />
                    </div>
                    <div className="w-[100vw] sm:w-52">
                        <MenuItem onClick={toggleUserDrawer("left", false)} className="space-x-2">
                            <Avatar /> <span>Profile</span>
                        </MenuItem>
                        <MenuItem onClick={toggleUserDrawer("left", false)} className="space-x-2">
                            <Avatar /> <span>My account</span>
                        </MenuItem>
                        <Divider />

                        <MenuItem onClick={toggleUserDrawer("left", false)}>
                            <ListItemIcon>
                                <AiOutlineSetting className="text-xl" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={toggleUserDrawer("left", false)}>
                            <ListItemIcon>
                                <FiLogOut className="text-xl" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </div>
                </div>
            </Drawer>

        </>
    )
}

export default BottomNavigation;