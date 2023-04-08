import { Button } from "@mui/material";
import axios from "axios";
import React from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { baseUrl } from "../../constant/constant";
import { headers, shopId } from "../../pages/api";

const DomainVerification = ({ shopName, data }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        data.shop_name = shopName
        data.shop_id = shopId
        // console.log(data);
        axios.post(`${baseUrl}/client/settings/domain-meta/update`, data, {
            headers: headers,
        })
            .then(function (response) {


                Swal.fire(
                    "Verify Your Domain Information Updated",

                )
            })
            .catch(function (error) {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.msg,
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });
    }

    const htmlString = '<meta name="facebook-domain-verification" content="87hou17rngj5dfdfwue2286dmhwa1qzpwf" />';
    return (
        <div className='DashboardTabsItem DomainVerification'>

            <div className="CustomeInput">
                <label>Verify Your Domain</label>
                <ul>
                    <li>1. Copy the meta-tag you see on your business settings screen.</li>
                    <li>2. Open your website’s home page HTML source.</li>
                    <li>3. Paste the meta-tag into the <head>...</head> section of the HTML code, and publish the page.</li>
                    <li>4. Go to the root domain of your website, and view the HTML source to confirm that the meta-tag is there.</li>
                </ul>
            </div>

            {/* Add Another Verification Meta Tag */}

            <div className="AddAnotherVerification">

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* domain_verify */}

                    <div className="Item d_flex">
                        <div className="CustomeInput">
                            <label>Verify Your Domain</label>
                            <pre>
                                {htmlString}
                            </pre>

                            <input defaultValue={data?.domain_verify} type="text" {...register("domain_verify", { required: true })} placeholder='87hou17rngj5wue2286dmhwa1qzpwfuuu"' />
                        </div>

                    </div>

                    {/* AddCancel */}
                    <div className="Save">

                        <Button type='submit'>Save</Button>

                    </div>
                </form>

            </div>


        </div>
    );
};

export default DomainVerification;