import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useGetColorsQuery } from "../../features/colors/colorsApi";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { useAddProductMutation } from "../../features/products/productsApi";




const thumbsContainer = {
    // position: "absolute",
    top: 0,
    cursor: "pointer",
    zIndex: -1,
    // filter: "blur(2px)",
    // "-webkit-filter": "blur(2px)",
    width: "100%"
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    // marginBottom: 8,
    // marginRight: 8,
    width: "100%",
    height: "auto",
    // padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: '100%',
    height: 'auto'
};



const AddProduct = () => {


    // IMAGE FILE UPLOAD CONTROLLERS START
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    alt=""
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    // IMAGE FILE UPLOAD CONTROLLERS ENDS


    //CATEGORY OPTIONS
    const { data: categories } = useGetCategoriesQuery();
    const categoryOptions = categories?.map(cat => ({ value: cat.slug, label: cat.title }));

    //COLORS OPTIONS
    const { data: allColors } = useGetColorsQuery();
    const colorsOptions = allColors?.map(color => ({ value: color.colorCode, label: color.title }));

    //TAGS OPTIONS
    const { data: allTags } = useGetTagsQuery();
    const tagsOptions = allTags?.map(tag => ({ value: tag.title, label: tag.title }));


    //PRODUCT DATA STATES
    const [title, setTitle] = useState("");
    const [cats, setCats] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [price, setPrice] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    const resetFields = () => {
        setTitle("");
        setCats([]);
        setTags([]);
        setColors([]);
        setSizes([]);
        setShortDescription("");
        setDescription("");
    }

    // console.log(cats);


    //HANDLING CREATE POST START
    const [addProduct, { isLoading, isError, error, isSuccess }] = useAddProductMutation();

    const handleCreateProduct = (e) => {
        e.preventDefault();

        if (!files[0]) {
            alert("Please Select an image for the product. it's required.");
            return
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("price", price);
        formData.append("shortDescription", shortDescription);
        formData.append("description", description);
        for (const cat of cats) {
            formData.append("categories", cat.label);
        }
        for (const tag of tags) {
            formData.append("tags", tag.value);
        }
        for (const color of colors) {
            formData.append("colors", color.value);
        }
        for (const size of sizes) {
            formData.append("sizes", size.value);
        }
        formData.append("image", files[0])

        addProduct(formData)



    }
    //HANDLING CREATE POST ENDS





    const sizeOptions = [
        { label: "SM", value: "SM" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" },
    ]

    return (
        <div className="p-5">

            <form onSubmit={handleCreateProduct}>
                <div className="grid grid-cols-10 gap-4">
                    <div className="col-span-10 lg:col-span-8">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 w-full">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" className="text-xl w-full border-b py-2" />
                            </div>
                            <div className="col-span-2 w-full">
                                <textarea type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={10} className="text-xl w-full border-b py-2" />
                            </div>

                            <div className="col-span-1 w-full">
                                <Select
                                    isMulti
                                    name="categories"
                                    value={cats}
                                    onChange={e => setCats(e)}
                                    options={categoryOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select Categories..."
                                />
                            </div>

                            <div className="col-span-1 w-full">
                                <Select
                                    isMulti
                                    name="tags"
                                    value={tags}
                                    onChange={e => setTags(e)}
                                    options={tagsOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select Tags..."
                                />
                            </div>

                            <div className="col-span-1 w-full">
                                <Select
                                    isMulti
                                    name="size"
                                    value={sizes}
                                    onChange={e => setSizes(e)}
                                    options={sizeOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select Sizes..."
                                />
                            </div>

                            <div className="col-span-1 w-full">
                                <Select
                                    isMulti
                                    name="colors"
                                    value={colors}
                                    onChange={e => setColors(e)}
                                    options={colorsOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select Colors..."
                                />
                            </div>




                            <div className="col-span-1 w-full">
                                <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="text-xl w-full border-b py-2" />
                            </div>
                            <div className="col-span-1 w-full">
                                <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="Short Description" className="text-xl w-full border-b py-2" />
                            </div>
                        </div>


                    </div>



                    <div className="col-span-10 lg:col-span-2">
                        <h2 className="text-lg pb-3">Product Image</h2>
                        <section className="text-center text-xl">
                            <div className="" {...getRootProps({ className: 'dropzone relative min-h-[150px] border-2 border-dashed p-1 pb-0 flex flex-col items-center justify-center cursor-pointer' })}>
                                <input className="h-56 border-2 border-dashed" {...getInputProps()} />
                                <div className="w-full absolute px-1">
                                    <p className="bg-black/30 text-white">Drop Product Image here</p>
                                </div>
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>
                            </div>
                        </section>

                        {/* PRODUCT GALLERY */}
                        <div className="py-5">
                            <h2>Product Gallery</h2>
                        </div>

                        <div>
                            <button type="submit" className="bg-[#002244] text-white px-5 py-2 w-full shadow-lg">Create Product</button>
                        </div>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default AddProduct;