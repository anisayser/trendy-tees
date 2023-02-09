import { Rating } from "@mui/material";
import React, { useState } from 'react'

const ProductReview = () => {

    const [reviewForm, setReviewForm] = useState(false);

    return (
        <div>

            <div className="">
                <div>
                    <div className="flex items-end justify-between border-b pb-5">
                        <div>
                            <h4 className="text-lg sm:text-xl lg:text-3xl">Customer Reviews</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-xs">
                                <Rating name="" size="" defaultValue={3} readOnly /> <span className="">Based on 1 review</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setReviewForm(!reviewForm)} className="text-primary">Write a review</button>
                        </div>
                    </div>

                    {reviewForm && <div className="reviewForm py-5">
                        <h4>Write a review</h4>
                        <form action="">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name">Name *</label>
                                    <input id="name" type="text" placeholder="Your Name" className="p-2 border w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="email">Email *</label>
                                    <input id="email" type="email" placeholder="Your Email" className="p-2 border w-full" required />
                                </div>
                                <div className="flex flex-col">
                                    <label>Rating *</label>
                                    <Rating name="rating" size="" defaultValue={3} />
                                </div>
                                <div>
                                    <label htmlFor="review">Your Review</label>
                                    <textarea name="review" id="review" className="p-2 border w-full" required rows={5} placeholder="Write Your Review"></textarea>
                                </div>
                                <div className="text-right">
                                    <button className="py-2 px-5 bg-black hover:bg-primary text-white duration-300 ease-linear">Submit Review</button>
                                </div>
                            </div>
                        </form>
                    </div>}

                    <div className="reviews">
                        <div className="divide-y">
                            <div className="py-3">
                                <Rating name="size-medium" size="small" defaultValue={3} readOnly />
                                <div className="space-y-2">

                                    <div>
                                        <h4 className="md:text-xl">Reviewer Name</h4>
                                        <h6 className="text-tertiary text-sm">on 26 Aug, 2023</h6>
                                    </div>
                                    <p className="text-tertiary text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim voluptas corrupti velit fugit earum optio repellat cupiditate, impedit architecto, magnam delectus adipisci accusantium quis porro reprehenderit id mollitia ad tenetur.</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductReview;