import { Avatar, Badge, Divider, Drawer, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut, FiUser } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { GiTireIronCross } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import logo from "../../trendyTees/trendy-tees-logo.png";
import logo1 from "../../trendyTees/trendy-tees-logo1.png";
import { FaAngleUp, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../features/NavToggles/NavToggle.slice";
import img from "../../trendyTees/1_260x322.jpg";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from "../../firebaseInit";
import CartDrawer from "./CartDrawer";
import { useGetCartProductsByEmailQuery } from "../../features/cart/cartApi";



const Navigation = () => {
    const dispatch = useDispatch();
    const [signOut, loading] = useSignOut(auth);
    const [user] = useAuthState(auth);

    //HIDE AND SHOW DEPENDING ON SCROLL
    const [scrollTopBtn, setScrollTopBtn] = useState(false);
    window.addEventListener("scroll", () => {
        let heightToShowBtn = 50;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToShowBtn) {
            // to limit setting state only the first time
            setScrollTopBtn(true);
        } else {
            setScrollTopBtn(false);
        }
    })

    //GOT TOP OF THE PAGE ON CLICK FUNCTION
    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }






    //NAV OPEN CONTROLLERS STARTS
    const [navOpen, setNavOpen] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setNavOpen(open);
    };
    //NAV OPEN CONTROLLERS ENDS


    //CART OPEN CONTROLLERS STARTS
    const { cartOpen, mobileSearchBox } = useSelector(state => state.navToggle);
    const toggleCartDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(openCart(open))
    };
    //CART OPEN CONTROLLERS ENDS



    // DROPDOWN MENU USER FOR DESKTOP 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // DROPDOWN MENU USER FOR DESKTOP ENDS


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
        content = categories?.map(cat => <Link key={cat._id} to={`/category/${cat.title}`}>{cat.title}</Link>)
    }



    //TOTAL CART PRODUCTS
    const { data: cartProducts } = useGetCartProductsByEmailQuery(user?.email);




    return (
        <>
            <div className="bg-primary fixed lg:static w-full z-50 lg:bg-white px-5">
                <div className="container mx-auto">
                    <div className="hidden lg:flex items-center justify-between py-4 ">
                        <div className="logo">
                            <Link to={"/"}><img src={logo} className="w-40" alt="Logo" /></Link>
                        </div>
                        <div className="w-full">
                            <div className="w-2/3 mx-auto relative rounded-full">
                                <div className="searchBox flex items-center justify-center">
                                    <input type="text" placeholder="Search..." className="p-3 h-12 border border-primary border-r-0 rounded-l-full w-full" />
                                    <button className="p-3 border border-primary h-12 rounded-r-full pr-5 border-l-0 bg-primary text-white"><GoSearch className="text-lg " /></button>
                                </div>
                                <div className="p-3 absolute w-full mx-auto z-50 bg-white hidden">{/* //SEARCH RESULT BOX  */}
                                    <div className="divide-y">
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-8">
                            {/* <div className="text-center">
                                <div className="text-center cursor-pointer">
                                    <AiOutlineLock className="mx-auto text-3xl text-slate-400" />
                                </div>
                                <p className="text-sm font-semibold">Login</p>
                            </div> */}
                            <div className="text-center">
                                <div onClick={handleClick}>
                                    <div className="text-center cursor-pointer">
                                        <FiUser className="mx-auto text-3xl text-slate-400" />
                                        <p className="text-sm font-semibold">Account</p>
                                    </div>
                                </div>

                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> {user?.email}
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <AiOutlineSetting fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    {!user?.email ?
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/login"><ListItemIcon>
                                                <FiLogOut fontSize="small" />
                                            </ListItemIcon>
                                                Login
                                            </Link>
                                        </MenuItem>
                                        :
                                        <MenuItem onClick={handleClose}>
                                            <button onClick={async () => await signOut()}>
                                                <ListItemIcon>
                                                    <FiLogOut fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </button>
                                        </MenuItem>
                                    }
                                </Menu>


                            </div>
                            <div className="text-center">
                                <div onClick={toggleCartDrawer("right", true)}>
                                    <Badge badgeContent={cartProducts?.length} color="primary">
                                        <div className="text-center cursor-pointer">
                                            <BsCart3 className="mx-auto text-3xl text-slate-400" />
                                            <p className="text-sm font-semibold">Cart</p>
                                        </div>
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE NAVIGATION */}
                    {mobileSearchBox &&
                        <div className="w-full relative">
                            <div className="w-10/12">
                                <div className="searchBox bg-primary flex lg:hidden absolute top-1 left-0 items-center justify-center w-full px-2">
                                    <input type="search" placeholder="Search..." className="p-3 h-12 border border-primary border-r-0 rounded-l-full w-full" />
                                    <button className="p-3 border border-primary h-12 rounded-r-full pr-5 border-l-0 bg-white text-primary"><GoSearch className="text-lg " /></button>
                                </div>

                                <div className="p-3 absolute mt-[58px] w-full mx-auto z-50 bg-white shadow-lg">{/* //SEARCH RESULT BOX  */}
                                    <div className="divide-y">
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center space-x-3">
                                                <img src={img} className="w-12 border p-1" alt="" />
                                                <h4>Product Title Here</h4>
                                            </div>
                                            <h4 className="text-sm md:text-lg">$3250</h4>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    }


                    <div className="flex items-center justify-between py-4 lg:hidden">
                        <div className="logo">
                            <Link to={"/"}><img src={logo1} className="w-24" alt="Logo" /></Link>
                        </div>

                        <div>
                            <FaBars onClick={toggleDrawer("right", true)} className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>



            {/* NAVIGATION TWO */}
            <div className="border-t border-b py-3 hidden lg:block">
                <div className="container mx-auto">
                    <div className="flex items-center space-x-8 justify-center text-lg ">
                        {content}
                    </div>
                </div>
            </div>


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



            {/* CART DRAWER */}
            <CartDrawer />


            {/* SCROLL TO TOP */}
            {scrollTopBtn && <div className="fixed bottom-10 right-10 z-50 border border-primary rounded-full p-1 hidden lg:block">
                <button onClick={goToTop} className="text-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white"><FaAngleUp /></button>
            </div>}

        </>
    )
}

export default Navigation;