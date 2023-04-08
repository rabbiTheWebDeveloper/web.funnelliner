import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Collapse, Container, Grid, IconButton, Modal } from "@mui/material";
import Clipboard from "clipboard";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { domain } from "../../pages/api";

const WebsiteLink = ({ busInfo = {} }) => {
    const [open, setOpen] = useState(true);
    const [mas, setMas] = useState('');
    const { domain_status, domain_request } = busInfo

    // Model
    const [openModel, setOpenModel] = useState(false);
    const handleOpenModal = () => setOpenModel(true);
    const handleCloseModal = () => setOpenModel(false);

    const textToCopy = `https://funnelliner.com/${domain}`;
    const handleClick = () => {
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
    setTimeout(function () {
        setMas("");
    }, 1000)
    // const clipboard = new ClipboardJS('.btn');

    // console.log('busInfo' ,busInfo)
    return (
        <>
            <section className="WebsiteLink">
                <Container maxWidth="sm">
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className="WebsiteLinkContent">
                                <Box sx={{ width: "100%" }}>
                                    <Collapse in={open}>
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            sx={{ mb: 2 }}
                                        >
                                            <div className="WebsiteLinkItem d_flex">
                                                <div className="img">
                                                    <img src="images/web-site_img.svg" alt="" />
                                                </div>

                                                <div className="text">
                                                    <h4>Your Website Link Is Ready !</h4>

                                                    <ul>
                                                        <li>
                                                            Visit the following link to view your website{" "}

                                                            {
                                                                domain_status === "connected" ? <a target="_blank"
                                                                    href={`https://${domain_request}`}
                                                                    rel="noopener noreferrer">
                                                                    {domain_request}
                                                                </a> :
                                                                    <a target="_blank"
                                                                        href={`https://funnelliner.com/${domain}`}
                                                                        rel="noopener noreferrer">
                                                                        https://funnelliner.com/{domain}
                                                                    </a>
                                                            }
                                                        </li>
                                                        <li>
                                                            Copy Link:
                                                            {/* <Link href='' className='SocialLink'><BsFacebook/></Link>
                                                            <Link href='' className='SocialLink'><IoLogoWhatsapp/></Link> */}
                                                            <Link
                                                                href="#"
                                                                onClick={handleClick}
                                                                className="SocialLink"
                                                                alt="Copy to clipboard"
                                                            >
                                                                <AiOutlineLink />
                                                            </Link>
                                                            <p>{mas}</p>
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <Link href="/website-setting?domain=3" className="Btn">
                                                                Get Your Custom Domain Name
                                                            </Link>{" "}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Alert>
                                    </Collapse>
                                </Box>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="WelcomeModel">
                                {/* <Button onClick={handleOpenModal}>Open modal</Button> */}

                                <Modal
                                    open={openModel}
                                    onClose={handleCloseModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box>
                                        <div className="WelcomeModelContent">
                                            <h3>Congratulations !</h3>
                                            <h4>Your Account has been successfully Created !</h4>
                                            <h5>Now you are on the Waiting List !</h5>

                                            <div className="Gif d_flex d_justify">
                                                <div className="img">
                                                    <img src="images/gif1.gif" alt="" />
                                                </div>

                                                <div className="img">
                                                    <img src="images/gif2.gif" alt="" />
                                                </div>

                                                <div className="img">
                                                    <img src="images/gif1.gif" alt="" />
                                                </div>
                                            </div>
                                            <h4>
                                                Please Compleat The Payment and Activate your account!
                                            </h4>
                                            <Link
                                                href="https://shop.bkash.com/soft-it-carerm47396/pay/bdt1999/tJoBsF"
                                                className="bg"
                                            >
                                                {" "}
                                                Pay Now{" "}
                                            </Link>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    );
};

export default WebsiteLink;
