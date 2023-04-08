import { Box, Modal, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { headers } from "../../pages/api";

const ShowProduct = ({id}) => {
    const [products, setProducts] = useState([]);
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    useEffect(() => {
        axios.get(process.env.API_URL+"/client/products/" + id, {headers: headers})
            .then(function (response) {
                setProducts(response.data.data);
            });
    }, [id]);

    return (
        <div>
            <Link href='' onClick={handleOpenSales}> <MdOutlineRemoveRedEye/> </Link>
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
                                <BiReceipt/>
                            </div>
                            <div className="text">
                                <h5>Products</h5>
                                <p>Shop Products </p>
                            </div>
                        </div>
                        <div className="Form">
                            <div className="CustomeInput">
                                <label>Product Name </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={products?.product_name}
                                />
                            </div>
                            <div className="CustomeInput">
                                <label>Selling Price. </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={products?.price}
                                />
                            </div>
                            <div className="CustomeInput">
                                <label>Product Code </label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    disabled
                                    value={products?.product_code}
                                />
                            </div>
                            <div className="CustomeInput">
                                <label>Available Quantity </label>
                                <TextField id="outlined-basic" disabled variant="outlined" value={products?.product_qty>0 ? products?.product_qty:<span style={{ color: 'red' }}>stock out</span>}/>
                            </div>
                            <div className="CustomeInput">
                                <label>Product Image </label>
                                <img src={products?.main_image?.name} alt=""/>     
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ShowProduct;
