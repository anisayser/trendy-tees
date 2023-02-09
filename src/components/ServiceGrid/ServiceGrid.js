import React from 'react';
import img from "../../trendyTees/p-1_120x.webp";
import img1 from "../../trendyTees/p-2_120x.avif";
import img2 from "../../trendyTees/p-3_120x.avif";

const ServiceGrid = () => {
    return (
        <div className="py-10 px-2 md:px-2">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold uppercase">Worldwide</h2>
                        <h2 className="text-lg font-bold uppercase">DELIVERY</h2>
                        <img src={img} className="mx-auto py-3" alt="" />
                        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae repellendus repellat dolore minima nisi vero suscipit similique minus facilis eum, sit, numquam quam placeat molestiae exercitationem quibusdam est quia nam.</p>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold uppercase">FREE SHIPPING</h2>
                        <h2 className="text-lg font-bold uppercase">FROM OVER ORDER $ 250</h2>
                        <img src={img1} className="mx-auto py-3" alt="" />
                        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae repellendus repellat dolore minima nisi vero suscipit similique minus facilis eum, sit, numquam quam placeat molestiae exercitationem quibusdam est quia nam.</p>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold uppercase">MONEY BACK</h2>
                        <h2 className="text-lg font-bold uppercase">GUARANTEE</h2>
                        <img src={img2} className="mx-auto py-3" alt="" />
                        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae repellendus repellat dolore minima nisi vero suscipit similique minus facilis eum, sit, numquam quam placeat molestiae exercitationem quibusdam est quia nam.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceGrid;