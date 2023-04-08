import { Box, Button, Menu, MenuItem, Pagination, Skeleton, Stack } from '@mui/material';
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useGetOrdersQuery } from '../../redux/features/api/orderApiSlice';

const FollowUpOrderCustomers = () => {
    const { data, isLoading, isError } = useGetOrdersQuery("follow_up");
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState("1");

    // Filter
    const [age, setAge] = useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // Tabs
 
    // handleClick Move To Completed
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //  duplicate customer 

    const uniqueCustomer = data?.data?.reduce((acc, current) => {
        const existingContact = acc.find(contact => contact.phone === current.phone);
        if (!existingContact) {
            return [...acc, current];
        } else {
            return acc;
        }
    }, []);

    //   pagination  
    const indexOfLastProducts = currentPage * perPage;
    const indexOfFirstProducts = indexOfLastProducts - perPage;
    const currentProduct = uniqueCustomer?.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(uniqueCustomer?.length / perPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber, value) => setCurrentPage(value);
    // console.log(products);

    const downlodeImage = () => {
        htmlToImage.toPng(document.getElementById('downlode_customer_list'))
            .then(function (dataUrl) {
                download(dataUrl, 'customer_list.jpg');
            });
    }

    const doc = new jsPDF();
    doc.autoTable({
        theme: 'grid',
        head: [['SL', 'Customer Name', 'Contact No.', 'Address.', 'Purchase Date']],
        body: uniqueCustomer?.map((product, index) => [index + 1, product?.customer_name, product?.phone, product?.address, moment(product?.created_at).format(
            "DD-MM-YYYY"
        )]),
        beforePageContent: function (data) {
            const title = '';
            const pageWidth = doc.internal.pageSize.width;
            const titleWidth = doc.getStringUnitWidth(title) * 14 / doc.internal.scaleFactor;
            const titlePosition = (pageWidth - titleWidth) / 2;

            doc.text(title, titlePosition, 8, { align: 'center' });
        }
    });
    const handelPdf = () => {
        doc.save('FollowUpOrder.pdf');

    }

    return (

        <div className='Pending'>

            <div className='MoveToComplete d_flex d_justify'>
                <div className='DropDown'>
                    {/* <Button>
                                    <h6 className='d_flex'>
                                        Delete
                                        <div className="svg"><AiFillCaretDown/></div>
                                    </h6>
                                </Button> */}
                </div>

                <div className='DropDown Download'>
                    <Button
                        id='basic-button'
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <h6 className='d_flex'>
                            Download Report
                            <div className='svg'>
                                <AiFillCaretDown />
                            </div>
                        </h6>
                    </Button>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={() => {
                            handelPdf();
                            handleClose()
                        }}>As Pdf</MenuItem>
                        <MenuItem onClick={() => {
                            downlodeImage();
                            handleClose()
                        }}>As Xml</MenuItem>
                        {/* <MenuItem onClick={handleClose}>As Doc File</MenuItem> */}
                    </Menu>
                </div>
            </div>

            <div className="ProductTable">
                <table>
                    <thead>
                        <tr>

                            <th>SL</th>
                            <th>Customer</th>
                            <th>Contact No.</th>
                            <th>Address.</th>
                            <th>Purchase Date</th>

                        </tr>
                    </thead>

                    {/* {currentProduct.length > 0 &&( */}
                    {isLoading ? (
                        <tr>
                            <td colSpan={13}>
                                <Box sx={{ width: 40 }}>
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                    <Skeleton width={1570} height={28} />
                                </Box>
                            </td>
                        </tr>
                    ) : (
                        currentProduct.length > 0 ? <>
                            <tbody>
                                {currentProduct?.map((product, index) => {


                                    return (
                                        <tr
                                            key={product?.order_no}
                                            product={product}
                                        >

                                            <td>{index + 1}</td>
                                            <td>{product?.customer_name}</td>
                                            <td>{product?.phone}</td>
                                            <td>{product?.address}</td>
                                            <td>
                                                {moment(
                                                    product?.created_at
                                                ).format("DD-MM-YYYY")}
                                            </td>


                                            {/* <td><textarea type="text" /></td> */}

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </> : <tr>
                            <td colSpan={10}>
                                <section className="MiddleSection">
                                    <div className="MiddleSectionContent">
                                        <div className="img">
                                            <img src="/error.svg" alt="" />
                                        </div>

                                        <div className="text">
                                            <p>Not Found</p>

                                            {/* <Link href='https://dashboard.funnelliner.com/add-product'>Add Products</Link>

                                    <p>OR</p>

                                    <Link href='https://dashboard.funnelliner.com/landing-page'>Add New Page</Link> */}
                                        </div>
                                    </div>
                                </section>
                            </td>
                        </tr>

                    )}
                </table>
                {/* {currentProduct.length === 0 && (
                        
                        )} */}
                <div>
                    <Box
                        sx={{
                            margin: "auto",
                            width: "fit-content",
                            alignItems: "center",
                        }}
                    >
                        <Stack spacing={2}>
                            {/* {console.log(pageNumbers.length + 1)} */}
                            <Pagination
                                count={pageNumbers.length}
                                // variant="outlined"
                                page={currentPage}
                                onChange={paginate}
                            />
                        </Stack>
                    </Box>
                </div>
            </div>

        </div>

    );
};

export default FollowUpOrderCustomers;