import { Box, Button, Container, Grid, Pagination, Stack, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Clipboard from "clipboard";
import Cookies from 'js-cookie';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import Select from 'react-select';
import Swal from "sweetalert2";
import { themeUrl } from "../../../constant/constant";
import { allThemeList, domain, getWebsiteSettings, headers, importLandingPage, importTheme } from "../../../pages/api";

const axios = require("axios");

const LandingWebsite = () => {
    const domain_request = Cookies.get('domain_request')
    // ViewPreviewModel
    const [products, setProducts] = useState([]);

    const [product_id, setProductID] = useState("")
    const handleChangeItem = (e) => {
        setProductID(e.value)
    }

    const [openPreview, setOpenPreview] = useState(false);
    const [landingId, setLandingId] = useState(null);

    const handlePreview = () => setOpenPreview(true);
    const previewClose = () => setOpenPreview(false);

    // OpenSales Modal
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = (e) => {
        // console.log("e.target", e.target.id)
        setLandingId(e.target.id);
        setOpenSales(true);
    };
    const handleCloseSales = () => setOpenSales(false);
    // console.log("landingId", landingId);
    //theme dynamic work by rejaul

    const [landingPageTemplate, setLandingPageTemplate] = useState([]);
    const [websiteSettingData, setWebsiteSettingData] = useState({});
    useEffect(() => {
        allThemeList("landing").then((result) => {
            // console.log(result?.data?.data);
            setLandingPageTemplate(result?.data?.data);
        });
        getWebsiteSettings().then((res) => {
            setWebsiteSettingData(res?.data?.data);
        });
    }, []);

    const shopName = websiteSettingData?.shop_name;
    const [pageTittle, setPageTittle] = useState("");
    const [videoLink, setVideoLink] = useState("");


    const handlePageTitleChange = (e) => {
        const pageName = e.target.value;
        const page = pageName.replace(/\s/g, "-");
        // console.log("page name", pageName.replace(/\s/g, "-"))
        setPageTittle(page.toLowerCase());
    };

    const handleVideoLink=(e)=>{
        const videoLink = e.target.value;
        setVideoLink(videoLink)
    }
 
    const handleImportTheme = (event) => {
        // console.log(event.target.id);
        importTheme("landing", landingId).then((res) => {
            // console.log("importTheme", res);
        });

        importLandingPage(pageTittle, landingId, 1, product_id, videoLink).then((res) => {
            setOpenSales(false);
            // console.log("page crete", res)
            if (res.status === 200) {
                Swal.fire(`Page create success`);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong",
                    icon: "error",
                    confirmButtonText: "ok",
                });
            }
        });
    };
    const [mas, setMas] = useState("");
    // href={domain_request !== null? `https://${domain_request}`+ "/p/" + product.slug: `https://funnelliner.com/${domain}` + "/p/" + product.slug}>

    const textToCopy = domain_request !== null? `${themeUrl}/${domain}/p/`: `https://funnelliner.com/${domain}/p/${pageTittle}`;
    console.log("textToCopy", textToCopy)
    const handleCopyToClick = () => {
        const clipboard = new Clipboard(".SocialLink", {
            text: () => textToCopy,
        });

        clipboard.on("success", (e) => {
            setMas("Copied to Link!");
            e.clearSelection();
        });
        clipboard.on("error", (e) => {
            // console.log("Failed to copy to clipboard.");
        });
    };

    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/products", { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
            });
    }, []);

    let options = products.length === 0 ? [] : products?.map(function (item) {
        return { value: item.id, label: item.product_name, };
    })

    console.log("pageTittle", pageTittle)

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = landingPageTemplate.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(landingPageTemplate.length / perPage); i++) {
        pageNumbers.push(i);
    }
    // console.log(pageNumbers);

    const paginate = (pageNumber, value) => setCurrentPage(value);
    return (
        <>
            <section className="TopSellingProducts DashboardSetting LandingWebsite">
                <Container maxWidth="sm">

                    <Grid Container spacing={3}>
                        
                        <Grid item xs={12}>
                            <div className="Header d_flex d_justify">
                                {/* Left */}
                                <div className="Left d_flex">
                                    <div className="svg">
                                        <BsCodeSlash />
                                    </div>

                                    <div className="text">
                                        <h4>Landing Page Template</h4>
                                        <p>choose your theme here and customize as you want</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        {/* LandingWebsite */}
                        <div className="LandingWebsiteContent">

                            <div className="InvoiceFormate">

                                <Grid container spacing={3}>
                                    {/* item */}
                                    {currentProduct?.map((item, index) => {
                                        return (
                                            <Grid item xs={4} key={index}>
                                                <div className="InvoiceFormateItem">
                                                    <div className="img">
                                                        {/* {console.log(...item.media.name)} */}
                                                        <img src={item?.media?.name} alt="" />
                                                    </div>

                                                    <div className="DuelButton d_flex d_justify">

                                                        <div className='left'>
                                                            <Button>
                                                                <a target="_blank" href={item?.url}
                                                                    rel="noopener noreferrer"> View Preview</a>
                                                            </Button>
                                                            <Modal
                                                                open={openPreview}
                                                                onClose={previewClose}
                                                                aria-labelledby='modal-modal-title'
                                                                aria-describedby='modal-modal-description'
                                                            >
                                                                <Box>
                                                                    <div className='InvoiceModal'>
                                                                        <img src={item?.media?.name} alt='' />
                                                                    </div>
                                                                </Box>
                                                            </Modal>
                                                        </div>

                                                        <div className="right">
                                                            <Button
                                                                id={item.id}
                                                                className="ModalBtn"
                                                                onClick={handleOpenSales}
                                                            >
                                                                Import Themes
                                                            </Button>

                                                            {/* modal */}
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
                                                                                <BiLinkAlt />
                                                                            </div>

                                                                            <div className="text">
                                                                                <h5>Add Page</h5>
                                                                                <p>Add pages for your website</p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="Form">
                                                                            <div className="CustomeInput">
                                                                                <label>Page Title</label>
                                                                                <TextField
                                                                                    onChange={handlePageTitleChange}
                                                                                    id="outlined-basic"
                                                                                    label="Enter page title here"
                                                                                    variant="outlined"
                                                                                />
                                                                            </div>

                                                                            <div className="CustomeInput">
                                                                                <p className="PageLink">
                                                                                    Page Link:{" "}
                                                                                    <Link
                                                                                        href=""
                                                                                        // onClick={handleCopyToClick}
                                                                                        className="SocialLink"
                                                                                        alt="Copy to clipboard"
                                                                                    >
                                                                                        {textToCopy}
                                                                                        {/* www.funnelliner.com/{domain}/p/ */}
                                                                                        {pageTittle}
                                                                                        <AiOutlineLink
                                                                                            onClick={handleCopyToClick}
                                                                                        />{" "}
                                                                                    </Link>
                                                                                    <p>{mas}</p>
                                                                                </p>
                                                                                <div className="CustomeInput">
                                                                                    <label>
                                                                                        Product Name <span>*</span>
                                                                                    </label>
                                                                                    {/* <TextField id="outlined-basic" variant="outlined" {...register("product_id", { required: true })} placeholder='Customer Name' /> */}
                                                                                    <div className="Dropdown">
                                                                                        {

                                                                                            products.length > 0 ?
                                                                                                <Select
                                                                                                    options={options}
                                                                                                    onChange={handleChangeItem} /> :
                                                                                                <div className="text">
                                                                                                    <Button>
                                                                                                        <Link
                                                                                                            href='/add-product'>Add
                                                                                                            Products</Link>
                                                                                                    </Button>
                                                                                                </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>


                                                                                {/* video  */}
                                                                                <div className="CustomeInput">
                                                                                    <label>
                                                                                        Video <span>*</span>
                                                                                    </label>
                                                                                    <TextField  onChange={handleVideoLink} id="outlined-basic" label="Youtube Video Link" variant="outlined" />
                                                                                </div>

                                                                                {/* <div className="">
                                                                                    <label>
                                                                                        Review Image <span>*</span>
                                                                                    </label>
                                                                                    
                                                                                    <Input
                                                                                        type="file"
                                                                                        fullWidth={true}
                                                                                        disableUnderline={true}
                                                                                        variant="outlined"
                                                                                    />
                                                                                </div> */}
                                                                                <div className="DuelButton">
                                                                                    <Button
                                                                                        onClick={handleImportTheme}
                                                                                        id={item.id}
                                                                                    >
                                                                                        Publish
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Box>
                                                            </Modal>
                                                        </div>

                                                    </div>

                                                </div>

                                            </Grid>
                                        );
                                    })}
                                </Grid>

                                <div>
                                    <Box
                                        sx={{
                                            margin: "auto",
                                            width: "fit-content",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Stack spacing={2}>

                                            <Pagination
                                                count={pageNumbers.length}
                                                variant="outlined"
                                                page={currentPage}
                                                onChange={paginate}
                                            />
                                        </Stack>
                                    </Box>
                                </div>
                            </div>

                        </div>

                    </Grid>

                </Container>
            </section>
        </>
    );
};

export default LandingWebsite;
