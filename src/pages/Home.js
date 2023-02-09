import React from 'react'
import Banner from "../components/Banner/Banner";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import Categories from "../components/Categories/Categories";
import EventGrid from "../components/EventGrid/EventGrid";
import Footer from "../components/Footer/Footer";
import AllHeader from "../components/Header/AllHeader";
import Navigation from "../components/Header/Navigation";
import NavigationTwo from "../components/Header/NavigationTwo";
import TopHeader from "../components/Header/TopHeader";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import ServiceGrid from "../components/ServiceGrid/ServiceGrid";

const Home = () => {
    return (
        <>
            
            
            <Banner />
            <Categories />
            <ProductGrid heading={"Recomended For You"} />
            <EventGrid />
            <ProductGrid heading={"New Arrival"} />
            <ProductGrid heading={"Best Sellers"} />
            <ProductGrid heading={"On Sale"} />
            <ServiceGrid />
            

        </>
    )
}

export default Home;