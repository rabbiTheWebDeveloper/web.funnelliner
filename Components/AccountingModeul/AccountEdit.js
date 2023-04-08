import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';



const AccountEdit = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (

        <>

            <div className="AccountCashIn AccountEdit">

                <Button onClick={handleOpen}> <FiEdit /> </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='CashInModal AccountEditIcon'
                >
                    <Box>

                        <div className="CashInModalContent">

                            <div className="Header">

                                <h3> <FiEdit /> Edit Entry</h3>

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
                                    <label>Receivable/Payee </label>
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

export default AccountEdit
