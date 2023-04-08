import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {

    return (

        <>

            <section className='BkashSignUp'>

                <div className="BkashSignUpContent">

                    <div className="Header">
                        <div className="img">
                            <img src="/images/bkash-marcent.png" alt="" />
                        </div>
                        <div className="text">
                            <h3>Welcome Back to</h3>
                            <h6>bKash Business Dashboard</h6>
                        </div>
                    </div>

                    <div className="CustomeInput">
                        <label>Mobile Number</label>
                        <input type="number" placeholder='Mobile Number' />
                    </div>

                    <div className="CustomeInput">
                        <label>Password</label>
                        <input type="password" placeholder='Mobile Number' />
                    </div>

                    <div className="CustomeInput">
                        <Button>Sign In</Button>
                        <Link href='/bkash-marcent-dashboard'> bkash-marcent-dashboard</Link>
                    </div>



                </div>

            </section>
        
        </>

    )
}

export default SignIn
