import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Grid, Tab, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSetting } from "react-icons/ai";
import { BiSlider } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { headers } from "../../pages/api";

const HomeSlider = ({ response }) => {
    const router = useRouter()

    const [user, setUser] = useState(null);
    const [ownInfo, setOwnInfo] = useState({});
    // Filter
    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // Tabs
    const [value, setValue] = useState("1");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        // router.push(`/dashboard-setting?pass=${newValue}`)
    };



    return (
        <>
            <section className="TopSellingProducts DashboardSetting">
                <Container maxWidth="sm">
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className="Header d_flex d_justify">
                                {/* Left */}
                                <div className="Left d_flex">
                                    <div className="svg">
                                        <BiSlider />
                                    </div>

                                    <div className="text">
                                        <h4>Home Slider</h4>
                                        <p>Update your shop info and other settings here</p>
                                    </div>
                                </div>

                                {/* Right */}

                            </div>
                        </Grid>
                    </Grid>

                    {/* DashboardSettingTabs */}
                    <div className="DashboardSettingTabs">
                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList
                                        onChange={handleChangeTab}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Home Slider" value="1" />

                                    </TabList>
                                </Box>

                                {/* Business Information */}
                                <TabPanel value="1">

                                    <div className="DashboardFormItem">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <div className="left">
                                                    <h5>Company Logo</h5>
                                                    <p>
                                                        This will be displayed on your shop profile
                                                    </p>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={9}>
                                                <div className="CustomeInput">
                                                    <div className="Item Upload">
                                                        <span>
                                                            Image must be a file of type: png, jpg, jpeg
                                                        </span>
                                                        <input
                                                            accept="image/*"
                                                            type="file"
                                                            id="select-image"
                                                            style={{ display: "none" }}
                                                            onChange={(e) =>
                                                                setSelectedImage(e.target.files[0])
                                                            }
                                                        />
                                                        <label htmlFor="select-image">
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                component="span"
                                                            >
                                                                Upload Image
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>

                                </TabPanel>

                            </TabContext>
                        </Box>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default HomeSlider;
