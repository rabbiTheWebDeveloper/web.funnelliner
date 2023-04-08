import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiReceipt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";


const ProductUpdate = ({ id, category }) => {

    // Tabs
    const [value, setValue] = useState("1");
    // product add full funcation

    const [tabSelect, setTabSelect] = useState("1");
    const [mainImg, setMainImg] = useState();
    const [products, setProducts] = useState({});
    const [delivery, setDelivery] = useState("Free Delivery Charge")
    const [insideDhaka, setInsideDhaka] = useState("")
    const [outDhaka, setOutDhaka] = useState("")


    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);

    const { main_image } = products

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(process.env.API_URL + "/client/products/" + id, { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
                setDelivery(response.data.data.delivery_charge)
            });
    }, [id]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewMainImg, setPreviewMainImg] = useState({ file: null });
    const handleMainImage = (e) => {
        setMainImg(e.target.files[0]);
        const file = e.target.files[0];
        setPreviewMainImg({ file: URL.createObjectURL(file) });
    }
    const onSubmit = (data) => {
        data.size = "XL";
        data.color = "white";
        data.short_description = "IT was good and I like it";
        data.meta_tag = "buy";
        data.meta_description = "IT was good and I like it";
        data.status = "1";
        data.discount = "0"
        data._method = "patch"
        if (delivery === "paid") {
            data.delivery_charge = 'paid'
            data.inside_dhaka = insideDhaka
            data.outside_dhaka = outDhaka
        }
        else if (delivery === "free") {
            data.delivery_charge = 'free'
        }
        // data.cv = cv;
        const formData = new FormData();
        if (selectedImage) {
            formData.append("main_image", selectedImage);
        }
        formData.append("category_id", data.category_id);
        formData.append("product_name", data.product_name);
        formData.append("price", data.price);
        formData.append("discount", data.discount);
        formData.append("size", data.size);
        formData.append("color", data.color);
        formData.append("product_code", data.product_code);
        formData.append("product_qty", data.product_qty);
        formData.append("short_description", data.short_description);
        if (data.long_description !== undefined) {
            formData.append("long_description", data.long_description);
        }
        formData.append("meta_tag", data.meta_tag);
        formData.append("meta_description", data.meta_description);
        formData.append("status", data.status);
        formData.append("inside_dhaka", products.inside_dhaka);
        formData.append("outside_dhaka", products.outside_dhaka);
        formData.append("delivery_charge", products.delivery_charge);
        formData.append("_method", data._method);
        if (delivery === "free") {
            formData.append("delivery_charge", "free")
        }
        if (delivery === "paid") {
            formData.append("delivery_charge", "paid")
            formData.append("inside_dhaka", data.inside_dhaka);
            formData.append("outside_dhaka", data.outside_dhaka);
        }




        // console.log(formData);
        axios.post(process.env.API_URL + "/client/products/" + id, formData, { headers: headers })
            .then(function (response) {
                if (response?.status === 200) {
                    Swal.fire({
                        icon: "success",
                        // title: "Oops...",
                        text: "Product Update success",
                    });
                    router.push("/product");
                }

            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    // title: "Oops...",
                    text: "Something went wrong",
                });
            });
        // console.log(data);

        reset();
        setOpenSales(false)
    };
    ;

    const [imageUrl, setImageUrl] = useState(main_image?.name);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);
    console.log(products)


    return (
        <div>
            <div onClick={handleOpenSales}> <FiEdit></FiEdit> </div>

            <Modal
                open={openSales}
                onClose={handleCloseSales}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="SalesTargetModal">
                            <div className="Header d_flex">
                                <div className="svg">
                                    <BiReceipt />
                                </div>

                                <div className="text">
                                    <h5>Products Update</h5>
                                    <p>Shop Products Update </p>
                                </div>
                            </div>

                            <div className="Form">
                                <div className="CustomeInput">
                                    <label>Product Name <span>*</span></label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={products?.product_name}
                                        {...register("product_name", { required: true })}

                                    />
                                    {errors.product_name && (
                                        <span>This Product Name required</span>
                                    )}
                                </div>

                                <div className="CustomeInput">
                                    <label>Selling Price <span>*</span></label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={products?.price}
                                        {...register("price")}
                                    />
                                    {errors.price && (
                                        <span>Enter selling price here</span>
                                    )}
                                </div>

                                <div className="CustomeInput">
                                    <label>Product Code <span>*</span></label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={products?.product_code}
                                        {...register("product_code")}

                                    />
                                    {errors.product_code && (
                                        <span>This Product Name required</span>
                                    )}
                                </div>

                                <div className="CustomeInput">
                                    <label>Available Quantity <span>*</span></label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        InputProps={{ readOnly: true, disableUnderline: true }}
                                        {...register("product_qty", { required: true })}
                                        defaultValue={products?.product_qty}
                                    />
                                    {errors.product_qty && (
                                        <span>This Product Name required</span>
                                    )}
                                </div>

                                <div className="CustomeInput">
                                    <label>Category Name <span>*</span></label>

                                    <select
                                        {...register("category_id")}
                                    >
                                        {Array.isArray(category)
                                            ? category.map((data) => {
                                                return (
                                                    <option
                                                        key={data?.id}
                                                        value={data?.id}
                                                    >
                                                        {data?.name}
                                                    </option>
                                                );
                                            })
                                            : null}
                                    </select>

                                </div>

                                {/* DelivaryCharge */}
                                <div className="TopSellingProducts">

                                    <div className="DashboardForm">

                                        <div className="DelivaryCharge">

                                            <div className="Item">

                                                <label> Delivery Charge <span>*</span></label>

                                                <select defaultValue={ delivery !== "paid"? "free" : "paid"} name="" onChange={(e) => {
                                                    setDelivery(e.target.value);
                                                }}>
                                                    <option value="free" >Free Delivery Charge</option>
                                                    <option value="paid">Paid Delivery Charge</option>
                                                </select>

                                            </div>

                                            {delivery === "paid" && <div className="Item">

                                                <div className="DelivaryItem d_flex d_justify">

                                                    <TextField
                                                        onChange={(e) => setInsideDhaka(e.target.value)}
                                                        defaultValue={products?.inside_dhaka}
                                                        id="outlined-basic"
                                                        label="Delivery Charge in Dhaka"
                                                        variant="outlined"
                                                    />

                                                    <TextField
                                                        onChange={(e) => setOutDhaka(e.target.value)}
                                                        defaultValue={products?.outside_dhaka}
                                                        id="outlined-basic"
                                                        label="Delivery Charge out of Dhaka"
                                                        variant="outlined"
                                                    />

                                                </div>

                                            </div>}



                                        </div>

                                    </div>




                                </div>

                                <div className="CustomeInput">



                                    <div className="Item Upload">
                                        <label>Product  Image <span>*</span></label>
                                        <p>Image must be a file of type: <span>png, jpg, jpeg</span></p>

                                        <input
                                            accept="image/*"
                                            type="file"
                                            id="select-image"
                                            style={{ display: "none" }}
                                            onChange={(e) => setSelectedImage(e.target.files[0])}
                                        />
                                        <label htmlFor="select-image">
                                            <Button variant="contained" color="primary" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                        {imageUrl && selectedImage && (
                                            <Box mt={2} textAlign="center">
                                                <div>Image Preview:</div>
                                                <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                            </Box>
                                        )}


                                        {
                                            imageUrl && selectedImage ? "" : <Box mt={2} textAlign="center">
                                                <div>Image Preview:</div>
                                                <img src={products?.main_image?.name} alt={products?.main_image?.type} height="100px" />
                                            </Box>
                                        }
                                    </div>



                                </div>





                                <div className="CustomeInput">
                                    <div className="DuelButton">
                                        <Button type="submit">Update</Button>
                                        <Button type="reset" onClick={handleCloseSales} className="Delete">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductUpdate;


