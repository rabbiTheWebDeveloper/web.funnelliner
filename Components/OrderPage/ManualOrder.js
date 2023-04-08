import { Box, Button, Modal, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiReceipt } from "react-icons/bi";
import ReactSelect from 'react-select';
import Swal from "sweetalert2";
import { headers, shopId } from "../../pages/api";
import { useAddOrderMutation } from "../../redux/features/api/orderApiSlice";


const ManualOrder = ({ setUpdateData, products }) => {
  const [addOrder,{ isLoading, isSuccess, isError }] = useAddOrderMutation();
  const [openSales, setOpenSales] = useState(false);
  const handleOpenSales = () => setOpenSales(true);
  const handleCloseSales = () => setOpenSales(false);
  const [productID, setProductID] = useState(null);
  const [filterProduct, setFilterProduct] = useState();
  const [charge, setCharge] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("");

  const handleChangeDeliveryLocation = event => {
    setSelectedDeliveryLocation(event.value);
  };


  const onSubmit = (data) => {
    console.log("data", data)
    data.shop_id = shopId;
    data.product_id = [data.product_id];
    data.product_qty = [data.product_qty];
    if (charge === 'paid') {
      if (selectedDeliveryLocation === "") {

        return;
      }
      data.delivery_location = selectedDeliveryLocation
    }

    axios.post(process.env.API_URL + "/client/orders", data, {
      headers: headers,
    })
      .then(function (response) {
        Swal.fire("Order  Successfully !", response.data.msg, "success");
        setUpdateData(response.data.msg);
        window.location.href = "/order";
      })
      .catch(function (error) {
        // console.log(error);
        Swal.fire({
          icon: "error",
          text: error.msg,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
    reset();
    setOpenSales(false);
  };


console.log("isSuccess" ,isSuccess)
  const onChange = (event) => {
    // console.log('p', event)
    setProductID(event?.target?.value);
  };

  useEffect(() => {
    const findProduct = Array.isArray(products) ? products?.find(function (element) {
      return element.id == productID;
    }) : null;
    setFilterProduct(findProduct);
  }, [productID]);

  const options = [
    { value: 'inside_dhaka', label: 'Inside Dhaka' },
    { value: 'outside_dhaka', label: 'Outside Dhaka' },
  ]
  return (
    <div>
      <Button className="AddNewOrder" onClick={handleOpenSales}>
        Add New Order
      </Button>

      <Modal
        open={openSales}
        onClose={handleCloseSales}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="SalesTargetModal">
              <div className="Header d_flex">
                <div className="svg">
                  <BiReceipt />
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
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    {...register("customer_name", { required: true, pattern: /^[^0-9\u09E6-\u09EF]+$/ })}
                    placeholder="Customer Name"
                  />
                  {errors.customer_name && (
                    <span style={{ color: "red" }}>This customer name Name required</span>
                  )}
                </div>

                <div className="CustomeInput">
                  <label>
                    Enter Customer Contact No. <span>*</span>
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register("customer_phone", { required: true, pattern: /^(?:\+8801|01)[3-9]\d{8}$/ })}
                    defaultValue="+88"
                    placeholder="Customert Phone"
                  />
                  {errors.customer_phone && (
                    <span style={{ color: "red" }}>Valid Phone Number required</span>
                  )}
                </div>

                <div className="CustomeInput">
                  <label>
                    Enter Customer Address <span>*</span>
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register("customer_address", { required: true })}
                    placeholder="Enter Customer Address"
                  />
                  {errors.customer_address && (
                    <span style={{ color: "red" }}>This customer addres Name required</span>
                  )}
                </div>

                <div className="CustomeInput">
                  <label>
                    Product Name <span>*</span>
                  </label>
                  <div className="Dropdown">
                    <FormControl fullWidth>
                      <Select
                        {...register("product_id", { required: true })}
                        native={true}
                        onChange={e => {
                          setCharge(e.target.selectedOptions[0].attributes.delivery_charge.value)
                        }}

                      >
                        <option>
                          {" "}
                          {products.length === 0
                            ? "Please Add Product"
                            : "Select Product"}
                        </option>
                        {Array.isArray(products)
                          ? products.map((data) => {
                            return (
                              <option key={data?.id} value={data.id} delivery_charge={data.delivery_charge}>
                                {data?.product_name}
                              </option>
                            );
                          })
                          : null}
                      </Select>
                    </FormControl>
                    {errors.product_id && (
                      <span> Product Add required</span>
                    )}
                  </div>

                  {/* <TextField id="outlined-basic" variant="outlined" {...register("product_id", { required: true })} placeholder='Customer Name' /> */}
                  {/* <div className="Dropdown">
                                        <select  {...register("product_id", { required: true })} >
                                            {Array.isArray(products)
                                                ? products.map((data) => {
                                                    return (
                                                        <option onClick={()=>selectedProduct(data.id)} key={data?.id} value={data.id}>
                                                            {data?.product_name}
                                                        </option>
                                                    );
                                                })
                                                : null}
                                        </select>
                                        {errors.product_id && (
                                            <span>This Category Name required</span>
                                        )}
                                    </div> */}
                </div>

                <div className="CustomeInput">
                  <label>Enter Product Quantity</label>
                  <TextField
                    id="outlined-basic"
                    defaultValue="1"
                    variant="outlined"
                    {...register("product_qty", { required: true })}
                    placeholder="Enter Product Quantity"
                  />
                  {errors.product_qty && (
                    <span>Product qty required</span>
                  )}
                </div>

                {charge === 'paid' &&
                  <div className="CustomeInput">
                    <label>
                      Delivery location <span>*</span>
                    </label>
                    <div className="Dropdown">
                      {/* <select
                        name=""
                        required
                        {...register("delivery_location", { required: true })}
                      >
                        <option >Select </option>
                        <option value="outside_dhaka">Outside Dhaka</option>
                        <option value="inside_dhaka">Inside Dhaka</option>

                      </select> */}
                      <ReactSelect onChange={handleChangeDeliveryLocation} options={options} />
                      {selectedDeliveryLocation === '' && (
                        <span style={{ color: "red" }}>Please Select Delivery  location</span>
                      )}
                    </div>
                  </div>
                }

                {charge === 'free' &&
                  <div className="CustomeInput">
                    <label>
                      Shipping Cost
                    </label>
                    <div className="Dropdown">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        disabled
                        value="Free"
                      />
                    </div>
                  </div>
                }

                {/* <div className="CustomeInput">
              <label>Enter Product Price (BDT)</label>
              <TextField id="outlined-basic" variant="outlined" {...register("product_id[]", { required: true })} placeholder='Customer Name' />
            </div>

            <div className="CustomeInput">
              <label>Note</label>
              <TextField id="outlined-basic" variant="outlined" {...register("note", { required: true })} placeholder='Note Name' />
            </div> */}

                <div className="CustomeInput">
                  <div className="DuelButton">
                    <Button type="submit">Add</Button>
                    <Button onClick={handleCloseSales} className="Delete">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ManualOrder;
