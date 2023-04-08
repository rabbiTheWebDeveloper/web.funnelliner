import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCaretDown } from "react-icons/ai";
import { GoGraph } from "react-icons/go";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

const TotallPrice = ({ allProducts }) => {
    const [selectedOrder, setSelectedOrder] = useState('Today')
    const [totalOrder, setTotalOrder] = useState([]);
    const [updateOrder, setUpdateOrder] = useState("00");
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
    const [todayOrder, setTodayOrder] = useState("00")

    const today = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        setTotalOrder(allProducts);
        const userProduct = Array.from(allProducts).filter(
            (word) => word?.order_status == "confirmed"
        );
        setConfirmedOrder(userProduct);
        const filteredEvents = userProduct?.filter(event => event?.updated_at?.slice(0, 10) === today);

        const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {
            return prevVal + (parseInt(currentVal?.grand_total))

        }, 0)

        const totalPrice = calculatePrice
        setTodayOrder(totalPrice)
        // console.log("filteredEvents", filteredEvents)
        // });


    }, [allProducts]);

    // console.log(today)
    const handelOrderToday = () => {

        setIsFunctionClick(true)
        // console.log(filteredEvents)
        setSelectedOrder('Today')
        if (filteredEvents.length > 0) {

            const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {
                return prevVal + (parseInt(currentVal?.grand_total))

            }, 0)

            const totalPrice = calculatePrice


            setUpdateOrder(totalPrice)
        } else {
            setUpdateOrder("00")
        }
    }
    // handelOrderToday()
    const filteredEvents = totalOrder?.filter(event => event?.updated_at?.slice(0, 10) === today);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayData = yesterday.toISOString().slice(0, 10);
    const handelOrderYesterday = (e) => {
        setIsFunctionClick(true)
        // console.log(e)
        const filteredEvents = totalOrder?.filter(event => event?.updated_at?.slice(0, 10) === yesterdayData);
        // console.log(filteredEvents)
        setSelectedOrder('Yesterday')
        if (filteredEvents.length > 0) {

            const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {
                return prevVal + (parseInt(currentVal?.grand_total))

            }, 0)

            const totalPrice = calculatePrice


            setUpdateOrder(totalPrice)
        } else {
            setUpdateOrder("00")
        }

    }
    const date = new Date();
    date.setDate(date.getDate() - 7)
    const weekly = date.toISOString().slice(0, 10);
    // console.log(weekly)

    const handelOrderWeekly = () => {
        setIsFunctionClick(true)
        setSelectedOrder('Weekly')
        const filteredEvents = totalOrder?.filter(event => event?.updated_at?.slice(0, 10) >= weekly);
        // console.log(filteredEvents)
        if (filteredEvents.length > 0) {
            const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {
                return prevVal + (parseInt(currentVal?.grand_total))

            }, 0)

            const totalPrice = calculatePrice


            setUpdateOrder(totalPrice)
        } else {
            setUpdateOrder("00")
        }
    }

    const monthlyDate = new Date();
    monthlyDate.setDate(monthlyDate.getDate() - 30)
    const monthly = monthlyDate.toISOString().slice(0, 10);
    const handelOrderMonthly = () => {
        setIsFunctionClick(true)
        setSelectedOrder('Monthly')
        const filteredEvents = totalOrder?.filter(event => event?.updated_at?.slice(0, 10) >= monthly);
        // console.log(filteredEvents)
        if (filteredEvents.length > 0) {
            const calculatePrice = filteredEvents?.reduce((prevVal, currentVal) => {
                return prevVal + (parseInt(currentVal?.grand_total))

            }, 0)

            const totalPrice = calculatePrice


            setUpdateOrder(totalPrice)
        } else {
            setUpdateOrder("00")
        }

    }
    //  / all calculation 

    const handelOrderAll = () => {
        setIsFunctionClick(true)
        setSelectedOrder('All')
        if (totalOrder.length > 0) {
            const calculatePrice = totalOrder?.reduce((prevVal, currentVal) => {
                return prevVal + (parseInt(currentVal?.grand_total))

            }, 0)

            const totalPrice = calculatePrice


            setUpdateOrder(totalPrice)
        } else {
            setUpdateOrder("00")
        }
    }



    const calculatePrice = confirmedOrder?.reduce((prevVal, currentVal) => {
        return prevVal + (parseInt(currentVal?.grand_total))

    }, 0)

    const totalPrice = calculatePrice

    return (
        <div className="TotalOrderItem">
            <div className="overlayImg">
                <img src="/images/totalorder_overlay3.png" alt="" />
            </div>

            {/* header */}
            <div className="Header d_flex d_justify">
                <h5 className="d_flex">
                    {" "}
                    <GoGraph /> Total Sales Amount{" "}
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
                                        handelOrderAll();
                                        popupState.close()
                                    }}>All Time</MenuItem>
                                </Menu>
                            </>
                        )}
                    </PopupState>
                </div>
            </div>

            <div className="Main">

                {/* const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); */}
                <h3>{
                    isFunctionClick === false ? Number(todayOrder)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(updateOrder)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

export default TotallPrice;