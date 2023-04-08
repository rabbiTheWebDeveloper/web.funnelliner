import {Button, TextField} from '@mui/material';
import React from 'react';
import Link from 'next/link';


const index = () => {

    return (

        <>

            <section className='Login'>

                <div className="LoginContent">

                    {/* Logo */}
                    <div className="Logo">
                        <img src="images/logo.svg" alt=""/>
                    </div>

                    {/* HeaderText */}
                    <div className="HeaderText">

                        <h3>Welcome To </h3>
                        <p>The First Automated E-Commerce <br/> Sales Funnel In Bangladesh</p>

                    </div>

                    {/* form Part */}
                    <div className="FormPart">

                        {/* Name */}
                        <div className="CustomeInput">
                            <label>Name</label>
                            <TextField id="outlined-basic" label="Enter Name" variant="outlined"/>
                        </div>

                        {/* Phone */}
                        <div className="CustomeInput">
                            <label>Phone Number</label>
                            <TextField id="outlined-basic" label="Phone Number" variant="outlined"/>
                        </div>

                        {/* Shop Name */}
                        <div className="CustomeInput">
                            <label>Shop Name (Business/Store Name)</label>
                            <TextField id="outlined-basic" label="Shop Name" variant="outlined"/>
                        </div>

                        {/* Password */}
                        <div className="CustomeInput">
                            <label>Password</label>
                            <TextField id="outlined-basic" label="Password" variant="outlined"/>
                        </div>

                        {/* Confirm Password */}
                        <div className="CustomeInput">
                            <label>Confirm Password</label>
                            <TextField id="outlined-basic" label="Confirm Password" variant="outlined"/>
                        </div>

                        {/* Sign Up */}
                        <div className="CustomeInput">
                            <Button className='bg'>Sign Up</Button>
                        </div>

                        {/* Sign Up */}
                        <div className="CustomeInput">
                            <p>Already Have An Account ? <Link href='/login'>Log In</Link></p>
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

            </section>

        </>

    )

}

export default index

// export default withAuth(index, {
//   isProtectedRoute: true
// });