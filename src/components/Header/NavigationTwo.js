import React from 'react'
import { Link } from "react-router-dom";

const NavigationTwo = () => {
    return (
        <div className="border-t border-b py-3">

            <div className="container mx-auto">
                <div className="flex items-center space-x-5 justify-center font-semibold">
                    <Link to={"/"} className="text-xl">Women</Link>
                    <Link to={"/"} className="text-xl">Men</Link>
                    <Link to={"/"} className="text-xl">Youth & Baby</Link>
                    <Link to={"/"} className="text-xl">Home & Living</Link>
                    <Link to={"/"} className="text-xl">Phone Case</Link>
                    <Link to={"/"} className="text-xl">Accessories</Link>
                    <Link to={"/"} className="text-xl">Mugs</Link>
                    <Link to={"/"} className="text-xl">Contact Us</Link>
                </div>
            </div>

        </div>
    )
}

export default NavigationTwo;