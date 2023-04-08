import { Box, Button, Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import Swal from "sweetalert2";
import { allThemeList, importTheme } from "../../../pages/api";

const MultiWebsite = () => {
    // ViewPreviewModel
    const [openPreview, setOpenPreview] = useState(false);
    const handlePreview = () => setOpenPreview(true);
    const previewClose = () => setOpenPreview(false);

    const [multiPageTemplate, setMultiPageTemplate] = useState([]);
    useEffect(() => {
        allThemeList("multiple").then((result) => {
            setMultiPageTemplate(result?.data?.data);
        });
    }, []);

    const handleActiveTheme = (e) => {
        Swal.fire({
            title: 'Are you sure to active this theme?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, import it'
        }).then((result) => {
            if (result.isConfirmed) {
                const themeId = e.target.id;
                importTheme("multiple", themeId).then((res) => {
                    if (res.status === 200) {
                        Swal.fire(`Theme active success`);
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong",
                            icon: "error",
                            confirmButtonText: "ok",
                        });
                    }
                });

            }
        })
    };
    console.log("multiPageTemplate" ,multiPageTemplate)
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
                                        <h4>Multiple Page Website</h4>
                                        <p>choose your theme here and customize as you want</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        {/* LandingWebsite */}
                        <div className='LandingWebsiteContent'>
                            <div className='InvoiceFormate'>
                                <Grid container spacing={3}>
                                    {multiPageTemplate?.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={4}>
                                                <div className='InvoiceFormateItem'>
                                                    <div className='img'>
                                                        <img src={item?.media?.name} alt=''/>
                                                    </div>

                                                    <div className='DuelButton d_flex d_justify'>
                                                        <div className='left'>
                                                            <Button >
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
                                                                        <img src={item?.media?.name} alt=''/>
                                                                    </div>
                                                                </Box>
                                                            </Modal>
                                                        </div>

                                                        <div className='right'>
                                                            <Button onClick={handleActiveTheme} Id={item.id}>
                                                                Import Theme
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Container>
            </section>
        </>
    );
};

export default MultiWebsite;
