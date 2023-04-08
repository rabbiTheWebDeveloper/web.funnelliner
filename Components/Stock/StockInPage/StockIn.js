import { Box, Button, Container, Grid, Pagination, Skeleton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineInventory } from 'react-icons/md';
import Swal from 'sweetalert2';
import { headers } from '../../../pages/api';
import UpdateStock from './UpdateStock';


const StockIn = () => {
    const [isLoading, setIsLoading] = useState(true);


    // Filter 
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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
    // const [anchorEl2, setAnchorEl2] = useState(null);
    // const open2 = Boolean(anchorEl2);
    // const handleConfirmed = (event) => {
    //     setAnchorEl2(event.currentTarget);
    // };
    // const handleCloseConfirmed = () => {
    //     setAnchorEl2(null);
    // };

    // UpdateStockModal
    const [openStock, setOpenStock] = useState(false);
    const handleOpenStock = () => setOpenStock(true);
    const handleStockClose = () => setOpenStock(false);


    // stock 


    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [page, setPage] = useState(1);

    // const token = Cookies.get("token");
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/stocks/stock-in/list", { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
                setIsLoading(false);
            });
    }, []);
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
                    .delete(process.env.API_URL + "/client/stocks/stock-in/list" + id, { headers: headers })
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

    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = products.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / perPage); i++) {
        pageNumbers.push(i);
    }
    // console.log(pageNumbers);

    const paginate = (pageNumber, value) => setCurrentPage(value);


    // console.log(currentProduct)
    const [productSearchValue, setProductSearchValue] = useState("")
    const [filterProducts, setFilterProducts] = useState([])
    const handleChangeSearchBox = (e) => {
        setProductSearchValue(e.target.value)
        const filtered = products.filter(item => item?.id?.toString().includes(e.target.value) || item?.product_name?.toLowerCase().includes(e.target.value.toLowerCase()) || item?.product_code?.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterProducts(filtered)
    }

    return (


        <>

            <section className='TopSellingProducts DashboardSetting Order Stock'>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <div className="Header d_flex d_justify">

                                {/* Left */}
                                <div className="Left d_flex">

                                    <div className="svg">
                                        <MdOutlineInventory />
                                    </div>

                                    <div className="text">
                                        <h4>Stock In</h4>
                                        <p>Update your inventory products stock</p>
                                    </div>

                                </div>

                                {/* Right */}
                                <div className="Right d_flex">
                                    {/* item */}
                                    <div className="FilterItem">

                                        <div className="CustomeInput">
                                            <TextField id="outlined-basic" onChange={handleChangeSearchBox} label="Search here by Product ID or name or code" variant="outlined" />
                                            <Button> <BsSearch /> </Button>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </Grid>

                    </Grid>
                    {/* DashboardSettingTabs */}
                    <div className="DashboardSettingTabs WebsiteSettingPage">
                        <div className="Pending">
                            <div className="MoveToComplete d_flex d_justify">
                                {/* <div className="DropDown">                               
                                    <Button>
                                        <h6 className='d_flex'>
                                            Delete
                                            <div className="svg"><AiFillCaretDown/></div> 
                                        </h6>
                                    </Button>
                                </div> */}
                                <div className="DropDown Download">

                                    {/* <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                    <h6 className='d_flex'>
                                            Download Report 
                                            <div className="svg"><AiFillCaretDown/></div> 
                                        </h6>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>As PDF</MenuItem>
                                        <MenuItem onClick={handleClose}>As Xml</MenuItem>
                                        <MenuItem onClick={handleClose}>As Doc File</MenuItem>
                                    </Menu> */}
                                </div>
                            </div>

                            <div className="ProductTable">

                                <table>

                                    <thead>
                                        <tr>
                                            {/* <th><Checkbox/></th> */}
                                            <th>SL</th>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Product Code</th>
                                            <th>Selling Price (BDT)</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={13}>
                                                <Box sx={{ width: 40 }}>
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                    <Skeleton width={1570} height={28} />
                                                </Box>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentProduct.length > 0 ? <>

                                            <tbody>
                                                {productSearchValue === "" && currentProduct?.map((product, index) => {
                                                    return (
                                                        <tr key={product.id}>

                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <img src={product?.main_image?.name} alt="" />
                                                            </td>
                                                            <td>{product?.product_name}</td>
                                                            <td>{product.product_code}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product?.product_qty > 0 ? product?.product_qty : <span style={{ color: 'red' }}>stock out</span>}</td>
                                                            <td className='EditViewDelete'>

                                                                {/* Modal */}
                                                                <UpdateStock productId={product?.id}></UpdateStock>

                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {productSearchValue && filterProducts?.map((product, index) => {
                                                    return (
                                                        <tr key={product.id}>

                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <img src={product?.main_image?.name} alt="" />
                                                            </td>
                                                            <td>{product?.product_name}</td>
                                                            <td>{product.product_code}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product?.product_qty > 0 ? product?.product_qty : <span style={{ color: 'red' }}>stock out</span>}</td>
                                                            <td className='EditViewDelete'>

                                                                {/* Modal */}
                                                                <UpdateStock productId={product?.id}></UpdateStock>

                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </> : <tr>

                                            <td colSpan={10}>
                                                <section className="MiddleSection">
                                                    <div className="MiddleSectionContent">

                                                        <div className="img">
                                                            <img src="/error.svg" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <p>No Stock In </p>
                                                        </div>

                                                    </div>
                                                </section>
                                            </td>

                                        </tr>
                                    )}

                                </table>

                            </div>

                            <Box style={{ display: productSearchValue === "" ? "block" : "none" }}>
                                <Stack spacing={2}>

                                    <Pagination
                                        count={pageNumbers.length}
                                        variant="outlined"
                                        page={page}
                                        onChange={paginate}
                                    />
                                </Stack>
                            </Box>


                        </div>

                    </div>

                </Container>

            </section>

        </>

    )

}

export default StockIn