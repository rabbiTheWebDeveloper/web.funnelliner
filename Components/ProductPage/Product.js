import { Box, Button, Container, Grid, Pagination, Stack, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";
import ProductUpdate from "./ProductUpdate";
import ShowProduct from "./ShowProduct";

const Product = ({ category }) => {

    const [age, setAge] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const handleConfirmed = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleCloseConfirmed = () => {
        setAnchorEl2(null);
    };

    // product api implement

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    
    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/products", { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
                setIsLoading(false);
            })
            .catch(function (error) {
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
                    .delete(process.env.API_URL + "/client/products/" + id, { headers: headers })
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
   
    const paginate = (pageNumber, value) => setCurrentPage(value);
    const [productSearchValue, setProductSearchValue] = useState("")
    const [filterProducts, setFilterProducts] = useState([])
    const handleChangeSearchBox = (e) => {
        setProductSearchValue(e.target.value)
        const filtered = products.filter(item => item?.id?.toString().includes(e.target.value) || item?.product_name?.toLowerCase().includes(e.target.value.toLowerCase()) || item?.product_code?.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterProducts(filtered)
    }
    return (
        <>
            <section className="TopSellingProducts DashboardSetting Order">
                <Container maxWidth="sm">
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className="Header d_flex d_justify">
                                {/* Left */}
                                <div className="Left d_flex">
                                    <div className="svg">
                                        <MdProductionQuantityLimits />
                                    </div>

                                    <div className="text">
                                        <h4>Products</h4>
                                        <p>Shop Products List</p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="Right d_flex">

                                    {/* item */}
                                    <div className="FilterItem">
                                        <div className="CustomeInput">
                                            <TextField
                                                onChange={handleChangeSearchBox}
                                                id="outlined-basic"
                                                label="Search here by Product ID or name or code"
                                                variant="outlined"
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
                    <div className="DashboardSettingTabs WebsiteSettingPage">
                        <div className="Pending">
                            <div className="MoveToComplete d_flex d_justify">
                                <div className="DropDown"></div>

                                <Link href="/add-product" className="AddProduct">
                                    Add Product <BiPlus />
                                </Link>
                            </div>

                            <div className="ProductTable">
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th>
                                                 <Checkbox /> 
                                            </th> */}
                                            <th>SL</th>
                                            <th>Image</th>

                                            <th>Product Name</th>
                                            <th>Product Code</th>
                                            <th>Selling Price (BDT)</th>
                                            <th>Quantity</th>
                                            <th>Added On</th>
                                            <th>Shipping Cost</th>
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
                                    ) : currentProduct.length > 0 ? (
                                        <>
                                            <tbody>
                                                {
                                                    productSearchValue === "" && currentProduct?.map((product, index) => {
                                                        return (
                                                            <tr key={product.id}>
                                                                <td>
                                                                    <td>{index + 1}</td>
                                                                    {/* <Checkbox /> */}
                                                                </td>
                                                                <td>
                                                                    <img src={product?.main_image?.name} alt="" />
                                                                </td>

                                                                <td>
                                                                    {/* {product?.product_name} */}
                                                                    <Tooltip
                                                                        title={product?.product_name}
                                                                        placement='top-start'
                                                                    >
                                                                        <span>
                                                                            {product?.product_name.length < 15 ? (
                                                                                <span>{product?.product_name}</span>

                                                                            ) : (
                                                                                <span>
                                                                                    {product?.product_name?.slice(0, 15)}...
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </Tooltip>
                                                                </td>
                                                                <td>{product.product_code}</td>
                                                                <td>{product.price}</td>
                                                                <td>{product?.product_qty > 0 ? product?.product_qty : <span style={{ color: 'red' }}>stock out</span>}</td>
                                                                <td>{moment(product.created_at).format("LL")}</td>
                                                                <td>
                                                                    {product?.delivery_charge !== "paid" ? <p><span>Delivery Free</span></p> : <>
                                                                        <p>In Dhaka - <span>{product?.inside_dhaka}TK</span></p>
                                                                        <p>Out Dhaka - <span>{product?.outside_dhaka}TK</span></p>
                                                                    </>}


                                                                </td>
                                                                <td className="EditViewDelete">
                                                                    <Button className="ButtonEdit" href="">
                                                                        {" "}
                                                                        <ShowProduct id={product.id}></ShowProduct>{" "}
                                                                    </Button>
                                                                    <Button className="ButtonEdit">
                                                                        {" "}
                                                                        <ProductUpdate id={product.id} category={category}></ProductUpdate>{" "}
                                                                    </Button>
                                                                    <Link
                                                                        href=""
                                                                        onClick={() => deleteProduct(product.id)}
                                                                    >
                                                                        {" "}
                                                                        <RiDeleteBin6Line />{" "}
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}


                                                {/* filter product */}
                                                {
                                                    productSearchValue && filterProducts?.map((product, index) => {
                                                        return (
                                                            <tr key={product.id}>
                                                                <td>
                                                                    <td>{index + 1}</td>
                                                                    {/* <Checkbox /> */}
                                                                </td>
                                                                <td>
                                                                    <img src={product?.main_image?.name} alt="" />
                                                                </td>

                                                                <td>
                                                                    {/* {product?.product_name} */}
                                                                    <Tooltip
                                                                        title={product?.product_name}
                                                                        placement='top-start'
                                                                    >
                                                                        <span>
                                                                            {product?.product_name.length < 15 ? (
                                                                                <span>{product?.product_name}</span>

                                                                            ) : (
                                                                                <span>
                                                                                    {product?.product_name?.slice(0, 15)}...
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </Tooltip>
                                                                </td>
                                                                <td>{product.product_code}</td>
                                                                <td>{product.price}</td>
                                                                <td>{product?.product_qty > 0 ? product?.product_qty : <span style={{ color: 'red' }}>stock out</span>}</td>
                                                                <td>{moment(product.created_at).format("LL")}</td>
                                                                <td>
                                                                    {product?.delivery_charge !== "paid" ? <p><span>Delivery Free</span></p> : <>
                                                                        <p>In Dhaka - <span>{product?.inside_dhaka}TK</span></p>
                                                                        <p>Out Dhaka - <span>{product?.outside_dhaka}TK</span></p>
                                                                    </>}


                                                                </td>
                                                                <td className="EditViewDelete">
                                                                    <Button className="ButtonEdit" href="">
                                                                        {" "}
                                                                        <ShowProduct id={product.id}></ShowProduct>{" "}
                                                                    </Button>
                                                                    <Button className="ButtonEdit">
                                                                        {" "}
                                                                        <ProductUpdate id={product.id} category={category}></ProductUpdate>{" "}
                                                                    </Button>
                                                                    <Link
                                                                        href=""
                                                                        onClick={() => deleteProduct(product.id)}
                                                                    >
                                                                        {" "}
                                                                        <RiDeleteBin6Line />{" "}
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}

                                            </tbody>
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                <section className="MiddleSection">
                                                    <div className="MiddleSectionContent">
                                                        <div className="img">
                                                            <img src="/error.svg" alt="" />
                                                        </div>

                                                        <div className="text">
                                                            <p>Not Found</p>

                                                            <Button><Link
                                                                href='/add-product'>Add
                                                                Products</Link></Button>

                                                            {/* <p>OR</p> */}

                                                            {/* <Link href='https://dashboard.funnelliner.com/landing-page'>Add New Page</Link> */}
                                                        </div>
                                                    </div>
                                                </section>
                                            </td>
                                        </tr>
                                    )}


                                </table>
                            </div>
                        </div>

                        <div style={{display: productSearchValue === "" ? "block" : "none"}}>
                            <Box
                                sx={{
                                    margin: "auto",
                                    width: "fit-content",
                                    alignItems: "center",
                                }}
                            >
                                <Stack spacing={2}>

                                    <Pagination
                                        count={pageNumbers.length}
                                        variant="outlined"
                                        page={currentPage}
                                        onChange={paginate}
                                    />
                                </Stack>
                            </Box>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Product;
