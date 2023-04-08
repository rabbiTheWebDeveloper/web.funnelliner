import { Button, Switch } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { headers, shopId } from '../../pages/api';

const FacebookPixel = ({ shopName }) => {
    const [checkStatus, setCheckStatus] = useState("")
    const [websiteSettingsData, setWebsiteSettingData] = useState({});

    const label = { inputProps: { "aria-label": "Switch demo" } };

    const [checked, setChecked] = useState("");
    const [advanceStatus, setAdvanceStatus] = useState(true)
    const switchHandlerAdvance = (event) => {
        setAdvanceStatus(!advanceStatus)
        if (event === true) {
            setChecked("1")

        }
        else if (event === false) {
            setChecked("0")
        }


    };
    // console.log("Check status", checkStatus)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.c_status = checked
        data.shop_name = shopName
        data.shop_id = shopId
        // console.log(data);
        axios.post(`${process.env.API_URL}/client/settings/pixel/update`, data, {
            headers: headers,
        })
            .then(function (response) {

                // console.log("fb ", response)
                Swal.fire(
                    "Facebook Pixel Information Updated",
                )
            })
            .catch(function (error) {
                // console.log("error", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.msg,
                    footer: '<a href="">Why do I have this issue?</a>',
                });
            });


    }



    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/settings/business-info", { headers: headers })
            .then(function (response) {
                // handle success
                setWebsiteSettingData(response?.data?.data);
                setAdvanceStatus(response?.data?.data?.c_status)
            });
    }, []);

    // console.log(websiteSettingsData.c_status)
    console.log('Status Show', advanceStatus)
    return (
        <div className='DashboardTabsItem DomainRequest'>

            <div className="Header">
                <h5>Facebook Pixel Setting</h5>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ProductTable">

                    <div className="FacebookPixel">

                        <div className="Form">

                            <div className="CustomeInput">

                                <label>FB Pixel ID</label>
                                <input type="text" {...register("fb_pixel", { required: true })}
                                    defaultValue={websiteSettingsData.fb_pixel} />
                                {errors.fb_pixel && <span>This field is required</span>}
                                <h6 className="padding">This code will load before head tag</h6>

                            </div>

                            <div className="Switch">
                                <p>Enable Conversion API (Add The Token Below)</p>
                                <Switch
                                    checked={advanceStatus}
                                    onChange={(e) => switchHandlerAdvance(e.target.checked)}
                                    {...label}
                                // defaultChecked={checked}
                                />

                            </div>

                            {
                                advanceStatus === true && <div className="CustomeInput">

                                    <label>Conversion API (Recommended)</label>
                                    <textarea name="" rows="5" placeholder="" {...register("c_api", { required: true })}
                                        defaultValue={websiteSettingsData.c_api}></textarea>
                                    {errors.c_api && <span>This field is required</span>}
                                    <h6 className="padding">Send events directly from your web server to Facebook through
                                        the conversion API. This can help you capture more events. Anaccess token is
                                        required to use the server-side API.</h6>

                                </div>
                            }



                            <div className="CustomeInput">

                                <label>Test Event Code</label>
                                <input type="text" {...register("test_event",)}
                                    defaultValue={websiteSettingsData.test_event} />
                                {/* {errors.test_event && <span>This field is required</span>} */}
                                <h6 className="padding">Use this if you need to test the server side event. <Link
                                    href=''>Remove it after testing</Link></h6>

                            </div>

                            <div className='Item'>
                                {/* <input type="submit"  className='Update'/> */}
                                <Button type='submit' className='Update'>
                                    Save
                                </Button>
                            </div>

                        </div>


                    </div>


                </div>
            </form>


        </div>
    );
};

export default FacebookPixel;