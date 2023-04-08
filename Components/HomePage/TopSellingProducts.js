import { Container, Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import { topSellingProducts } from "../../pages/api";

const TopSellingProducts = () => {
    // Filter
    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [TopSellingProducts, setTopSellingProduct] = useState([]);
    useEffect(() => {
        topSellingProducts().then((result) => {
            setTopSellingProduct(result?.data?.data);
        });
    }, []);
    // console.log(TopSellingProducts)
    return (

        <>

            <section className='TopSellingProducts'>
                <Container maxWidth='sm'>
                    <Grid Container spacing={3}>
                        <Grid item xs={12}>
                            <div className='Header d_flex d_justify'>
                                {/* Left */}
                                <div className='Left d_flex'>
                                    <div className='svg'>
                                        <MdOutlinePayments />
                                    </div>

                                    <div className='text'>
                                        <h4>Top Selling Products {TopSellingProducts?.length}</h4>
                                        <p>Your Best Selling Products Of Your Shop</p>
                                    </div>
                                </div>

                                {/* Right */}
                                {/* <div className='Right d_flex'>
                  <h6>Filter By:</h6>

                  <div className='Dropdown'>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Filter
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={age}
                          label='Age'
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Today</MenuItem>
                          <MenuItem value={20}>Yesterday</MenuItem>
                          <MenuItem value={30}>Tomorrow</MenuItem>
                          <MenuItem value={40}>This Weak</MenuItem>
                          <MenuItem value={50}>This Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div> */}
                            </div>
                        </Grid>
                    </Grid>

                    {/* TopSellingProducts */}
                    <div className='TopSellingContent'>
                        <Grid container spacing={3}>
                            {/* item */}
                            {TopSellingProducts?.map((item, index) => {
                                return (
                                    <Grid item xs={3} key={index}>
                                        <div className='TopSellingItem'>
                                            <h5>{item?.product_name}</h5>


                                            <div className='Product d_flex'>
                                                <div className='img'>
                                                    <img src={item?.product_image} alt='' />
                                                </div>

                                                <div className='text'>
                                                    <ul>
                                                        <li>
                                                            Total Sold: <span className='bg'>{item?.total_sell}</span>
                                                        </li>
                                                        <li>
                                                            Total Sales Amount:{" "}
                                                            <span className='bg'>{item?.total_sell_amount}</span>
                                                        </li>
                                                        <li>
                                                            Available Stock: <span>{item?.available_stock}</span>
                                                        </li>
                                                        <li>
                                                            Added
                                                            On: <span> {moment(item?.added_on).format("LL")}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default TopSellingProducts;
