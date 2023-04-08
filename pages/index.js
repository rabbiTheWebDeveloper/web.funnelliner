import axios from "axios";
import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { Fragment, useEffect, useState } from "react";
import GraphChart from "../Components/HomePage/GraphChart";
import NoticeBoard from "../Components/HomePage/NoticeBoard";
import TopSellingProducts from "../Components/HomePage/TopSellingProducts";
import TotalOrder from "../Components/HomePage/TotalOrder";
import WebsiteLink from "../Components/HomePage/WebsiteLink";
import withAuth from "../hook/PrivateRoute";
import { headers } from "./api";

const index = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [busInfo, setBusInfo] = useState({});

    const { publicRuntimeConfig } = getConfig();
    const apiUrl = publicRuntimeConfig.API_URL;

    const handleFetchSellsTarget = async () => {
        try {
            let data = await axios({
                method: "get",
                url: `${apiUrl}/client/order?type=confirmed`,
                headers: headers,
            });

            // console.log("setSalesTarget",data.data.data)
            setAllProduct(data?.data);
        } catch (err) {
            console.log(err)
        }
   
    };

    useEffect(() => {
        handleFetchSellsTarget();
    }, []);

// console.log("Dashboard Order",allProduct )

const handleFetchBusInfo = async () => {
    try {
        let data = await axios({
            method: "get",
            url: `${apiUrl}/client/settings/business-info`,
            headers: headers,
        });

        // console.log("setSalesTarget",data.data.data)
        setBusInfo(data?.data?.data);
        // console.log("data?.data?.data businfo", data)
        if(data?.data?.data?.domain_status==="connected"){
            Cookies.set('domain_request', data?.data?.data.domain_request) 
        } else{
            Cookies.set('domain_request', null) 
        }
            
        
    } catch (err) {
        console.log(err)
    }

};

useEffect(() => {
    handleFetchBusInfo();
}, []);


console.log('Starting' ,allProduct)

    return (
        <Fragment>

          
            <WebsiteLink busInfo={busInfo}></WebsiteLink>
            <NoticeBoard busInfo={busInfo}></NoticeBoard>
            <TotalOrder allProduct={allProduct} busInfo={busInfo}></TotalOrder>
            <GraphChart></GraphChart>
            <TopSellingProducts></TopSellingProducts>
        </Fragment>
    );
};
export default withAuth(index, {
    isProtectedRoute: true,
});
