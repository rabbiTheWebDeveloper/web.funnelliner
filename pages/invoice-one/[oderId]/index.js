
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { headers, shopId, userId } from '../../api';



const index = () => {
    const { publicRuntimeConfig } = getConfig();
    const apiUrl = publicRuntimeConfig.API_URL;
    const [invoice, setInvoice] = useState({})
    const [busInfo, setBusInfo] = useState({});
    const [ownInfo, setOwnInfo] = useState({});
    // let router =useRouter()
    const router = useRouter()
    const { oderId } = router.query
    const token = Cookies.get("token");
    // const { pid } = router.query
    // console.log(shopId)

    useEffect(() => {
        // debugger
        axios
            .get(apiUrl + "/client/settings/business-info", { headers: headers })
            .then(function (response) {
                // handle success
                // let target = response.data.data;
                setBusInfo(response?.data?.data);

            });
    }, [oderId]);


    useEffect(() => {

        const timeoutId = setTimeout(() => {

            axios.get(apiUrl + "/client/order-invoice", {
                headers: {
                    'shop-id': shopId,
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: `Bearer ${token}`,
                    "order-id": oderId,
                    "id": userId,
                    // shop_id :shopId
                },
            })
                .then(function (response) {
                    // handle success
                    setInvoice(response?.data?.data);
                    //   console.log(response)
                });
        }, 1000)

        return () => clearTimeout(timeoutId);


    }, [oderId])
    console.log("invoice ", invoice)






    const calculatePrice = invoice?.order_details?.reduce((prevVal, currentVal) => {
        return prevVal + currentVal?.product?.price * currentVal?.product_qty
    }, 0)

    const totalPrice = calculatePrice
    useEffect(() => {

        setTimeout(() => {
            window.print();

        }, 5000)
    }, [])
    const { order_details } = invoice
    console.log('busInfo', invoice)
    if (invoice !== undefined) {


        return (

            <>

                <div className="InvoiceOne">


                    <div className="InvoiceOneContent">

                        <div className="Thankyou">
                            <p>Thank you for your being with us !</p>

                            <div className="FooterAddress">

                                <div className="Header">

                                    {/* text */}
                                    <div className="Text">
                                        <ul>
                                            <li> <BiPhoneCall /> {busInfo?.phone}</li>
                                            <li> <FaRegEnvelope />{busInfo?.email}</li>
                                            <li> <MdLocationPin /> location {busInfo?.address}</li>
                                        </ul>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Header */}
                        <div className="Header d_flex d_justify">

                            <div className="Logo">
                                <img src={busInfo?.shop_logo?.name} alt="" />
                            </div>

                            <div className="Title">
                                <h3>INVOICE</h3>
                                <h4>Invoice No: <span>{" "} {invoice?.order_no}</span></h4>
                                <h4>Invoice date: <strong>{moment().format("MMM Do YY")}</strong> </h4>
                            </div>


                        </div>

                        {/* Table */}
                        <div className="Table">

                            <table>

                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>PRODUCT DESCRIPTION</th>
                                        <th>PRICE</th>
                                        <th>QTY</th>
                                        <th>AMOUNT</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {/* {order_details?.map((data, index) => {
                                        return <tr key={data.order_id} >
                                            <td>
                                                <h4>{index + 1}</h4>
                                            
                                            </td>
                                            <td>
                                                <h4>{data?.product}</h4>
                                              
                                            </td>
                                            <td>{data?.price}</td>
                                            <td>{data?.product_qty}</td>
                                            <td>{data?.price * data?.quantity}</td>
                                        </tr>
                                    })} */}


                                </tbody>

                            </table>

                        </div>

                        {/* Total */}
                        <div className="Total d_flex d_justify">

                            <div className="Left">
                                <h4>Invoice to: </h4>
                                <p>{invoice?.customer_name}</p>
                                <p> {invoice?.address}</p>
                                <p>{invoice?.phone}</p>
                            </div>

                            <div className="Right">

                                <ul>
                                    <li>SubTotal: BDT {invoice?.pricing?.grand_total}</li>
                                    <li>Discount: BDT {invoice?.pricing?.discount}</li>
                                    <li>Advance: BDT {invoice?.pricing?.advanced}</li>
                                    <li>Shipping Cost: BDT {invoice?.pricing?.shipping_cost}</li>
                                </ul>

                                <h3>Total Due: BDT {invoice?.pricing?.due}</h3>

                            </div>

                        </div>


                    </div>


                </div>




            </>

        )
    }





}

export default index