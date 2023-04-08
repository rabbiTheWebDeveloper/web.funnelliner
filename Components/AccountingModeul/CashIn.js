import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';

const CashIn = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (


        <>

            <div className="AccountCashIn">

                <Button onClick={handleOpen}> <span>Cash In</span> <img src="/images/money-down.png" alt="" /> </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='CashInModal'
                >
                    <Box>
                        
                        <div className="CashInModalContent">

                            <div className="Header">

                                <h3> <img src="/images/Cashin-money-bag.png" alt="" /> Cash In Entry</h3>

                                <div className="img" onClick={handleClose}>
                                    <img src="/images/close.png" alt="" />
                                </div>

                            </div>

                            <div className="FormPart">

                                <div className="CustomeInput Amount">
                                    <label>Amount <span>*</span></label>
                                    <input type="text" />
                                </div>

                                <div className="CustomeInput">
                                    <label>Payable/Payor </label>
                                    <select name="">
                                        <option value="">Safayet</option>
                                        <option value="">Al Rabbi</option>
                                        <option value="">Rezaul</option>
                                        <option value="">Akash</option>
                                    </select>
                                </div>

                                <div className="CustomeInput">
                                    <label>Category/Ledger</label>
                                    <select name="">
                                        <option value="">Safayet</option>
                                        <option value="">Al Rabbi</option>
                                        <option value="">Rezaul</option>
                                        <option value="">Akash</option>
                                    </select>
                                </div>

                                <div className="CustomeInput">
                                    <label>Payment Method </label>
                                    <select name="">
                                        <option value="">Cash</option>
                                        <option value="">Online Payment</option>
                                        <option value="">Bank Payment</option>
                                    </select>
                                </div>

                                <div className="CustomeInput Description">
                                    <label>Description</label>
                                    <input type="text" />
                                </div>

                                <div className="CustomeInput">
                                    <label>Date</label>
                                    <input type="date" />
                                </div>

                                <div className="CustomeInput">
                                    <label>Time</label>
                                    <input type="time" />
                                </div>

                                <div className="CustomeInput Button">
                                    
                                    <div className="DuelButton d_flex">
                                        <Button>Save</Button>
                                        <Button className='bg'>Save & Add New</Button>
                                    </div>

                                </div>
                                

                            </div>

                        </div>

                    </Box>

                </Modal>

            </div>

        </>


    )

}

export default CashIn
