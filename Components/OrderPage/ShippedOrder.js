import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { headers } from "../../pages/api";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";


const ShippedOrder = ({ searchQuery, allProducts, advanceStatus }) => {
    const { data: orderRedux, isLoading:confirmLoding, isError } = useGetOrdersQuery("shipped");
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updateData, setUpdateData] = useState("");

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

        const userProduct = Array.from(allProducts).filter(
            (word) => word?.courier_status == "In Review"
        );
        setProducts(userProduct);
        console.log("filter Shipping Order", userProduct)
        // setProducts(filteredData);
        setIsLoading(false);
        // });
    }, [allProducts]);


    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = orderRedux?.data?.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    const pageNumbers = [];
    if (searchQuery?.length === 0) {
        for (let i = 1; i <= Math.ceil(orderRedux?.data?.length / perPage); i++) {
            pageNumbers.push(i);
        }
    } else if (searchQuery?.length > 0) {
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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const today = new Date().toISOString().slice(0, 10);


    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const handleKeyDown = (id, event) => {

        if (event.key === 'Enter') {

            let data = {
                note: event.target.value,
                type: "shipped",
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

    //   const handleSubmitNote = (id ,e) => {
    //     //   event.preventDefault();
    //     let data = {
    //       note: inputValue,
    //       type: "shipped",
    //     };


    //     axios
    //       .post(process.env.API_URL + `/client/order/note/${id}/update`, data, {
    //         headers: headers,
    //       })
    //       .then(function (response) {
    //         toast.success("Note updated for Pending order!", {
    //           position: "top-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "dark",
    //         });
    //         //   setUpdateData(response.data.msg);
    //       });
    //   };
    return (
        <>
            <div className='Pending'>
                <div className='MoveToComplete'>
                </div>

                {
                    //if search string is empty
                    searchQuery?.length === 0 ?
                        <div className='ProductTable'>
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>SL</th>
                                        <th>Order No</th>
                                        <th>Order Date</th>
                                        <th>Customer Name</th>
                                        <th>Contact No.</th>
                                        <th>Address</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Discount</th>
                                        {advanceStatus === true && (
                                            <>
                                                <th>Adv</th>
                                                <th>Due</th>
                                            </>
                                        )}

                                        <th>Total Price</th>
                                        <th>Courier Status</th>
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
                                ) : currentProduct?.length > 0 ? (
                                    <>
                                        <tbody>
                                            {currentProduct?.map((product, index) => {
                                                return (
                                                    <tr key={index} product={product}>
                                                        <td>{index + 1}</td>

                                                        <td>{product.order_no}</td>
                                                        <td>
                                                            {product.created_at?.slice(0, 10) >= today ? moment(product?.created_at).fromNow() : moment(product?.created_at).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td>
                                                            <Tooltip
                                                                title={product?.customer_name}
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

                                                            {/* {product?.customer?.name} */}
                                                        </td>
                                                        <td>{product?.phone}</td>
                                                        <td>
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
                                                            {/* {product?.customer?.address} */}
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
                                                                    {product?.order_details[0]?.product?.length < 20 ? (
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
                                                        <td>
                                                            {product?.discount}
                                                        </td>

                                                        {
                                                            advanceStatus === true &&
                                                            <>
                                                                <td>
                                                                    {product?.advanced}
                                                                </td>
                                                                <td>
                                                                    {product?.due}
                                                                </td>
                                                            </>
                                                        }

                                                        <td>
                                                            {product?.grand_total}
                                                        </td>

                                                        <td>

                                                            {product?.courier_status}
                                                        </td>
                                                        <td className='NoteField'>
                                                            <input
                                                                defaultValue={product?.note}

                                                                type="text"
                                                                placeholder="Note"

                                                                onKeyDown={(e) => handleKeyDown(product?.id, event)}

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
                                            <section className='MiddleSection'>
                                                <div className='MiddleSectionContent'>
                                                    <div className='img'>
                                                        <img src='/error.svg' alt='' />
                                                    </div>

                                                    <div className='text'>
                                                        <p>Not Found</p>
                                                    </div>
                                                </div>
                                            </section>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div> :
                        //if search string exists opne this section
                        <div className='ProductTable'>
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>SL</th>
                                        <th>Order No</th>
                                        <th>Order Date</th>
                                        <th>Customer Name</th>
                                        <th>Contact No.</th>
                                        <th>Address</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Courier Status</th>
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
                                ) : filterProducts?.length > 0 ? (
                                    <>
                                        <tbody>
                                            {filterProducts?.map((product, index) => {
                                                return (
                                                    <tr key={index} product={product}>
                                                        <td>{index + 1}</td>

                                                        <td>{product.order_no}</td>
                                                        <td>
                                                            {product.created_at?.slice(0, 10) >= today ? moment(product?.created_at).fromNow() : moment(product?.created_at).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td>
                                                            <Tooltip
                                                                title={product?.customer?.name}
                                                                placement='top-start'
                                                            >
                                                                <span>
                                                                    {product?.customer?.name?.length < 12 ? (
                                                                        <span>{product?.customer?.name}</span>
                                                                    ) : (
                                                                        <span>
                                                                            {product?.customer?.name?.slice(0, 13)}...
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Tooltip>

                                                            {/* {product?.customer?.name} */}
                                                        </td>
                                                        <td>{product?.customer?.phone}</td>
                                                        <td>
                                                            <Tooltip
                                                                title={product?.customer?.address}
                                                                placement='top-start'
                                                            >
                                                                <span>
                                                                    {product?.address?.length < 15 ? (
                                                                        <span>{product?.customer?.address}</span>
                                                                    ) : (
                                                                        <span>
                                                                            {product?.customer?.address?.slice(0, 13)}...
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Tooltip>
                                                            {/* {product?.customer?.address} */}
                                                        </td>
                                                        <td>
                                                            {/* {product?.order_details[0]?.product?.product_name} */}
                                                            <Tooltip
                                                                title={
                                                                    product?.order_details[0]?.product?.product_name
                                                                }
                                                                placement='top-start'
                                                            >
                                                                <span>
                                                                    {product?.order_details[0]?.product?.length < 20 ? (
                                                                        <span>
                                                                            {
                                                                                product?.order_details[0]?.product
                                                                                    ?.product_name
                                                                            }
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
                                                        <td>
                                                            {product?.order_details[0]?.product_qty *
                                                                product?.order_details[0]?.product?.price}
                                                        </td>

                                                        <td>

                                                            {product?.courier_status}
                                                        </td>
                                                        <td>Note</td>
                                                        {/* <td>Note</td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={10}>
                                            <section className='MiddleSection'>
                                                <div className='MiddleSectionContent'>
                                                    <div className='img'>
                                                        <img src='/error.svg' alt='' />
                                                    </div>

                                                    <div className='text'>
                                                        <p>Not Found</p>
                                                    </div>
                                                </div>
                                            </section>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>
                }


            </div>
        </>
    );
};

export default ShippedOrder;
