import { Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import { ImTicket } from "react-icons/im";
import Swal from "sweetalert2";
import { handleGetSupportTicketList, headers, userId } from "../../pages/api";

const SupportTicket = () => {
    // Filter
    const [age, setAge] = useState("");
    const [update, setUpdate] = useState({});
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // handleClickOrder
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Dropdown
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const openMenu = Boolean(anchorElMenu);
    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleCloseDropdown = () => {
        setAnchorElMenu(null);
    };

    const [merchant, setMerchant] = useState({});
    useEffect(() => {
        const parseData = JSON.parse(localStorage.getItem("user"));
        setMerchant(parseData);
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [openTicketConversation, setOpenConversation] = useState({
        open: false,
        ticket_id: null,
        conversation: [],
    });

    const [previewPicture, setPreviewPicture] = useState('');
    const [attachFile, setAttachFile] = useState();
    const onChangePicture = e => {
        setAttachFile(e.target.files[0])
        setPreviewPicture(URL.createObjectURL(e.target.files[0]));
    };
    console.log("attachFile", attachFile)
    const handleCreateSupportTicket = (data) => {
        const formData = new FormData();
        formData.append("merchant_id", userId);
        formData.append("subject", data.ticketSubject);
        formData.append("content", data.msgContent);
        // formData.append("attachment", data.attachment[0]);
        if (attachFile) {
            // formData.append("attachment", attachFile);
            formData.append("attachment", data.attachment[0]);
        }
        axios
            .post(`${process.env.API_URL}/client/support-ticket/store`, formData, {
                headers: headers,
            })
            .then(function (response) {
                setUpdate(response);
                Swal.fire("Ticket send success", response.data.msg, "success");
                reset();
            })
            .catch(function (error) {
                // console.log("error", error);
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong !",
                });
            });
    };

    const [replyContent, setReplyContent] = useState("");
    const [replyContentErr, setReplyContentErr] = useState(false);

    function handleReplyInputChange(event) {
        setReplyContentErr(false);
        const inputValue = event.target.value;
        setReplyContent(inputValue);
    }

    const handleCreateReply = () => {
        const ticket_ID = openTicketConversation.ticket_id;
        const postBody = {
            merchant_id: userId,
            content: replyContent,
        };
        if (replyContent.length < 10) {
            setReplyContentErr(true);
            // alert("reply content must be at least 10 charecter")
        } else if (replyContent.length > 10) {
            axios
                .post(`${process.env.API_URL}/client/support-ticket/${ticket_ID}/reply`, postBody, {
                    headers: headers,
                })
                .then(function (response) {
                    setReplyContent("");
                    Swal.fire("", "Reply Send Success");
                })
                .catch(function (error) {
                    // console.log("error", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.msg,
                        footer: '<a href="">Why do I have this issue?</a>',
                    });
                });
        }
    };

    //all supports ticket
    const [ticketList, setTicketList] = useState([]);
    const hanldeGetData = () => {
        handleGetSupportTicketList(userId).then((result) => {
            setTicketList(result?.data?.data);
        });
    };
    useEffect(() => {
        hanldeGetData();
    }, [update]);

    const ticketDescription = ticketList && ticketList?.find(function (element) {
        return element?.ticket_id === openTicketConversation?.ticket_id;
    });



    // console.log("ticketList", ticketList);
    return (
        <>
            <section className='TopSellingProducts DashboardSetting Order SupportTicketSection'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <ImTicket />
                                    </div>

                                    <div className='text'>
                                        <h4>Support Ticket</h4>
                                        <p>Support tickets for help</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* Select Sender ID */}
            <section className='TopSellingProducts DashboardSetting Order BulkSMSSection SupportTicketSection'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit(handleCreateSupportTicket)}>
                                <div className='BulkSms'>
                                    <div className='BulkSmsItem'>
                                        <div className='CustomeInput'>
                                            <div className='Item'>
                                                <label>Ticket Subject <span>*</span></label>
                                                <TextField
                                                    {...register("ticketSubject", {
                                                        required: true,
                                                        minLength: 6,
                                                    })}
                                                    id='outlined-basic'
                                                    label='Subject'
                                                    variant='outlined'
                                                />
                                                {errors.ticketSubject && (
                                                    <span style={{ color: "red" }}>
                                                        The subject must be at least 6 characters
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className='CustomeInput'>
                                            <div className='Item'>
                                                <label>Enter SMS Content <span>*</span></label>
                                                <TextField
                                                    variant='outlined'
                                                    id='outlined-multiline-static'
                                                    label='Enter your SMS body here'
                                                    multiline
                                                    {...register("msgContent", { required: true, minLength: 10, })}
                                                    rows={4}
                                                />
                                                {errors.msgContent && (
                                                    <span style={{ color: "red" }}>
                                                        SMS Content must be at least 10 characters
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className='CustomeInput'>
                                            <div className='Item Upload'>
                                                <label>Attach File (Optional)</label>
                                                <p>Image must be a file of type: png, jpg, jpeg</p>
                                                <Button
                                                    type='submit'
                                                    variant='contained'
                                                    component='label'
                                                >
                                                    Upload
                                                    <input
                                                        {...register("attachment")}
                                                        hidden
                                                        accept='image/*'

                                                        type='file'
                                                        onChange={onChangePicture}
                                                    />
                                                    {errors.attachment && (
                                                        <span style={{ color: "red" }}>
                                                            This field is required
                                                        </span>
                                                    )}
                                                </Button>

                                                <div className='svg'>
                                                    <AiOutlineCamera />
                                                </div>
                                                {
                                                    previewPicture && <div className="support_ticket_preview_image">
                                                        <img src={previewPicture} alt="Preview image" />
                                                    </div>
                                                }

                                            </div>
                                        </div>

                                        <div className='CustomeInput lastChild'>
                                            <div className='Item'>
                                                <Button type='submit' className='SendLeter'>
                                                    Submit
                                                </Button>
                                                {/* <Button className='SendNow'>Cancel</Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section
                id='TicketConversation'
                className='TopSellingProducts DashboardSetting Order SupportTicketSection'
            >
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <ImTicket />
                                    </div>

                                    <div className='text'>
                                        <h4>Ticket Conversation</h4>
                                        <p>Conversation of tickets opened by clients</p>
                                    </div>
                                </div>
                            </div>
                            {openTicketConversation.open === false && (
                                <p style={{ textAlign: "center", margin: "40px 0" }}>
                                    Please select ticket to see conversation
                                </p>
                            )}
                            {/* TicketConversation */}
                            {openTicketConversation.open === true && (
                                <div className='TicketConversation'>
                                    {/* ticket reply */}
                                    <div id='replySmsBody'>
                                        <div style={{ marginTop: "20px" }} className='BulkSms'>
                                            <div className='BulkSmsItem'>
                                                <div className='CustomeInput'>
                                                    <div className='Item'>
                                                        <label>Enter reply sms Content</label>
                                                        <TextField
                                                            variant='outlined'
                                                            id='outlined-multiline-static'
                                                            label='Enter your reply SMS body here'
                                                            multiline
                                                            value={replyContent}
                                                            onChange={handleReplyInputChange}
                                                            rows={4}
                                                        />
                                                        {replyContentErr === true && (
                                                            <span style={{ color: "red" }}>
                                                                SMS Body must be at least 10 characters
                                                            </span>
                                                        )}
                                                        {/* {errors.replyContent && (
                                <span style={{ color: "red" }}>
                                  This field is required
                                </span>
                              )} */}
                                                    </div>
                                                </div>
                                                <div className='CustomeInput lastChild'>
                                                    <div className='Item'>
                                                        <Button
                                                            onClick={handleCreateReply}
                                                            className='SendLeter'
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* customer first message body */}

                                    {/* ticketDescription */}
                                    {openTicketConversation?.conversation && (
                                        <div className='TicketConversationItem'>
                                            <div className='TopText d_flex d_justify'>
                                                <h5>My Shop</h5>
                                                {
                                                    console.log('merchant?.name', ticketDescription)
                                                }
                                                <h5>
                                                    {" "}
                                                    {
                                                        ticketDescription?.updated_at
                                                    }
                                                    {/* {moment(ticketDescription?.updated_at).format(
                                                        "MMMM Do YYYY, h:mm:ss a"
                                                    )} */}
                                                </h5>
                                            </div>
                                            <p>{ticketDescription?.content}</p>
                                        </div>
                                    )}

                                    {openTicketConversation?.conversation &&
                                        openTicketConversation?.conversation.map((item, index) => {
                                            return (
                                                <div key={index}
                                                    className={item?.user?.name !== "Super Admin" ? 'TicketConversationItem' : 'TicketConversationItemSupperAdmin'}>
                                                    <div className='TopText d_flex d_justify'>
                                                        <h4>{item?.user?.name}</h4>
                                                        <h5>
                                                            {item?.user?.name !== "Super Admin" ? moment(item?.created_at).format(
                                                                "MMMM Do YYYY, h:mm:ss a"
                                                            ) : item.user.created_at}
                                                            {" "}
                                                            {/* // {moment(item?.created_at).format(
                              //   "MMMM Do YYYY, h:mm:ss a"
                              // )} */}
                                                        </h5>
                                                    </div>
                                                    <p>{item?.content}</p>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='TopSellingProducts DashboardSetting Order SupportTicketSection'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <ImTicket />
                                    </div>

                                    <div className='text'>
                                        <h4>Your All Support Tickets</h4>
                                        <p>List of tickets opened by you</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Table */}

                    <div className='DashboardSettingTabs WebsiteSettingPage'>
                        <div className='Pending'>
                            <div className='ProductTable'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Ticket No.</th>
                                            <th>Subject For Ticket</th>
                                            <th>Submission Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* item */}
                                        {ticketList && ticketList?.map((item, index) => {
                                            return (
                                                <tr item={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.ticket_id}</td>
                                                    <td
                                                        className='bg'
                                                        onClick={() =>
                                                            setOpenConversation({
                                                                ticket_id: item?.ticket_id,
                                                                conversation: item?.comments,
                                                                open: true,
                                                            })
                                                        }
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <Link
                                                            href='#TicketConversation'
                                                            style={{ color: "#0063C5", fontWeight: "bold" }}
                                                        >
                                                            {" "}
                                                            {item?.subject}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {

                                                            item?.created_at
                                                        }
                                                        {/* 
                                                        {
                                                            moment(
                                                                item?.created_at
                                                            ).fromNow()
                                                        } */}


                                                    </td>
                                                    <td className='bg'>{item?.status}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default SupportTicket;
