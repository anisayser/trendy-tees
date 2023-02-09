import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const TopHeader = () => {
    return (
        <>
            <div className="bg-secondary py-2 hidden lg:block">
                <div className="container mx-auto text-white">
                    <div className="flex items-center justify-between">
                        <div className="top-header-icons flex space-x-2">
                            <div className="border border-gray-600 w-7 h-6 flex items-center justify-center rounded">
                                <FaFacebookF className="text-sm" />
                            </div>
                            <div className="border border-gray-600 w-7 h-6 flex items-center justify-center rounded">
                                <FaTwitter className="text-sm" />
                            </div>
                            <div className="border border-gray-600 w-7 h-6 flex items-center justify-center rounded">
                                <FaInstagram className="text-sm" />
                            </div>
                            <div className="border border-gray-600 w-7 h-6 flex items-center justify-center rounded">
                                <AiOutlineYoutube className="text-sm" />
                            </div>
                        </div>
                        <div>
                            <p className="text-base">New Offers on the coronavirus (COVID-19) This Weekend only to Get 50% Flate</p>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default TopHeader;