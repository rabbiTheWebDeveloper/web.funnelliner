import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Box, Button, Container, Grid, Tab } from '@mui/material';
import React from 'react';
import { BsCheckAll, BsCheckLg, BsPlug, BsSearch } from 'react-icons/bs';
import { MdDashboardCustomize } from 'react-icons/md';
import { TbPlugConnectedX } from 'react-icons/tb';


const Plugin = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // const label = {inputProps: {'aria-label': 'Switch demo'}};

    return (

        <>

            <section className='TopSellingProducts DashboardSetting Courier Plugin'>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <div className="Header d_flex d_justify">

                                {/* Left */}
                                <div className="Left d_flex">

                                    <div className="svg">
                                        <BsPlug />
                                    </div>

                                    <div className="text">
                                        <h4>Addons</h4>
                                        <p>Add plugins for extra advantages</p>
                                    </div>

                                </div>

                            </div>

                        </Grid>

                    </Grid>

                    {/* CourierContent */}
                    <div className="AddonsContent">

                        <Grid container spacing={3}>

                            <Grid item md={12}>

                                <div className="AddonsTabs">

                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                            <div className="AddonsTabsHeader d_flex d_justify">

                                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                    <Tab icon={<TbPlugConnectedX />} iconPosition="start" label="My Addons" value="1" />
                                                    <Tab icon={<MdDashboardCustomize />} iconPosition="start" label="All Addons" value="2" />
                                                </TabList>

                                                <div className="Search">
                                                    <input type="text" placeholder='Search addons...' />
                                                    <div className="searchIcon">
                                                        <BsSearch />
                                                    </div>
                                                </div>

                                            </div>

                                        </Box>


                                        {/* My Addons */}
                                        <TabPanel value="1">


                                            <Grid container spacing={3}>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid">
                                                            <h5>Paid</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/fakeorder.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Accounting <br /> Modules</h4>

                                                            <div className="DualButton">
                                                                <Button>Active</Button>
                                                                <Button className='Deactivated'>Deactivate</Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid">
                                                            <h5>Paid</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/fakeorder.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Accounting <br /> Modules</h4>

                                                            <div className="DualButton">
                                                                <Button className='Deactivated'>Deactivate</Button>
                                                            </div>
                                                            <h6> <BsCheckLg/> You're almost done</h6>

                                                        </div>

                                                    </div>

                                                </Grid>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid Free">
                                                            <h5>Free</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/bkash-marcent.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Bkash Merchant Account Connection</h4>

                                                            <div className="DualButton">
                                                                <Button>Active</Button>
                                                                <Button className='Deactivated'>Deactivate</Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid">
                                                            <h5>Paid</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/Accounting Modules.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Accounting <br /> Modules</h4>

                                                            <div className="DualButton">
                                                                <Button>Active</Button>
                                                                <Button className='Deactivated'>Deactivate</Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                            </Grid>

                                        </TabPanel>

                                        {/* All Addons */}
                                        <TabPanel value="2">

                                            <Grid container spacing={3}>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid">
                                                            <h5>Paid</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/fakeorder.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Accounting <br /> Modules</h4>

                                                            <div className="DualButton">
                                                                <Button className='Install'>Installed <BsCheckAll/></Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid">
                                                            <h5>Paid</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/bkash-marcent.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Bkash Merchant Account Connection</h4>

                                                            <div className="DualButton">
                                                                <Button>Install Now</Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                                {/* item */}
                                                <Grid item md={3}>

                                                    <div className="AddonsTabItem">

                                                        <div className="PainUnpaid Free">
                                                            <h5>Free</h5>
                                                        </div>

                                                        <div className="img">
                                                            <img src="/images/Accounting Modules.png" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <h4>Accounting <br /> Modules</h4>

                                                            <div className="DualButton">
                                                                <Button>Install Now</Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </Grid>

                                            </Grid>

                                        </TabPanel>

                                    </TabContext>


                                </div>

                            </Grid>

                        </Grid>

                    </div>

                </Container>

            </section>

        </>

    )

}

export default Plugin