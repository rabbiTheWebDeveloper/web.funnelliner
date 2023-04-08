import { Button, Container, Grid, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbTruckDelivery } from "react-icons/tb";
import Swal from "sweetalert2";
import { activateCourier, headers } from "../../pages/api";
import CourierDetails from './CourierDetails';

const Courier = ({ busInfo }) => {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    const data = Cookies.get();
    const [status, setStatus] = useState({})
    const mainData = data?.user;
    let parseData;
    if (mainData != null) {
        parseData = JSON.parse(mainData);
    }
    //   const userParse = JSON.parse(data?.user)
    const [openSteadFast, setOpenSteadFast] = useState(false);
    const [openRedx, setOpenRedx] = useState(false);
    const [opnePathao, setOpnePathao] = useState(false);
    const [openPaperFly, setOpenPaperFly] = useState(false);
    const [openEcourier, setOpenEcourier] = useState(false);

    const merchantId = parseData?.id;

    //steadfast courier
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleSteadfastSubmit = (data) => {
        const config = {
            "Api-Key": data.apiKey,
            "Secret-Key": data.apiSecret,
        };
        const configData = JSON.stringify(config);
        activateCourier(merchantId, "steadfast", "active", configData).then(
            (res) => {
                if (res?.status === 200) {
                    Swal.fire("Stead Fast Active");
                }
            }
        );
    };

    //redx
    const handleRedxSubmit = (data) => {
        // console.log(data.redxApiKey, data.redxApiSecret);
        const config = {
            "Api-Key": data.redxApiKey,
            "Secret-Key": data.redxApiSecret,
        };
        const configData = JSON.stringify(config);
        activateCourier(merchantId, "redx", "active", configData).then((res) => {
            if (res.status === 200) {
                Swal.fire("Redx Active");
            }
        });
    };
    //pathao
    const handlePathaoSubmit = (data) => {
        const config = {
            "Api-Key": data.pathaoApiKey,
            "Secret-Key": data.pathaoApiSecret,
        };
        const configData = JSON.stringify(config);
        activateCourier(merchantId, "pathao", "active", configData).then((res) => {
            if (res.status === 200) {
                Swal.fire("pathao Active");
            }
        });
    };

    //PaperFly
    const handlePaperFlySubmit = (data) => {
        const config = {
            "Api-Key": data.paperFlyApiKey,
            "Secret-Key": data.paperFlyApiSecret,
        };
        const configData = JSON.stringify(config);
        activateCourier(merchantId, "PaperFly", "active", configData).then(
            (res) => {
                if (res.status === 200) {
                    Swal.fire("PaperFly Active success");
                }
            }
        );
    };

    //ecourier
    const handleEcourierSubmit = (data) => {
        const config = {
            "Api-Key": data.ecourierApiKey,
            "Secret-Key": data.ecourierApiSecret,
        };
        const configData = JSON.stringify(config);
        activateCourier(merchantId, "ecourier", "active", configData).then(
            (res) => {
                if (res.status === 200) {
                    Swal.fire("Ecourier Active success");
                }
            }
        );
    };

    //active

    useEffect(() => {
        axios
            .get(process.env.API_URL + "/client/courier/list", { headers: headers })
            .then(function (response) {
                // handle success
                // let allProduct = response?.data?.data;
                // const userProduct = Array.from(allProduct).filter(
                //   (word) => word?.order_status == "shipped"
                // );
                setStatus(response.data.data);
                // setIsLoading(false);
                // console.log(response.data)
            })
            .catch(function (error) {
            });


    }, [])
    //    const [data1 , setData1]=useState({})
    const config = status[0]?.config
    // if(config!== "undefined"){
    //     setData1(JSON?.parse(config))
    // }
    const data1 = config !== undefined ? JSON?.parse(config) : ""
    // console.log(data1['Api-Key'])
    console.log("busInfo courier ", busInfo)
    return (
        <>
            <section className='TopSellingProducts DashboardSetting Courier'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <TbTruckDelivery />
                                    </div>

                                    <div className='text'>
                                        <h4>Courier</h4>
                                        <p>
                                            Deliver your products with your preferred courier service
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    {/* CourierContent */}
                    <div className='CourierContent'>
                        <Grid container spacing={3}>
                            {/* item 1 */}
                            <Grid item xs={6} sm={4} md={3}>
                                <div className='CourierItem'>
                                    <div className='img'>
                                        <img src='../images/steadfast.png' alt='' />
                                    </div>

                                    <div className='text'>
                                        <h5>Select Steadfast</h5>

                                        <div className='Toggle'>
                                            <Switch
                                                onChange={() => setOpenSteadFast(event.target.checked)}
                                                {...label}
                                                defaultChecked={openSteadFast}
                                            />
                                        </div>

                                        <div className='Toggle'>
                                            {status && <>
                                                <button>Actived</button>
                                                <br />
                                                {/* </br> */}
                                                {/* <Link className='CourierItem CustomeInput MuiButtonBase-root' href={"/courier-details"}>courier-details</Link> */}
                                            </>
                                            }
                                        </div>
                                    </div>

                                    {/* InputField */}

                                    {openSteadFast === true ? (
                                        <div className='InputField'>
                                            <form onSubmit={handleSubmit(handleSteadfastSubmit)}>
                                                <div className='CustomeInput'>
                                                    <div className='Item'>
                                                        <label>API Key</label>
                                                        <TextField
                                                            {...register("apiKey", { required: true })}
                                                            id='outlined-basic'
                                                            variant='standard'
                                                            defaultValue={data1['Api-Key']}
                                                        />
                                                        {errors.apiKey && (
                                                            <span style={{ color: "red" }}>
                                                                Api Key is required
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className='Item'>
                                                        <label>Secret Key</label>
                                                        <TextField
                                                            {...register("apiSecret", { required: true })}
                                                            id='outlined-basic'
                                                            variant='standard'
                                                            defaultValue={data1['Secret-Key']}
                                                        />
                                                        {errors.apiSecret && (
                                                            <span style={{ color: "red" }}>
                                                                Api secret is required
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className='Item'>
                                                        <Button type='submit' className='Update'>
                                                            submit
                                                            {" "}
                                                            {/* <Link href='courier-details'>Submit</Link>{" "} */}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Grid>

                            {/* item 2 */}
                            <Grid item xs={6} sm={4} md={3}>
                                <div className='CourierItem'>
                                    <div className='img'>
                                        <img src='images/redx.png' alt='' />
                                    </div>
                                    <div className='text'>
                                        <h5>Select REDX</h5>

                                        <div className='Toggle'>
                                            <Switch
                                                onChange={() => setOpenRedx(event.target.checked)}
                                                {...label}
                                                defaultChecked={openRedx}
                                            />
                                        </div>
                                        {/* <div className='Toggle'>
                     {status && <button>Actived</button>}
                    </div> */}
                                    </div>

                                    {openRedx === true ? (
                                        <div className='InputField'>
                                            <form onSubmit={handleSubmit(handleRedxSubmit)}>
                                                <div className='CustomeInput'>
                                                    <div className='Item'>
                                                        <label>Integration process coming soon </label>
                                                        {/* <label>API Key</label> */}
                                                        {/* <TextField
                              {...register("redxApiKey", { required: true })}
                              id='outlined-basic'
                              variant='standard'
                            />
                            {errors.redxApiKey && (
                              <span style={{ color: "red" }}>
                                Api Key is required
                              </span>
                            )} */}
                                                    </div>
                                                    <div className='Item'>
                                                        {/* <label>Secret Key</label> */}
                                                        {/* <TextField
                              {...register("redxApiSecret", { required: true })}
                              id='outlined-basic'
                              variant='standard'
                            />
                            {errors.redxApiSecret && (
                              <span style={{ color: "red" }}>
                                Api secret is required
                              </span>
                            )} */}
                                                    </div>
                                                    <div className='Item'>
                                                        {/* <Button  className='Update' disabled>
                              submit
                              {" "}
                              <Link href='courier-details'>Submit</Link>{" "}
                            </Button> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Grid>

                            {/* item 3 */}
                            <Grid item xs={6} sm={4} md={3}>
                                <div className='CourierItem'>
                                    <div className='img'>
                                        <img src='images/pathao.png' alt='' />
                                    </div>

                                    <div className='text'>
                                        <h5>Select Pathao Parcels</h5>

                                        <div className='Toggle'>
                                            <Switch
                                                onChange={() => setOpnePathao(event.target.checked)}
                                                {...label}
                                                defaultChecked={openRedx}
                                            />
                                        </div>
                                    </div>
                                    {opnePathao === true ? (
                                        <div className='InputField'>
                                            <form onSubmit={handleSubmit(handlePathaoSubmit)}>
                                                <div className='CustomeInput'>
                                                    <div className='Item'>
                                                        <label>Integration process coming soon </label>
                                                        {/* <label>API Key</label>
                            <TextField
                              {...register("pathaoApiKey", { required: true })}
                              id='outlined-basic'
                              variant='standard'
                            />
                            {errors.pathaoApiKey && (
                              <span style={{ color: "red" }}>
                                Api Key is required
                              </span>
                            )} */}
                                                    </div>
                                                    <div className='Item'>
                                                        {/* <label>Secret Key</label>
                            <TextField
                              {...register("pathaoApiSecret", {
                                required: true,
                              })}
                              id='outlined-basic'
                              variant='standard'
                            />
                            {errors.pathaoApiSecret && (
                              <span style={{ color: "red" }}>
                                Api secret is required
                              </span>
                            )} */}
                                                    </div>
                                                    <div className='Item'>
                                                        {/* <Button type='submit' className='Update' disabled>
                              submit
                              {" "}
                              <Link href='courier-details'>Submit</Link>{" "}
                            </Button> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

                {
                    openSteadFast === true && <CourierDetails busInfo={busInfo}></CourierDetails>
                }


            </section>
        </>
    );
};

export default Courier;
