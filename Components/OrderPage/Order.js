import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Button,
    Container,
    Grid,
    Pagination,
    Stack,
    Tab,
    TextField
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import PopupState from "material-ui-popup-state";
import moment from "moment/moment";
import getConfig from 'next/config';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineReceiptLong } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";
import { useGetOrdersQuery } from "../../redux/features/api/orderApiSlice";
import CancelledOrder from "./CancelledOrder";
import ConfirmedOrder from "./ConfirmedOrder";
import DelivereOrder from "./DelivereOrder";
import FollowUpOrder from "./FollowUpOrder";
import ManualOrder from "./ManualOrder";
import OrderDetails from "./OrderDetails";
import OrderReturn from "./OrderReturn";
import OrderUpdate from "./OrderUpdate";
import ShippedOrder from "./ShippedOrder";


const handleClose = () => {
  setAnchorEl(null);
};
const Order = ({ ...props }) => {
  const { data: orderRedux, isLoading, isError } = useGetOrdersQuery("pending");


  const [isChecked, setIsChecked] = useState(false);
  // Filter
  const [age, setAge] = useState([]);


  const [isLoading1, setIsLoading] = useState(true);
  const [updateData, setUpdateData] = useState("");
  const [advanceStatus, setAdvanceStatus] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  // console.log(age);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // Tabs
  const [value, setValue] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [OrderDiscount, setOrderDiscount] = useState('')

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [openSales, setOpenSales] = useState(false);
  const handleOpenSales = () => setOpenSales(true);
  const handleCloseSales = () => setOpenSales(false);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const addressWordSplit = (address) => {
    const words = address.split(" ")?.length;
    // console.log(words);
  };
  // quentites 


  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.API_URL;


  // product list 
  const [productsList, setProductsList] = useState([]);
  const handleFetchProduct = async () => {
    try {
      let data = await axios({
        method: "get",
        url: `${apiUrl}/client/products`,
        headers: headers,
      });

      // console.log("setSalesTarget",data.data.data)
      setProductsList(data?.data?.data);
    } catch (err) {
      // console.log(err)
    }
  };
  useEffect(() => {
    handleFetchProduct();
  }, []);
  // ?page=1&type=pending
  const handleFetchOrder = async () => {
    try {
      let data = await axios({
        method: "get",
        url: `https://dev.funnelliner.com/api/v1/client/orders?type=confirmed`,
        headers: headers,
      });
      let allProduct = data?.data?.data;
      console.log("order", data.data)
      setAllProducts(allProduct);
      const userProduct = Array.from(allProduct).filter(
        (word) => word?.order_status === "pending"
      );
      setProducts(userProduct);
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    handleFetchOrder();
  }, [updateData]);


  // useEffect(() => {
  //   axios.get(apiUrl + "/client/orders", { headers: headers })
  //     .then(function (response) {
  //       // handle success
  //       let allProduct = response?.data?.data;
  //       setAllProducts(allProduct);
  //       const userProduct = Array.from(allProduct).filter(
  //         (word) => word?.order_status === "pending"
  //       );
  //       setProducts(userProduct);
  //       setIsLoading(false);
  //     });
  // }, [updateData]);
 console.log("orderRedux" , advanceStatus)
  const statusSubmit = (id, status) => {

    let statusUpdate = {
      order_id: id,
      status: status,
    };
    // console.lo

    if (status === "cancelled") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: " Yes , Cancel It!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              apiUrl + "/client/orders/status/update",
              statusUpdate,
              {
                headers: headers,
              }
            )
            .then(function (response) {
              toast.success("Order Status Update to Successfully", {
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
              // console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data?.msg,
                footer: error?.response?.data?.msg,
              });
            });
        }
      });
    } else {
      axios
        .post(
          apiUrl + "/client/orders/status/update",
          statusUpdate,
          {
            headers: headers,
          }
        )
        .then(function (response) {
          toast.success("Order Status Update to Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          window.location.href = "/order";
          setUpdateData(response);
        })
        .catch(function (error) {
          // console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.msg,
            footer: error?.response?.data?.msg,
          });
        });
    }
  };

  // useEffect( () =>{

  // } , [])
  const indexOfLastProducts = currentPage * perPage;
  const indexOfFirstProducts = indexOfLastProducts - perPage;
  const currentProduct =
  orderRedux?.data && orderRedux?.data?.slice(indexOfFirstProducts, indexOfLastProducts);

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
  // const handleChangeSearchBox = () => {
  //   const filterProducts = products.filter((item) => {
  //     let phoneNumber = item?.customer?.phone;
  //     if (item?.customer?.phone?.slice(0, 3 == "+88")) {
  //       phoneNumber = item?.customer?.phone?.slice(
  //         4,
  //         item?.customer?.phone?.length
  //       );
  //     }
  //     return (
  //       item?.order_no == searchQuery ||
  //       item?.customer?.name.toLowerCase() == searchQuery.toLowerCase() ||
  //       phoneNumber == searchQuery
  //     );
  //   });
  //   // console.log("filterProducts", filterProducts)
  //   setFilterProducts(filterProducts);
  // };





  const handleChangeSearchBox = () => {
    const filtered = products.filter(item => item?.order_no?.toString().includes(searchQuery) || item?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || item?.phone?.includes(searchQuery));
    setFilterProducts(filtered)
  }
  useEffect(() => {
    handleChangeSearchBox();
  }, [searchQuery]);

  const paginate = (pageNumber, value) => setCurrentPage(value);
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
          toast.success("Advance payment updated for order!", {
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

  const today = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    axios
      .get(apiUrl + "/client/settings/advance-payment/status", {
        headers: headers,
      })
      .then(function (response) {
        setAdvanceStatus(response.data.data.advanced_payment);
      });
  }, []);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchResult, setSearchResult] = useState([]);


  // note update

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  // const debouncedSubmit = debounce(handleSubmitNote, 500);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDownNote = (id, event) => {
    if (event.key === "Enter") {
      let data = {
        note: event.target.value,
        type: "pending",
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

  // const handleSubmitNote = (id ,e) => {
  //   //   event.preventDefault();
  //   let data = {
  //     note: inputValue,
  //     type: "pending",
  //   };

  //   axios.post(process.env.API_URL + `/client/order/note/${id}/update`, data, {
  //       headers: headers,
  //     })
  //     .then(function (response) {
  //       toast.success("Note updated for Pending order!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //       //   setUpdateData(response.data.msg);
  //     });
  // };

  // discount

  const discountAdd = (id, tk) => {
    let adv = {
      discount: tk,
    };

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
  // delete

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You wan to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(apiUrl + `/client/order/${id}/delete`, {}, {
          headers: headers,
        })
          .then(function (result) {
            // console.log("result", result)
            // handle success
            // console.log(result);
            if (result) {
              setProducts((pd) => {
                const filter = products.filter((prod) => {
                  return prod.id !== id;
                });
                return [...filter];
              });
              Swal.fire("Deleted!", "Your file has been deleteddd.", "success");
            } else {
            }
          }).catch((errr) => {
            alert("SOme thing went wrong")
          })

      }
    });
  };


  // advance  key 

  const handleKeyDownAdvance = (id, event, tk) => {
    if (event.key === "Enter") {
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
            toast.success("Advance payment updated for order!", {
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

  // discount 

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
  console.log("Punding" ,currentProduct)

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
                    <MdOutlineReceiptLong />
                  </div>

                  <div className="text">
                    <h4>Orders </h4>
                    <p>Order List</p>
                  </div>
                </div>

                {/* Right */}
                <div className="Right d_flex">
                  {/* item */}
                  <div className="FilterItem">
                    <div className="CustomeInput">
                      <TextField
                        // onKeyPress={(e) => e.key === 'Enter' && handleClickSearchBtn()}
                        onChange={handleSearchInput}
                        id="outlined-basic"
                        label="Search Here..."
                        variant="outlined"
                      />
                      <Button
                        id="orderSearchButton"
                      // onClick={handleClickSearchBtn}
                      >
                        {" "}
                        <BsSearch />{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <ToastContainer />
          {/* DashboardSettingTabs */}
          <div className="DashboardSettingTabs WebsiteSettingPage">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <div className="d_flex d_justify">
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Pending" value="1" />
                      <Tab label="Confirmed" value="2" />
                      <Tab label="Cancelled" value="3" />
                      <Tab label="Shipped" value="4" />
                      <Tab label="Delivered" value="5" />
                      <Tab label="Order Return" value="6" />
                      <Tab label="Follow Up" value="7" />
                    </TabList>

                    {/* <div className="FollowUpOrderFilter">
                      
                      <div className="">
                        <h4>Find Your Follow Up Order</h4>
                        <select>
                          <option value="">Today</option>
                          <option value="">Tomorrow</option>
                          <option value="">Next 7 Days</option>
                          <option value="">Custom Date</option>
                        </select>
                      </div>
                      <div className="InputDate d_flex">
                        <div className="Item">
                          <label>To</label>
                          <input type="date" />
                        </div>
                        <div className="Item">
                          <label>From</label>
                          <input type="date" />
                        </div>
                      </div>
                    </div> */}

                  </div>
                </Box>

                {/* Pending */}
                <TabPanel value="1">
                  <div className="Pending">
                    <div className="MoveToComplete d_flex d_justify">
                      {/* Dropdown */}
                      <div className="DropDown">
                        <PopupState variant="popover" popupId="DropDown">
                          {(popupState) => <></>}
                        </PopupState>
                      </div>

                      {/* modal */}
                      <ManualOrder products={productsList} setUpdateData={setUpdateData}></ManualOrder>
                    </div>

                    {searchQuery?.length === 0 ? (
                      <div className="ProductTable">
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>SL</th>
                              <th>Order No</th>
                              <th>Order Date</th>
                              <th>Customer</th>
                              <th>Contact No.</th>
                              <th>Addr.</th>
                              <th>Product Name</th>
                              <th>Product Price</th>
                              <th>Quantity</th>
                              <th>Discount</th>
                              <th>Total Price</th>
                              {advanceStatus === true && (
                                <>
                                  <th>Adv</th>
                                  <th>Due</th>
                                </>
                              )}

                              <th>Status</th>
                              <th>Note</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          {/* {currentProduct?.length > 0 &&( */}
                          {isLoading ? (
                            <tr>
                              <td colSpan={15}>
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
                          ) : currentProduct && currentProduct?.length > 0 ? (
                            <>
                              <tbody>
                                {currentProduct?.map((product, index) => {
                                  return (
                                    <tr key={index} product={product}>
                                      <td>
                                        {/* <Checkbox checked={isChecked} /> */}
                                      </td>
                                      <td>{index + 1}</td>
                                      <td>{product.order_no}</td>
                                      <td>
                                        {product?.created_at?.slice(0, 10) >=
                                          today
                                          ? moment(
                                            product?.created_at
                                          ).fromNow()
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
                                            {product?.customer_name?.length <
                                              12 ? (
                                              <span>
                                                {product?.customer_name}
                                              </span>
                                            ) : (
                                              <span>
                                                {product?.customer_name?.slice(
                                                  0,
                                                  13
                                                )}
                                                ...
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
                                                {product?.address?.slice(0, 13)}
                                                ...
                                              </span>
                                            )}
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <Tooltip
                                          title={
                                            product?.order_details !== undefined && product?.order_details.length > 0 ? product?.order_details[0].product : ""
                                          }
                                          placement="top-start"
                                        >
                                          <span>
                                            {product?.order_details.length && product?.order_details[0].product
                                              ?.length < 15 ? (
                                              <span>
                                                {
                                                  product?.order_details[0]
                                                    ?.product
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

                                      <td>{product?.order_details[0]?.price}</td>

                                      <td>
                                        {
                                          product?.order_details?.reduce((prevVal, currentVal) => {
                                            return prevVal + (currentVal?.quantity)
                                          }, 0)
                                        }
                                      </td>
                                      <td>


                                        {" "}
                                        <input
                                          // value={product?.discount}
                                          defaultValue={product?.discount}
                                          onKeyDown={(e) =>
                                            handleKeyDownDiscount(product?.id, event, e.target.value)
                                          }
                                          type="text"
                                          placeholder="Discount"
                                        /> {" "}
                                        {product?.discount_type !== "percent" ? " ৳ " : "%"}
                                      </td>
                                      <td>{product?.discounted_total}</td>

                                      {advanceStatus === true && (
                                        <>
                                          <td>
                                            {" "}
                                            <input
                                              defaultValue={product?.advanced}
                                              onKeyDown={(e) =>
                                                handleKeyDownAdvance(product?.id, event, e.target.value)
                                              }
                                              // onBlur={(e) => {
                                              //   advanceAdd(
                                              //     product?.id,
                                              //     e.target.value
                                              //   );
                                              // }}
                                              type="text"
                                              placeholder="Advance"
                                            />{" "}
                                          </td>
                                          <td>{product?.due > 0 ? product?.due : "0"}</td>
                                        </>
                                      )}

                                      <td>
                                        <select
                                          name=""
                                          onChange={(e) => {
                                            statusSubmit(
                                              product?.id,
                                              e.target.value
                                            );
                                          }}
                                        >
                                          <option value="pending">
                                            Pending
                                          </option>
                                          <option value="cancelled">
                                            Cancelled
                                          </option>
                                          <option value="confirmed">
                                            Confirmed
                                          </option>
                                          <option value="follow_up">
                                            Follow up
                                          </option>
                                        </select>
                                      </td>
                                      {/* Note Part */}
                                      <td className="NoteField">
                                        {" "}
                                        <input
                                          defaultValue={product?.note}
                                          type="text"
                                          placeholder="Note"
                                          onKeyDown={(e) => handleKeyDownNote(product?.id, event)}

                                        />{" "}
                                      </td>
                                      <td className="EditViewDelete">
                                        <button>
                                          {" "}
                                          <OrderDetails
                                            id={product.id}
                                          ></OrderDetails>{" "}
                                        </button>
                                        <button>
                                          <OrderUpdate
                                            products={productsList}
                                            id={product.id}
                                          ></OrderUpdate>{" "}
                                        </button>
                                        <button>
                                          <Link
                                            href=""
                                            onClick={() =>
                                              deleteProduct(product.id)
                                            }
                                          >
                                            <RiDeleteBin6Line />
                                          </Link>
                                        </button>
                                      </td>
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
                                count={pageNumbers?.length}
                                page={currentPage}
                                onChange={paginate}
                              />
                            </Stack>
                          </Box>
                        </div>
                      </div>
                    ) : (
                      //if search text is exist open this section
                      <div className="ProductTable">
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>SL</th>
                              <th>Order No</th>
                              <th>Order Date</th>
                              <th>Customer</th>
                              <th>Contact No.</th>
                              <th>Addr.</th>
                              <th>Product Name</th>
                              <th>Product Price</th>
                              <th>Quantity</th>
                              <th>Discount</th>
                              <th>Total Price</th>
                              {advanceStatus === true && (
                                <>
                                  <th>Adv</th>
                                  <th>Due</th>
                                </>
                              )}

                              <th>Status</th>
                              <th>Note</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          {/* {currentProduct?.length > 0 &&( */}
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
                          ) : filterProducts && filterProducts?.length > 0 ? (
                            <>
                              <tbody>
                                {filterProducts?.map((product, index) => {
                                  return (
                                    <tr key={index} product={product}>
                                      <td>
                                        {/* <Checkbox checked={isChecked} /> */}
                                      </td>
                                      <td>{index + 1}</td>
                                      <td>{product.order_no}</td>
                                      <td>
                                        {product?.created_at?.slice(0, 10) >=
                                          today
                                          ? moment(
                                            product?.created_at
                                          ).fromNow()
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
                                            {product?.customer_name?.length <
                                              12 ? (
                                              <span>
                                                {product?.customer_name}
                                              </span>
                                            ) : (
                                              <span>
                                                {product?.customer_name.slice(
                                                  0,
                                                  13
                                                )}
                                                ...
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
                                                {product?.address?.slice(0, 13)}
                                                ...
                                              </span>
                                            )}
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <Tooltip
                                          title={
                                            product?.order_details[0]?.product
                                          }
                                          placement="top-start"
                                        >
                                          <span>
                                            {product?.order_details[0]?.product
                                              ?.length < 15 ? (
                                              <span>
                                                {
                                                  product?.order_details[0]
                                                    ?.product
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
                                      <td>200</td>
                                      <td>
                                        {product?.order_details[0]?.quantity}
                                      </td>
                                      <td>
                                        {" "}
                                        <input
                                          defaultValue={product?.discount}
                                          onKeyDown={(e) =>
                                            handleKeyDownDiscount(product?.id, event, e.target.value)
                                          }
                                          // onBlur={(e) => {
                                          //   discountAdd(
                                          //     product?.id,
                                          //     e.target.value
                                          //   );
                                          // }}
                                          type="text"
                                          placeholder="Discount"
                                        />{" "}
                                        {product?.discount_type !== "percent" ? " ৳ " : "%"}
                                      </td>
                                      <td>{product?.grand_total}</td>

                                      {advanceStatus === true && (
                                        <>
                                          <td>
                                            {" "}
                                            <input
                                              defaultValue={product?.advanced}
                                              onKeyDown={(e) =>
                                                handleKeyDownAdvance(product?.id, event, e.target.value)
                                              }
                                              // onBlur={(e) => {
                                              //   advanceAdd(
                                              //     product?.id,
                                              //     e.target.value
                                              //   );
                                              // }}
                                              type="text"
                                              placeholder="Advance"
                                            />{" "}
                                          </td>
                                          <td>{product?.due > 0 ? product?.due : "0"}</td>
                                        </>
                                      )}

                                      <td>
                                        <select
                                          name=""
                                          onChange={(e) => {
                                            statusSubmit(
                                              product?.id,
                                              e.target.value
                                            );
                                          }}
                                        >
                                          <option value="pending">
                                            Pending
                                          </option>
                                          <option value="cancelled">
                                            Cancelled
                                          </option>
                                          <option value="confirmed">
                                            Confirmed
                                          </option>
                                          <option value="follow_up">
                                            Follow up
                                          </option>
                                        </select>
                                      </td>
                                      <td className="NoteField">
                                        {" "}
                                        <input
                                          defaultValue={product?.note}

                                          type="text"
                                          placeholder="Note"
                                          onKeyDown={(e) =>
                                            handleKeyDownNote(product?.id, event)
                                          }
                                        />{" "}
                                      </td>
                                      <td className="EditViewDelete">
                                        <button>
                                          {" "}
                                          <OrderDetails
                                            id={product.id}
                                          ></OrderDetails>{" "}
                                        </button>
                                        <button>
                                          <OrderUpdate
                                            id={product.id}
                                          ></OrderUpdate>{" "}
                                        </button>
                                        <button>
                                          <Link
                                            href=""
                                            onClick={() =>
                                              deleteProduct(product.id)
                                            }
                                          >
                                            <RiDeleteBin6Line />
                                          </Link>
                                        </button>
                                      </td>
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
                        {currentPage > 1 && (
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
                                  count={pageNumbers?.length}
                                  page={currentPage}
                                  onChange={paginate}
                                />
                              </Stack>
                            </Box>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabPanel>

                {/* Confirmed */}
                <TabPanel value="2">
                  <ConfirmedOrder
                    advanceStatus={advanceStatus}
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                  ></ConfirmedOrder>
                </TabPanel>

                {/* Cancelled */}
                <TabPanel value="3">
                  <CancelledOrder
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                  ></CancelledOrder>
                </TabPanel>

                {/* Shipped */}
                <TabPanel value="4">
                  <ShippedOrder
                    advanceStatus={advanceStatus}
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                  ></ShippedOrder>
                </TabPanel>

                {/* Shipped */}
                <TabPanel value="5">
                  <DelivereOrder
                    advanceStatus={advanceStatus}
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                  ></DelivereOrder>
                </TabPanel>

                {/* Order Return */}
                <TabPanel value="6">
                  <OrderReturn
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                  ></OrderReturn>
                </TabPanel>

                {/* Follow Up */}
                <TabPanel value="7">
                  {/* <div className="FollowUpOrderFilter">
                    <select>
                      <option value="">Today</option>
                      <option value="">Tomorrow</option>
                      <option value="">Next 7 Days</option>
                      <option value="">Custom Date</option>
                    </select>
                    <div className="InputDate d_flex">
                      <div className="Item">
                        <label>To</label>
                        <input type="date" />
                      </div>
                      <div className="Item">
                        <label>From</label>
                        <input type="date" />
                      </div>
                    </div>
                  </div> */}

                  <FollowUpOrder
                    show={true}
                    searchQuery={searchQuery}
                    allProducts={allProducts}
                    advanceStatus={advanceStatus}
                  ></FollowUpOrder>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Order;