import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiReceipt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";



const UpdateCategory = ({ id }) => {
    const [products, setProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [mainImg, setMainImg] = useState();
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [previewMainImg, setPreviewMainImg] = useState({ file: null });

    const handleMainImage = (e) => {
        setMainImg(e.target.files[0]);
        const file = e.target.files[0];
        setPreviewMainImg({ file: URL.createObjectURL(file) });
    };


    const onCategorySubmit = (data) => {

        // data._method='patch'
        const formData = new FormData();
        if (selectedImage) {
            formData.append('category_image', selectedImage);
        }
        formData.append('name', data.name);

        formData.append('_method', 'patch');


        axios.post(process.env.API_URL + "/client/categories/" + id, formData, { headers: headers }
        )

            .then(function (response) {


                // console.log(response.data.msg);
                Swal.fire(
                    'Category Update Successfully!',
                    response?.data?.msg,
                    'success'
                )

                // router.push("/sub-product");
            })
            .catch(function (error) {
                // console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',

                    footer: '<a href="">Why do I have this issue?</a>'
                })
            });
        // console.log(data);

        reset();
        setOpenSales(false);
    };


    useEffect(() => {
        axios.get(process.env.API_URL + "/client/categories/" + id, { headers: headers })
            .then(function (response) {
                let allProduct = response.data.data;
                setProducts(allProduct);


            });
    }, []);


    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);



    return (
        <div>
            <Link href='' onClick={handleOpenSales}> <FiEdit></FiEdit> </Link>
            {/* <Button className="AddNewOrder" >
        Add New Order
      </Button> */}

            <Modal
                open={openSales}
                onClose={handleCloseSales}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>

                    <div className="SalesTargetModal">
                        <div className="Header d_flex">
                            <div className="svg">
                                <BiReceipt />
                            </div>

                            <div className="text">
                                <h5>Update Your Category</h5>
                                <p>Update Your Category</p>
                            </div>
                        </div>

                        <div className="CustomeInput">
                            <form onSubmit={handleSubmit(onCategorySubmit)} >

                                <div className="Item">

                                    <label>Category Name <span>*</span></label>

                                    <TextField id="outlined-basic" label="" variant="outlined"
                                        defaultValue={products?.name}  {...register("name", { required: true })}
                                        placeholder='Category Name' />

                                </div>

                                <div className="Item Upload">
                                    <label>Category Image <span>*</span></label>
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
                                            <img src={products?.category_image?.name} alt={products?.main_image?.type} height="100px" />
                                        </Box>
                                    }
                                </div>

                                <div className="Item">
                                    <Button type='submit' className='Update'>Update</Button>
                                    <Button type='reset' onClick={handleCloseSales} className='Cancle'>Cancle</Button>
                                </div>
                            </form>

                        </div>

                    </div>

                </Box>
            </Modal>
        </div>
    );
};

export default UpdateCategory;
