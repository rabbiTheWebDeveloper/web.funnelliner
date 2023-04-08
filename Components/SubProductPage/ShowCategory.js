import { Box, Modal, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { baseTest } from "../../constant/constant";
import { headers } from "../../pages/api";

//  const colourOptions = [
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

const ShowCategory = ({ id }) => {
    const [products, setProducts] = useState([]);
    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);
    useEffect(() => {
        axios.get(process.env.API_URL + "/client/categories/" + id, { headers: headers })
            .then(function (response) {
                // handle success
                setProducts(response.data.data);
            });
    }, [id]);
    // console.log(products)
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

                    <div className="SalesTargetModal">
                        <div className="Header d_flex">
                            <div className="svg">
                                <BiReceipt />
                            </div>

                            <div className="text">
                                <h5>Category </h5>
                                <p>Shop Category Show </p>
                            </div>
                        </div>

                        <div className="Form">
                            <div className="CustomeInput">
                                <label>Category Name <span>*</span></label>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={products?.name}
                                    disabled

                                />

                            </div>


                            <div className="CustomeInput">
                                <label>Category Image<span>*</span></label>
                                <img src={products?.category_image?.name} alt="" />
                                {/* <img src='' alt='' height="100px" /> */}
                            </div>


                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
};

export default ShowCategory;
