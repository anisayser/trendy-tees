import React from 'react'
import { BiPhoneCall } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import img from "../../trendyTees/payment_240x25.webp";

const Footer = () => {
    return (
        <div className="pt-10 pb-10 lg:pb-0">


            {/* FOOTER PART ONE CONTACTS */}
            <div className="bg-white py-3 border-t px-2 md:px-2">
                <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <div className="">
                            <BiPhoneCall />
                        </div>
                        <h4>Call Us: (+612) 2531 5600</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="">
                            <TfiEmail />
                        </div>
                        <h4>Email : teemax@domain.com</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="">
                            <IoLocationOutline />
                        </div>
                        <h4>Address : PO Box 1622 Vissaosang Street West</h4>
                    </div>
                </div>
            </div>

            {/* FOOTER PART TWO */}
            <div className="bg-info py-16 px-2 md:px-2">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-base font-semibold pb-3">CUSTOMER SERVICE</h4>
                            <div className="flex flex-col">
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Contact us</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Help and advice</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Shipping & Returns</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Terms and conditions</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Refund Policy</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold pb-3">INFORMATION</h4>
                            <div className="flex flex-col">
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Testimonials</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">My Account</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Payments & Returns</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">View Catalogues Online</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Contact us</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold pb-3">ABOUT US</h4>
                            <div className="flex flex-col">
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Who We Are ?</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Corporate Responsibility</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">California Laws</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Careers</Link>
                                <Link to={"/"} className="w-full border-b border-gray-300 py-3 text-sm">Privacy Policy</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold pb-3">NEWSLETTER</h4>
                            <p className="text-sm">Sign up for newsletter to receive special offers and exclusive news about TEE products</p>
                            <div className="py-5">
                                <input type="email" placeholder="ENTER YOUR EMAIL" className="p-2 border text-center w-full" />
                                <button className="bg-primary w-full py-2 text-base shadow-xl text-white mt-2">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER PART TWO */}
            <div className="bg-white px-2 md:px-2">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-3 text-center">
                    <h4 className="text-base">Copyright © 2023 Anis Ayser. All rights reserved.</h4>
                    <img src={img} alt="" />
                </div>
            </div>


        </div>
    )
}

export default Footer;