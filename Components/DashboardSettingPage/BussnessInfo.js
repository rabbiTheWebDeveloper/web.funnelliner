import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { baseTest } from "../../constant/constant";
import { headers } from "../../pages/api";

const BussnessInfo = ({ response }) => {
    const [busInfo, setBusInfo] = useState({});
    const [user, setUser] = useState({});
    const [mainImg, setMainImg] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [tfValue, setTFValue] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shopId, setShopId] = useState('');
    const [websiteTitle, setWebsiteTitle] = useState("");
    const [desc, setDesc] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handleMainImage = (e) => {
        setMainImg(e.target.files[0]);
    };


    const businessSubmit = (data) => {

        const formData = new FormData();
        if (selectedImage !== null) {
            formData.append("shop_logo", selectedImage);
        }
        formData.append("shop_name", tfValue);
        formData.append("shop_address", data.shop_address == "" || undefined ? address : data.shop_address);
        formData.append("shop_id", shopId);
        formData.append("shop_meta_title", data.shop_meta_title == "" || undefined ? websiteTitle : data.shop_meta_title);
        formData.append("shop_meta_description", data.shop_meta_description == "" || undefined ? desc : data.shop_meta_description);
        formData.append("email", data.email == "" || undefined ? email : data.email);
        formData.append("phone", data.phone == "" || undefined ? phone : data.phone);

        axios.post(baseTest + "/client/settings/business-info/update", formData, {
            headers: headers,
        })
            .then(function (response) {
                Swal.fire("Information update  Add!", response.data.msg, "success");
            })
            .catch(function (error) {
                // console.log("Bussness Info", error.response.data.msg);
                Swal.fire({
                    icon: "error",
                    title: error?.response?.data?.msg,

                });
            });
        // console.log(data);

        reset();
    };

    useEffect(() => {

        // axios
        //     .get(baseLocal + "/client/settings/business-info", {headers: headers})
        //     .then(function (response) {
        //         // handle success
        //         // let target = response.data.data;
        setBusInfo(response?.data?.data);
        setPhone(response?.data?.data.phone);
        setEmail(response?.data?.data.email);
        setTFValue(response?.data?.data?.name)
        setShopId(response?.data?.data?.shop_id)
        setAddress(response?.data?.data?.address)
        setWebsiteTitle(response?.data?.data?.shop_meta_title)
        setDesc(response?.data?.data?.shop_meta_description)


        // // })
        // .catch(function (error) {
        //     // console.log("login System", error.response.data)
        //     if (error.response.data.api_status == 401) {
        //         Cookies.remove("token");
        //         localStorage.clear("token");
        //     }

        // });
    }, [response]);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <>
            <form onSubmit={handleSubmit(businessSubmit)}>
                <div className="DashboardForm">
                    {/* Shop Info */}
                    <div className="DashboardFormItem">

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={5} md={3}>
                                <div className="left">
                                    <h5>Shop Info</h5>
                                    <p>This will be displayed on your shop profile</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={7} md={9}>
                                <div className="CustomeInput">
                                    <div className="Item">
                                        {/* <h2>{busInfo?.name}</h2> */}
                                        <label>Shop Name <span>*</span></label>
                                        <TextField
                                            {...register("shop_name")}
                                            id="outlined-basic"
                                            onChange={(newValue) => setTFValue(newValue.target.value)}
                                            value={tfValue}
                                            InputProps={{ readOnly: true, disableUnderline: true }}
                                            // defaultValue={tfValue}
                                            variant="outlined"
                                        />

                                        {/* <div className="svg">
                                            <FiEdit/>
                                        </div> */}
                                    </div>
                                    <div className="Item">
                                        <label>Phone Number <span>*</span></label>
                                        <TextField
                                            {...register("phone")}
                                            id="outlined-basic"
                                            value={phone}
                                            onChange={(newValue) => setPhone(newValue.target.value)}
                                            variant="outlined"

                                        />

                                        <div className="svg">
                                            <FiEdit />
                                        </div>
                                    </div>
                                    <div className="Item">
                                        <label>Email Address <span>*</span></label>
                                        <TextField
                                            {...register("email")}
                                            id="outlined-basic"
                                            onChange={(newValue) => setEmail(newValue.target.value)}
                                            value={email}
                                            variant="outlined"

                                        />

                                        <div className="svg">
                                            <FiEdit />
                                        </div>
                                    </div>

                                    <div className="Item">
                                        <label>Shop Address  <span>*</span></label>
                                        <TextField
                                            {...register("shop_address")}
                                            id="outlined-basic"
                                            onChange={(newValue) => setAddress(newValue.target.value)}
                                            value={address}
                                            variant="outlined"

                                        />

                                        <div className="svg">
                                            <FiEdit />
                                        </div>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>

                    </div>

                    {/* Company Logo */}
                    <div className="DashboardFormItem">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={3}>
                                <div className="left">
                                    <h5>Company Logo <span>*</span></h5>
                                    <p>This will be displayed on your shop profile</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={7} md={9}>
                                <div className="CustomeInput">
                                    <div className="Item Upload">
                                        <span>Image must be a file of type: png, jpg, jpeg</span>
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
                                                <img src={busInfo?.shop_logo?.name} alt={''} height="100px" />
                                            </Box>
                                        }
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Shop Info */}
                    <div className="DashboardFormItem">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={3}>
                                <div className="left">
                                    <h5>Shop Info</h5>
                                    <p>This will be displayed on your shop profile</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={7} md={9}>
                                <div className="CustomeInput">
                                    <div className="Item">
                                        <label>Shop ID</label>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            onChange={(newValue) => setShopId(newValue.target.value)}
                                            value={shopId}
                                            {...register("shop_id")}
                                        />

                                        {/* <div className="svg">
                                            <FiEdit/>
                                        </div> */}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Meta Description */}
                    <div className="DashboardFormItem">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={3}>
                                <div className="left">
                                    <h5>Meta Description</h5>
                                    <p>This will be displayed on your shop profile</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={7} md={9}>
                                <div className="CustomeInput">
                                    <div className="Item">
                                        <label>Website Title</label>
                                        <TextField
                                            {...register("shop_meta_title")}
                                            id="outlined-basic"
                                            onChange={(newValue) => setWebsiteTitle(newValue.target.value)}
                                            value={websiteTitle}
                                            variant="outlined"

                                        />

                                        <div className="svg">
                                            <FiEdit />
                                        </div>
                                    </div>

                                    <div className="Item">
                                        <label>Description</label>
                                        <TextField
                                            {...register("shop_meta_description")}
                                            id="outlined-basic"
                                            onChange={(newValue) => setDesc(newValue.target.value)}
                                            value={desc}
                                            variant="outlined"

                                        />




                                        {/* <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            type="text"
                                            onChange={(newValue) => setDesc(newValue.target.value)}
                                           value={desc}
                                            {...register("shop_meta_description")}
                                        /> */}

                                        <div className="svg">
                                            <FiEdit />
                                        </div>
                                    </div>

                                    <div className="Item">
                                        <Button type="submit" className="Update">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </form>
        </>
    );
};

export default BussnessInfo;
