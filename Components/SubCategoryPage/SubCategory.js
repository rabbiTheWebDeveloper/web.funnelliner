import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Container, Grid, Tab, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import Swal from 'sweetalert2';
import { baseTest } from '../../constant/constant';
import { headers } from '../../pages/api';
import AddCategory from './AddCategory';


const SubCategory = () => {
    // Filter
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Tabs
    const [value, setValue] = useState('1');
    const router = useRouter();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };


    // category add function

    const [category, setCategory] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const handleSubCategorySubmit = (data) => {
        // console.log(" hello submit");
        data.parent_id = data?.category_id

        let cat = {
            parent_id: data?.parent_id,
            name: data?.name,
            status: "1",
            description: "",
            category_image: ""


        }


        axios.post(process.env.API_URL + "/client/categories", cat, { headers: headers }
        )
            .then(function (response) {

                // console.log(response.message);
                Swal.fire(
                    'Sub  Category Add!',

                    'success'
                )
                router.push("/sub-product");
            })
            .catch(function (error) {

                // console.log("error", error);
                //  Swal.fire({
                //    icon: 'error',
                //    title: 'Oops...',

                //    footer: '<a href="">Why do I have this issue?</a>'
                //  })
            });
        //  console.log(data);

        reset();

    }

    ///// get category
    useEffect(() => {
        axios.get(process.env.API_URL + "/client/categories", { headers: headers })
            .then(function (response) {
                // handle success
                setCategory(response?.data?.data);
            });
    }, []);
    // console.log(category)


    return (


        <>

            <section className='TopSellingProducts DashboardSetting SubCategory'>

                <Container maxWidth="sm">

                    <Grid Container spacing={3}>

                        <Grid item xs={12}>

                            <div className="Header d_flex d_justify">

                                {/* Left */}
                                <div className="Left d_flex">

                                    <div className="svg">
                                        <MdProductionQuantityLimits />
                                    </div>

                                    <div className="text">
                                        <h4>Categories / Sub Categories</h4>
                                        <p>Your Product Sub Categories</p>
                                    </div>

                                </div>

                            </div>

                        </Grid>

                    </Grid>

                    {/* DashboardSettingTabs */}
                    <div className="DashboardSettingTabs">

                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <TabContext value={value}>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                        <Tab label="Category Information" value="1" />
                                        {/* <Tab label="Sub Category Information" value="2" /> */}
                                    </TabList>
                                </Box>

                                {/* Business Information */}
                                <TabPanel value="1">

                                    <AddCategory></AddCategory>

                                </TabPanel>

                                {/* Business Information */}
                                <TabPanel value="2">

                                    <div className="DashboardTabsItem">

                                        <h4>Update Sub Categories Information</h4>
                                        <p>Update your categories info</p>

                                        <div className="DashboardForm">

                                            {/* Shop Info */}
                                            <div className="DashboardFormItem">

                                                <Grid container spacing={3}>


                                                    <Grid item xs={3}>

                                                        <div className="left">

                                                            <h5>Category</h5>
                                                            <p>This will be displayed on your category page</p>

                                                        </div>

                                                    </Grid>

                                                    <Grid item xs={9}>

                                                        <div className="CustomeInput">
                                                            <form onSubmit={handleSubmit(handleSubCategorySubmit)}>

                                                                <div className="Item">


                                                                    <label>Parent Category Name</label>

                                                                    <div className="Dropdown">

                                                                        {/* <Box>
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Price </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Price High-Low</MenuItem>
                                        <MenuItem value={20}>Yesterday</MenuItem>
                                        <MenuItem value={30}>Tomorrow</MenuItem>
                                        <MenuItem value={40}>This Weak</MenuItem>
                                        <MenuItem value={50}>Tish Month</MenuItem>
                                    </Select>
                                    </FormControl>
                                  </Box> */}
                                                                        <select
                                                                            {...register("category_id", { required: true })}
                                                                        >
                                                                            {Array.isArray(category)
                                                                                ? category?.map((data) => {
                                                                                    return (
                                                                                        <option
                                                                                            key={data?.id}
                                                                                            value={data?.id}
                                                                                        >
                                                                                            {data?.name}
                                                                                        </option>
                                                                                    );
                                                                                })
                                                                                : null}

                                                                        </select>
                                                                        {errors?.category_id && (
                                                                            <span>This Category Name required</span>
                                                                        )}

                                                                    </div>

                                                                </div>

                                                                <div className="Item Upload">

                                                                    <label>Sub Category Name</label>

                                                                    <TextField id="outlined-basic" label=""
                                                                        variant={errors.name ? "danger" : "outlined"} {...register("name", { required: true })}
                                                                        placeholder='Sub Category Name' />

                                                                    <div className="svg">
                                                                        <FiEdit />
                                                                    </div>


                                                                </div>

                                                                <div className="Item">
                                                                    <Button type='submit'
                                                                        className='Update'>Update</Button>
                                                                    <Button className='Cancle'>Cancel</Button>
                                                                </div>


                                                            </form>
                                                        </div>


                                                    </Grid>


                                                </Grid>

                                            </div>

                                        </div>


                                    </div>

                                </TabPanel>

                            </TabContext>

                        </Box>

                    </div>

                </Container>

            </section>

        </>

    )

}

export default SubCategory