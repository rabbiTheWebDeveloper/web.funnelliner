import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { baseTest, baseUrl } from '../../constant/constant';
import { headers, shopId } from '../../pages/api';

const CustomDomainRequest = ({ shopName }) => {

    const [websiteSettingsData, setWebsiteSettingData] = useState({});

    const [openSales, setOpenSales] = useState(false);
    const handleOpenSales = () => setOpenSales(true);
    const handleCloseSales = () => setOpenSales(false);


    // Tabs
    const [value, setValue] = useState("1");
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const [value2, setValue2] = useState("one");
    const handleChangeTab2 = (event, newValue) => {
        setValue2(newValue);
    };


    // Togol Switch
    const label = { inputProps: { "aria-label": "Switch demo" } };

    // ViewPreview
    const [openPreview, setOpenPreview] = useState(false);
    const handlePreview = () => setOpenPreview(true);
    const previewClose = () => setOpenPreview(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // DropDown Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [customDomain, setCustomDomain] = useState("");


    const onSubmit = data => {

        data.shop_name = shopName
        data.shop_id = shopId
        data.domain_status = "pending"

        axios.post(`${process.env.API_URL}/client/settings/domain/update`, data, {
            headers: headers,
        })
            .then(function (response) {
                setCustomDomain(response.data.msg)
                // console.log("fb ", response.data.msg)
                Swal.fire(
                    response?.data?.msg,
                )
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

        setOpenSales(false);
        reset()

    }


    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/settings/business-info", { headers: headers })
            .then(function (response) {
                // handle success
                setWebsiteSettingData(response?.data?.data);
            });
    }, [customDomain]);

    // console.log(websiteSettingsData)


    return (
        <div className='DashboardTabsItem DomainRequest'>

            <div className="Header">
                <h4>CUSTOMER CUSTOM DOMAIN REQUEST OPTION</h4>
                <h5>Read Before Sending Domain Request</h5>
            </div>

            <p>Before sending request for your custom domain, You need to add CNAME records (given In below table) In
                your custom domain From your domain registrar account (like namecheap, godaddy, FOR etc..). CNAME
                records are needed to point your custom domain to our domain ( fonnellIner.com ), so that our website
                can show your webs'. on your custom domain Different domain registrar (like godaddy, namecheap, POR
                etc..) has different interface for adding CNAME records. If you cannot find the place to add NAME record
                in your domain registrar account., then please contact your domain registrar support, they will show you
                the place to add CNAME record for your custom domain. They can also help you with adding CNAME record
                for you. </p>

            <div className="ProductTable">

                <h5>Add CNAME records (take data from below table) in your custom domain from your domain registration
                    panel:</h5>

                <table>
                    <thead>
                        <tr>
                            <th>TYPE</th>
                            <th>HOST</th>
                            <th>VALUE</th>
                            <th>TTL</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>

                            <td>CNAME Record</td>
                            <td>www</td>
                            <td>secure.funnelliner.com</td>
                            <td>Automatic</td>

                        </tr>

                        <tr>

                            <td>CNAME Record</td>
                            <td>@</td>
                            <td>secure.funnelliner.com</td>
                            <td>Automatic</td>

                        </tr>

                        <tr>

                            <td>Use this if you are using cloudflare</td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>

                        <tr>

                            <td>A Record</td>
                            <td>@</td>
                            <td>104.16.243.78</td>
                            <td>Automatic</td>

                        </tr>
                        <tr>

                            <td>A Record</td>
                            <td>@</td>
                            <td>104.16.244.78</td>
                            <td>Automatic</td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* Custom Domain Request */}
            <div className="ProductTable">

                <div className="d_flex d_justify">

                    <h5>Custom Domain Request</h5>

                    {/* Modal */}
                    <div className="Modal">

                        <Button className="AddNewOrder" onClick={handleOpenSales}>
                            Request Custom Domain
                        </Button>

                        <Modal
                            open={openSales}
                            onClose={handleCloseSales}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            {/* code comments by rejaul for onSubmit button err */}
                            <Box>

                                <div className="SalesTargetModal">

                                    <div className="Header d_flex">
                                        <div className="svg">
                                            {/* <GiWorld/> */}
                                        </div>

                                        <div className="text">
                                            <h5>Request Custom Domain</h5>
                                            <p>Get custom domain for your shop</p>
                                        </div>

                                    </div>

                                    <div className="Form">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="CustomeInput">

                                                <h6 className="padding">You already have a custom domain
                                                    (funnelliner.com) connected with your portfolio website. if you
                                                    request another domain now & if it gets connected with our server,
                                                    then your current domain (funnelliner.com) will be removed </h6>

                                                <label>Enter Your Custom Domain<span>*</span></label>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    {...register("domain_request", { required: true })}
                                                    placeholder="Enter domain name here"
                                                />
                                                {errors.domain_request && (
                                                    <span> Your Custom Domain Name required</span>
                                                )}
                                            </div>

                                            <h6 className="padding">Do not use http:// or hops:// The valid format will
                                                be exactly like this one - domain.tld, www.domain.tld or
                                                subdomain.domain.t1d, www.subdomain.domain.tld "11/.. </h6>

                                            <div className="CustomeInput">
                                                <div className="DuelButton">
                                                    <Button type="submit">Send Request</Button>
                                                    <Button type="reset" onClick={handleCloseSales} className="Delete">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </Box>

                        </Modal>

                    </div>


                </div>


                <table>
                    <thead>
                        <tr>
                            {/* <th>CURRENT DOMAIN</th> */}
                            <th>Request Custom Domain</th>
                            <th>Status</th>
                            {/* <th>TTL</th> */}
                        </tr>
                    </thead>

                    <tbody>

                        <tr>

                            {/* <td>CNAME Record</td> */}
                            <td>{websiteSettingsData?.domain_request}</td>
                            <td>{websiteSettingsData?.domain_status}</td>
                            {/* <td>Automatic</td> */}

                        </tr>


                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default CustomDomainRequest;
