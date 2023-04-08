import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import CashIn from './CashIn';
import CashOut from './CashOut';

import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AccountEdit from './AccountEdit';


import { enGB } from 'date-fns/locale';
import { DateRangePicker, END_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

const AccountDashboard = () => {

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

    // Custom Date
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString();
    }
    const dateValue = startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : "";

    return (

        <>

            <section className='AccountDashboard'>

                <div className="Selector d_flex">

                    <Button className='active'>Today</Button>
                    <Button>Yesterday</Button>
                    <Button>This Weak</Button>
                    <Button>This Month</Button>
                    <Button>This Year</Button>
                    <div className='AccountDashboard'>
                        <div className="FilterItem CustomDate">
                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                onStartDateChange={setStartDate}
                                onEndDateChange={setEndDate}
                                minimumDate={new Date()}
                                minimumLength={1}
                                format='dd MMM yyyy'
                                locale={enGB}
                            >
                                {({ startDateInputProps, endDateInputProps, focus }) => (
                                    <div className='date-range'>
                                        <span className='date-range_arrow' />
                                        <input
                                            className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                            {...endDateInputProps}
                                            {...startDateInputProps}
                                            placeholder='Custom Date Range'
                                            value={dateValue}
                                        />
                                    </div>
                                )}
                            </DateRangePicker>
                        </div>
                    </div>

                </div>

                <div className="Header d_flex d_justify">

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
                                <h5>Today’s Balance</h5>
                                <h3><TbCurrencyTaka /> 41,510</h3>
                            </div>

                            <div className="overlay">
                                <img src="/images/account-equal-overlay.png" alt="" />
                            </div>

                        </div>

                    </div>

                    {/* Item */}
                    <div className="HeaderItemContent">
                        <CashIn />
                    </div>

                    {/* Item */}
                    <div className="HeaderItemContent">
                        <CashOut />
                    </div>

                </div>

                {/* AccountTable */}
                <div className="AccountTable">

                    <div className="Filter d_flex d_justify">

                        <div className="FilterItem">
                            <select name="">
                                <option value="">Today</option>
                                <option value="">Yesterday</option>
                                <option value="">This Weak</option>
                                <option value="">This Month</option>
                                <option value="">This Year</option>
                                <option value="">Custom date</option>
                            </select>
                        </div>

                        <div className="FilterItem">
                            <Autocomplete
                                multiple
                                options={top100Films}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Category/Ledger" />
                                )}
                            />
                        </div>

                        <div className="FilterItem">
                            <Autocomplete
                                multiple
                                options={top100Films}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Payable/Receivable" />
                                )}
                            />
                        </div>

                        <div className="FilterItem">
                            <Autocomplete
                                multiple
                                options={top100Films}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Payment Method" />
                                )}
                            />
                        </div>

                        <div className="FilterItem">

                            <div className="Search">
                                <input type="text" placeholder='Search Here...' />
                                <AiOutlineSearch />
                            </div>

                        </div>

                        <div className="FilterItem">

                            <div className="Dropdown">
                                <Button> <Link href='/account-report'>Reports</Link> </Button>
                            </div>

                        </div>


                    </div>

                    <div className="ProductTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bill No</th>
                                    <th>Date & Time</th>
                                    <th>Description</th>
                                    <th>Category/Ledger</th>
                                    <th>Payment  Method</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>100</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+ 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>101</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+ 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>102</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Minus'>- 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>103</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+ 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>104</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Minus'>- 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>105</td>
                                    <td>Today, 11:56 AM</td>
                                    <td>Today List of EXPENSES	</td>
                                    <td>Salary</td>
                                    <td>Cash</td>
                                    <td className='Plus'>+ 10,000</td>
                                    <td>10,000</td>
                                    <td className='d_flex'>
                                        <AccountEdit />
                                        <Button><RiDeleteBin6Line /></Button>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </>

    )

}

export default AccountDashboard
