import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Container, Grid, Tab, TextField } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from "moment";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineReceiptLong, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { themeUrl } from '../../constant/constant';
import { domain, headers } from '../../pages/api';


const WebPages = () => {
    const [status, setStatus] = useState({})
    const domain_request = Cookies.get('domain_request')
    // UpdateStockModal
    const [openStock, setOpenStock] = useState(false);
    const handleOpenStock = () => setOpenStock(true);
    const handleStockClose = () => setOpenStock(false);
    // Tabs
    const [value, setValue] = useState('1');

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
    // handleConfirmed
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const handleConfirmed = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleCloseConfirmed = () => {
        setAnchorEl2(null);
    };
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [page, setPage] = useState(1);
    const router = useRouter()
    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/pages", { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
            })
            .catch(function (error) {
                if (error.response.data.api_status === "401") {
                    window.location.href = "/login"
                    Cookies.remove("token");
                    localStorage.clear("token");
                    Cookies.remove("user");
                    localStorage.clear("user");
                    setStatus(error)
                    window.location.href = "/login"
                }
            });
    }, [status]);
    //   status create
    const data = Cookies.get();
    const mainData = data?.user;
    let parseData;
    if (mainData != null) {
        parseData = JSON.parse(mainData);
    }
    // console.log(parseData);
    const merchantId = parseData?.id;
    const merchantShopId = parseData?.shop_id
    const updateDate = {
        user_id: merchantId,
        shop_id: merchantShopId

    }
    const addPageSubmit = (data) => {
        data.status = "0"
        // console.log(data)
        axios.post(process.env.API_URL + `/client/pages?id=${merchantId}&status=0&title=${product.title}&theme=${id}&slug=hello2`, {
            headers: headers,
        })
            .then(function (response) {
                Swal.fire("Own Info Add!", response.data.msg, "success");
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });


        reset();
    };
    // console.log(products);

    const deleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(process.env.API_URL + "/client/pages/" + id, { headers: headers })
                    .then(function (result) {
                        // handle success
                        if (result) {
                            setProducts((pd) => {
                                const filter = products.filter((prod) => {
                                    return prod.id !== id;
                                });
                                return [...filter];
                            });
                        } else {
                        }
                    });
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };
    return (


        <>

            <section className='TopSellingProducts DashboardSetting Order'>

                <Container maxWidth="sm">

                    {/* header */}
                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <div className="Header d_flex d_justify">

                                {/* Left */}
                                <div className="Left d_flex">

                                    <div className="svg">
                                        <MdOutlineReceiptLong />
                                    </div>

                                    <div className="text">
                                        <h4>Pages</h4>
                                        <p>Pages List</p>
                                    </div>

                                </div>

                                {/* Right */}
                                <div className="Right d_flex">

                                    {/* item */}
                                    <div className="FilterItem">

                                        <div className="CustomeInput">
                                            <TextField id="outlined-basic" label="Search Here..." variant="outlined" />
                                            <Button> <BsSearch /> </Button>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </Grid>

                    </Grid>

                    {/* DashboardSettingTabs */}
                    <div className="DashboardSettingTabs WebsiteSettingPage">

                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <TabContext value={value}>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                    <div className="WebPages d_flex d_justify">

                                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                            <Tab label="All Pages" value="1" />
                                            <Tab label="Published Pages" value="2" />
                                        </TabList>

                                        <Button className='AddNewOrder'> <Link href='/add-new-pages'>Create New
                                            Page</Link> </Button>

                                    </div>

                                </Box>

                                {/* All Pages */}
                                <TabPanel value="1">
                                    <div className="Pending">
                                        <div className="ProductTable">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Page Title</th>
                                                        <th>Creation Date</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Array.isArray(products)
                                                            ?
                                                            products.map((product, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{product.title}</td>
                                                                        <td>{moment(product.created_at).fromNow()}</td>
                                                                        <td className=''><Button
                                                                            className={product.status === 1 ? "UpdateStock" : "Unpublished"}>Published</Button>
                                                                        </td>
                                                                        <td className='EditViewDelete'>
                                                                            <a target="_blank"
                                                                                href={domain_request != 'null' ? `https://${domain_request}` + "/p/" + product.slug : `${themeUrl}/${domain}` + "/p/" + product.slug}>
                                                                                <MdOutlineRemoveRedEye /> </a>
                                                                            {/* <Link href=''> <FiEdit/> </Link> */}
                                                                            <Link href=''
                                                                                onClick={() => deleteProduct(product.id)}>
                                                                                <RiDeleteBin6Line />
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </TabPanel>

                                {/* Published Pages */}
                                <TabPanel value="2">

                                    <div className="Pending">

                                        <div className="ProductTable">

                                            <table>

                                                <thead>

                                                    <tr>
                                                        <th>Page Title</th>
                                                        <th>Creation Date</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>

                                                </thead>

                                                <tbody>
                                                    {Array.isArray(products)
                                                        ?

                                                        products.map((product, index) => {

                                                            if (product.status === 1) {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{product.title}</td>
                                                                        <td>{moment(product.created_at).fromNow()}</td>
                                                                        <td className=''><Button
                                                                            className={product.status === 1 ? "UpdateStock" : "Unpublished"}>Published</Button>
                                                                        </td>
                                                                        <td className='EditViewDelete'>
                                                                            <Link href=''> <MdOutlineRemoveRedEye /> </Link>
                                                                            <Link href=''> <FiEdit /> </Link>
                                                                            <Link href=''
                                                                                onClick={() => deleteProduct(product.id)}>
                                                                                <RiDeleteBin6Line /> </Link>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }) : null}


                                                    {/* item */}


                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </TabPanel>

                            </TabContext>

                        </Box>

                    </div>

                </Container>

            </section>

        </>

    )

}

export default WebPages