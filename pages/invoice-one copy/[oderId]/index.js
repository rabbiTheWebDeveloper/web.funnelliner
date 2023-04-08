
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


    const[invoice ,setInvoice] =useState()
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
          .get(apiUrl+ "/client/settings/business-info", { headers: headers })
          .then(function (response) {
            // handle success
            // let target = response.data.data;
            setBusInfo(response?.data?.data);
     
          });
      }, [oderId]);

      useEffect(() => {
        axios.get(apiUrl+ "/client/settings/owner-info", { headers: headers })
          .then(function (response) {
            // handle success
            let target = response?.data?.data;
            setOwnInfo(target);

          });
      }, [oderId]);




    useEffect(()=>{
        axios.get(apiUrl+"/client/order-invoice", {
            headers:{
                'shop-id':shopId,
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${token}`,
                "order-id" :oderId,
                "id": userId,
                // shop_id :shopId
            },
          } )
        .then(function (response) {
          // handle success
          setInvoice(response?.data?.data);
        //   console.log(response)
        });

    } ,[oderId])
    console.log("invoice " ,invoice)





  
    const calculatePrice = invoice?.order_details?.reduce((prevVal, currentVal) => {
        return prevVal + currentVal?.product?.price* currentVal?.product_qty
      }, 0)

      const totalPrice = calculatePrice
  


      useEffect(() => {

        setTimeout( ()=>{
            window.print();

        },2000)
      } ,[])


    return (

        <>

            <div className="InvoiceOne">

                
                <div className="InvoiceOneContent">

                    <div className="Thankyou">
                        <p>Thank you for your being with us !</p>
                    </div>

                    {/* Header */}
                    <div className="Header d_flex d_justify">

                        <div className="Logo">
                        <img src={busInfo?.shop_logo?.name} alt="" />
                        </div>

                        {/* text */}
                        <div className="Text">
                            <ul>
                                <li> <BiPhoneCall/> {busInfo?.phone}</li>
                                <li> <FaRegEnvelope/>{busInfo?.email}</li>
                                <li> <MdLocationPin/> location {busInfo?.address}</li>
                            </ul>
                        </div>

                    </div>

                    {/* Title */}
                    <div className="Title">

                        <h3>INVOICEdfdsf</h3>
                        <h5>No:{" "} {invoice?.order_no}</h5>
                        <h4>Invoice date:{moment().format("MMM Do YY")}</h4>

                    </div>

                    {/* Table */}
                    <div className="Table">

                        <table>

                            <thead>
                                <tr>
                                    <th>PRODUCT DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>

                            <tbody>

                            {invoice?.order_details?.map((data ,index) => {
                return (
                <tr>
                    <td>
                        <h4>{data?.product}</h4>
                        {/* <h5>Additional Information</h5> */}
                    </td>
                    <td>{data?.price}</td>
                    <td>{data?.quantity}</td>
                    <td>{data?.price * data?.quantity}</td>
                </tr>
                );
              })}
                                

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
                                <li>SubTotal: BDT {invoice?.grand_total}</li>
                                <li>Discount: BDT {invoice?.discounted_total}</li>
                                <li>Advance: BDT {invoice?.advanced}</li>
                                <li>Shipping Cost: BDT {invoice?.shipping_cost}</li>
                            </ul>

                            <h3>Total Bill: BDT {invoice?.due}</h3>

                        </div>

                    </div>
                    

                </div>


            </div>


           

        </>

    )

}

export default index