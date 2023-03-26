import React from 'react'
import Banner from "../components/Banner/Banner";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import Categories from "../components/Categories/Categories";
import EventGrid from "../components/EventGrid/EventGrid";
import Footer from "../components/Footer/Footer";
import AllHeader from "../components/Header/AllHeader";
import Navigation from "../components/Header/Navigation";
import TopHeader from "../components/Header/TopHeader";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import ServiceGrid from "../components/ServiceGrid/ServiceGrid";
import { useGetProductsQuery } from "../features/products/productsApi";

const Home = () => {


    const { data: menProducts, isLoading: menIsLoading, isError: menIsError, error: menError } = useGetProductsQuery("sort=-_id&limit=4&categories.slug=men-3355469281582");
    const { data: newProducts, isLoading: newIsLoading, isError: newIsError, error: newError } = useGetProductsQuery("sort=-_id&limit=4");
    const { data: bestSellProducts, isLoading: bestSellIsLoading, isError: bestSellIsError, error: bestSellError } = useGetProductsQuery("sort=price&limit=4");
    const { data: onSaleProducts, isLoading: onSaleIsLoading, isError: onSaleIsError, error: onSaleError } = useGetProductsQuery("sort=-price&limit=4");


    //Decide what to render for men
    let mensContent = null;
    if (menIsLoading) {
        mensContent = <p className="text-xl font-bold">Loading....</p>
    }
    if (!menIsLoading && menIsError) {
        mensContent = <p className="text-xl font-bold">{menError.message}</p>
    }
    if (!menIsLoading && !menIsError && menProducts?.length === 0) {
        mensContent = <p className="text-xl font-bold">No Products found</p>
    }
    if (!menIsLoading && !menIsError && menProducts?.length > 0) {
        mensContent = <ProductGrid heading={"Recomended For Men"} products={menProducts} />
    }

    //Decide what to render for new arrival
    let newContent = null;
    if (newIsLoading) {
        newContent = <p className="text-xl font-bold">New Arrival Loading....</p>
    }
    if (!newIsLoading && newIsError) {
        newContent = <p className="text-xl font-bold">{newError.message}</p>
    }
    if (!newIsLoading && !newIsError && newProducts?.length === 0) {
        newContent = <p className="text-xl font-bold">No New Arrival Products found</p>
    }
    if (!newIsLoading && !newIsError && newProducts?.length > 0) {
        newContent = <ProductGrid heading={"New Arrival"} products={newProducts} />
    }

    //Decide what to render for Best Sellers
    let bestSellersContent = null;
    if (bestSellIsLoading) {
        bestSellersContent = <p className="text-xl font-bold">bestSell Loading....</p>
    }
    if (!bestSellIsLoading && bestSellIsError) {
        bestSellersContent = <p className="text-xl font-bold">{bestSellError.message}</p>
    }
    if (!bestSellIsLoading && !bestSellIsError && bestSellProducts?.length === 0) {
        bestSellersContent = <p className="text-xl font-bold">No bestSell Products found</p>
    }
    if (!bestSellIsLoading && !bestSellIsError && bestSellProducts?.length > 0) {
        bestSellersContent = <ProductGrid heading={"Best Sellers"} products={bestSellProducts} />
    }

    //Decide what to render for ON Sale
    let onSaleContent = null;
    if (onSaleIsLoading) {
        onSaleContent = <p className="text-xl font-bold">onSale Loading....</p>
    }
    if (!onSaleIsLoading && onSaleIsError) {
        onSaleContent = <p className="text-xl font-bold">{onSaleError.message}</p>
    }
    if (!onSaleIsLoading && !onSaleIsError && onSaleProducts?.length === 0) {
        onSaleContent = <p className="text-xl font-bold">No onSale Products found</p>
    }
    if (!onSaleIsLoading && !onSaleIsError && onSaleProducts?.length > 0) {
        onSaleContent = <ProductGrid heading={"On Sale"} products={onSaleProducts} />
    }





    return (
        <>
            <Banner />
            <Categories />
            {mensContent}
            <EventGrid />
            {newContent}
            {bestSellersContent}
            {onSaleContent}
            <ServiceGrid />


        </>
    )
}

export default Home;