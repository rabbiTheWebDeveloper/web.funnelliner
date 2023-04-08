import { Box, Button, Container, Grid, Menu, MenuItem, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCaretDown } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import moment from "moment/moment";
import DeliveryReport from "./DeliveryReport";
import TotallConfirmOrder from "./TotallConfirmOrder";
import TotallPrice from "./TotallPrice";

const TotalOrder = ({ allProduct, busInfo }) => {
    const [salesTarget, setSalesTarget] = useState({});
    const [salesUpdate, setSalesUpdate] = useState({});
    const [totalOrder, setTotalOrder] = useState([]);
    const [updateOrder, setUpdateOrder] = useState([]);
    const [confirmedOrder, setConfirmedOrder] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedOrder, setSelectedOrder] = useState('Today')
    const [todayOrderPrice, setTodayOrderPrice] = useState('')
    const [monthlyOrderPrice, setMonthlyOrderPrice] = useState('')

    // handleClickOrder
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // console.log("totall order page ", allProduct)
    // OpenSales Modal
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    const [isFunctionClick, setIsFunctionClick] = useState(false)
    const [todayOrder, setTodayOrder] = useState([])
    const [allProducts, setAllProducts] = useState([]);

    const today = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        // axios.get(baseUrl + "/client/orders", {headers: headers})
        //     .then(function (response) {
        //         // handle success
        //         let allProduct = response?.data?.data;
        setAllProducts(allProduct)
        setTotalOrder(allProduct);

        const userProduct = Array.from(allProduct).filter(
            (word) => word?.order_status == "confirmed"
        );
        setConfirmedOrder(userProduct);
        const filteredEvents = allProduct?.filter(event => event?.created_at?.slice(0, 10) === today);
        setTodayOrder(filteredEvents)
        // console.log("filteredEvents", filteredEvents)
        // });


    }, [allProduct]);
    // debugger

    // const [orderToday, setOrderToday]=useState([])
    // const [orderYesterday, setOrderYesterday]=useState([])
    // const [orderWeekly, setOrderWeekly]=useState([])
    // const [orderMonthly, setOrderMonthly]=useState([])


    // console.log(today)
    const handelOrderToday = () => {
        setIsFunctionClick(true)
        // console.log(filteredEvents)
        setSelectedOrder('Today')
        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }
    }
    // handelOrderToday()
    const filteredEvents = totalOrder?.filter(event => event?.created_at?.slice(0, 10) === today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayData = yesterday.toISOString().slice(0, 10);
    const handelOrderYesterday = (e) => {
        setIsFunctionClick(true)
        setSelectedOrder('Yesterday')
        // console.log(e)
        const filteredEvents = totalOrder?.filter(event => event?.created_at?.slice(0, 10) === yesterdayData);
        // console.log(filteredEvents)
        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }

    }
    const date = new Date();
    date.setDate(date.getDate() - 7)
    const weekly = date.toISOString().slice(0, 10);
    // console.log(weekly)

    const handelOrderWeekly = () => {
        setIsFunctionClick(true)
        setSelectedOrder('Weekly')
        const filteredEvents = totalOrder?.filter(event => event?.created_at?.slice(0, 10) >= weekly);

        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }
    }

    const monthlyDate = new Date();
    monthlyDate.setDate(monthlyDate.getDate() - 30)
    const monthly = monthlyDate.toISOString().slice(0, 10);
    const handelOrderMonthly = () => {
        setIsFunctionClick(true)
        setSelectedOrder('Monthly')
        const filteredEvents = totalOrder?.filter(event => event?.created_at?.slice(0, 10) >= monthly);

        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }

    }
    const handelOrderAll = () => {
        setIsFunctionClick(true)
        setSelectedOrder('All Order')
        if (totalOrder.length > 0) {
            setUpdateOrder(totalOrder)
        } else {
            setUpdateOrder([])
        }


    }


    const onSubmit = (data) => {
        axios
            .post(process.env.API_URL + "/client/sales-target/update", data, {
                headers: headers,
            })
            .then(function (response) {
                // console.log(response.data.msg);
                setSalesUpdate(response.data);
                Swal.fire("Target   Add!", response.data.msg, "success");
            })
            .catch(function (error) {
                // console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.msg,
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });
        // console.log(data);

        reset();
        setOpenSales(false);
    };

    const handleFetchSellsTarget = async () => {
        try {
            let data = await axios({
                method: "get",
                url: `${process.env.API_URL}/client/sales-target`,
                headers: headers,
            });

            // console.log("setSalesTarget",data.data.data)
            setSalesTarget(data?.data?.data);
        } catch (err) {
            // console.log(err)
        }

    };

    useEffect(() => {
        handleFetchSellsTarget();
    }, []);

    // console.log(salesTarget)


    const calculatePrice = confirmedOrder?.reduce((prevVal, currentVal) => {
        return prevVal + (currentVal?.order_details[0]?.product_qty * currentVal?.order_details[0]?.product?.price)

    }, 0)

    const totalPrice = calculatePrice
    // console.log(Object.keys(salesTarget).length)
    // console.log(totalOrder)


    // filter in confirm 

    const today2 = new Date();
    const today_date = today2.toISOString().split("T")[0]


    const today5 = new Date().toISOString().slice(0, 10);

    const today6 = new Date();
    today6.setDate(today6.getDate() - 30)
    const manthlyOrderPrice = today6.toISOString().slice(0, 10);
    useEffect(() => {
        const userProduct = Array.from(allProduct).filter(
            (word) => word?.order_status === "confirmed"
        );
        //  setConfirmedOrder(userProduct);
        const filteredEvents = userProduct?.filter(event => event?.created_at?.slice(0, 10) === today5);

        const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {

            return prevVal + (currentVal?.order_details[0]?.product_qty * currentVal?.order_details[0]?.product?.price)

        }, 0)

        const filteredEventsTarget = userProduct?.filter(event => event?.created_at?.slice(0, 10) === manthlyOrderPrice);

        const calculatePriceTarget = filteredEventsTarget?.reduce((prevVal, currentVal) => {
            // debugger
            return prevVal + (currentVal?.order_details[0]?.product_qty * currentVal?.order_details[0]?.product?.price)

        }, 0)

        const totalPriceTarget = calculatePriceTarget

        setMonthlyOrderPrice(totalPriceTarget)

        const totalPrice = calculatePrice
        setTodayOrderPrice(totalPrice)
        // console.log("filteredEvents", filteredEvents)
        // });


    }, [allProduct]);


    //  const today6 = new Date().toISOString().slice(0, 10);


    const handelDeliveryWeekly = () => {
        setSelectedOrder('Weekly')


    }
    const handelDeliveryManthly = () => {
        setSelectedOrder('Monthly')


    }
    const handelDeliveryDaily = () => {
        setSelectedOrder('Today')


    }
    const handelDeliveryYesterday = () => {
        setSelectedOrder('Yesterday')


    }
    // sales target %
    const dailyPercents = (todayOrderPrice * 100) / salesTarget.daily
    const monthlyPercents = (monthlyOrderPrice * 100) / salesTarget.monthly
    // console.log("busInfo", busInfo)
    // console.log("salesTarget", salesTarget)
    // console.log("monthlyOrderPrice", monthlyOrderPrice)
    const colorCheck =(num) =>{
        if(num <21){
            return "red"
        }
        else if (num < 71){
            return "blue"
        }
        else if (num => 80){
            return "green"
        }
    }
    return (
        <>
            <section className="TotalOrder">
                <Container maxWidth="sm">
                    <Grid container spacing={3}>
                        {/* Total Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="TotalOrderItem">
                                <div className="overlayImg">
                                    <img src="/images/totalorder_overlay1.png" alt="" />
                                </div>

                                {/* header */}
                                <div className="Header d_flex d_justify">
                                    <h5 className="d_flex">
                                        {" "}
                                        <GoGraph /> Total Order{" "}
                                    </h5>

                                    <div className="DropDown">
                                        <PopupState variant="popover" popupId="DropDown">
                                            {(popupState) => (
                                                <>
                                                    <Button {...bindTrigger(popupState)}>
                                                        <h6 className="d_flex">
                                                            {selectedOrder}
                                                            <div className="svg">
                                                                <AiFillCaretDown />
                                                            </div>
                                                        </h6>
                                                    </Button>

                                                    <Menu {...bindMenu(popupState)} >
                                                        <MenuItem onClick={(e) => {
                                                            handelOrderToday();
                                                            popupState.close()
                                                        }}>Today</MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                            handelOrderYesterday();
                                                            popupState.close()
                                                        }}>Yesterday</MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                            handelOrderWeekly();
                                                            popupState.close()
                                                        }}>Weekly</MenuItem>
                                                        {/* <MenuItem onClick={handleClose}>Weak</MenuItem> */}
                                                        <MenuItem onClick={(e) => {
                                                            handelOrderMonthly();
                                                            popupState.close()
                                                        }}>Monthly</MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                            handelOrderAll();
                                                            popupState.close()
                                                        }}>All Order</MenuItem>
                                                    </Menu>
                                                </>
                                            )}
                                        </PopupState>
                                    </div>
                                </div>

                                <div className="Main">
                                    <h3>
                                        {
                                            isFunctionClick === false ? todayOrder.length : updateOrder.length
                                        }

                                    </h3>

                                </div>
                            </div>
                        </Grid>

                        {/* Total Confirmed Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <TotallConfirmOrder allProducts={allProducts}></TotallConfirmOrder>
                        </Grid>

                        {/* Total Sale Amount */}
                        <Grid item xs={12} sm={6} md={4}>

                            <TotallPrice allProducts={allProducts}></TotallPrice>

                        </Grid>

                        {/* Total Available Courier Balance */}
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="TotalOrderItem">
                                <div className="overlayImg">
                                    <img src="/images/totalorder_overlay4.png" alt="" />
                                </div>

                                {/* header */}
                                <div className="Header d_flex d_justify">
                                    <h5 className="d_flex">
                                        {" "}
                                        <GoGraph /> Total Available Courier Balance{" "}
                                    </h5>
                                </div>

                                <div className="Main">
                                    <h3>
                                        {" "}
                                        <span>{busInfo?.courier_balance}</span>
                                    </h3>
                                </div>
                            </div>
                        </Grid>

                        {/* Total Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <DeliveryReport></DeliveryReport>
                        </Grid>

                        {/* Total Order */}
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="SalesTarget TotalOrderItem">
                                {/* header */}
                                <div className="Header d_flex d_justify">
                                    <h5 className="d_flex">
                                        {" "}
                                        <GoGraph /> Sales Target{" "}
                                    </h5>
                                </div>

                                <ul className="SalesTargetDailyTarget">
                                    <li>
                                        Daily Target
                                        - <span>{salesTarget?.amounts?.daily_total ? salesTarget?.amounts?.daily_total?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00"+'৳'} / {Object.keys(salesTarget).length > 0 ? salesTarget.daily?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00" +'৳'}</span>
                                        <span style={{ backgroundColor:colorCheck(parseInt(salesTarget?.daily_completed))}}> {salesTarget?.daily_completed ? salesTarget?.daily_completed : "00.00"}% </span>{" "}
                                    </li>
                                    <li>
                                        Monthly Target
                                        - <span>{salesTarget?.amounts?.monthly_total ? salesTarget?.amounts?.monthly_total?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00"+'৳'} / {Object.keys(salesTarget).length > 0 ? salesTarget.monthly?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00" +'৳'}</span>

                                        <span style={{ backgroundColor:colorCheck(parseInt(salesTarget?.monthly_completed))}}>{salesTarget?.monthly_completed ? salesTarget?.monthly_completed : "00.00"}% </span>{" "}
                                    </li>
                                    <li>
                                        Custom Target
                                        - <span>{salesTarget?.amounts?.custom_total ? salesTarget?.amounts?.custom_total?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00"+'৳'}/{Object.keys(salesTarget).length > 0 ? salesTarget.custom?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'৳' : "00" +'৳'}</span>
                                        <span style={{ backgroundColor:colorCheck(parseInt(salesTarget?.custom_completed))}} > {salesTarget?.custom_completed ? salesTarget?.custom_completed : "00.00"}% </span>{" "}
                                    </li>
                                    {/* moment(product?.created_at).format(
                                            "DD-MM-YYYY"
                                          ) */}
                                    <li> <strong>({salesTarget?.from_date ? moment(salesTarget?.from_date).format("DD-MM-YYYY") : ""} - {salesTarget?.to_date ? moment(salesTarget?.to_date).format("DD-MM-YYYY") : ""}) </strong></li>
                                </ul>

                                <div className="Main">
                                    <Button className="ModalBtn" onClick={handleOpenSales}>
                                        Update Sales Target
                                    </Button>

                                    {/* modal */}
                                    <Modal
                                        open={openSales}
                                        onClose={handleCloseSales}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box>
                                            <div className="SalesTargetModal">
                                                <div className="Header d_flex">
                                                    <div className="svg">
                                                        <FiEdit />
                                                    </div>

                                                    <div className="text">
                                                        <h5>Update Sales Target in BDT</h5>
                                                        <p>Enter Your Sales Target In BDT</p>
                                                    </div>
                                                </div>

                                                <div className="Form">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="CustomeInput">
                                                            <label>Enter Daily Sales Target <span>*</span></label>

                                                            <TextField
                                                                defaultValue={salesTarget?.daily}
                                                                id="outlined-basic"
                                                                label="Daily Sales Target"
                                                                variant="outlined"
                                                                {...register("daily")}
                                                            />
                                                            {errors.daily && (
                                                                <span>This field is required</span>
                                                            )}
                                                        </div>

                                                        <div className="CustomeInput">
                                                            <label>Enter Monthly Sales Target <span>*</span></label>
                                                            <TextField
                                                                defaultValue={salesTarget?.monthly}
                                                                id="outlined-basic"
                                                                label="Monthly Sales Target"
                                                                variant="outlined"
                                                                {...register("monthly")}
                                                            />
                                                            {errors.weekly && (
                                                                <span>This field is required</span>
                                                            )}
                                                        </div>

                                                        <div className="CustomeInput">
                                                            <label>Enter Custom Sales Target <span>*</span></label>
                                                            <TextField
                                                                id="outlined-basic"
                                                                defaultValue={salesTarget?.custom}
                                                                label="Custom Sales Target"
                                                                variant="outlined"
                                                                {...register("custom")}
                                                            />
                                                            {errors.custom && (
                                                                <span>This field is required</span>
                                                            )}
                                                        </div>

                                                        <div className="CustomeInput AnotherTargetLevel">
                                                            <label>
                                                                Choose Your Custom Targeting Date Range
                                                            </label>

                                                            <div className="AnotherTarget d_flex">
                                                                {/* <h1>{salesTarget?.from_date?.slice(0, 10)}</h1> */}
                                                                <label></label>
                                                                <input defaultValue={salesTarget?.from_date?.slice(0, 10)}  {...register("from_date")} type="date"
                                                                />
                                                                {/* min={today_date} */}
                                                                <label>To</label>
                                                                <input defaultValue={salesTarget?.to_date?.slice(0, 10)} {...register("to_date")} type="date" />
                                                            </div>

                                                        </div>

                                                        <div className="CustomeInput">
                                                            <div className="DuelButton">
                                                                <Button type="submit">Save Changes</Button>
                                                                <Button type="reset" onClick={handleCloseSales} className="Delete">
                                                                    Reset
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </section>
        </>
    );
};

export default TotalOrder;
