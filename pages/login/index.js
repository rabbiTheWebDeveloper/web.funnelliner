import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SuperFetch from '../../hook/Axios';
import withAuth from "../../hook/PrivateRoute";
// import withAuth from "../../hook/PrivateRoute";
import { detect } from 'detect-browser';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
const publicIp = require("react-public-ip");

const Login_Part = () => {
    const [errorText, setErrorText] = useState("");
    let [showPass, setShowPass] = useState("");
    let [ipAddress, setIpAddress] = useState("");
    let [browserName, setBrowserName] = useState("");
    const router = useRouter()
    const defaultValues = {
        email: "",
        password: "",
    }
    const validationSchema = yup.object().shape({
        email: yup.string()
            .required(),

        password: yup.string().required()
    });
    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(validationSchema),

    });

    useEffect(() => {
        getIpAddress()
    }, []);
    const browser = detect();
    const getIpAddress = async () => {
        const ipAddress = await publicIp.v4() || "";
        const browserName = browser.name === 'chrome' ? 'Google Chrome' : browser.name
        setIpAddress(ipAddress);
        setBrowserName(browserName);
    }


    const onSubmit = (data) => {

        SuperFetch.post('/login', {email: data.email, password: data.password}, {"headers": {ipAddress, browserName}})
            .then(response => {
                // console.log(response.data.message)

                if (response.data.success === true) {

                    toast.success('Successfully logged in!')
                    Cookies.set('token', response.data.token)
                    Cookies.set('user', JSON.stringify(response.data.data))
                 

                    router.push('/')
                    window.location.href = "/";

                } else {
                    setErrorText(response.data.message)
                }


            })
            .catch(errors => {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    text: 'Invalid Email Address Or Password',
                    timer: 1500

                })
                // console.log("errors", errors)
                setErrorText("Invalid Email Address or Password");
            })
    }

    setTimeout(function () {
        setErrorText("");
    }, 4000)


    //     // Handle Show Pass
    let handleShowPass = () => {
        setShowPass(!showPass);
    };

    return (

        <>

            <section className='Login'>

                <div className="LoginContent">

                    <div className="Overflow">

                        {/* Logo */}
                        <div className="Logo">
                            <img src="/images/funnel-liner-logo-beta.png" alt=""/>
                        </div>

                        {/* HeaderText */}
                        <div className="HeaderText">

                            <h3>Welcome To</h3>
                            <p>The First Automated E-Commerce <br/> Sales Funnel In Bangladesh</p>

                        </div>

                        {/* form Part */}
                        <div className="FormPart">

                            {/* E-mail Address or Phone Number */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="CustomeInput">
                                    <label>E-mail Address or Phone Number</label>
                                    <TextField type='text'  {...register("email")} id="outlined-basic" label=""
                                               variant="outlined" placeholder='E-mail Address or Phone Number'/>
                                    {errors && <span className="text-danger">{errors.email?.message}</span>}
                                </div>

                                {/* Password */}
                                <div className="CustomeInput">
                                    <label>Password</label>
                                    <TextField type={showPass ? 'text' : 'password'}  {...register("password")}
                                               id="outlined-basic" label="" variant="outlined" placeholder='Password'/>
                                    {showPass ? <div onClick={handleShowPass} className='eye'><AiFillEye/></div> :
                                        <div onClick={handleShowPass} className='eye'><AiFillEyeInvisible/></div>}
                                    {errors && <span>{errors.password?.message}</span>}
                                </div>

                                {/* Sign Up */}
                                <div className="CustomeInput">
                                    {/* <input className='bg'  /> */}
                                    <Button type="submit" className='bg'>Log In</Button>
                                    <p>{errorText}</p>
                                    <p className='forgate'><Link href='/forgot-password'>Forgot Password ?</Link></p>
                                </div>
                            </form>

                            {/* Sign Up */}
                            <div className="CustomeInput">
                                <p>Already Have An Account ? <Link href='https://funnelliner.com/signup'>Sign Up</Link>
                                </p>
                            </div>

                            {/* Sign Up */}
                            {/* <div className="CustomeInput">
                <h6>Login With Social Media</h6>

                <div className="LoginWith d_flex">
                  <Link href=''> <BsFacebook/> </Link>
                  <Link href=''> <BsGoogle/> </Link>
                </div>

              </div> */}

                        </div>

                    </div>

                </div>

            </section>

        </>

    )

}

export default withAuth(Login_Part, {
    isProtectedRoute: false,
    redirectIfNotAuthenticated: "/login",
    redirectIfAuthenticated: "/",
});
