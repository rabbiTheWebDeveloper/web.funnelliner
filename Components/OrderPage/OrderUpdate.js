import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiReceipt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Select from 'react-select';
import Swal from "sweetalert2";
import { headers } from "../../pages/api";

const OrderUpdate = ({ id, products }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [order, setOrder] = useState({});
    const [openSales, setOpenSales] = useState(false)
    const [productId, setProductId] = useState([]);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    useEffect(() => {
        axios.get(process.env.API_URL + "/client/orders/" + id, { headers: headers })
            .then(function (response) {
                // handle success
                setOrder(response.data.data);
            }).catch((err) => {
                return err
            })
            ;
    }, [id]);


    const { order_details } = order
    const formData = new FormData()
    const handleChangeItem = (data) => {
        // debugger
        const productIDs = []
        data.map((item) => {
            productIDs.push(item.value)
        })
        setProductId(productIDs)
    }

    let options = products?.length === 0 ? [] : products?.map(function (item) {
        return { value: item.id, label: item.product_name, };
    })

    const defaultProductForSelect = order && order?.order_details && order?.order_details.map(product => ({ value: product.product_id, label: product.product?.product_name }));
    const onSubmit = (data) => {
        const filteredProductID = productId.filter(id => !defaultProductForSelect.some(product => product.value === id));
        filteredProductID.map(item => {
            formData.append("product_id[]", [item])
        })
        formData.append("_method", "patch");
        formData.append("customer_name", data.customerName);
        formData.append("customer_address", data.address);
        formData.append("customer_phone", data.phone);
        formData.append("shipping_cost", data.shipping_cost);

        //    debugger
        axios.post(process.env.API_URL + "/client/orders/" + id, formData, {
            headers: headers,
        })
            .then(function (response) {
                Swal.fire("Order Update   Successfully !", response.data.msg, "success");
                window.location.href = "/order";
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong",
                });
            });
        setOpenSales(false);
    }
    return (
        <div>
            <Link href='' onClick={handleOpenSales}> <FiEdit></FiEdit>  </Link>

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
                                <h5>Update Order Details</h5>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="Form OrderModal d_flex d_justify">

                                <div className="CustomeInput">
                                    <label>Customer Name</label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={order?.customer_name}
                                        {...register("customerName")}
                                    />
                                </div>

                                <div className="CustomeInput">
                                    <label>Contact No</label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={order?.phone}
                                        {...register("phone")}
                                    />
                                </div>

                                <div className="CustomeInput">
                                    <label>Address</label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={order?.address}
                                        {...register("address")}
                                    />
                                </div>
                                <div className="CustomeInput">
                                    <label> ADD More Product</label>
                                    <Select
                                        defaultValue={defaultProductForSelect}
                                        isMulti
                                        name="colors"
                                        options={options}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={handleChangeItem}
                                    />
                                </div>

                                <div className="CustomeInput">
                                    <label>Shipping Cost</label>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        defaultValue={order?.pricing?.shipping_cost}
                                        {...register("shipping_cost")}
                                    />
                                </div>
                                {/* 
                            <div className="CustomeInput TextArea">
                                <label>Note</label>
                                <TextField
                                  {...register("shipping_cost")}
                                    id="outlined-basic"
                                    variant="outlined"
                                    defaultValue=""
                                />
                            </div> */}
                                <br />
                                <div className="CustomeInput">
                                    <div className="DuelButton">
                                        <Button type="submit">Update</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Box>
            </Modal>
        </div>
    );
};

export default OrderUpdate;