import React, {useState} from "react";
import {TextField} from "@mui/material";
import {useRouter} from "next/router";
import {Toaster} from "react-hot-toast";
import {LineWave} from "react-loader-spinner";
// import withAuth from "../../hook/PrivateRoute";
import dynamic from "next/dynamic";
//multi step div
import Button from "@mui/material/Button";

const ReactCodeInput = dynamic(import("react-code-input"));

const axios = require("axios");
const steps = ["Select campaign settings", "Create an ad group"];
const index = () => {
    const router = useRouter();
    const [click, setClick] = useState(false);
    const [disable, setDisable] = useState(false);
    // const [OtpDisable, setOtpDisable] = useState(false);


    return (
        <>
            <section className='Login'>
                <div className={`${disable === true ? 'LoginContent LoginContentDivOpacity' : 'LoginContent'}`}>
                    {/* Logo */}
                    <div className='Logo'>
                        <img src='/images/funnel-liner-logo-beta.png' alt=''/>
                    </div>
                    {/* HeaderText */}
                    <div className='HeaderText'>
                        <h5>
                            Change Password
                        </h5>
                    </div>

                    {/* form Part */}
                    <div className='FormPart'>
                        <div className="spinnerForForgetPass">
                            <LineWave
                                height='100'
                                width='100'
                                color='#4fa94d'
                                ariaLabel='line-wave'
                                wrapperStyle={{margin: "30px"}}
                                visible={disable}
                                firstLineColor=''
                                middleLineColor=''
                                lastLineColor=''
                            />
                        </div>
                        <form>
                            {/* Password */}
                            <div className='CustomeInput'>

                                <label> New Password </label>
                                <TextField
                                    type='text'
                                    id='outlined-basic'
                                    label=''
                                    placeholder='Password'
                                />
                            </div>
                            {/* Confirm Password */}
                            <div className='CustomeInput'>
                                <label> Confirm New Password </label>
                                <TextField
                                    type='text'
                                    id='outlined-basic'
                                    label=''
                                    placeholder='Confirm Password'
                                />
                            </div>
                            <div className='CustomeInput'>
                                <Button disabled={disable} type='submit' className='bg'>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    );
};

export default index;
