import withAuth from '../../hook/PrivateRoute';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    MenuItem,
    OutlinedInput,
    Pagination,
    Select,
    TextField
} from "@mui/material";
import {MdOutlineReceiptLong} from "react-icons/md";
import {BsSearch} from "react-icons/bs";
import {styled} from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import SuperFetch from "../../hook/Axios";
import {headers} from "../api";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import {toast} from "react-hot-toast";
import {enGB} from 'date-fns/locale'
import {DateRangePicker, START_DATE, END_DATE} from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import OrderModal from "../../Components/OrderPage/Modal";
import FollowUpDialog from "../../Components/OrderPage/FollowUpDialog";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const index = () => {

    const [active, setDefault] = useState('pending')
    const [products, setProducts] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [orders, setOrders] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [callCount, setCount] = useState(0)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [orderStatus, setOrderStatus] = useState('')
    const [advancedPaymentConfig, setAdvancedPaymentConfig] = useState(false)
    const [showPicker, setShowPicker] = useState(false);

    const BootstrapButton = styled(Button)({
        backgroundColor: '#fff',
        border: '1px solid #894bca',
        color: '#894bca',
        marginRight: '10px',
        '&:hover': {
            backgroundColor: '#894bca',
            borderColor: '#894bca',
            boxShadow: 'none',
            color: '#fff'
        }
    })

    const FilterDateInput = styled(TextField)({
        '& .MuiInputBase-root': {
            height: '42px',
            marginRight: '10px',
        }
    })

    const Paginator = styled(Pagination)({
        '& .MuiPagination-ul': {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            marginTop: '10px'
        }
    })

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 100,
            },
        },
    };

    const status = [
        {item: 'Pending', value: 'pending'},
        {item: 'Follow Up', value: 'follow_up'},
        {item: 'Confirmed', value: 'confirmed'},
        {item: 'Cancelled', value: 'cancelled'},
        {item: 'Returned', value: 'returned'},
        {item: 'Shipped', value: 'shipped'},
        {item: 'Delivered', value: 'delivered'},
    ]

    const handleOpenModal = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleChange = (event, value) => {
        setCurrentPage(value);
        setCount(1)
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString();
    }

    const dateValue = startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : "";

    const handleSelected = (value) => {
        setOpenDialog(false)
        if (value === 'Custom') {
            setShowPicker(true);
        }
        setSelectedValue(value)
    }

    const params = {
        type: active,
        page: currentPage,
        date: selectedValue
    }

    const handleStatusChange = (event, id) => {
        setOrderStatus(event.target.value);
        const params = {
            order_id: id,
            status: event.target.value,
        }
        SuperFetch.post('/client/orders/status/update', params, {headers: headers})
            .then(res => {
                toast.success(res.data?.message, {position: 'top-right'})
            }).catch(error => {
            toast.error(error.response?.data?.msg?.status[0], {position: 'top-right'})
        })
    }

    const handleAdvancedPayment = (event, id) => {
        if (event.key === "Enter" && event.target.value > 0) {
            SuperFetch.post(`/client/order/advance-payment/${id}/update`, {advanced: event.target.value}, {headers: headers})
                .then(res => {
                    console.log(res)
                    toast.success(res.data?.message, {position: 'top-right'})
                }).catch(error => {
                toast.error('Something went wrong please wait for some time', {position: 'top-right'})
            })
        }
    }

    const handleDiscount = (event, id) => {
        if (event.key === "Enter") {
            SuperFetch.post(`/client/order/discount/${id}/update`, {discount: event.target.value}, {headers: headers})
                .then(res => {
                    toast.success(res.data?.message, {position: 'top-right'})
                }).catch(error => {
                toast.error('Something went wrong please wait for some time', {position: 'top-right'})
            })
        }
    }

    const handleNote = (event, id, type) => {
        if (event.key === "Enter") {
            SuperFetch.post(`/client/order/note/${id}/update`, {
                discount: event.target.value,
                type: type
            }, {headers: headers})
                .then(res => {
                    toast.success(res.data?.message, {position: 'top-right'})
                }).catch(error => {
                toast.error('Something went wrong please wait for some time', {position: 'top-right'})
            })
        }
    }
    useEffect(() => {
        SuperFetch.get('/client/orders', {params: params, headers: headers},)
            .then(res => {
                if (res.data.success === true) {
                    setOrders(res.data?.data)
                    setTotalPage(res.data?.last_page)
                }
            }).catch((e) => {
            console.log('order_error', e)
        })

        if (callCount === 0) {
            SuperFetch.get('/client/products', {headers: headers}).then(res => {
                if (res.data.success === true) {
                    setProducts(res.data?.data)
                }
            })
            SuperFetch.get('/client/settings/advance-payment/status', {headers: headers})
                .then(res => {
                    if (res.data.success === true) {
                        setAdvancedPaymentConfig(res.data?.data?.advanced_payment)
                    }
                })
        }

    }, [active, currentPage])

    return (

        <div>

            <section className="TopSellingProducts DashboardSetting Order">
                <Container maxWidth="sm">
                    <Grid>
                        <Grid item xs={12}>

                            <div className="Header d_flex d_justify">

                                <div className="Left d_flex">
                                    <div className="svg">
                                        <MdOutlineReceiptLong/>
                                    </div>

                                    <div className="text">
                                        <h4>Orders </h4>
                                        <p>Order List</p>
                                    </div>
                                </div>

                                <div className="Right d_flex">
                                    {/* item */}
                                    <div className="FilterItem">
                                        <div className="CustomeInput">
                                            <TextField
                                                id="outlined-basic"
                                                label="Search Here..."
                                                variant="outlined"
                                            />
                                            <Button id="orderSearchButton">
                                                <BsSearch/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div style={{marginTop: '2%', display: 'flex', justifyContent: 'space-between'}}>

                        <div className="">
                            <Box sx={{width: "100%", typography: "body1"}}>
                                <BootstrapButton className={active === 'pending' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('pending')}>Pending</BootstrapButton>
                                <BootstrapButton className={active === 'follow_up' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('follow_up')}>Follow Up</BootstrapButton>
                                <BootstrapButton className={active === 'confirmed' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('confirmed')}>Confirmed</BootstrapButton>
                                <BootstrapButton className={active === 'shipped' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('shipped')}>Shipped</BootstrapButton>
                                <BootstrapButton className={active === 'cancelled' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('cancelled')}>Cancelled</BootstrapButton>
                                <BootstrapButton className={active === 'delivered' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('delivered')}>Delivered</BootstrapButton>
                                <BootstrapButton className={active === 'returned' ? 'filterActive' : ''}
                                                 onClick={e => setDefault('returned')}>Returned</BootstrapButton>


                            </Box>

                        </div>

                        {active === 'pending' &&
                        <div className="">
                            <BootstrapButton onClick={handleOpenModal}
                                             style={{backgroundColor: '#894bca', color: '#fff'}}>Create New
                                Order</BootstrapButton>
                        </div>
                        }
                        {active === 'follow_up' &&
                        <div className="d_flex">
                            <div>
                                {showPicker && (
                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        focus={focus}
                                        onStartDateChange={setStartDate}
                                        onEndDateChange={setEndDate}
                                        locale={enGB}
                                        modifiersClassNames={{open: '-open'}}
                                    >
                                        {({startDateInputProps, endDateInputProps}) => (
                                            <div className="date-range">

                                                <FilterDateInput
                                                    className="input"
                                                    {...endDateInputProps}
                                                    {...startDateInputProps}
                                                    value={dateValue}
                                                    placeholder="Select date range"
                                                />
                                            </div>
                                        )}
                                    </DateRangePicker>)
                                }
                            </div>
                            <BootstrapButton onClick={handleOpenDialog}>
                                Find Your Follow Up Order
                            </BootstrapButton>


                            <FollowUpDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog}
                                            handleSelected={handleSelected}/>


                        </div>
                        }

                    </div>

                    <div className="ProductTable">
                        <table>
                            <thead>
                            <tr>
                                <th>SL</th>
                                <th>Order No</th>
                                <th>Order Date</th>
                                <th>Customer</th>
                                <th>Contact No.</th>
                                <th>Address</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                                <th>Total Price</th>
                                {advancedPaymentConfig &&
                                <th>Advanced</th>
                                }
                                <th>Status</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.length > 0 ? orders.map((order, index) => {
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>#{order.order_no}</td>
                                        <td>{order.created_at}</td>
                                        <td>{order.customer_name}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>{order.id}</td>
                                        <td>{order.id}</td>
                                        <td>
                                            <input type="text" defaultValue={order?.discount}
                                                   onKeyDown={(event => handleDiscount(event, order?.id))}/>
                                        </td>
                                        <td>{order?.grand_total}</td>
                                        {advancedPaymentConfig &&
                                        <td><input type="text" defaultValue={order?.advanced}
                                                   onKeyDown={(event) => handleAdvancedPayment(event, order?.id)}/></td>
                                        }
                                        <td>
                                            <FormControl sx={{m: 1, width: 300}}>
                                                <Select
                                                    displayEmpty
                                                    defaultValue={order?.order_status}
                                                    onChange={(event) => handleStatusChange(event, order?.id)}
                                                    input={<OutlinedInput/>}
                                                    MenuProps={MenuProps}
                                                    inputProps={{'aria-label': 'Without label'}}
                                                >
                                                    <MenuItem disabled value="">
                                                        <em>Select Status</em>
                                                    </MenuItem>
                                                    {status.map((item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item.value}
                                                            selected={item.value === orderStatus}
                                                        >
                                                            {item.item}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </td>
                                        <td><input type="text" defaultValue={order?.note}
                                                   onKeyDown={(event) => handleNote(event, order?.id, order?.order_status)}/>
                                        </td>
                                        <td>
                                            <FaTrash/>
                                            <FaPencilAlt/>
                                        </td>
                                    </tr>)
                                })
                                : (<tr>
                                    <td colSpan={advancedPaymentConfig ? 14 : 13}>
                                        <section className="MiddleSection" style={{padding: '20px'}}>
                                            <div className="MiddleSectionContent">
                                                <div className="img">
                                                    <img src="/error.svg" alt="error"/>
                                                </div>
                                                <div className="text"><p>No Data Available</p></div>
                                            </div>
                                        </section>
                                    </td>
                                </tr>)
                            }

                            </tbody>
                        </table>

                    </div>
                    <Paginator count={totalPage} page={currentPage} onChange={handleChange} showFirstButton
                               showLastButton variant="outlined"/>

                </Container>

            </section>
            <OrderModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} products={products}/>

        </div>

    )

}
// export default index;
export default withAuth(index, {
    isProtectedRoute: true
});