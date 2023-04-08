import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button } from '@mui/material';

import {BsCloudArrowDownFill} from 'react-icons/bs'




const AccountPdfReport = () => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const top100Films = [
        { title: 'The Shawshank', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler", year: 1993 },
        { title: 'P' }
    ];

    // Dropdown
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <>

            <section className='AccountDashboard AccountPdfReport'>

                <div className="Selector">

                    <h4>Export Transactions PDF Report  </h4>

                </div>

                <div className="Header d_flex">

                    {/* Item */}
                    <div className="HeaderItemContent">

                        <div className="HeaderItem d_flex">

                            <div className="img">
                                <img src="/images/account-plus.png" alt="" />
                            </div>

                            <div className="text">
                                <h5>Cash In</h5>
                                <h3><TbCurrencyTaka /> 41,510</h3>
                            </div>

                            <div className="overlay">
                                <img src="/images/account-plus-overlay.png" alt="" />
                            </div>

                        </div>

                    </div>

                    {/* Item */}
                    <div className="HeaderItemContent">

                        <div className="HeaderItem Minus d_flex">

                            <div className="img">
                                <img src="/images/account-minus.png" alt="" />
                            </div>

                            <div className="text">
                                <h5>Cash Out</h5>
                                <h3><TbCurrencyTaka /> 41,510</h3>
                            </div>

                            <div className="overlay">
                                <img src="/images/account-minus-overlay.png" alt="" />
                            </div>

                        </div>

                    </div>

                    {/* Item */}
                    <div className="HeaderItemContent">

                        <div className="HeaderItem Equal d_flex">

                            <div className="img">
                                <img src="/images/account-equal.png" alt="" />
                            </div>

                            <div className="text">
                                <h5>Cash In</h5>
                                <h3><TbCurrencyTaka /> 41,510</h3>
                            </div>

                            <div className="overlay">
                                <img src="/images/account-equal-overlay.png" alt="" />
                            </div>

                        </div>

                    </div>

                </div>

                {/* AccountTable */}
                <div className="AccountTable">

                    <div className="Filter d_flex">

                        <h3>Accounting Modules</h3>

                        <div className="FilterButton">

                            <Button className='active'>All Item</Button>
                            <Button>Payable/Receivable</Button>
                            <Button>Category/Ledger</Button>
                            <Button>Payment  Method</Button>
                            <Button>Date & Time</Button>

                        </div>

                    </div>

                    <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time </th>
                                    <th>Description</th>
                                    <th>Payable/Receivable</th>
                                    <th>Category/Ledger</th>
                                    <th>Payment  Method</th>
                                    <th>Cash In</th>
                                    <th>Cash Out</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                                <tr>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES</td>
                                    <td>Salary</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+30,000</td>
                                    <td className='Minus'>-30,000</td>
                                    <td>30,000</td>
                                </tr>

                            </tbody>

                        </table>

                        <div className="DownloadPdf">
                            <Button>Download PDF <BsCloudArrowDownFill /></Button>
                        </div>

                    </div>

                </div>

            </section>

        </>

    )

}

export default AccountPdfReport
