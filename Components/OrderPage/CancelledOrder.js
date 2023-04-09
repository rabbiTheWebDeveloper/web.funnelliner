import { Box, Pagination, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";




const handleClose = () => {
    setAnchorEl(null);
};

const CancelledOrder = ({ searchQuery, allProducts }) => {
    const { data: orderRedux, isLoading:load, isError } = useGetOrdersQuery("cancelled");
    const [products, setProducts] = useState([]);
    //when input change for filtering orders
    const [filterProducts, setFilterProducts] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // console.log(selectedOption);
    // Filter
    const [age, setAge] = useState([]);
    // console.log(age);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Tabs
    const [value, setValue] = useState("1");

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // axios
        //     .get(baseUrl + "/client/orders", {headers: headers})
        //     .then(function (response) {
        //         // handle success
        //         let allProduct = response?.data?.data;
        const userProduct = Array.from(allProducts).filter(
            (word) => word?.order_status == "cancelled"
        );
        setProducts(userProduct);
        setIsLoading(false);
        // });
    }, []);

    const statusSubmit = (id, status) => {
        // console.log(id);
        let statusUpdate = {
            order_id: id,
            status: selectedOption,
        };
        // console.log(status);

        axios
            .post(+ "/client/orders/status/update", statusUpdate, {
                headers: headers,
            })
            .then(function (response) {
                Swal.fire("Status Update !", response.data.msg, "success");
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.msg,
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });
    };

    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = orderRedux?.data?.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(products.length / perPage); i++) {
    //     pageNumbers.push(i);
    // }
    const pageNumbers = [];
    if (searchQuery?.length === 0) {
        for (let i = 1; i <= Math.ceil(orderRedux?.data?.length / perPage); i++) {
            pageNumbers.push(i);
        }
    } else if (searchQuery.length > 0) {
        for (let i = 1; i <= Math.ceil(filterProducts?.length / perPage); i++) {
            pageNumbers.push(i);
        }
    }
    //search method
    const handleChangeSearchBox = () => {
        const filtered = products.filter(item => item?.order_no?.toString().includes(searchQuery) || item?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || item?.phone?.includes(searchQuery));
        setFilterProducts(filtered)
    }
    useEffect(() => {
        handleChangeSearchBox()
    }, [searchQuery])

    const paginate = (pageNumber, value) => setCurrentPage(value);
    const today = new Date().toISOString().slice(0, 10);
    return (
        <>
            <div className="Pending">
                {
                    searchQuery?.length === 0 ? <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        {/* <Checkbox /> */}
                                    </th>
                                    <th>SL</th>
                                    <th>Order No</th>
                                    <th>Order Date</th>
                                    <th>Customer Name</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    {/* <th>Select Courier </th> */}
                                    {/* <th>Note</th> */}
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
                            ) : currentProduct?.length > 0 ? (
                                <>
                                    <tbody>
                                        {currentProduct?.map((product, index) => {
                                            return (
                                                <tr key={product?.order_no} product={product}>
                                                    <td>
                                                        {/* <Checkbox /> */}
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{product?.order_no}</td>
                                                    <td>
                                                        {product?.created_at?.slice(0, 10) >= today ? moment(product?.created_at).fromNow() : moment(product?.created_at).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td>
                                                        {/* {product?.customer?.name} */}
                                                        <Tooltip
                                                            title={product?.customer?.name}
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.customer_name?.length < 12 ? (
                                                                    <span>{product?.customer_name}</span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.customer_name?.slice(0, 13)}...
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                    <td>{product.phone}</td>
                                                    <td>
                                                        {/* {product?.customer?.address} */}
                                                        <Tooltip
                                                            title={product?.address}
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.address?.length <= 15 ? (
                                                                    <span>{product?.address}</span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.address?.slice(0, 13)}...
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        {/* {product?.order_details[0]?.product?.product_name} */}
                                                        <Tooltip
                                                            title={
                                                                product?.order_details[0]?.product
                                                            }
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.order_details[0]?.product
                                                                    ?.length < 20 ? (
                                                                    <span>
                                                                        {
                                                                            product?.order_details[0]?.product
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.order_details[0]?.product?.slice(
                                                                            0,
                                                                            20
                                                                        )}...
                                                                    </span>
                                                                )}
                                                            </span>

                                                        </Tooltip>
                                                    </td>

                                                    <td>
                                                        {
                                                            product?.order_details?.reduce((prevVal, currentVal) => {
                                                                return prevVal + (currentVal?.quantity)
                                                            }, 0)
                                                        }
                                                    </td>

                                                    <td>
                                                        {product?.grand_total}
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
                                                </div>
                                            </div>
                                        </section>
                                    </td>
                                </tr>
                            )}
                        </table>
                        <div>
                            <Box
                                sx={{
                                    margin: "auto",
                                    width: "fit-content",
                                    alignItems: "center",
                                }}
                            >
                                <Stack spacing={2}>
                                    {/* {console.log(pageNumbers.length + 1)} */}
                                    <Pagination
                                        count={pageNumbers?.length}
                                        variant='outlined'
                                        page={currentPage}
                                        onChange={paginate}
                                    />
                                </Stack>
                            </Box>
                        </div>
                    </div> : <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        {/* <Checkbox /> */}
                                    </th>
                                    <th>SL</th>
                                    <th>Order No</th>
                                    <th>Order Date</th>
                                    <th>Customer Name</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    {/* <th>Select Courier </th> */}
                                    {/* <th>Note</th> */}
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
                            ) : filterProducts?.length > 0 ? (
                                <>
                                    <tbody>
                                        {filterProducts?.map((product, index) => {
                                            return (
                                                <tr key={product?.order_no} product={product}>
                                                    <td>
                                                        {/* <Checkbox /> */}
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{product?.order_no}</td>
                                                    <td>
                                                        {product?.created_at?.slice(0, 10) >= today ? moment(product?.created_at).fromNow() : moment(product?.created_at).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td>
                                                        {/* {product?.customer?.name} */}
                                                        <Tooltip
                                                            title={product?.customer?.name}
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.customer_name?.length < 12 ? (
                                                                    <span>{product?.customer_name}</span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.customer_name?.slice(0, 13)}...
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                    <td>{product.phone}</td>
                                                    <td>
                                                        {/* {product?.customer?.address} */}
                                                        <Tooltip
                                                            title={product?.address}
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.address?.length < 15 ? (
                                                                    <span>{product?.address}</span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.address?.slice(0, 13)}...
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        {/* {product?.order_details[0]?.product?.product_name} */}
                                                        <Tooltip
                                                            title={
                                                                product?.order_details[0]?.product
                                                            }
                                                            placement='top-start'
                                                        >
                                                            <span>
                                                                {product?.order_details[0]?.product
                                                                    ?.length < 20 ? (
                                                                    <span>
                                                                        {
                                                                            product?.order_details[0]?.product
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.order_details[0]?.product?.slice(
                                                                            0,
                                                                            20
                                                                        )}...
                                                                    </span>
                                                                )}
                                                            </span>


                                                        </Tooltip>
                                                    </td>
                                                    <td>

                                                        {
                                                            product?.order_details?.reduce((prevVal, currentVal) => {
                                                                return prevVal + (currentVal?.quantity)
                                                            }, 0)
                                                        }
                                                    </td>

                                                    <td>
                                                        {product?.grand_total}
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
                                                </div>
                                            </div>
                                        </section>
                                    </td>
                                </tr>
                            )}
                        </table>
                        <div >
                            <Box
                                sx={{
                                    margin: "auto",
                                    width: "fit-content",
                                    alignItems: "center",
                                }}
                            >
                                <Stack spacing={2}>
                                    {/* {console.log(pageNumbers.length + 1)} */}
                                    <Pagination
                                        count={pageNumbers?.length}
                                        variant='outlined'
                                        page={currentPage}
                                        onChange={paginate}
                                    />
                                </Stack>
                            </Box>
                        </div>
                    </div>
                }


            </div>
        </>
    );
};

export default CancelledOrder;
