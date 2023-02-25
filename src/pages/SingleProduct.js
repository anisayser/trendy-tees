import React, { useState } from 'react';
import Footer from "../components/Footer/Footer";
import AllHeader from "../components/Header/AllHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscTriangleRight } from "react-icons/vsc";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import { Box, CircularProgress, Rating, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ImageGallery from 'react-image-gallery';
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import img from "../trendyTees/1_260x322.jpg";
import img1 from "../trendyTees/1_4c5ad550-0588-4735-ad67-146f18eed29e_900x900.webp";
import img2 from "../trendyTees/8_68f787cb-5ac0-4024-9ad0-c9c53a957e5b_260x322.jpg";
import { BiMinus, BiPlus } from "react-icons/bi";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { BsCart3 } from "react-icons/bs";
import ProductReview from "../components/ProductReview/ProductReview";
import { useAddToTheCartMutation, useGetCartProductsByEmailQuery, useUpdateCartProductMutation } from "../features/cart/cartApi";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebaseInit";
import { useGetProductByIdQuery } from "../features/products/productsApi";

const images = [
    {
        original: img,
        thumbnail: img,
        thumbnailClass: "thumbnail-border",
    },
    {
        original: img1,
        thumbnail: img1,
    },
    {
        original: img2,
        thumbnail: img2,
    },
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const SingleProduct = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [alignment, setAlignment] = useState('left');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [colorAlignment, setcolorAlignment] = useState('left');
    const handleColorAlignment = (event, newAlignment) => {
        setcolorAlignment(newAlignment);
    };


    //GETTING THE PRODUCT
    const { data: product, isLoading: proIsLoading, isError: proIsError, error: proError } = useGetProductByIdQuery(id);

    //Decide what to render for Single Product
    let content = null;
    if (proIsLoading) {
        content = <p className="text-xl font-bold">Loading....</p>
    }
    if (!proIsLoading && proIsError) {
        content = <p className="text-xl font-bold">{proError.message}</p>
    }
    if (!proIsLoading && !proIsError && !product?.title) {
        content = <p className="text-xl font-bold">No Products found</p>
    }



    //QUANTITY CONTROLLER STARTS
    const handleQuantity = () => {
        if (quantity < 2) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1)
        }
    }
    //QUANTITY CONTROLLER ENDS


    // TAB CONTROLLERS STARTS
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // TAB CONTROLLERS ENDS



    //ADD TO CART CONTROLLER STARTS
    const navigate = useNavigate();
    const [addToTheCart, { isLoading, isError, error, isSuccess }] = useAddToTheCartMutation();
    const { data: cartProducts, isLoading: cartIsLoading, isError: cartIsError, error: cartError } = useGetCartProductsByEmailQuery(user?.email);
    const [updateCartProduct, { isLoading: updIsLoading, isError: updIsError, error: updError, isSuccess: updIsSuccess }] = useUpdateCartProductMutation();

    const existsInCart = cartProducts?.find(cartPro => cartPro.product.productId === product?._id);

    const handleAddToCart = () => {
        const newCartPro = { ...product };
        delete newCartPro._id;
        if (!user?.email) {
            navigate("/login");
        } else {
            if (existsInCart) {
                updateCartProduct({
                    id: product._id,
                    data: { ...existsInCart, product: { ...existsInCart.product, quantity: quantity, size: size, colors: color } }
                })
            } else {
                addToTheCart({
                    email: user?.email,
                    product: { ...newCartPro, productId: product._id, quantity: quantity, size: size, colors: color }
                });
            }
        }
    }
    //ADD TO CART CONTROLLER ENDS




    return (
        <>

            <div className="bg-info pt-[72px] lg:pt-5 pb-10 ">
                <div className="container 2xl:max-w-[60vw] mx-auto">
                    <div className="flex items-center space-x-2 sm:space-x-5 pb-5 px-5 text-sm overflow-x-auto">
                        <Link to={"/"}>Home</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Product</Link>
                        <p><VscTriangleRight /></p>
                        <Link to={"/"}>Product Title</Link>
                    </div>

                    {/* SINGLE PRODUCT DETAILS */}
                    {content}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="relative px-5 hidden sm:block">
                            <ImageGallery
                                renderLeftNav={(onClick, disabled) => (
                                    <FaAngleLeft className="absolute top-[45%] z-40 text-secondary text-4xl hover:text-primary cursor-pointer" onClick={onClick} disabled={disabled} />
                                )}
                                renderRightNav={(onClick, disabled) => (
                                    <FaAngleRight className="absolute right-0 top-[45%] z-40 text-secondary text-4xl hover:text-primary cursor-pointer" onClick={onClick} disabled={disabled} />
                                )}
                                thumbnailPosition="left"
                                showFullscreenButton={false}
                                showPlayButton={false}
                                slideOnThumbnailOver={true}
                                items={images}
                            />
                        </div>
                        <div className="relative px-5 sm:hidden">
                            <ImageGallery
                                renderLeftNav={(onClick, disabled) => (
                                    <FaAngleLeft className="absolute top-[45%] z-40 text-secondary text-4xl hover:text-primary cursor-pointer" onClick={onClick} disabled={disabled} />
                                )}
                                renderRightNav={(onClick, disabled) => (
                                    <FaAngleRight className="absolute right-0 top-[45%] z-40 text-secondary text-4xl hover:text-primary cursor-pointer" onClick={onClick} disabled={disabled} />
                                )}
                                // thumbnailPosition="left"
                                showFullscreenButton={false}
                                showPlayButton={false}
                                slideOnThumbnailOver={true}
                                items={images}
                            />
                        </div>

                        <div>
                            <div className="px-5 lg:px-0">
                                <div className="space-y-2">
                                    <h2 className="text-lg font-bold">{product?.title}</h2>
                                    <Rating name="size-medium" size="small" defaultValue={2} readOnly />
                                </div>
                                <div>
                                    <table className="w-full text-left text-sm">
                                        <tbody>
                                            <tr>
                                                <th className="w-36 py-2">Available</th>
                                                <td className="text-left ">{product?.status}</td>
                                            </tr>
                                            <tr>
                                                <th className="w-36 py-2">Category</th>
                                                <td className="text-left">{product?.categories}</td>
                                            </tr>
                                            <tr>
                                                <th className="w-36 py-2">Tags</th>
                                                <td className="text-left">{product?.tags}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="pt-3 pr-0 lg:pr-10">
                                    <p className="text-sm">{product?.shortDescription}</p>
                                </div>
                            </div>


                            <div className="bg-white py-3 divide-y mt-5">
                                <div>
                                    <h2 className="text-3xl text-primary font-bold px-5 pb-3">${product?.price}</h2>
                                </div>
                                <div className="p-5">
                                    <div>
                                        <h4 className="font-bold text-base pb-1">Size: {size}</h4>
                                        <ToggleButtonGroup
                                            size="small"
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleAlignment}
                                            aria-label="text alignment"
                                        >

                                            {
                                                product?.size.map(size =>
                                                    <ToggleButton key={size} value={size} aria-label={size} onClick={() => setSize(size)}>
                                                        <span className="font-bold text-sm w-8">{size}</span>
                                                    </ToggleButton>
                                                )
                                            }

                                        </ToggleButtonGroup>
                                    </div>

                                    <div className="pt-3">
                                        <h4 className="font-bold text-base pb-1">Color: {color}</h4>
                                        <ToggleButtonGroup
                                            size="small"
                                            // color="primary"
                                            value={colorAlignment}
                                            exclusive
                                            onChange={handleColorAlignment}
                                            aria-label="text alignment"
                                        >
                                            {
                                                product?.colors.map(color =>
                                                    <ToggleButton key={color.title} value={color.title} aria-label={color.title} onClick={() => setColor(color.title)}>
                                                        <span className={`font-bold text-sm w-5 h-5 `} style={{ backgroundColor: color.colorCode }}></span>
                                                    </ToggleButton>
                                                )
                                            }

                                        </ToggleButtonGroup>
                                    </div>

                                    <div className="pt-3">
                                        <h4 className="font-bold text-base pb-1">Quantity:</h4>
                                        <div className="flex items-center">
                                            <button className="text-lg p-2 border h-10" onClick={handleQuantity}><BiMinus /></button>
                                            <input type="text" className="border-t border-b p-1 w-14 h-10 text-center font-bold text-lg" value={quantity} onChange={e => setQuantity(+e.target.value)} />
                                            <button className="text-lg p-2 border h-10" onClick={() => setQuantity(quantity + 1)}><BiPlus /></button>
                                        </div>
                                    </div>

                                    <div className="pt-7">
                                        {!isLoading || !updIsLoading ? <button onClick={handleAddToCart} className="w-full relative inline-flex items-center text-center px-12 py-1 overflow-hidden text-lg font-medium text-black border-2 border-black hover:text-white group hover:bg-gray-50">
                                            <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                                <BsCart3 className="text-2xl font-bold" />
                                            </span>
                                            <span className="relative text-center mx-auto">Add to cart</span>
                                        </button>
                                            :
                                            <button className="w-full pt-2 border-2 border-black bg-black">
                                                <CircularProgress style={{ width: "20px", height: "20px" }} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>



            {/* SINGLE PRODUCT DETAILS TAB */}
            <div className="bg-white py-10">
                <div className="container  2xl:max-w-[60vw] mx-auto">

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Description" disableRipple {...a11yProps(0)} />
                            <Tab label="Review" disableRipple {...a11yProps(1)} />
                            <Tab label="Custom" disableRipple {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo excepturi suscipit corrupti nisi labore? Molestias earum nam aliquam aspernatur modi quam. Recusandae tenetur, voluptate alias hic aut temporibus corporis libero!
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProductReview />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam fuga, ratione, recusandae iusto adipisci doloremque nobis ex unde animi eveniet accusamus! Ducimus incidunt cum eius labore dolorum velit vero nihil, soluta saepe. Laboriosam pariatur nesciunt ab est, corrupti id exercitationem alias asperiores quae beatae facere labore quibusdam commodi odio dolorum ea veniam delectus, nobis doloremque! Blanditiis a quo eius eligendi nobis dicta consequatur odit. Soluta cumque iusto, temporibus odit impedit labore possimus magni, blanditiis autem eveniet reiciendis explicabo. Ex veritatis id ut quo, esse laudantium quas sequi quos? Adipisci ab iure est? Ab fugit beatae dicta esse architecto voluptatum.
                    </TabPanel>
                </div>
            </div>


            {/* RELATED PRODUCTS */}
            <div className="bg-secondary py-10">
                <div className="container  xl:max-w-[60vw] mx-auto text-white">
                    <ProductGrid heading={"Related Products"} />
                </div>
            </div>

        </>
    )
}

export default SingleProduct;