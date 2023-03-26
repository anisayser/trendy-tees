import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

const OrderPlaced = () => {
    return (
        <div className="container px-2 lg:w-1/2 mx-auto py-10 pt-20 lg:pt-10">


            {/* CONFIRM ORDER MESSAGE */}
            <div className="flex items-center space-x-2 justify-center">
                <AiFillCheckCircle className="text-primary text-4xl" /><h1 className="text-3xl">Your order is placed</h1>
            </div>
            <div className="py-10 text-lg">
                <p>Hi,</p>
                <p>Thank you for ordering from Trendy Tees!</p>
                <p>We are excited for you to receive your order <strong># 63fdc6375d09eb737262c574</strong>  and will notify you once its on its way. If you have ordered from multiple sellers, your items will be delivered in separate packages. We hope you had a great shopping experience! You can check your order status here.</p>
            </div>


            {/* DELIVERY DETAILS */}
            <div className="flex items-center space-x-2 justify-center">
                <TbTruckDelivery className="text-primary text-4xl" /><h1 className="text-3xl">Delivery Details</h1>
            </div>
            <div className="py-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Address</th>
                                <th className="p-2 border">Phone</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border">User Name</td>
                                <td className="p-2 border">Sylhet, 42/21, Sylhet: Part II, Sylhet Bangladesh</td>
                                <td className="p-2 border">01888016177</td>
                                <td className="p-2 border">admin@gmail.com</td>
                                <td className="p-2 border">2/28/2023 3:14:43 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {/* ORDER DETAILS */}
            <div className="flex items-center space-x-2 justify-center">
                <GiNotebook className="text-primary text-4xl" /><h1 className="text-3xl">Order Details</h1>
            </div>
            <div className="py-10">
                <div className="overflow-x-auto">

                    <table className="table w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-2 border">Image</th>
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Price</th>
                                <th className="p-2 border">Quantity</th>
                                <th className="p-2 border">Price Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border">User Name</td>
                                <td className="p-2 border">Heritage Black Bay</td>
                                <td className="p-2 border">$2800</td>
                                <td className="p-2 border">3</td>
                                <td className="p-2 border">$8400</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="shadow-lg p-2 sm:p-5">
                <div className="space-y-1 border-b pb-3">
                    <div className="flex items-center justify-between">
                        <p>Subtotal</p>
                        <h4 className="">$3250</h4>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Tax</p>
                        <h4 className="">$52</h4>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Shipping</p>
                        <h4 className="">$20</h4>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Total</p>
                        <h4 className="text-2xl">$9650</h4>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default OrderPlaced;