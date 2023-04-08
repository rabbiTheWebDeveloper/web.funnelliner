import { Button, Menu, MenuItem } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCaretDown } from "react-icons/ai";
import { GoGraph } from "react-icons/go";


const DeliveryReport = () => {
    const [totalOrder, setTotalOrder] = useState([]);
    const [updateOrder, setUpdateOrder] = useState([]);
    const [confirmedOrder, setConfirmedOrder] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedOrder, setSelectedOrder] = useState('Today')
    const [todayOrderPrice, setTodayOrderPrice] = useState('')

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
    const handelDeliveryAll = () => {
        setSelectedOrder('All')


    }
    return (
        <div className="SalesTarget TotalOrderItem">
            {/* header */}
            <div className="Header d_flex d_justify">
                <h5 className="d_flex">
                    {" "}
                    <GoGraph /> Delivery Report{" "}
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
                                        handelDeliveryDaily();
                                        popupState.close()
                                    }}>Today</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        handelDeliveryYesterday();
                                        popupState.close()
                                    }}>Yesterday</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        handelDeliveryWeekly();
                                        popupState.close()
                                    }}>Weekly</MenuItem>

                                    <MenuItem onClick={(e) => {
                                        handelDeliveryManthly();
                                        popupState.close()
                                    }}>Monthly</MenuItem>
                                    <MenuItem onClick={(e) => {
                                        handelDeliveryAll();
                                        popupState.close()
                                    }}>All</MenuItem>
                                </Menu>
                            </>
                        )}
                    </PopupState>
                </div>
            </div>

            <ul className="SalesTargetDailyTarget CancleOrder">
                <li>
                    Delivery : <span>0</span>
                </li>
                <li>
                    Return : <span>0</span>
                </li>
                <li>
                    Return Ratio : <span>0%</span>
                </li>
            </ul>
        </div>


    );
};

export default DeliveryReport;