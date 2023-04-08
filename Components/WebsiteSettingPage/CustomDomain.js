import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, FormControl, Grid, MenuItem, Select, Tab } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomDomainRequest from './CustomDomainRequest';
import DomainVerification from "./DomainVerification";

const CustomDomain = ({ shopName, data }) => {
    const [value2, setValue2] = useState("one");
    const handleChangeTab2 = (event, newValue) => {
        setValue2(newValue);
    };

    const [customDomain, setCustomDomain] = useState("uriuitrue");

    const handleCustomDomain = (e) => {
        setCustomDomain(e.target.value);
    };

    const [selected, setSelected] = useState('.com');

    const selectionChangeHandler = (event) => {
        setSelected(event.target.value);
    };

    // console.log("Domain Com", customDomain)
    return (
        <Box sx={{ width: "100%", typography: "body1" }}>

            <TabContext value={value2}>

                <div className="ChooseDomainSidebar">

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={4} md={3}>

                            <div className="ChooseDomainSidebarLeft">

                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>

                                    <TabList
                                        onChange={handleChangeTab2}
                                        aria-label='lab API tabs example'
                                    >
                                        <Tab label='Order New Domain' value='one' />
                                        <Tab label='Connect Your Domain' value='two' />
                                        <Tab label='Domain Verification' value='three' />

                                    </TabList>

                                </Box>

                            </div>

                        </Grid>


                        <Grid item xs={12} sm={9} md={9}>

                            <div className="ChooseDomainSidebarRight">

                                <TabPanel value='one'>

                                    <div className='ChooseDomain'>

                                        <div className='ChooseDomainItem'>

                                            <h4>Choose your custom domain name</h4>

                                            <div className='CustomeInput'>
                                                <div className='left'>
                                                    <h5>www.</h5>
                                                </div>

                                                <input
                                                    onChange={handleCustomDomain}
                                                    type='text'
                                                    placeholder='Type your domain'
                                                />

                                                <Button>
                                                    <a target="_blank" rel="noopener noreferrer"
                                                        href={`http://my.hostwev.com/cart.php?a=add&domain=register&query=${customDomain}+${selected}`}>Search</a>
                                                </Button>

                                                <div className='DropDown'>


                                                    <FormControl>
                                                        {/* <InputLabel>Months</InputLabel> */}
                                                        <Select value={selected} onChange={selectionChangeHandler}>
                                                            <MenuItem value={".com"}>.com</MenuItem>
                                                            <MenuItem value={".net"}>.net</MenuItem>
                                                            <MenuItem value={".org"}>.org</MenuItem>
                                                            <MenuItem value={".me"}>.me</MenuItem>
                                                            <MenuItem value={".xyz"}>.xyz</MenuItem>
                                                            <MenuItem value={".in"}>.in</MenuItem>
                                                            <MenuItem value={".co.in"}>.co.in</MenuItem>
                                                            <MenuItem value={".top"}>.top</MenuItem>
                                                            <MenuItem value={".info"}>.info</MenuItem>
                                                        </Select>
                                                        {/* <FormHelperText>Select a month</FormHelperText> */}
                                                    </FormControl>
                                                </div>
                                            </div>

                                            {/* DomainPart */}
                                            <div className='DomainPart d_flex'>
                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .com
                                                        <img src="/images/domain_leg.svg" alt='' />
                                                    </Link>
                                                </div>

                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .xyz
                                                        <img src='/images/domain_leg.svg' alt='' />
                                                    </Link>
                                                </div>

                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .net
                                                        <img src='/images/domain_leg.svg' alt='' />
                                                    </Link>
                                                </div>

                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .org
                                                        <img src='/images/domain_leg.svg' alt='' />
                                                    </Link>
                                                </div>

                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .net
                                                        <img src='/images/domain_leg.svg' alt='' />
                                                    </Link>
                                                </div>

                                                {/* DomainPartItem */}
                                                <div className='DomainPartItem'>
                                                    <Link href=''>
                                                        .org
                                                        <img src='/images/domain_leg.svg' alt='' />
                                                    </Link>
                                                </div>
                                            </div>


                                        </div>

                                    </div>

                                </TabPanel>

                                <TabPanel value='two'>
                                    <CustomDomainRequest shopName={shopName} />


                                </TabPanel>

                                <TabPanel value='three'>

                                    <DomainVerification shopName={shopName} data={data}></DomainVerification>

                                </TabPanel>

                            </div>

                        </Grid>

                    </Grid>

                </div>

            </TabContext>

        </Box>
    );
};

export default CustomDomain;