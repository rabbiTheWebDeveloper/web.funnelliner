import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseTest } from "../../constant/constant";
import { headers } from "../../pages/api";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";




const handleClose = () => {
    setAnchorEl(null);
};

const DelivereOrder = ({ searchQuery, allProducts, advanceStatus }) => {
    const { data, isLoading, isError } = useGetOrdersQuery("delivered");
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    // const [isLoading, setIsLoading] = useState(true);

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
    // console.log('Delivery ', props)
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

    // confirm order full function

    // comment token
    // const token = Cookies.get("token");
    // // console.log(token)
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

    // useEffect(() => {
    //     // axios
    //     //     .get(baseUrl + "/client/orders", {headers: headers})
    //     //     .then(function (response) {
    //     // handle success
    //     // let allProduct = response?.data?.data;
    //     const userProduct = Array.from(orderRedux?.data).filter(
    //         (word) => word.order_status == "delivered"
    //     );
    //     setProducts(userProduct);
    //     setIsLoading(false);
    //     // });
    // }, []);

    const statusSubmit = (id, status) => {
        // console.log(id);
        let statusUpdate = {
            order_id: id,
            status: status,
        };
        // console.log(status);

        axios
            .post(baseTest + "/client/orders/status/update", statusUpdate, {
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
    const currentProduct = data?.data?.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    const pageNumbers = [];
    if (searchQuery?.length === 0) {
        for (let i = 1; i <= Math.ceil(data?.data?.length / perPage); i++) {
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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const today = new Date().toISOString().slice(0, 10);


    // console.log("develery " , data.data)
    return (
        <>
            <div className="Pending">
                <div className="MoveToComplete">

                </div>
                {
                    searchQuery?.length === 0 ?
                        <div className="ProductTable">
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
                                        <th>Discount</th>
                                        {advanceStatus === true && (
                                            <>
                                                <th>Adv</th>
                                                <th>Due</th>
                                            </>
                                        )}
                                        <th>Total Price</th>
                                        <th>Delivered By</th>
                                        {/* <th>Delivery status</th> */}
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
                                                            Home
                                                        </td>

                                                        {/* <td>
       <div className="DropDown">
         <Select
           {...props}
           className="select__color"
           onChange={(e) => {statusSubmit(product?.id ,e.value)}}
           defaultValue={options[0]}
           options={options}
           styles={{
             option: (provided, state) => ({
               ...provided,
               borderBottom: "1px solid #ddd",
               color: state.isSelected ? "#fff" : "#666",
               background: state.isSelected ? "#556FF6" : "#fff",
               cursor: "pointer",
               margin: "0px",
               ":active": {
                 backgroundColor: "#ddd",
                 cursor: "pointer",
               },
             }),
             singleValue: (provided, state) => ({
               ...provided,
               color: "#fff",

                                                        </td>
                                                        <td>
                                                            {product?.due}
                                                        </td>

               ":focus-within": {
                 ...styles[":focus-within"],
                 border: "none",
                 boxShadow: "none",
               },
             }),
             menuList: (styles) => ({
               ...styles,
               margin: "0px",
               padding: "0px",
             }),
             noOptionsMessage: (styles) => ({
               ...styles,
               background: "red",
               color: "#fff",
             }),
           }}
         />
       </div>
     </td> */}
                                                        {/* <td>Note</td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={13}>
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
                        </div> :

                        <div className="ProductTable">
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
                                        <th>Adv</th>
                                        <th>Due</th>
                                        <th>Total Price</th>
                                        <th>Delivered By</th>
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


                                                            {product?.advanced}


                                                        </td>
                                                        <td>
                                                            {product?.due}
                                                        </td>



                                                        <td>
                                                            {product?.grand_total}
                                                        </td>
                                                        <td>
                                                            {product?.grand_total}
                                                        </td>
                                                        <td>
                                                            Home Delivery
                                                        </td>

                                                        {/* <td>
   <div className="DropDown">
     <Select
       {...props}
       className="select__color"
       onChange={(e) => {statusSubmit(product?.id ,e.value)}}
       defaultValue={options[0]}
       options={options}
       styles={{
         option: (provided, state) => ({
           ...provided,
           borderBottom: "1px solid #ddd",
           color: state.isSelected ? "#fff" : "#666",
           background: state.isSelected ? "#556FF6" : "#fff",
           cursor: "pointer",
           margin: "0px",
           ":active": {
             backgroundColor: "#ddd",
             cursor: "pointer",
           },
         }),
         singleValue: (provided, state) => ({
           ...provided,
           color: "#fff",

           fontSize: "15px",
         }),
         control: (styles) => ({
           ...styles,
           backgroundColor: "#556FF6",
           padding: "3px 0px",
           margin: "0px 0px",
           border: "none",

           ":focus-within": {
             ...styles[":focus-within"],
             border: "none",
             boxShadow: "none",
           },
         }),
         menuList: (styles) => ({
           ...styles,
           margin: "0px",
           padding: "0px",
         }),
         noOptionsMessage: (styles) => ({
           ...styles,
           background: "red",
           color: "#fff",
         }),
       }}
     />
   </div>
 </td> */}
                                                        {/* <td>Note</td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={15}>
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
                        </div>
                }



            </div>
        </>
    );
};

export default DelivereOrder;
