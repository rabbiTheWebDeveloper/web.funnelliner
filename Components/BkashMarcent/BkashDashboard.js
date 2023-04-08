import { Button } from '@mui/material';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineRefresh } from 'react-icons/md';

const BkashDashboard = () => {

    return (

        <>

            <section className='BkashDashboard'>

                <div className="Header d_flex d_justify">

                    {/* HeaderLeft */}
                    <div className="HeaderLeft">

                        <h4>Hi, welcome back!</h4>

                        <div className="ButtonWithSearch AddonsTabsHeader d_flex">

                            <Button>
                                Refresh Now
                                <MdOutlineRefresh />
                            </Button>

                            <div className="Search">
                                <input type="text" placeholder='Search addons...' />
                                <div className="searchIcon">
                                    <BsSearch />
                                </div>
                            </div>


                        </div>

                    </div>

                    {/* HeaderRight */}
                    <div className="HeaderRight d_flex">

                        {/* item */}
                        <div className="HeaderRightItem d_flex d_justify">

                            <div className="text">

                                <h5> <img src="/images/tk.png" alt="" /> 41,540</h5>
                                <p>Account Balance</p>

                            </div>

                            <div className="img">
                                <img src="/images/money-bag.png" alt="" />
                            </div>

                        </div>

                        {/* item */}
                        <div className="HeaderRightItem bg2 d_flex d_justify">

                            <div className="text">

                                <h5> 200</h5>
                                <p>Total Transactions</p>

                            </div>

                            <div className="img">
                                <select name="">
                                    <option value="">Today</option>
                                    <option value="">Yesterday</option>
                                    <option value="">This Weak</option>
                                    <option value="">This Month</option>
                                    <option value="">This Year</option>
                                </select>
                                <img src="/images/return-policy.png" alt="" />
                            </div>

                        </div>

                    </div>

                </div>

                {/* BkashDashboardTable */}
                <div className="BkashDashboardTable">

                    <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Wallet</th>
                                    <th>Transaction ID</th>
                                    <th>Transaction Type</th>
                                    <th>Transaction Amount</th>
                                    <th>Transaction Reference</th>
                                    <th>Other Info</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                                <tr>
                                    <td>30/3/23 01:00 AM</td>
                                    <td>bKash</td>
                                    <td>ACU2WB580G</td>
                                    <td>Organization eMoney Schedule Refund Pending</td>
                                    <td>-197.42</td>
                                    <td>2</td>
                                    <td>Charge: 2.58</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </>

    )
}

export default BkashDashboard
