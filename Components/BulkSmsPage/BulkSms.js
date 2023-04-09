import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  Select,
  Switch,
  TextField
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { headers } from "../../pages/api";

import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Confirm Order",
  "Pending Order",
  "Cancel Order",
  "Follow Order",
  "Return Order",
];

const label = { inputProps: { "aria-label": "Switch demo" } };

const BulkSms = () => {
  // Filter
  const [age, setAge] = useState("");
  const { register, handleSubmit, reset } = useForm();

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
  const [websiteSettingsData, setWebsiteSettingData] = useState({});

  useEffect(() => {
    axios
      .get(process.env.API_URL + "/client/settings/business-info", {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setWebsiteSettingData(response?.data?.data);
      })
      .catch(function (error) {
        // console.log("Page  System", error.response.data);
        if (error.response.data.api_status === "401") {
          window.location.href = "/login";
          Cookies.remove("token");
          localStorage.clear("token");
          Cookies.remove("user");
          localStorage.clear("user");
          window.location.href = "/login";
        }
      });
  }, []);

  //   console.log(websiteSettingsData)

  const onSubmit = (data) => {
    // if (data.phone.length < 15) {
    //   axios
    //     .post(process.env.API_URL + "/client/single-sms-send", data, {
    //       headers: headers,
    //     })
    //     .then(function (response) {
    //       Swal.fire(response.data.message, "success");
    //     })
    //     .catch(function (error) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: error.msg,
    //         footer: '<a href="">Why do I have this issue?</a>',
    //       });
    //     });
    // } else {
    //   axios
    //     .post(process.env.API_URL + "/client/multiple-sms-send", data, {
    //       headers: headers,
    //     })
    //     .then(function (response) {
    //       Swal.fire(response.data.message, "success");
    //     })
    //     .catch(function (error) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: error.msg,
    //         footer: '<a href="">Why do I have this issue?</a>',
    //       });
    //     });
    // }

    reset();
  };

  // Customer Tag
  const [personName, setPersonName] = useState([]);

  const handleChangeBulkSMS = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Toggle
  const [state, setState] = useState({
    pending: false,
    confirm: false,
    cancel: false,
    shipped: false,
    delivered: false,
    orderreturn: false,
  });

  const handleChangeToggle = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  // const handleChangeBulkSMSFetch=(data) =>{
  //   console.log(data.target);

  // }
  console.log(personName)

  return (
    <>
      <section className="TopSellingProducts DashboardSetting Order">
        <Container maxWidth="sm">
          <Grid Container spacing={3}>
            <Grid item xs={12}>
              <div className="Header d_flex d_justify">
                {/* Left */}
                <div className="Left d_flex">
                  <div className="svg">
                    <BiMessageRoundedDots />
                  </div>

                  <div className="text">
                    <h4>Bulk SMS</h4>
                    <p>
                      Get SMS report, send messages in large range to your
                      clients
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* TotalSMSSent */}
      <section className="TotalOrder TotalSMSSent">
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            {/* Total Order */}
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={3}>
                {/* item */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="TotalOrderItem">
                    <div className="overlayImg">
                      <img src="images/totalorder_overlay1.png" alt="" />
                    </div>

                    {/* header */}
                    <div className="Header d_flex d_justify">
                      <h5 className="d_flex">
                        {" "}
                        <GoGraph />
                        Total SMS Sent{" "}
                      </h5>
                    </div>

                    <div className="Main">
                      <h3>
                        {websiteSettingsData.sms_sent >= 0
                          ? websiteSettingsData.sms_sent
                          : 0}
                      </h3>
                    </div>
                  </div>
                </Grid>

                {/* item */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="TotalOrderItem">
                    <div className="overlayImg">
                      <img src="images/totalorder_overlay2.png" alt="" />
                    </div>

                    {/* header */}
                    <div className="Header d_flex d_justify">
                      <h5 className="d_flex">
                        {" "}
                        <GoGraph /> Total SMS Cost (BDT){" "}
                      </h5>
                    </div>

                    <div className="Main">
                      <h3>
                        {websiteSettingsData.sms_sent >= 0
                          ? websiteSettingsData.sms_sent * 0.25
                          : 0}
                      </h3>
                    </div>
                  </div>
                </Grid>

                {/* item */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="TotalOrderItem SMSBalance">
                    {/* header */}
                    <div className="Header d_flex d_justify">
                      <h5 className="d_flex">
                        {" "}
                        <GoGraph /> SMS Balance{" "}
                      </h5>
                    </div>

                    <div className="Main">
                      <h3>{websiteSettingsData?.sms_balance}</h3>

                      {/* <li>Masking SMS: <span>00</span> </li> */}
                      <li>
                        Non Masking SMS:{" "}
                        <span>{websiteSettingsData?.sms_balance}</span>{" "}
                      </li>

                      <li>
                        {" "}
                        <Button>
                          <Link href="https://m.me/funnelliner" target="_blank">
                            Top Up SMS
                          </Link>
                        </Button>{" "}
                      </li>
                    </div>
                  </div>
                </Grid>

                {/* Right */}
                <Grid item xs={12} sm={6} md={4}>
               
                  <div className="TotalOrderItem SMSBalance">
                    <div className="BulkSmsOrderPopUp">
                      <FormControl component="fieldset" variant="standard">
                        <div className="Header">
                          <h5 className="d_flex">
                            {" "}
                            <FaClipboardList /> Order Status Message{" "}
                          </h5>
                          <p>
                            Choose When You Want to Send Your Order Status
                            Message
                          </p>
                        </div>

                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.pending}
                                onChange={handleChangeToggle}
                                name="pending"
                              />
                            }
                            label="Pending Order"
                          />

                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.confirm}
                                onChange={handleChangeToggle}
                                name="confirm"
                              />
                            }
                            label="Confirm Order"
                          />

                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.cancel}
                                onChange={handleChangeToggle}
                                name="cancel"
                              />
                            }
                            label="Cancel Order"
                          />

                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.shipped}
                                onChange={handleChangeToggle}
                                name="shipped"
                              />
                            }
                            label="Shipped"
                          />

                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.delivered}
                                onChange={handleChangeToggle}
                                name="delivered"
                              />
                            }
                            label="Delivered"
                          />

                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.orderreturn}
                                onChange={handleChangeToggle}
                                name="orderreturn"
                              />
                            }
                            label="Order Return"
                          />
                        </FormGroup>
                      </FormControl>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Select Sender ID */}
      <section className="TopSellingProducts DashboardSetting Order BulkSMSSection">
        <Container maxWidth="sm">
          <Grid Container spacing={3}>
            <Grid item xs={12}>
              <div className="Header d_flex d_justify">
                {/* Left */}
                <div className="Left d_flex">
                  <div className="svg">
                    <BiMessageRoundedDots />
                  </div>

                  <div className="text">
                    <h4>Send SMS</h4>
                    <p>Send SMS to the clients in large scale</p>
                  </div>
                </div>

                {/* Right */}
                <div className="Right d_flex">
        
                </div>
              </div>

              {/* BulkSms */}
              <div className="BulkSms">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="BulkSmsItem">
                    <div className="CustomeInput">
                      <label>Select Customer List</label>

                      <div className="Item CheckSMSList d_flex">
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">
                            Select Customer List
                          </InputLabel>
                          <Select
                           {...register("select data ")}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChangeBulkSMS}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            // onChange={handleChangeBulkSMSFetch}
                          >
                            {names.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox
                                  checked={personName.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <div className="CustomeInput">
                      <div className="Item">
                        <label>Enter Mobile Numbers</label>
                        {/* <p>( example: 01700000000, 01700000000, 01700000000, 01700000000 )</p> */}

                        <TextField
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          defaultValue=""
                          placeholder="( example: 01700000000, 01700000000, 01700000000, 01700000000 )"
                          {...register("phone", { required: true })}
                        />
                      </div>
                    </div>

                    {/* <div className="CustomeInput XLFile">
                      <div className="Item">
                        <label>Select File (txt, csv, xlsx)</label>
                       
                        <input type="file" />
                      </div>
                    </div> */}

                    <div className="CustomeInput d_flex">
                      {/* <Button>Upload From Excel</Button> */}

                      {/* Dropdown */}
                      {/* <div className='DropDown'>

                                            <PopupState variant="popover" popupId="DropDown">
                                                {(popupState) => (

                                                <>
                                                    
                                                    <Button {...bindTrigger(popupState)}>

                                                        <h6 className='d_flex'>
                                                            All Client
                                                            <div className="svg"><AiFillCaretDown/></div> 
                                                        </h6>

                                                    </Button>

                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={handleClose}>Enter Mobile Numbers</MenuItem>
                                                        <MenuItem onClick={handleClose}>Confimed Clients</MenuItem>
                                                        <MenuItem onClick={handleClose}>Follow Up Clients</MenuItem>
                                                        <MenuItem onClick={handleClose}>Pending Clients</MenuItem>
                                                        <MenuItem onClick={handleClose}>Order Return Clients</MenuItem>
                                                    </Menu>

                                                </>
                                                )}
                                            </PopupState>

                                        </div> */}
                    </div>

                    <div className="CustomeInput">
                      <div className="Item">
                        <label>Enter SMS Content</label>
                        <TextField
                          {...register("msg", { required: true })}
                          variant="outlined"
                          id="outlined-multiline-static"
                          label="Enter your SMS body here"
                          multiline
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="CustomeInput lastChild">
                      <div className="Item">
                        <Button type="submit" className="SendNow">
                          Send Now
                        </Button>
                        {/* <Button className='SendLeter'>Send Later</Button>
                                            <Button>Save Template</Button> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Saved SMS Templates */}
      {/* <section className='TopSellingProducts DashboardSetting Order'>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                           
                            <div className="BulkSms">

                                <div className="BulkSmsItem">

                                    <div className="CustomeInput">

                                        <div className="Item">

                                            <label>Saved SMS Templates</label>

                                            <TextField id="outlined-basic" label="Selling Price" variant="outlined" />

                                            <div className="UseTamplate">
                                                    
                                                <Button>Use Template</Button>

                                                <Link href=''> <FiEdit/> </Link>
                                                <Link href=''> <RiDeleteBinLine/> </Link>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="CustomeInput">

                                        <div className="Item">

                                            <label>Saved SMS Templates</label>

                                            <TextField id="outlined-basic" label="Selling Price" variant="outlined" />

                                            <div className="UseTamplate">
                                                    
                                                <Button>Use Template</Button>

                                                <Link href=''> <FiEdit/> </Link>
                                                <Link href=''> <RiDeleteBinLine/> </Link>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="CustomeInput lastChild">

                                        <div className="Item">

                                            <label>Saved SMS Templates</label>

                                            <TextField id="outlined-basic" label="Selling Price" variant="outlined" />

                                            <div className="UseTamplate">
                                                    
                                                <Button>Use Template</Button>

                                                <Link href=''> <FiEdit/> </Link>
                                                <Link href=''> <RiDeleteBinLine/> </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                        </Grid>

                    </Grid>

                </Container>

            </section> */}
    </>
  );
};

export default BulkSms;
