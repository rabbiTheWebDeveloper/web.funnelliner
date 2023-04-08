import axios from "axios";
import { useEffect, useState } from "react";
import WebsiteSettingPage from '../../Components/WebsiteSettingPage/WebsiteSettingPage';
import withAuth from '../../hook/PrivateRoute';
import { headers } from "../api";


const index = () => {
    const [response , setResponse] =useState({})

    const handleFetchWebsite = async () => {
        try {
            let data = await axios({
                method: "get",
                url: `${process.env.API_URL}/client/settings/business-info`,
                headers: headers,
            });
            // console.log("setSalesTarget",data.data.data)
            setResponse(data?.data?.data);
        } catch (err) {
            // console.log(err)
        }


    };


    useEffect(() => {
        handleFetchWebsite()
    }, []);
    return (

        <>
            <WebsiteSettingPage response={response}></WebsiteSettingPage>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});