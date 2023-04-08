import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Grid, Tab, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { getMerchantList } from "../../pages/api";
import CancelOrderCustomers from "./CancelOrderCustomers";
import ConfirmedOrderCustomers from "./ConfirmedOrderCustomers";
import FollowUpOrderCustomers from "./FollowUpOrderCustomers";
import OrderReturnCustomers from "./OrderReturnCustomers";
import PendingOrderCustomers from "./PendingOrderCustomers";

const CustomerList = () => {
    // Filter
    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Tabs
    const [value, setValue] = useState("1");

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    // handleClick Move To Completed
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // UpdateStockModal
    const [openStock, setOpenStock] = useState(false);
    const handleOpenStock = () => setOpenStock(true);

    const [merchants, setMerchants] = useState([]);
    useEffect(() => {
        getMerchantList().then((res) => {
            setMerchants(res.data);
        })
            .catch(function (error) {

                // console.log("Page  System", error.response.data)
                if (error.response.data.api_status === "401") {
                    window.location.href = "/login"
                    Cookies.remove("token");
                    localStorage.clear("token");
                    Cookies.remove("user");
                    localStorage.clear("user");

                    window.location.href = "/login"
                }
            });
    }, []);

    return (
        <>
            <section className='TopSellingProducts DashboardSetting Order'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <HiOutlineUserGroup />
                                    </div>

                                    <div className='text'>
                                        <h4>Customer List</h4>
                                        <p>List Of Customers</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className='Right d_flex'>
                                    {/* item */}
                                    {/* <div className='FilterItem d_flex'>
                   
                  </div> */}

                                    {/* item */}


                                    {/* item */}
                                    <div className='FilterItem'>
                                        <div className='CustomeInput'>
                                            <TextField
                                                id='outlined-basic'
                                                label='Search Here...'
                                                variant='outlined'
                                            />
                                            <Button>
                                                {" "}
                                                <BsSearch />{" "}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    {/* DashboardSettingTabs */}
                    <div className='DashboardSettingTabs WebsiteSettingPage'>
                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList
                                        onChange={handleChangeTab}
                                        aria-label='lab API tabs example'
                                    >
                                        <Tab label='Confirm Order Customers' value='1' />
                                        <Tab label='Pending Order Customers' value='2' />
                                        <Tab label='Cancel Order Customers' value='3' />
                                        <Tab label='Follow Up Order Customers' value='4' />
                                        <Tab label='Order Return Customers' value='5' />
                                    </TabList>
                                </Box>

                                {/* Confirmed Order Customers */}
                                <TabPanel value='1'>
                                    <ConfirmedOrderCustomers></ConfirmedOrderCustomers>

                                </TabPanel>

                                {/* Lead Order Customers */}
                                <TabPanel value='2'>
                                    <PendingOrderCustomers></PendingOrderCustomers>

                                </TabPanel>

                                {/* Cancel Order Customers */}

                                <TabPanel value='3'>
                                    <CancelOrderCustomers></CancelOrderCustomers>

                                </TabPanel>

                                {/* Follow Up Order Customers */}
                                <TabPanel value='4'>

                                    <FollowUpOrderCustomers></FollowUpOrderCustomers>
                                </TabPanel>

                                {/* Order Return Customers */}
                                <TabPanel value='5'>
                                    <OrderReturnCustomers></OrderReturnCustomers>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default CustomerList;