import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Grid, Tab, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getWebsiteSettings, headers, shopId } from "../../pages/api";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { GiWorld } from "react-icons/gi";
import CustomDomain from "./CustomDomain";
import FacebookPixel from "./FacebookPixel";

const WebsiteSettingPage = ({ response }) => {
    const router = useRouter()
    // Tabs
    const [value, setValue] = useState("1");
    useEffect(() => {
        setValue(router?.query?.domain ? router?.query?.domain : '1')
    }, [])
    // domain
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const [value2, setValue2] = useState("one");
    const handleChangeTab2 = (event, newValue) => {
        setValue2(newValue);
    };
    // Togol Switch
    const label = { inputProps: { "aria-label": "Switch demo" } };
    // ViewPreview
    const [openPreview, setOpenPreview] = useState(false);
    const handlePreview = () => setOpenPreview(true);
    const previewClose = () => setOpenPreview(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [favIcon, setFavicon] = useState(null);



    // DropDown Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const [checked, setChecked] = useState(true);
    const [invoice, setInvoice] = useState(1);
    const [customDomain, setCustomDomain] = useState("");
    const [websiteSettingsData, setWebsiteSettingData] = useState({});
    const [advancePaymnet, setAdvancePayment] = useState(false);


    useEffect(() => {
        getWebsiteSettings()
            .then((result) => {
                setWebsiteSettingData(result?.data?.data);
                setInvoice(result?.data?.data?.invoice_id);
            })
            .catch(function (error) {
                if (error.response.data.api_status === "401") {
                    window.location.href = "/login";
                    Cookies.remove("token");
                    localStorage.clear("token");
                    Cookies.remove("user");
                    localStorage.clear("user");
                    window.location.href = "/login";
                }
            });
    }, []);



    const handleInvoice = (e) => {
        setInvoice(e.target.value);
        axios
            .post(
                `${process.env.API_URL}/client/settings/website/update`,
                {
                    invoice_id: e.target.value,
                    custom_domain: "customDomain",
                    cash_on_delivery: checked === true ? "1" : "0",
                },
                {
                    headers: headers,
                }
            )
            .then(function (response) {
                Swal.fire("Setting", `Active invoice ${e.target.value}`);
            })
            .catch(function (error) {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.msg,
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });
    };

    const handleCustomDomain = (e) => {
        setCustomDomain(e.target.value);
    };
    const handleUpdateDomain = () => {
        handleUpdateWebsiteSetting(checked, customDomain).then((result) => {
        });
    };

    const handleChangeFavIcon = (e) => {
        console.log("e", e.target.files[0])
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onErrors = (e) => {

    };

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append("shop_name", data.shopName);
        formData.append("shop_address", data.shopAddress);
        if (selectedImage !== null) {
            formData.append("shop_logo", selectedImage);
        }
        if (favIcon !== null) {
            formData.append("shop_favicon", favIcon);
        }
        formData.append("shop_id", shopId);
        formData.append("shop_meta_title", data.websiteTitle);
        formData.append("shop_meta_description", data.description);
        formData.append("email", data.email);
        formData.append("phone", data.phone);

        axios
            .post(`${process.env.API_URL}/client/settings/business-info/update`, formData, {
                headers: headers,
            })
            .then(function (response) {
                Swal.fire("Setting", response.data.msg, "success");
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    // title: "Oops...",
                    text: "Something went wrong !",
                    // footer: '<a href="">Why do I have this issue?</a>',
                });
            });
    };

    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [faviconPreview, setFaviconPreview] = useState(null);


    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
        if (favIcon) {
            setFaviconPreview(URL.createObjectURL(favIcon));
        }
    }, [selectedImage, favIcon]);


    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/settings/advance-payment/status", { headers: headers })
            .then(function (response) {
                if (response.status === 200) {
                    setAdvancePayment(response.data.data.advanced_payment);
                }
            }).catch((err) => {
                return err
            })
    }, [])

    //advance payment update by trigger
    const handleSwitchAdvancePayment = (event) => {
        setAdvancePayment(event.target.checked);
        axios
            .post(
                `${process.env.API_URL}/client/settings/advance-payment/status/update`,
                { status: event.target.checked ? "1" : "0" },

                {
                    headers: headers,
                }
            )
            .then(function (response) {
                Swal.fire(
                    "Setting",
                    event.target.checked
                        ? "Advance payment  enable"
                        : "Advance payment Disable "
                );
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong",
                });
            });
    };

    return (
        <>
            <section className="TopSellingProducts DashboardSetting WebsiteSettingPage">
                <Container maxWidth="sm">
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className="Header d_flex d_justify">
                                {/* Left */}
                                <div className="Left d_flex">
                                    <div className="svg">
                                        <GiWorld />
                                    </div>

                                    <div className="text">
                                        <h4>Website Settings</h4>
                                        <p>Update your shop info and other settings here</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    {/* DashboardSettingTabs */}
                    <div className="DashboardSettingTabs WebsiteSettingPage">
                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList
                                        onChange={handleChangeTab}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Payment Method" value="1" />
                                        <Tab label="Invoice Format" value="2" />
                                        <Tab label="Custom Domain" value="3" />
                                        <Tab label="Business Info" value="4" />
                                        <Tab label="Facebook Pixel" value="5" />
                                    </TabList>
                                </Box>

                                {/* Business Information */}
                                <TabPanel value="1">
                                    <div className="WebsiteSettingCashOnDelivary d_flex d_justify">
                                        <div className="left d_flex">
                                            <div className="img">
                                                <img src="images/cashon.svg" alt="" />
                                            </div>
                                            <h4>Enable Cash On Delivery</h4>
                                        </div>

                                        <div className="right">
                                            <div>
                                                <Switch
                                                    checked
                                                // onChange={switchHandler}
                                                // {...label}
                                                // defaultChecked={checked}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="WebsiteSettingCashOnDelivary d_flex d_justify">
                                        <div className="left d_flex">
                                            <div className="img last">
                                                <img src="/images/money.png" alt="" />
                                            </div>
                                            <h4>Enable Advance Payment</h4>
                                        </div>

                                        <div className="right">
                                            <div>
                                                <Switch
                                                    checked={advancePaymnet}
                                                    onChange={handleSwitchAdvancePayment}
                                                    color="primary"
                                                    name="mySwitch"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                {/* Invoice Format */}
                                <TabPanel value="2">
                                    <div className="InvoiceFormate">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
                                                <div className="InvoiceFormateItem">
                                                    <div className="img">
                                                        <img src="/images/modal_invoice.png" alt="" />
                                                    </div>

                                                    <div className="DuelButton d_flex d_justify">
                                                        <div className="left">
                                                            <Button onClick={handlePreview}>
                                                                View Preview
                                                            </Button>
                                                            <Modal
                                                                open={openPreview}
                                                                onClose={previewClose}
                                                                aria-labelledby="modal-modal-title"
                                                                aria-describedby="modal-modal-description"
                                                            >
                                                                <Box>
                                                                    <div className="InvoiceModal">
                                                                        <img
                                                                            src="/images/modal_invoice.png"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </Box>
                                                            </Modal>
                                                        </div>

                                                        <div className="right">
                                                            <Button onClick={handleInvoice} value="1">
                                                                Use Invoice
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>


                                        </Grid>
                                    </div>
                                </TabPanel>

                                {/* Custom Domain */}
                                <TabPanel value="3">
                                    <CustomDomain
                                        data={response}
                                        shopName={websiteSettingsData?.shop_name}
                                    ></CustomDomain>
                                </TabPanel>


                                <TabPanel value="4">
                                    <div className="DashboardTabsItem">
                                        <h4>Update Business Information</h4>
                                        <p>Update your shop info and other settings</p>

                                        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                                            <div className="DashboardForm">

                                                <div className="DashboardFormItem">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={3}>
                                                            <div className="left">
                                                                <h5>Shop Info</h5>
                                                                <p>
                                                                    This will be displayed on your shop profile
                                                                </p>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={9}>
                                                            <div className="CustomeInput">
                                                                <div className="Item">
                                                                    <label>Shop Name</label>
                                                                    <TextField
                                                                        {...register("shopName")}
                                                                        id="outlined-basic"
                                                                        value={
                                                                            websiteSettingsData?.name
                                                                        }
                                                                        InputProps={{ readOnly: true, disableUnderline: true }}
                                                                        variant="outlined"
                                                                    />
                                                                </div>

                                                                <div className="Item">
                                                                    <label>Shop Address</label>
                                                                    <TextField
                                                                        {...register("shopAddress")}
                                                                        id="outlined-basic"
                                                                        defaultValue={
                                                                            websiteSettingsData?.address
                                                                        }
                                                                        variant="outlined"
                                                                    />

                                                                    <div className="svg">
                                                                        <FiEdit />
                                                                    </div>
                                                                </div>

                                                                {/* email  and phone*/}

                                                                <div className="Item">
                                                                    <label>Business Email</label>
                                                                    <TextField
                                                                        {...register("email")}
                                                                        id="outlined-basic"
                                                                        defaultValue={
                                                                            websiteSettingsData?.email
                                                                        }
                                                                        variant="outlined"
                                                                    />

                                                                    <div className="svg">
                                                                        <FiEdit />
                                                                    </div>
                                                                </div>

                                                                <div className="Item">
                                                                    <label>Phone</label>
                                                                    <TextField
                                                                        {...register("phone")}
                                                                        id="outlined-basic"
                                                                        defaultValue={
                                                                            websiteSettingsData?.phone
                                                                        }
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


                                                <div className="DashboardFormItem">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={3}>
                                                            <div className="left">
                                                                <h5>Company Logo</h5>
                                                                <p>
                                                                    This will be displayed on your shop profile
                                                                </p>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={9}>
                                                            <div className="CustomeInput">
                                                                <div className="Item Upload">
                                                                    <span>
                                                                        Image must be a file of type: png, jpg, jpeg
                                                                    </span>
                                                                    <input
                                                                        accept="image/*"
                                                                        type="file"
                                                                        id="select-image"
                                                                        style={{ display: "none" }}
                                                                        onChange={(e) =>
                                                                            setSelectedImage(e.target.files[0])
                                                                        }
                                                                    />
                                                                    <label htmlFor="select-image">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            component="span"
                                                                        >
                                                                            Upload Image
                                                                        </Button>
                                                                    </label>
                                                                    {imageUrl && selectedImage && (
                                                                        <Box mt={2} textAlign="center">
                                                                            <div>Image Preview:</div>
                                                                            <img
                                                                                src={imageUrl}
                                                                                alt={selectedImage.name}
                                                                                height="100px"
                                                                            />
                                                                        </Box>
                                                                    )}

                                                                    {
                                                                        imageUrl && selectedImage ? "" : <Box mt={2} textAlign="center">
                                                                            <div>Image Preview:</div>
                                                                            <img src={websiteSettingsData?.shop_logo?.name} alt={""} height="100px" />
                                                                        </Box>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <div className="DashboardFormItem">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={3}>
                                                            <div className="left">
                                                                <h5>Favicon</h5>
                                                                <p>
                                                                    Favicon is Located in the browser tab to the left of a webpage's title
                                                                </p>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={9}>
                                                            <div className="CustomeInput">
                                                                <div className="Item Upload">
                                                                    <span>
                                                                        Image must be a file of type: png, jpg, jpeg
                                                                    </span>
                                                                    <input
                                                                        accept="image/*"
                                                                        type="file"
                                                                        id="favicon"
                                                                        style={{ display: "none" }}

                                                                        onChange={(e) =>
                                                                            setFavicon(e.target.files[0])
                                                                        }
                                                                    />
                                                                    <label htmlFor="favicon">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            component="span"
                                                                        >
                                                                            Upload Favicon
                                                                        </Button>
                                                                    </label>
                                                                    {faviconPreview && favIcon && (

                                                                        <Box mt={2} textAlign="center">

                                                                            <div>Image Preview:</div>
                                                                            <img
                                                                                src={faviconPreview}
                                                                                alt={favIcon.name}
                                                                                height="100px"
                                                                            />
                                                                        </Box>
                                                                    )}

                                                                    {/* {
                                                                        imageUrl && selectedImage ? "" : <Box mt={2} textAlign="center">
                                                                            <div>Image Preview:</div>
                                                                            <img src={websiteSettingsData?.shop_logo?.name} alt={''} height="100px" />
                                                                        </Box>
                                                                    } */}
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>


                                                <div className="DashboardFormItem">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={3}>
                                                            <div className="left">
                                                                <h5>Shop Info</h5>
                                                                <p>
                                                                    This will be displayed on your shop profile
                                                                </p>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={9}>
                                                            <div className="CustomeInput">
                                                                <div className="Item">
                                                                    <label>Shop ID</label>
                                                                    <TextField
                                                                        disabled
                                                                        InputProps={{ readOnly: true }}
                                                                        {...register("shopID")}
                                                                        id="outlined-basic"

                                                                        readonly
                                                                        defaultValue={shopId}
                                                                        variant="outlined"
                                                                    />


                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>


                                                <div className="DashboardFormItem">
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={3}>
                                                            <div className="left">
                                                                <h5>Meta Description</h5>
                                                                <p>
                                                                    This will be displayed on your shop profile
                                                                </p>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={9}>
                                                            <div className="CustomeInput">
                                                                <div className="Item">
                                                                    <label>Website Title</label>
                                                                    <TextField
                                                                        {...register("websiteTitle")}
                                                                        id="outlined-basic"
                                                                        defaultValue={
                                                                            websiteSettingsData?.shop_meta_title
                                                                        }
                                                                        variant="outlined"
                                                                    />

                                                                    <div className="svg">
                                                                        <FiEdit />
                                                                    </div>
                                                                </div>

                                                                <div className="Item">
                                                                    <label>Description</label>
                                                                    <TextField
                                                                        {...register("description")}
                                                                        id="outlined-basic"
                                                                        defaultValue={
                                                                            websiteSettingsData?.shop_meta_description
                                                                        }
                                                                        variant="outlined"
                                                                    />

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


                                    </div>

                                </TabPanel>

                                {/* Facebook Pixel */}
                                <TabPanel value="5">
                                    <FacebookPixel
                                        shopName={websiteSettingsData?.shop_name}
                                    ></FacebookPixel>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default WebsiteSettingPage;