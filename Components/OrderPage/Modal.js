import {Box, Button, Modal, TextField} from "@mui/material";
import {BiReceipt} from "react-icons/bi";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useForm} from "react-hook-form";

const OrderModal = ({modalOpen, handleCloseModal, products}) => {

    const {register, handleSubmit, formState: {errors},} = useForm();

    const createOrder = (data) => {

        // data.shop_id = shopId;
        // data.product_id = [data.product_id];
        // data.product_qty = [data.product_qty];
        // axios.post(process.env.API_URL + "/client/orders", data, {
        //     headers: headers,
        // })
        //     .then(function (response) {
        //         // console.log(response.data.msg);
        //         // console.log(response.data);
        //         Swal.fire("Order  Successfully !", response.data.msg, "success");
        //         setUpdateData(response.data.msg);
        //         window.location.href = "/order";
        //     })
        //     .catch(function (error) {
        //         // console.log(error);
        //         Swal.fire({
        //             icon: "error",
        //             text: error.msg,
        //             footer: '<a href="">Why do I have this issue?</a>',
        //         });
        //     });
        // reset();
        // setOpenSales(false);
    };
    return (
        <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
                <form onSubmit={handleSubmit(createOrder)}>
                    <div className="SalesTargetModal">
                        <div className="Header d_flex">
                            <div className="svg">
                                <BiReceipt/>
                            </div>

                            <div className="text">
                                <h5>Add New Order</h5>
                                <p>Add New Manual Order</p>
                            </div>
                        </div>

                        <div className="Form">
                            <div className="CustomeInput">
                                <label>
                                    Enter Customer Name <span>*</span>
                                </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...register("customer_name", {required: true})}
                                    placeholder="Customer Name"
                                />
                                {errors.customer_name && (
                                    <span>This Product Name required</span>
                                )}
                            </div>

                            <div className="CustomeInput">
                                <label>
                                    Enter Customer Contact No. <span>*</span>
                                </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...register("customer_phone")}
                                    defaultValue="+88"
                                    placeholder="Enter Customer Contact No"
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>
                                    Enter Customer Address <span>*</span>
                                </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...register("customer_address")}
                                    placeholder="Enter Customer Address"
                                />
                            </div>

                            <div className="CustomeInput">
                                <label>
                                    Product Name <span>*</span>
                                </label>
                                <div className="Dropdown">
                                    <FormControl fullWidth>
                                        <Select{...register("product_id", {required: true})} native={true}
                                            onChange={e => {
                                                setCharge(e.target.selectedOptions[0].attributes.delivery_charge.value)
                                            }}>
                                            <option>
                                                {products.length === 0 ? "Please Add Product" : "Select Product"}
                                            </option>
                                            {products.map((data) => {
                                                    return (
                                                        <option key={data?.id} value={data.id} delivery_charge={data.delivery_charge}>
                                                            {data?.product_name}
                                                        </option>
                                                    );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>

                            </div>

                            <div className="CustomeInput">
                                <label>Enter Product Quantity</label>
                                <TextField
                                    id="outlined-basic"
                                    defaultValue="1"
                                    variant="outlined"
                                    {...register("product_qty", {required: true})}
                                    placeholder="Enter Product Quantity"
                                />
                            </div>


                            <div className="CustomeInput">
                                <label>
                                    Shipping Cost <span>*</span>
                                </label>
                                <div className="Dropdown">
                                    <select
                                        name=""
                                        {...register("delivery_location", {required: true})}
                                    >
                                        <option>Select</option>
                                        <option value="outside_dhaka">Outside Dhaka</option>
                                        <option value="inside_dhaka">Inside Dhaka</option>

                                    </select>
                                </div>
                            </div>

                            <div className="CustomeInput">
                                <div className="DuelButton">
                                    <Button type="submit">Add</Button>
                                    <Button onClick={handleCloseModal} className="Delete">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
export default OrderModal