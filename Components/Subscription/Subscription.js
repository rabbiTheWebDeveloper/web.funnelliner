import { Container, Grid, Link } from "@mui/material";
import React from "react";
import { GoGraph } from "react-icons/go";
import { HiCurrencyDollar } from "react-icons/hi";

const Subscription = () => {


    return (
        <>
            <section className='TopSellingProducts DashboardSetting Courier Subscription'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <HiCurrencyDollar />
                                    </div>

                                    <div className='text'>
                                        <h4>Subscription</h4>
                                        <p>
                                            Subscription for software
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>

                        {/* Total Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <div className='TotalOrderItem'>
                                <div className='overlayImg'>
                                    <img src='images/totalorder_overlay1.png' alt='' />
                                </div>

                                {/* header */}
                                <div className='Header d_flex d_justify'>
                                    <h5 className='d_flex'>
                                        {" "}
                                        <GoGraph /> Monthly Subscription Fee{" "}
                                    </h5>

                                </div>

                                <div className='Main'>
                                    <h3>BDT 1999</h3>

                                    <ul>
                                        <li>Your Registration Date:</li>
                                        <li>
                                            <span>
                                                January 10, 2023
                                            </span>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </Grid>

                        {/* Total Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <div className='TotalOrderItem'>
                                <div className='overlayImg'>
                                    <img src='images/totalorder_overlay1.png' alt='' />
                                </div>

                                {/* header */}
                                <div className='Header d_flex d_justify'>
                                    <h5 className='d_flex'>
                                        {" "}
                                        <GoGraph /> Next Payment Date{" "}
                                    </h5>

                                </div>

                                <div className='Main' >
                                    <h4 id="Subscription_text">We will let you know,when update our next version!</h4>

                                    <ul>
                                        <li><Link href=''>Make Payment</Link></li>
                                        <li><Link href=''>Download Invoice</Link></li>
                                    </ul>

                                </div>
                            </div>
                        </Grid>


                        <Grid item xs={12}>

                            <div className="SubscriptionInvoice">

                                <h4>Invoices (00)</h4>


                                {/* <div className="InvoiceItem">
                    
                    <h5 className="d_flex"><AiOutlineFileDone/> Invoice 110023</h5>

                    <h5>Invoice Date: <span>20 January 2023</span> </h5>

                    <h4>PAID</h4>

                    <h6></h6>

                    <Button>Download Invoice</Button>

                </div>

             
                <div className="InvoiceItem">
                    
                    <h5 className="d_flex"><AiOutlineFileDone/> Invoice 110023</h5>

                    <h5>Invoice Date: <span>20 January 2023</span> </h5>

                    <h4 className="UnPaid">UNPAID</h4>

                    <h6> <span>Make Payment</span> </h6>

                    <Button>Download Invoice</Button>

                </div> */}

                            </div>

                        </Grid>

                    </Grid>


                </Container>
            </section>
        </>
    );
};

export default Subscription;
