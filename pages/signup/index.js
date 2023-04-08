import Link from "next/link";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import {useRouter} from "next/router";
import {useState} from "react";
import {toast} from "react-toastify";
import {baseUrl} from '../../constant/constant';


export default function index() {
    const router = useRouter()
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false)

    const validationSchema = yup.object().shape({
        name: yup.string().required('Full name field is required'),
        email: yup.string().required('Email field is required').email(),
        phone: yup.string().required('Phone field is required').matches(phoneRegex, 'Phone number is not valid'),
        shop_name: yup.string().required('Shop name field is required'),
        password: yup.string().required('Password field is required'),
        password_confirmation: yup.string().required('Confirm Password field is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });

    const submitForm = (data) => {
        setLoading(true);

        axios.post(baseUrl + '/api/v1/signup', data).then((response) => {
            if (response.data.success === true) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        setPhone(response.data.data.phone)
                        setLoading(false);
                        setVerifyLoading(true);
                    }
                });
            }
        }).catch(errors => {

            Object.keys(errors.response.data.errors || {}).forEach((field) => {
                const messages = errors.response.data.errors[field];

                setError(field, {
                    type: "server",
                    message: messages.join(". ")
                });

            });
            setLoading(false);

        })
    }

    return (
        <>
            <div>
                {!verifyLoading ? <section className="Register">

                    <div className="RegisterForm">


                        <div className="Overflow">

                            <div className="HeaderPart">

                                <div className="Logo">
                                    <img src="/images/funnel-liner-logo-beta.png" alt="" className="RegisterFormLogo"/>
                                </div>

                                <div className="text">
                                    <h3>Welcome To </h3>
                                    <p>The Best Business 360 Solution For Your Business, Just Login & You’re Ready To Go
                                        !</p>
                                </div>

                            </div>

                            <form onSubmit={handleSubmit(submitForm)}>

                                <div className="form_part">

                                    <div className="CustomerInput">
                                        <label className={`${errors.name ? `${"ValidationErrorLabel"}` : ''}`}>Full
                                            Name</label>
                                        <input type="text" name="name"
                                               className={`${errors.name ? `${"ValidationErrorLabel"} ${style.ValidationError}` : `${"ValidationErrorLabel"}`}`}
                                               placeholder="Enter Your Full Name " {...register('name')} />
                                        {errors &&
                                        <span className="ValidationErrorLabel">{errors.name?.message}</span>}
                                    </div>

                                    <div className="CustomerInput">
                                        <label className={`${errors.shop_name ? `${"ValidationErrorLabel"}` : ''}`}
                                        >Shop Name</label>
                                        <input type="text" name="name"
                                               className={`${errors.shop_name ? `${"CustomerInputField"} ${"ValidationError"}` : `${"CustomerInputField"}`}`}
                                               placeholder="Enter Your Shop Name " {...register('shop_name')}/>

                                        {errors &&
                                        <span className="ValidationErrorLabel">{errors.shop_name?.message}</span>}
                                    </div>

                                    <div className="CustomerInput">
                                        <label className={`${errors.email ? `${"ValidationErrorLabel"}` : ''}`}
                                        >E-mail Address</label>
                                        <input type="text"
                                               className={`${errors.email ? `${"ValidationErrorLabel"} ${"ValidationError"}` : `${"ValidationErrorLabel"}`}`}
                                               placeholder="Enter Your Email Address " {...register('email')}/>

                                        {errors &&
                                        <span className={"ValidationErrorLabel"}>{errors.email?.message}</span>}
                                    </div>

                                    <div className="CustomerInput">
                                        <label className={`${errors.phone ? `${"ValidationErrorLabel"}` : ''}`}
                                        >Phone Number</label>
                                        <input type="text"
                                               className={`${errors.phone ? `${"CustomerInputField"} ${"ValidationError"}` : `${"CustomerInputField"}`}`}
                                               placeholder="Enter Your Phone Number " {...register('phone')}/>

                                        {errors &&
                                        <span className={"ValidationErrorLabel"}>{errors.phone?.message}</span>}
                                    </div>


                                    <div className="CustomerInput">
                                        <label className={`${errors.password ? `${"ValidationErrorLabel"}` : ''}`}
                                        >Password</label>
                                        <input type="password" name="name"
                                               className={`${errors.password ? `${"CustomerInputField"} ${"ValidationError"}` : `${"CustomerInputField"}`}`}
                                               placeholder="Enter Your Password " {...register('password')}/>

                                        {errors &&
                                        <span className={"ValidationErrorLabel"}>{errors.password?.message}</span>}
                                    </div>


                                    <div className="CustomerInput">
                                        <label
                                            className={`${errors.password_confirmation ? `${"ValidationErrorLabel"}` : ''}`}
                                        >Confirm Password</label>
                                        <input type="password" name="name"
                                               className={`${errors.password_confirmation ? `${"CustomerInputField"} ${"ValidationError"}` : `${"CustomerInputField"}`}`}
                                               placeholder="Confirm Your Password" {...register('password_confirmation')}/>

                                        {errors && <span
                                            className={"ValidationErrorLabel"}>{errors.password_confirmation?.message}</span>}
                                    </div>


                                    <div className="CustomerInput">
                                        <button type="submit" className="CustomerInputButton"
                                                disabled={loading}>{!loading ? 'Sign Up' : 'Creating Account ...'}</button>
                                    </div>

                                    <div className="CustomerInput">
                                        <p className={"CustomerInputPara"}>Already Have An Account ?
                                            <Link className={"CustomerInputLink"}
                                                  href={'https://dashboard.funnelliner.com/'}>
                                                Log In</Link>
                                        </p>
                                    </div>

                                </div>
                            </form>

                        </div>


                    </div>

                </section> : <Otp phone={phone}/>}
            </div>

        </>

    )
}
