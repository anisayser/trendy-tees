import React from 'react'
import { Outlet } from "react-router-dom";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import Footer from "../Footer/Footer";
import AllHeader from "../Header/AllHeader";

const Layout = () => {
    return (
        <>
            <AllHeader />
            <Outlet />
            <BottomNavigation />
            <Footer />

        </>
    )
}

export default Layout;