import { Rating } from "@mui/material";
import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useAddReviewMutation, useGetReviewsByProIdQuery } from "../../features/reviews/reviewsApi";
import auth from "../../firebaseInit";
import moment from "moment";

const ProductReview = ({ productId }) => {

    const [user] = useAuthState(auth);
    const [reviewForm, setReviewForm] = useState(false);
    const [theReview, setTheReview] = useState({});

    const handleOnBlur = (e) => {
        const fields = e.target.name;
        const value = e.target.value;
        const newReview = { ...theReview };
        newReview[fields] = value;
        setTheReview(newReview);
    }
    // console.log(theReview)


    // CREATING REVIEW START ********************
    const [addReview, { isLoading, isError, error, isSuccess }] = useAddReviewMutation();
    const handleAddReview = (e) => {
        e.preventDefault();

        if (user?.email) {
            addReview({
                ...theReview,
                productId,
                email: user.email
            });
        } else {
            addReview({
                ...theReview,
                productId,
            });
        }
    }
    // CREATING REVIEW END************************


    const { data: reviews, isLoading: revIsLoading, isError: revIsError, error: revError } = useGetReviewsByProIdQuery(productId);

    //Decide what to render for Reviews
    let content = null;
    if (revIsLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!revIsLoading && revIsError) {
        content = <p className="text-xl font-bold">{revError.message}</p>
    }
    if (!revIsLoading && !revIsError && reviews?.length === 0) {
        content = <p className="text-xl font-bold">No Reviews</p>
    }
    if (!revIsLoading && !revIsError && reviews?.length > 0) {
        content = reviews?.map(review => (
            <div key={review._id} className="py-3">
                <Rating name="size-medium" size="small" defaultValue={review.rating} readOnly />
                <div className="space-y-2 -mt-1">
                    <div>
                        <h4 className="md:text-xl">{review.reviewerName}</h4>
                        <h6 className="text-tertiary text-sm">on {moment(review.createdAt).format("ll")}</h6>
                    </div>
                    <p className="text-tertiary text-sm md:text-base">{review.review}</p>
                </div>
            </div>
        ))
    }



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
                        <h4 className="text-lg font-bold">Write a review</h4>
                        <form onSubmit={handleAddReview}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name">Name *</label>
                                    <input id="name" name="reviewerName" onBlur={handleOnBlur} type="text" placeholder="Your Name" className="p-2 border w-full" required />
                                </div>
                                <div>
                                    <label htmlFor="email">Email *</label>
                                    <input id="email" name="email" onBlur={handleOnBlur} type="email" placeholder="Your Email" className="p-2 border w-full" required />
                                </div>
                                <div className="flex flex-col">
                                    <label>Rating *</label>
                                    <Rating name="rating" onBlur={handleOnBlur} size="large" defaultValue={0} required />
                                </div>
                                <div>
                                    <label htmlFor="review">Your Review</label>
                                    <textarea name="review" onBlur={handleOnBlur} id="review" className="p-2 border w-full" required rows={5} placeholder="Write Your Review"></textarea>
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="py-2 px-5 bg-black hover:bg-primary text-white duration-300 ease-linear">Submit Review</button>
                                </div>
                            </div>
                        </form>
                    </div>}

                    <div className="reviews">
                        <div className="divide-y">

                            {content}

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductReview;