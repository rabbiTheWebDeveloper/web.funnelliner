import { Box, Modal, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";
import { headers } from "../../pages/api";


const OrderDetails = ({ id }) => {
    const [order, setOrder] = useState({});
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    useEffect(() => {
        axios.get(process.env.API_URL + "/client/orders/" + id, { headers: headers })
            .then(function (response) {
                // handle success
                setOrder(response.data.data);
            });
    }, [id]);
    console.log( "Order Details " , order)

    const { order_details } = order
    const productList = order_details?.map(item => {
        return item?.product
    })


    const prodQuentitea = order_details?.reduce((prevVal, currentVal) => {
        return prevVal + (currentVal?.quantity)

    }, 0)
    // const prodQuentitea = order_details?.map(item => {
    //     return item.quantity
    // })



    //    const productList ={Array.isArray(order?.order_details)?order?.order_details.map((data) => {
    //         return data.product
    //       })
    //     : null}
    //    console.log("Quantity" , productList)
    //    order?.order_details[0]?.quantity


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
    return (
        <div>
            <Link href='' onClick={handleOpenSales}> <MdOutlineRemoveRedEye /> </Link>

            <Modal
                open={openSales}
                onClose={handleCloseSales}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>

                    <div className="SalesTargetModal OrderModalPopup">
                        <div className="Header d_flex">
                            <div className="svg">
                                <BiReceipt />
                            </div>

                            <div className="text">
                                <h5>View Order Details</h5>
                            </div>
                        </div>

                        <div className="Form OrderModal d_flex d_justify">

                            <div className="CustomeInput">
                                <label>Order No </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={"#"+order?.order_no}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Order Date</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={moment(order?.updated_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Product Name</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    defaultValue={productList}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Customer Name</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.customer_name}

                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Contact No</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.phone}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Address</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.address}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Quantity</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={prodQuentitea}
                                />
                            </div>

                            <div className="CustomeInput Discount">
                                <label>Discount</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.discount}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Shipping Cost</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.shipping_cost}
                                />
                            </div>

                            <div className="CustomeInput TotalPrice">
                                <label>Total Price</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.grand_total}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Advance</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={order?.advanced}
                                />
                            </div>

                            <div className="CustomeInput Due">
                                <label>Due</label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled

                                    value={order?.due}
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>Order Status</label>
                                <select
                                    name=""
                                    disabled



                                >
                                    <option value="pending" selected disabled>
                                        Pending
                                    </option>

                                </select>
                            </div>

                            <div className="CustomeInput TextArea">
                                <label>Note</label>
                                <textarea rows="3"
                                    defaultValue={order?.note}
                                    onKeyDown={(e) => handleKeyDownNote(order?.id, event)}

                                ></textarea>
                            </div>


                        </div>

                    </div>

                </Box>
            </Modal>
        </div>
    );
};

export default OrderDetails;
