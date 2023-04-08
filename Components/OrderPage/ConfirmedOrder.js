import { Box, Button, Pagination, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";
import { useGetOrdersQuery } from "../../redux/features/api/orderApiSlice";


const handleClose = ({ searchQuery }) => {
    setAnchorEl(null);
};

const ConfirmedOrder = ({ searchQuery, allProducts, advanceStatus }) => {
    const { data: orderRedux, isLoading:confirmLoding, isError } = useGetOrdersQuery("confirmed");
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updateData, setUpdateData] = useState("");
    const [courierList, setCourierList] = useState({});
    // console.log(selectedOption);
    // Filter
    const [age, setAge] = useState([]);
    // console.log(age);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // console.log("all product ", allProducts);
    // Tabs
    const [value, setValue] = useState("1");

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/courier/list", { headers: headers })
            .then(function (response) {
                // handle success
                let couriarList = response?.data;

                setCourierList(response?.data.data);
            });
    }, []);

    useEffect(() => {
        const userProduct = Array.from(allProducts).filter(
            (word) => word?.order_status == "confirmed"
        );
        setProducts(userProduct);
        setIsLoading(false);
        // });
    }, [updateData]);

    // curior api assign
    const router = useRouter()

    //manual  delivery 

    const officeSubmit = (id, status1) => {
        // console.log('Couriar Status', status);
        // console.log("Order status2 ", status1);
        if (status1 !== "delivered") {
            router.push("/courier")

        } else {
            let statusUpdate = {
                order_id: id,
                status: "delivered",
            };
            axios.post(
                process.env.API_URL + "/client/orders/status/update",
                statusUpdate,
                {
                    headers: headers,
                }
            )
                .then(function (response) {
                    Swal.fire(response.data.message, response.data.msg, "success");
                })
                .catch(function (error) {
                });

        }
    };
    const courierSubmit = (id, status1) => {
        // console.log('Couriar Status', status);
        // console.log("Order status2 ", status1);
        if (status1 !== "delivered") {
            let statusUpdate = {
                order_id: id,
                status: "shipped",
            };
            let courier = {
                order_id: id,
                provider: status1,
            };

            axios
                .post(
                    process.env.API_URL + "/client/orders/status/update",
                    statusUpdate,
                    {
                        headers: headers,
                    }
                )
                .then(function (response) {
                })
                .catch(function (error) {
                });

            axios
                .post(process.env.API_URL + "/client/courier/send-order", courier, {
                    headers: headers,
                })
                .then(function (response) {
                    // console.log(response.data);
                    // console.log(response.data);

                    Swal.fire(response.data.message, response.data.msg, "success");
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                        footer: error.message,
                    });
                });

        } else {
            let statusUpdate = {
                order_id: id,
                status: "delivered",
            };
            axios.post(
                process.env.API_URL + "/client/orders/status/update",
                statusUpdate,
                {
                    headers: headers,
                }
            )
                .then(function (response) {
                    Swal.fire(response.data.message, response.data.msg, "success");
                })
                .catch(function (error) {
                });

        }
    };


    // pagination
    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = orderRedux?.data?.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );
    const pageNumbers = [];
    if (searchQuery.length === 0) {
        for (let i = 1; i <= Math.ceil(orderRedux?.data?.length / perPage); i++) {
            pageNumbers.push(i);
        }
    } else if (searchQuery.length > 0) {
        for (let i = 1; i <= Math.ceil(filterProducts.length / perPage); i++) {
            pageNumbers.push(i);
        }
    }
    const paginate = (pageNumber, value) => setCurrentPage(value);

    // searching
    const today = new Date().toISOString().slice(0, 10);
    const handleChangeSearchBox = () => {
        const filtered = products.filter(item => item?.order_no?.toString().includes(searchQuery) || item?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || item?.phone?.includes(searchQuery));
        setFilterProducts(filtered)
    }

    useEffect(() => {
        handleChangeSearchBox();
    }, [searchQuery]);

    // advance add
    const advanceAdd = (id, tk) => {
        let adv = {
            advanced: tk,
        };

        // console.log(tk?.length);
        if (tk?.length > 0) {
            axios
                .post(
                    process.env.API_URL + `/client/order/advance-payment/${id}/update`,
                    adv,
                    {
                        headers: headers,
                    }
                )
                .then(function (response) {
                    toast.success("Advance Payment Successfully order!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setUpdateData(response.data.msg);
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error?.response?.data?.msg,
                        footer: error?.response?.data?.msg,
                    });
                });
        }
    };

    // note update

    const inputRef = useRef(null);
    const handleKeyDown = (id, event) => {
        if (event.key === "Enter") {
            let data = {
                note: event.target.value,
                type: "confirmed",
            };

            axios
                .post(process.env.API_URL + `/client/order/note/${id}/update`, data, {
                    headers: headers,
                })
                .then(function (response) {
                    toast.success("Note updated for Pending order!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    //   setUpdateData(response.data.msg);
                });
        }
    };
    const handleSubmitNote = (e, id, note) => {
        // console.log("noteValue", note);
        const newValue = e.target.value;
        // const inputValue = inputRef.current.value;

        if (note?.length !== newValue?.length && newValue) {
            let data = {
                note: newValue,
                type: "confirmed",
            };
            axios
                .post(process.env.API_URL + `/client/order/note/${id}/update`, data, {
                    headers: headers,
                })
                .then(function (response) {
                    // console.log(" note add ", response);
                    toast.success("Note updated for Follow Up order!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    //   setUpdateData(response.data.msg);
                });
        }
    };

    // discount

    const discountAdd = (id, tk) => {
        let adv = {
            discount: tk,
        };

        // console.log(tk?.length);
        if (tk?.length > 0) {
            axios
                .post(
                    process.env.API_URL + `/client/order/discount/${id}/update`,
                    adv,
                    {
                        headers: headers,
                    }
                )
                .then(function (response) {
                    toast.success("Discount updated for  order!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setUpdateData(response);
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error?.response?.data?.msg,
                        footer: error?.response?.data?.msg,
                    });
                });
        }
    };

    //   discount

    const handleKeyDownDiscount = (id, event, tk) => {
        if (event.key === "Enter") {
            let adv = {
                discount: tk,
            };

            // console.log(tk?.length);
            if (tk?.length > 0) {
                axios
                    .post(
                        process.env.API_URL + `/client/order/discount/${id}/update`,
                        adv,
                        {
                            headers: headers,
                        }
                    )
                    .then(function (response) {
                        toast.success("Discount updated for  order!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setUpdateData(response);
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: error?.response?.data?.msg,
                            footer: error?.response?.data?.msg,
                        });
                    });
            }
        }
    };

    return (
        <>
            <div className="Pending">
                <div className="MoveToComplete"></div>
                {/* first of all check search query is exists or empty, if search query is not exist open all orders div else search query is exits open filterOrders div*/}
                {searchQuery.length === 0 ? (
                    <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>{/* <Checkbox /> */}</th>
                                    <th>SL</th>
                                    <th>Order No</th>
                                    <th>Order Date</th>
                                    <th>Customer Name</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Discount</th>
                                    <th>Total Price</th>
                                    {advanceStatus === true && (
                                        <>
                                            <th>Adv</th>
                                            <th>Due</th>
                                        </>
                                    )}
                                    <th>Invoice Print</th>
                                    <th>Select Courier</th>
                                    <th>Note</th>
                                </tr>
                            </thead>

                            {isLoading ? (
                                <tr>
                                    <td colSpan={16}>
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
                                                    <td>{/* <Checkbox /> */}</td>
                                                    <td>{index + 1}</td>
                                                    <td>{product?.order_no}</td>
                                                    <td>
                                                        {product?.created_at?.slice(0, 10) >= today
                                                            ? moment(product?.created_at).fromNow()
                                                            : moment(product?.created_at).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                    </td>
                                                    <td>
                                                        <Tooltip
                                                            title={product?.customer?.name}
                                                            placement="top-start"
                                                        >
                                                            <span>
                                                                {product?.customer_name.length < 12 ? (
                                                                    <span>{product?.customer_name}</span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.customer_name.slice(0, 13)}...
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                    <td>{product?.phone}</td>
                                                    <td>
                                                        <Tooltip
                                                            title={product?.address}
                                                            placement="top-start"
                                                        >
                                                            <span>
                                                                {product?.customer?.length < 15 ? (
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
                                                        <Tooltip
                                                            title={product?.order_details[0]?.product}
                                                            placement="top-start"
                                                        >
                                                            <span>
                                                                {product?.order_details[0]?.product?.length <
                                                                    20 ? (
                                                                    <span>
                                                                        {product?.order_details[0]?.product}
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.order_details[0]?.product?.slice(
                                                                            0,
                                                                            20
                                                                        )}
                                                                        ...
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
                                                    <td>{product?.discount}</td>
                                                    <td>{product?.grand_total}</td>

                                                    {advanceStatus === true && (
                                                        <>
                                                            <td>{product?.advanced}</td>
                                                            <td>{product?.due > 0 ? product?.due : "0"}</td>
                                                        </>
                                                    )}
                                                    <td>
                                                        {" "}
                                                        <Button className="Print">

                                                            <a target="_blank"
                                                                href={"/invoice-one/" + product?.id}
                                                                rel="noopener noreferrer">

                                                                Print <AiOutlinePrinter />
                                                            </a>
                                                            {/* <Link href={"/invoice-one/" + product?.id}>
                                                            {" "}
                                                            Print <AiOutlinePrinter/>
                                                        </Link> */}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        {courierList.length > 0 ? (
                                                            <td>
                                                                <select
                                                                    name=""
                                                                    onChange={(e) => {
                                                                        courierSubmit(product?.id, e.target.value);
                                                                    }}
                                                                >
                                                                    <option>Select Courier</option>
                                                                    <option key="delivered" value="delivered">
                                                                        Office Delivary
                                                                    </option>
                                                                    <option key="steadfast" value="steadfast">
                                                                        Steadfast
                                                                    </option>
                                                                </select>
                                                            </td>
                                                        ) : (
                                                            <td>


                                                                <select
                                                                    name=""
                                                                    onChange={(e) => {
                                                                        officeSubmit(product?.id, e.target.value);
                                                                    }}
                                                                >
                                                                    <option>Select Courier</option>
                                                                    <option key="delivered" value="delivered">
                                                                        Office Delivary
                                                                    </option>
                                                                    <option key="steadfast" value="steadfast" >
                                                                        Add Courier
                                                                    </option>
                                                                </select>
                                                                {/* <Button className="Print">
                                                                <Link href="/courier">
                                                                    {" "}
                                                                    Add Courier <CiDeliveryTruck/>
                                                                </Link>
                                                            </Button> */}
                                                            </td>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        <input
                                                            defaultValue={product?.note}
                                                            // ref={inputRef}
                                                            type="text"
                                                            placeholder="Note"
                                                            onKeyDown={(e) =>
                                                                handleKeyDown(product?.id, event)
                                                            }
                                                        // onChange={handleChangeNote}
                                                        // onBlur={(e) => handleSubmitNote(e, product?.id, product?.note)}
                                                        />{" "}
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
                ) : (
                    <div className="ProductTable">
                        {/* if search query length is exists */}
                        <table>
                            <thead>
                                <tr>
                                    <th>{/* <Checkbox /> */}</th>
                                    <th>SL</th>
                                    <th>Order No</th>
                                    <th>Order Date</th>
                                    <th>Customer Name</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    {advanceStatus === true && (
                                        <>
                                            <th>Adv</th>
                                            <th>Due</th>
                                        </>
                                    )}
                                    <th>Invoice Print</th>
                                    <th>Select Courier</th>
                                    <th>Note</th>
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
                            ) : filterProducts.length > 0 ? (
                                <>
                                    <tbody>
                                        {filterProducts?.map((product, index) => {
                                            return (
                                                <tr key={product?.order_no} product={product}>
                                                    <td>{/* <Checkbox /> */}</td>
                                                    <td>{index + 1}</td>
                                                    <td>{product.order_no}</td>
                                                    <td>
                                                        {product.created_at?.slice(0, 10) >= today
                                                            ? moment(product?.created_at).fromNow()
                                                            : moment(product?.created_at).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                    </td>
                                                    <td>
                                                        <Tooltip
                                                            title={product?.customer_name}
                                                            placement="top-start"
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
                                                    <td>{product?.phone}</td>
                                                    <td>
                                                        <Tooltip
                                                            title={product?.address}
                                                            placement="top-start"
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
                                                        <Tooltip
                                                            title={product?.order_details[0]?.product}
                                                            placement="top-start"
                                                        >
                                                            <span>
                                                                {product?.order_details[0]?.product?.length <
                                                                    20 ? (
                                                                    <span>
                                                                        {product?.order_details[0]?.product}
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        {product?.order_details[0]?.product?.slice(
                                                                            0,
                                                                            20
                                                                        )}
                                                                        ...
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
                                                    <td>{product?.grand_total}</td>

                                                    {advanceStatus === true && (
                                                        <>
                                                            <td>
                                                                {" "}
                                                                <input
                                                                    defaultValue={product?.advanced}
                                                                    onBlur={(e) => {
                                                                        advanceAdd(product?.id, e.target.value);
                                                                    }}
                                                                    type="text"
                                                                    placeholder="Advance"
                                                                />{" "}
                                                            </td>
                                                            <td>{product?.due > 0 ? product?.due : "0"}</td>
                                                        </>
                                                    )}
                                                    <td>
                                                        {" "}
                                                        <Button className="Print">
                                                            <Link href={"/invoice-one/" + product?.id}>
                                                                {" "}
                                                                Print <AiOutlinePrinter />
                                                            </Link>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        {courierList?.length > 0 ? (
                                                            <td>
                                                                <select
                                                                    name=""
                                                                    onChange={(e) => {
                                                                        courierSubmit(product?.id, e.target.value);
                                                                    }}
                                                                >
                                                                    <option>Select Courier</option>
                                                                    <option
                                                                        key="steadfast"
                                                                        value="steadfast"
                                                                        value1="shipped"
                                                                    >
                                                                        Steadfast
                                                                    </option>
                                                                </select>
                                                            </td>
                                                        ) : (
                                                            <td>
                                                                <Button className="Print">
                                                                    <Link href="/courier">
                                                                        {" "}
                                                                        Add Courier <CiDeliveryTruck />
                                                                    </Link>
                                                                </Button>
                                                            </td>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        <input
                                                            defaultValue={product?.note}
                                                            ref={inputRef}
                                                            type="text"
                                                            placeholder="Note"
                                                            onBlur={() => handleSubmitNote(product?.id)}
                                                        />{" "}
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
                )}
                {/* when order serach open this */}
            </div>
        </>
    );
};

export default ConfirmedOrder;
