import {Box, Button, Container, Grid,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BsCodeSlash} from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import {domain, merchantThemeList} from "../../../../pages/api";
import Cookies from "js-cookie";

const MyMultiWebsite = () => {
    // ViewPreviewModel
    const [openPreview, setOpenPreview] = useState(false);
    const handlePreview = () => setOpenPreview(true);
    const previewClose = () => setOpenPreview(false);
    const [isImportedTheme, setIsImportedTheme] = useState(false);
    // OpenSales Modal
    // const [openSales, setOpenSales] = useState(false);
    // const handleOpenSales = () => setOpenSales(true);
    // const handleCloseSales = () => setOpenSales(false);

    const [multiPageTemplate, setMultiPageTemplate] = useState([]);
    useEffect(() => {
        merchantThemeList("multiple").then((result) => {
            setMultiPageTemplate(result?.data?.data);
            if (result?.data?.data.length === 0) {
                setIsImportedTheme(true);
            }
        });
    }, []);
    const domain_request = Cookies.get('domain_request')
    return (
        <>
            <section className='TopSellingProducts DashboardSetting LandingWebsite'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <BsCodeSlash/>
                                    </div>

                                    <div className='text'>
                                        <h4> My Multipage Template</h4>
                                        <p>choose your theme here and customize as you want</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        {/* LandingWebsite */}
                        <div className='LandingWebsiteContent'>

                            {
                                isImportedTheme === true && <div style={{textAlign: "center", marginTop: "100px"}}>
                                    <p style={{marginBottom: "20px"}}>You Didn’t Import Any Multipage website Right Now.
                                        Please Choice Your Multipage Theme & Import It.</p>
                                    <Link href='/multi-page'>
                                        {" "}
                                        {/* <Button>Primary</Button> */}
                                        <Button style={{background: "#1565C0", color: "white"}} variant='contained'>Import
                                            Theme</Button>
                                    </Link>
                                </div>
                            }

                            <div className='InvoiceFormate'>
                                <Grid container spacing={3}>
                                    {Array.isArray(multiPageTemplate)
                                        ? multiPageTemplate?.map((item, index) => {
                                            return (
                                                <Grid key={index} item xs={4}>
                                                    <div className='InvoiceFormateItem'>
                                                        <div className='img'>
                                                            <img src={item.media.name} alt=''/>
                                                        </div>

                                                        <div className='DuelButton d_flex d_justify'>
                                                            <div className='left'>
                                                                <Button>
                                                                    <Link
                                                                        target='_blank'
                                                                        // href={`https://funnelliner.com/${domain}`}
                                                                        href={domain_request != 'null'? `https://${domain_request}`: `https://funnelliner.com/${domain}`}

                                                                        rel='noopener noreferrer'
                                                                    >
                                                                       View Preview
                                                                    </Link>
                                                                </Button>
                                                                <Modal
                                                                    open={openPreview}
                                                                    onClose={previewClose}
                                                                    aria-labelledby='modal-modal-title'
                                                                    aria-describedby='modal-modal-description'
                                                                >
                                                                    <Box>
                                                                        <div className='InvoiceModal'>
                                                                            <img src={item.media.name} alt=''/>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </div>

                                                            <div className='right'>
                                                                <Button Id={item.id}>
                                                                    <Link
                                                                        target='_blank'
                                                                        href={domain_request != 'null'? `https://${domain_request}`: `https://funnelliner.com/${domain}`}
                                                                        // href={`https://funnelliner.com/${domain}`}
                                                                        rel='noopener noreferrer'
                                                                    >
                                                                        edit
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            );
                                        })
                                        : null}
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Container>
            </section>
        </>
    );
};

export default MyMultiWebsite;
