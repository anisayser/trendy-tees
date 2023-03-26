import React, { useEffect, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import { Sidebar, Menu as NavMenu, MenuItem as NavMenuItem, SubMenu, useProSidebar, menuClasses, sidebarClasses } from 'react-pro-sidebar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaBars, FaRegListAlt } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { Avatar, Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import { IoPersonAdd } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebaseInit";


const Dashboard = () => {
    const [signOut, loading] = useSignOut(auth);

    const { collapseSidebar } = useProSidebar();
    // console.log(menuClasses);

    const [width, setWidth] = useState(window.innerWidth);
    const [collapsed, setCollapsed] = useState(false);

    const getSize = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", getSize);
        if (width < 400) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }

        return () => {
            window.removeEventListener("resize", getSize)
        }
    }, [width])


    // console.log(collapsed, width);   


    const styleMenuItem = {
        button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
                return {
                    color: disabled ? '#f5d9ff' : '#d9d9d9',
                    backgroundColor: active ? '#333' : undefined,
                    borderBottom: "1px solid #000",
                    "&:hover": {
                        backgroundColor: '#000'
                    }
                };
        },
    };


    //USER DROPDOWN CONTROLLERS
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>

            <div style={{ display: 'flex' }}>
                <Sidebar
                    defaultCollapsed={collapsed}
                    breakPoint="sm"
                    style={{ height: '100vh' }}
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: '#002244',
                        },
                    }}

                >
                    <NavMenu menuItemStyles={styleMenuItem}>
                        <NavMenuItem component={<Link to={'/dashboard'}></Link>} icon={<AiFillDashboard />}> Dashboard</NavMenuItem>
                    </NavMenu>

                    <NavMenu menuItemStyles={styleMenuItem} >
                        <SubMenu
                            rootStyles={
                                {
                                    ['.css-12vkui9 > .' + menuClasses.button]: {
                                        backgroundColor: '#002244',
                                        border: "1px solid transparent",
                                        color: '#d9d9d9',
                                        '&:hover': {
                                            backgroundColor: '#000',
                                        },
                                    },

                                    ['.' + menuClasses.subMenuContent]: {
                                        borderBottom: "1px solid #000"
                                    },
                                }
                            }
                            label="Submenu">

                            <NavMenuItem>Item One</NavMenuItem>
                            <NavMenuItem>Item Two</NavMenuItem>
                            <NavMenuItem>Item Three</NavMenuItem>
                        </SubMenu>
                    </NavMenu>
                    <NavMenu menuItemStyles={styleMenuItem} >
                        <SubMenu
                            icon={<FaRegListAlt />}
                            rootStyles={
                                {
                                    ['.css-12vkui9 > .' + menuClasses.button]: {
                                        backgroundColor: '#002244',
                                        border: "1px solid transparent",
                                        color: '#d9d9d9',
                                        '&:hover': {
                                            backgroundColor: '#000',
                                        },
                                    },

                                    ['.' + menuClasses.subMenuContent]: {
                                        borderBottom: "1px solid #000"
                                    },
                                }
                            }
                            label="Products">

                            <NavMenuItem>All Products</NavMenuItem>
                            <NavMenuItem component={<Link to={"addproduct"} />} >Add Product</NavMenuItem>
                            {/* <MenuItem>Item Three</MenuItem> */}
                        </SubMenu>
                    </NavMenu>

                    <NavMenu menuItemStyles={styleMenuItem}>
                        <NavMenuItem> Calender</NavMenuItem>
                    </NavMenu>

                    <NavMenu menuItemStyles={styleMenuItem}>
                        <NavMenuItem> Ecommerce</NavMenuItem>
                    </NavMenu>

                </Sidebar>
                <main className="w-full">
                    <div className="bg-[#002244] py-1 px-5 w-full flex justify-between items-center">
                        <div>
                            <FaBars className="text-2xl text-white cursor-pointer" onClick={() => collapseSidebar()} />
                        </div>
                        <div>
                            <Tooltip title="User Info">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>

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
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <IoPersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <Link to={"/"}>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <FiSettings fontSize="small" />
                                        </ListItemIcon>
                                        Home
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={async () => await signOut()}>
                                    <ListItemIcon>
                                        <BiLogOut fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
                    <Outlet />
                </main>
            </div >


        </div >
    )
}

export default Dashboard;