import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCaretDown } from "react-icons/ai";
import { GoGraph } from "react-icons/go";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";


const TotallConfirmOrder = ({ allProducts }) => {
    const [selectedOrder, setSelectedOrder] = useState('Today')
    const [totalOrder, setTotalOrder] = useState([]);
    const [updateOrder, setUpdateOrder] = useState([]);
    const [confirmedOrder, setConfirmedOrder] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // handleClickOrder
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // OpenSales Modal
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    const [isFunctionClick, setIsFunctionClick] = useState(false)
    const [todayOrder, setTodayOrder] = useState([])

    const today = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        setTotalOrder(allProducts);
        const userProduct = Array.from(allProducts).filter(
            (word) => word?.order_status == "confirmed"
        );
        setConfirmedOrder(userProduct);
        const filteredEvents = userProduct?.filter(event => event?.updated_at?.slice(0, 10) === today);
        setTodayOrder(filteredEvents)
    }, [allProducts]);
    // debugger

    // const [orderToday, setOrderToday]=useState([])
    // const [orderYesterday, setOrderYesterday]=useState([])
    // const [orderWeekly, setOrderWeekly]=useState([])
    // const [orderMonthly, setOrderMonthly]=useState([])


    // console.log(today)
    const handelOrderToday = () => {
        setIsFunctionClick(true)
        setSelectedOrder('Today')
        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }
    }
    // handelOrderToday()
    const filteredEvents = confirmedOrder?.filter(event => event?.updated_at?.slice(0, 10) === today);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayData = yesterday.toISOString().slice(0, 10);
    const handelOrderYesterday = (e) => {

        setIsFunctionClick(true)
        setSelectedOrder('Yesterday')
        // console.log(e)
        const filteredEvents = confirmedOrder?.filter(event => event?.updated_at?.slice(0, 10) === yesterdayData);
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
        const filteredEvents = confirmedOrder?.filter(event => event?.updated_at?.slice(0, 10) >= weekly);
        // console.log(filteredEvents)
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
        const filteredEvents = confirmedOrder?.filter(event => event?.updated_at?.slice(0, 10) >= monthly);
        // console.log(filteredEvents)
        if (filteredEvents.length > 0) {
            setUpdateOrder(filteredEvents)
        } else {
            setUpdateOrder([])
        }

    }


    const handelOrderConfirmALl = () => {
        setIsFunctionClick(true)
        setSelectedOrder('All Order')
        if (confirmedOrder.length > 0) {
            setUpdateOrder(confirmedOrder)
        } else {
            setUpdateOrder([])
        }

    }




    // console.log(salesTarget)


    const calculatePrice = confirmedOrder?.reduce((prevVal, currentVal) => {
        return prevVal + (currentVal?.order_details[0]?.product_qty * currentVal?.order_details[0]?.product?.price)

    }, 0)

    const totalPrice = calculatePrice

    return (
        <div className="TotalOrderItem">
            <div className="overlayImg">
                <img src="/images/totalorder_overlay2.png" alt="" />
            </div>

            {/* header */}
            <div className="Header d_flex d_justify">
                <h5 className="d_flex">
                    {" "}
                    <GoGraph /> Total Confirmed Order{" "}
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

                                <Menu {...bindMenu(popupState)}>

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
                                        handelOrderConfirmALl();
                                        popupState.close()
                                    }}>All Order</MenuItem>
                                </Menu>
                            </>
                        )}
                    </PopupState>
                </div>
            </div>

            <div className="Main">
                {/* <h3> {confirmedOrder.length > 0 ? confirmedOrder.length  : "00"}</h3> */}

                <h3>{
                    isFunctionClick === false ? todayOrder.length : updateOrder.length
                }</h3>

                {/* <ul>
                    <li>Leads Update:</li>
                    <li>
                      Increased by{" "}
                      <span>
                        {" "}
                        <BsGraphUp /> 0%{" "}
                      </span>
                    </li>
                  </ul> */}
            </div>
        </div>
    );
};

export default TotallConfirmOrder;