import { Box, Button, Collapse, Drawer, Grid, List, ListItemButton, Menu, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { detect } from 'detect-browser';
import Cookies from "js-cookie";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineBars, AiOutlineFileDone, AiOutlineHome, AiOutlineShoppingCart, AiOutlineStock } from "react-icons/ai";
import { BiMessageRoundedDots, BiSupport } from "react-icons/bi";
import { BsPlug, BsSearch, BsShop } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import { HiCurrencyDollar } from "react-icons/hi";
import { RiSettings2Line, RiTeamLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { headers, shopId } from "../../pages/api";

const publicIp = require("react-public-ip");

const Menubar = (props) => {
    const { busInfo } = props



    // ({ text })
    // const [busInfo, setBusInfo] = useState({});
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openStock, setOpenStock] = React.useState(false);
    const [openTemplate, setOpenTemplate] = React.useState(false);
    const [openMyTemplate, setOpenMyTemplate] = React.useState(false);

    // handleCategory
    const handleCategory = () => {
        setOpenCategory(!openCategory);
    };

    // handleStock
    const handleStock = () => {
        setOpenStock(!openStock);
    };

    // handleTemplate
    const handleTemplate = () => {
        setOpenTemplate(!openTemplate);
    };

    // handleTemplate
    const handleMyTemplate = () => {
        setOpenMyTemplate(!openMyTemplate);
    };


    const [token, setToken] = useState("");
    const router = useRouter();

    const handleClose = () => {
        // setAnchorElMenu(null);
    };

    useEffect(() => {
        // Perform localStorage action
        let token = localStorage.getItem("token");
        // console.log(token)
        setToken(token);
    }, []);

    const browser = detect();
    const logout = async () => {
        // window.location.href = "/login";
        const ipAddress = await publicIp.v4() || "";
        const browserName = browser.name === 'chrome' ? 'Google Chrome' : browser.name
        let logoutHeaders = { ...headers, ipaddress: ipAddress, browsername: browserName };
        window.location.href = "/login";
        axios
            .get(process.env.API_URL + "/client/logout", { headers: logoutHeaders })
            .then((response) => {

                if (response.status === 200) {
                    Cookies.remove("token");
                    localStorage.clear("token");
                    Cookies.remove("user");
                    localStorage.clear("user");
                    window.location.href = "/login";

                    router.push("/login");


                }
            });

        Cookies.remove("token");
        localStorage.clear("token");
    };

    // SideMenu Toggle
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (
        <>
            <section className='Menubar'>
                <Container maxWidth='sm'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* DesktopMenu */}
                            <div className='MenubarContent d_flex d_justify DedsktopMenu'>
                                {/* left */}
                                <div className='Left'>
                                    <h4>Admin Dashboard</h4>
                                </div>

                                {/* right */}
                                <div className='right'>
                                    {/* <div className='CustomeInput'>
                                        <TextField
                                            id='outlined-basic'
                                            label='Search Here...'
                                            variant='outlined'
                                        />
                                        <Button>
                                            {" "}
                                            <BsSearch />{" "}
                                        </Button>
                                    </div> */}

                                    {/* SupportTicket */}
                                    <div className='SupportTicket'>
                                        <Link href='/support-ticket'>
                                            {" "}
                                            <BiSupport />{" "}
                                        </Link>
                                    </div>
                                    <div className='Profile'>
                                        <PopupState variant='popover' popupId='Profile'>
                                            {(popupState) => (
                                                <>
                                                    <Button {...bindTrigger(popupState)}>
                                                        <div className='img' id='resources-button'>
                                                            {/* <img src='../images/profile.png' alt=''/> */}
                                                            {
                                                                busInfo?.shop_logo?.name ?
                                                                    <img src={busInfo?.shop_logo?.name} alt='' /> :
                                                                    <BsShop />
                                                            }
                                                        </div>
                                                    </Button>
                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link href='/dashboard-setting?pass=2'>
                                                                Profile
                                                            </Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link href='/dashboard-setting?pass=1'>Dashboard
                                                                Settings</Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link

                                                                href='/dashboard-setting?pass=3'>Change Password</Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={logout}>
                                                            {" "}
                                                            <Link className='d_flex' href=''>
                                                                {" "}
                                                                <FiLogOut /> Logout
                                                            </Link>{" "}
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            )}
                                        </PopupState>
                                    </div>
                                </div>
                            </div>

                            {/* MobileMenu */}
                            <div className='MenubarContent MobileMenu'>
                                {/* right */}
                                <div className='MobileToggleMenu'>

                                    {/* Left */}
                                    <div className="Left d_flex">

                                        {/* MobileIcon */}
                                        <div className="MobileIcon">
                                            <div className='Iconbar' onClick={() => setIsDrawerOpen(true)}>
                                                <AiOutlineBars />
                                            </div>

                                            <Drawer
                                                anchor='left'
                                                open={isDrawerOpen}
                                                onClose={() => setIsDrawerOpen(false)}
                                            >
                                                <Box role='presentation' className='SideToggleMenu'>
                                                    {/* Logo */}
                                                    <div className='Logo'>
                                                        <Link href='/'>
                                                            <img src='/images/logo.png' alt='' />
                                                        </Link>
                                                    </div>

                                                    {/* Shop */}

                                                    {/* Shop */}
                                                    <div className='Shop d_flex'>
                                                        <Link href='/'>
                                                            {
                                                                busInfo?.shop_logo?.name ?
                                                                    <img src={busInfo?.shop_logo?.name} alt='' /> :
                                                                    <BsShop />
                                                            }
                                                        </Link>
                                                        <div className='text'>
                                                            <h4>{busInfo?.name}</h4>
                                                            {/* <h4>ShopName</h4> */}
                                                            <p>ID: {shopId}</p>
                                                        </div>
                                                    </div>

                                                    <div className='MenuItemContent'>

                                                        {/* Dashboard */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/'}
                                                                    className={router.pathname === "/" ? "active" : ""}

                                                                >
                                                                    {" "}
                                                                    <AiOutlineHome /> Dashboard
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Orders */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/order'}

                                                                    className={router.pathname === "/order" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <AiOutlineFileDone /> Orders
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Products */}
                                                        <div className='MenuItem'>

                                                            <ListItemButton onClick={() => handleCategory(true)}>
                                                                <h6

                                                                    className={router.pathname === "/product" || router.pathname === "/category-list" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <AiOutlineShoppingCart /> Products{" "}
                                                                    <span>
                                                                        <FiChevronDown />
                                                                    </span>
                                                                </h6>
                                                            </ListItemButton>

                                                            <Collapse in={openCategory} timeout='auto' unmountOnExit>
                                                                <List component='div' disablePadding>
                                                                    <Link href={'/product'}>Product</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/category-list'}>Category</Link>
                                                                </List>
                                                            </Collapse>

                                                        </div>

                                                        {/* Orders */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/courier'}

                                                                    className={router.pathname === "/courier" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <TbTruckDelivery /> Courier
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Stock */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton onClick={() => handleStock(true)}>
                                                                <h6

                                                                    className={router.pathname === "/inventory" || router.pathname === "/stockin" || router.pathname === '/product-return' ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <AiOutlineStock /> Stock{" "}
                                                                    <span>
                                                                        <FiChevronDown />
                                                                    </span>
                                                                </h6>
                                                            </ListItemButton>

                                                            <Collapse in={openStock} timeout='auto' unmountOnExit>
                                                                <List component='div' disablePadding>
                                                                    <Link href={'/inventory'}>Inventory</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/stockin'}>Stock In</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/product-return'}>Product Return</Link>
                                                                </List>
                                                            </Collapse>
                                                        </div>

                                                        {/* Bulk SMS */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href='/bulk-sms'

                                                                    className={router.pathname === "/bulk-sms" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <BiMessageRoundedDots /> Bulk SMS
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Support Ticket */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/support-ticket'}

                                                                    className={router.pathname === "/support-ticket" ? "active" : ""}
                                                                >
                                                                    {" "}

                                                                    <BiSupport />
                                                                    Support Ticket
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Customers */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/customer-list'}
                                                                    className={router.pathname === "/customer-list" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <RiTeamLine /> Customers
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Templates */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton onClick={() => handleTemplate(true)}>
                                                                <h6

                                                                >
                                                                    {" "}
                                                                    <RiSettings2Line /> Templates{" "}
                                                                    <span>
                                                                        <FiChevronDown />
                                                                    </span>
                                                                </h6>
                                                            </ListItemButton>

                                                            <Collapse in={openTemplate} timeout='auto' unmountOnExit>
                                                                <List component='div' disablePadding>
                                                                    <Link href={'landing-page'}

                                                                        className={router.pathname === "/landing-page" ? "active" : ""}
                                                                    >Landing Page Website</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'multi-page'}

                                                                        className={router.pathname === "/multi-page" ? "active" : ""}
                                                                    >Multi Page Website</Link>
                                                                </List>
                                                            </Collapse>
                                                        </div>

                                                        {/* My Page */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton onClick={() => handleMyTemplate(true)}>
                                                                <h6
                                                                >
                                                                    {" "}
                                                                    <FaLaptopCode /> My Page{" "}
                                                                    <span>
                                                                        <FiChevronDown />
                                                                    </span>
                                                                </h6>
                                                            </ListItemButton>

                                                            <Collapse in={openMyTemplate} timeout='auto' unmountOnExit>
                                                                <List component='div' disablePadding>
                                                                    <Link href={'/myLandingPage'} className={router.pathname === "/myLandingPage" ? "active" : ""}>Landing Page
                                                                        Website</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/myMultiWebsite'} className={router.pathname === "/myMultiWebsite" ? "active" : ""}>Multi Page
                                                                        Website</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/web-pages'} className={router.pathname === "/web-pages" ? "active" : ""} >Pages</Link>
                                                                </List>

                                                                <List component='div' disablePadding>
                                                                    <Link href={'/home-slider'} className={router.pathname === "/home-slider" ? "active" : ""} >Slider</Link>
                                                                </List>



                                                            </Collapse>
                                                        </div>

                                                        {/* Website Setting */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href={'/website-setting'}

                                                                    className={router.pathname === "/website-setting" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <GiWorld /> Website Settings
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Plugins */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link
                                                                    href='/plug-in'

                                                                    className={router.pathname === "/plug-in" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <BsPlug /> Addons
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                        {/* Offers */}
                                                        <div className='MenuItem'>
                                                            <ListItemButton>
                                                                <Link href='/subscription'

                                                                    className={router.pathname === "/subscription" ? "active" : ""}
                                                                >
                                                                    {" "}
                                                                    <HiCurrencyDollar /> Subscription
                                                                </Link>
                                                            </ListItemButton>
                                                        </div>

                                                    </div>

                                                </Box>

                                            </Drawer>

                                        </div>

                                        {/* logo */}
                                        <div className='Logo'>
                                            <Link href={'/'}>
                                                <img src='/images/logo.png' alt='' />
                                            </Link>
                                        </div>

                                    </div>

                                </div>

                                {/* Search Menu */}
                                <div className='RightMenu d_flex d_justify'>

                                    <div className='CustomeInput'>
                                        <TextField id="outlined-basic" label="Search Here..." variant="outlined" />
                                        <Button>
                                            {" "}
                                            <BsSearch />{" "}
                                        </Button>
                                    </div>

                                    {/* SupportTicket */}
                                    <div className='SupportTicket'>
                                        <Link href=''>
                                            {" "}
                                            <BiSupport />{" "}
                                        </Link>
                                    </div>

                                    {/* SupportTicket */}
                                    {/* <div className='SupportTicket'>
                      <Link href='/dashboard-setting'>
                        {" "}
                        <TbSettings />{" "}
                      </Link>
                    </div> */}

                                    <div className='Profile'>
                                        <PopupState variant='popover' popupId='Profile'>
                                            {(popupState) => (
                                                <>

                                                    <Button {...bindTrigger(popupState)}>
                                                        <div className='img' id='resources-button'>
                                                            <img src='../images/profile.png' alt='' />
                                                        </div>
                                                    </Button>

                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link href='/dashboard-setting'>
                                                                Profile
                                                            </Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link href='/dashboard-setting'>Website Settings</Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            {" "}
                                                            <Link href=''>Change Password</Link>{" "}
                                                        </MenuItem>
                                                        <MenuItem onClick={logout}>
                                                            {" "}
                                                            <Link className='d_flex' href=''>
                                                                {" "}
                                                                <FiLogOut /> Logout
                                                            </Link>{" "}
                                                        </MenuItem>
                                                    </Menu>

                                                </>
                                            )}
                                        </PopupState>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    );
};


export default Menubar;

