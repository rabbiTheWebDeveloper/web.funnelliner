import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Grid, Tab, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import Select from 'react-select';
import Swal from "sweetalert2";
import { headers } from "../../pages/api";
const AddProduct = () => {
  // Tabs
  const [value, setValue] = useState("1");
  // product add full funcation
  const [category, setCategory] = useState([]);
  const [tabSelect, setTabSelect] = useState("1");
  const [mainImg, setMainImg] = useState();
  const [delivery, setDelivery] = useState("Free Delivery Charge")
  const [insideDhaka, setInsideDhaka] = useState("")
  const [outDhaka, setOutDhaka] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  //file preview
  const [previewMainImg, setPreviewMainImg] = useState({ file: null });

  const handleMainImage = (e) => {
    setMainImg(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewMainImg({ file: URL.createObjectURL(file) });
  };

  const [categoryID, setCategoryID] = useState(null)
  const [values, setData] = useState()
  const selectRef = useRef()
  const handleChangeItem = (e) => {
    setCategoryID(e.value)
  }
  // useEffect(()=>{
  //   const data = document.querySelector('react-select-15-input')?.value;
  //   setData(data)
  //   console.log("data", values)
  // },[values])

  // function handleFocus() {
  //   console.log("e", selectRef.current.value)
  // };

  const onSubmit = (data) => {
    data.size = "XL";
    data.color = "white";
    data.short_description = "IT was good and I like it";
    data.meta_tag = "buy";
    data.meta_description = "IT was good and I like it";
    data.status = "1";
    data.discount = "0"

    if (delivery === "Paid Delivery Charge") {
      data.delivery_charge = 'paid'
      data.inside_dhaka = insideDhaka
      data.outside_dhaka = outDhaka
    }
    else if (delivery === "Free Delivery Charge") {
      data.delivery_charge = 'free'
    }
    // data.cv = cv;


    const formData = new FormData();
    formData.append("main_image", selectedImage);
    // formData.append("other_image[]", img);
    // formData.append("other_image[]", img1);
    // formData.append("other_image[]", img2);
    // formData.append("other_image[]", img3);
    // formData.append("category_id", data.category_id);
    if (category.length > 0) {
      formData.append("category_id", categoryID);
    } else {
      formData.append("category_name", data.category_name);
    }


    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("discount", '0');
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("product_code", data.product_code);
    formData.append("product_qty", data.product_qty);
    formData.append("short_description", data.short_description);
    // formData.append("long_description", data.long_description);
    formData.append("meta_tag", data.meta_tag);
    formData.append("meta_description", data.meta_description);
    formData.append("status", data.status);
    // formData.append("delivery_charge", data.delivery_charge);
    // formData.append("inside_dhaka", data.inside_dhaka);
    // formData.append("outside_dhaka", data.outside_dhaka);
    if (delivery === "Free Delivery Charge") {
      formData.append("delivery_charge", "free")
    }
    if (delivery === "Paid Delivery Charge") {
      formData.append("delivery_charge", "paid")
      formData.append("inside_dhaka", data.inside_dhaka);
      formData.append("outside_dhaka", data.outside_dhaka);
    }



    // debugger
    // console.log("Form Data" ,formData);

    axios
      .post(process.env.API_URL + "/client/products", formData, { headers: headers })
      .then(function (response) {
        if (response.status === 200) {
          Swal.fire("Product  Add!", response.data.msg, "success");
          router.push("/product");
          reset()

        }
      })
      .catch(function (error) {
        let errorMessage = "Something went wrong. please try again"
        if (error?.response?.status === 400) {
          if (error?.response?.data?.msg?.main_image[0] === 'The main image must be an image.') {
            errorMessage = "Product Image Not Select. Please Select product image"
            Swal.fire({
              icon: "error",
              text: errorMessage,
            });
          }
        }
        else if (error?.message === "Network Error") {
          errorMessage = "Product image is too big, file size exceeds to 1MB"
          Swal.fire({
            icon: "error",
            text: errorMessage,
          });
        }
        else {
          Swal.fire({
            icon: "error",
            text: errorMessage,
          });
        }

      });
  };

  useEffect(() => {
    axios
      .get(process.env.API_URL + "/client/categories", { headers: headers })
      .then(function (response) {
        // handle success
        setCategory(response.data.data);
      })
      .catch(function (error) {

        // console.log("Page  System" ,error.response.data)
        if (error.response.data.api_status === "401") {
          window.location.href = "/login"
          Cookies.remove("token");
          localStorage.clear("token");
          Cookies.remove("user");
          localStorage.clear("user");
          window.location.href = "/login"
        }
      });
  }, []);
  // console.log(arrImages)
  // const newCategory = category.map()
  let options = category.length === 0 ? [] : category?.map(function (item) {
    return { value: item.id, label: item.name, };
  })

  // console.log(delivery)
  // console.log(outDhaka)
  // console.log(insideDhaka)


  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
                    <MdProductionQuantityLimits />
                  </div>

                  <div className="text">
                    <h4>Add New Products</h4>
                    <p>Add new products in your shop</p>
                  </div>
                </div>
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
                    <Tab label="Product Information" value="1" />
                    {/* <Tab label='Product Images' value='2' /> */}
                  </TabList>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Business Information */}
                  <TabPanel value="1">
                    <div className="DashboardTabsItem">
                      <h4>Add Products</h4>
                      <p>Add your product info</p>

                      <div className="DashboardForm">
                        {/* Shop Info */}
                        <div className="DashboardFormItem">
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={3}>
                              <div className="left">
                                <h5>Product Info</h5>
                                <p>
                                  This will be displayed on your product page
                                </p>
                              </div>
                            </Grid>

                            <Grid item xs={12} sm={7} md={9}>
                              <div className="CustomeInput">
                                <div className="Item">
                                  <label>Product Name <span>*</span></label>
                                  <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    placeholder="Enter product name here"
                                    {...register("product_name", {
                                      required: true,
                                    })}
                                  />
                                  {errors.product_name && (
                                    <span>This Product Name required</span>
                                  )}

                                  <div className="svg">
                                    <FiEdit />
                                  </div>
                                </div>

                                <div className="Item">
                                  <label>Selling Price <span>*</span></label>
                                  <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Selling Price"
                                    variant="outlined"
                                    placeholder="Enter selling price here"
                                    {...register("price", { required: true })}
                                  />
                                  {errors.price && (
                                    <span>Enter selling price here</span>
                                  )}

                                  <div className="svg">
                                    <FiEdit />
                                  </div>
                                </div>
                                {/* <div className="Item">
                                  <label>Discount Price</label>
                                  <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Discount Price"
                                    variant="outlined"
                                    placeholder="Enter discount price here"
                                    {...register("discount", {
                                      required: true,
                                    })}
                                  />
                                  {errors.discount && (
                                    <span>Enter discount price here</span>
                                  )}
                                  <div className="svg">
                                    <FiEdit />
                                  </div>
                                </div> */}

                                <div className="Item">
                                  <label>Product Code <span>*</span></label>
                                  <TextField
                                    id="outlined-basic"
                                    label="Product Code"
                                    variant="outlined"
                                    placeholder="Enter product code here"
                                    {...register("product_code", {
                                      required: true,
                                    })}
                                  />
                                  {errors.product_code && (
                                    <span>This Product Name required</span>
                                  )}

                                  <div className="svg">
                                    <FiEdit />
                                  </div>
                                </div>

                                <div className="Item">
                                  <label>Available Quantity <span>*</span></label>
                                  <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Available Quantity"
                                    variant="outlined"
                                    placeholder="Enter available quantity here"
                                    {...register("product_qty", {
                                      required: true,
                                    })}
                                  />
                                  {errors.product_qty && (
                                    <span>This Product Name required</span>
                                  )}

                                  <div className="svg">
                                    <FiEdit />
                                  </div>
                                </div>

                                {/* rabbi code comment by rejaul */}


                                <div className="Item">
                                  <label>Category Name <span>*</span></label>


                                  {
                                    category.length > 0 && <Select options={options} onChange={handleChangeItem} />
                                  }


                                  {
                                    category.length === 0 && <>
                                      <TextField
                                        type="text"
                                        id="outlined-basic"
                                        label="Available Quantity"
                                        variant="outlined"
                                        placeholder="Category name"
                                        {...register("category_name", {
                                          required: true,
                                        })}
                                      />
                                      {errors.product_qty && (
                                        <span>Category Name required</span>
                                      )}

                                      <div className="svg">
                                        <FiEdit />
                                      </div>
                                    </>
                                  }
                                  {/* {category.length > 0 ? 
                                     <select
                                     {...register("category_id", {
                                       required: true,
                                     })}
                                   >
                                     {Array.isArray(category)
                                       ? category.map((data) => {
                                           return (
                                             <option
                                               key={data?.id}
                                               value={data.id}
                                               value1={data.id}
                                             >
                                               {data?.name}
                                             </option>
                                           );
                                         })
                                       : null}
                                   </select>
                                  
                                  :
                                  <section className="MiddleSection">
                                  <div className="MiddleSectionContent">
                                  <Link href='/sub-category'>Add Category</Link>
                                   
                                  </div>
                                </section>
                                  }
                               
                                  {errors.category_id && (
                                    <span>This Product Name required</span>
                                  )} */}
                                </div>

                                <div className="Item Upload">
                                  <label>
                                    Product Image ( Main image of product ) <span>*</span>
                                  </label>
                                  <p>Image must be a file of type: <span>png, jpg, jpeg</span></p>

                                  <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                  />
                                  <label htmlFor="select-image">
                                    <Button variant="contained" color="primary" component="span">
                                      Upload Image
                                    </Button>
                                  </label>
                                  {imageUrl && selectedImage && (
                                    <Box mt={2} textAlign="center">
                                      <div>Image Preview:</div>
                                      <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                    </Box>
                                  )}
                                </div>
                                {/* 
                                <div className="Item Upload">
                                  <label>
                                    Product Image ( Main image of product ) <span>*</span>
                                  </label>
                                  <Button variant="contained" component="label">
                                    Upload
                                    <input
                                      hidden
                                      accept="image/*"
                                      multiple
                                      type="file"
                                      name="main_image"
                                      onChange={handleMainImage}
                                    />
                                  </Button>
                                  <div className="svg">
                                    <AiOutlineCamera />
                                  </div>
                                  <div className="imagePreview">
                                    <img src={previewMainImg.file} />
                                  </div>
                                </div> */}

                                {/* DelivaryCharge */}
                                <div className="DelivaryCharge">

                                  <div className="Item">

                                    <label> Delivery Charge <span>*</span></label>

                                    <select name="" onChange={(e) => {
                                      setDelivery(e.target.value);
                                    }}>
                                      <option value="Free Delivery Charge">Free Delivery Charge</option>
                                      <option value="Paid Delivery Charge">Paid Delivery Charge</option>
                                    </select>

                                  </div>

                                  {delivery === "Paid Delivery Charge" && <div className="Item">

                                    <div className="DelivaryItem d_flex d_justify">

                                      <TextField
                                        onChange={(e) => setInsideDhaka(e.target.value)}

                                        id="outlined-basic"
                                        label="Delivery Charge in Dhaka"
                                        variant="outlined"
                                      />

                                      <TextField
                                        onChange={(e) => setOutDhaka(e.target.value)}
                                        id="outlined-basic"
                                        label="Delivery Charge out of Dhaka"
                                        variant="outlined"
                                      />

                                    </div>

                                  </div>}



                                </div>

                                <div className="Item">
                                  {/* {tabSelect === "1" && (
                      <>
                        <Nav variant="pills" onSelect={handleSelect}>
                          <Nav.Item>
                            <Nav.Link eventKey="2">
                              <Button eventKey="2" className="Save">
                                Next
                              </Button>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </>
                    )} */}
                                  {/* <Button className='Update'>Next</Button>
                          <Button className='Cancle'>Cancle</Button> */}

                                  <Button
                                    className="Update"
                                    type="submit"
                                  // onClick={(e) =>
                                  //   handleChangeTab(
                                  //     e,
                                  //     (parseInt(value) + 1).toString()
                                  //   )
                                  // }
                                  >
                                    ADD Product
                                  </Button>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  {/* **-    Business Information
                  <TabPanel value='2'>
                    <div className='DashboardTabsItem'>
                      <h4>Update Product Information</h4>
                      <p>Update your product info</p>
                      <div className='DashboardForm'>
               
                        <div className='DashboardFormItem'>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={3}>
                              <div className='left'>
                                <h5>Product Images</h5>
                                <p>
                                  This will be displayed on your product page
                                </p>
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={7} md={9}>
                              <div className='CustomeInput'>
                                <div className='Item Upload'>
                                  <label>
                                    Product Image ( Main image of product )
                                  </label>
                                  <Button variant='contained' component='label'>
                                    Upload
                                    <input
                                      hidden
                                      accept='image/*'
                                      multiple
                                      type='file'
                                      name='main_image'
                                      onChange={handleMainImage}
                                    />
                                  </Button>
                                  <div className='svg'>
                                    <AiOutlineCamera />
                                  </div>
                              
                                  <div className='imagePreview'>
                                    <img src={previewMainImg.file} />
                                  </div>
                                </div> -----* */}
                  {/* <div className='Item Upload'>
                                  <label>
                                    Product Image ( Other image of product )
                                  </label>
                                  <Button variant='contained' component='label'>
                                    Upload
                                    <input
                                      hidden
                                      accept='image/*'
                                      multiple
                                      type='file'
                                      name='other_image'
                                      onChange={handleOtherImages}
                                    />
                                  </Button>
                                  <div className='svg'>
                                    <AiOutlineCamera />
                                  </div>
                                  <div className='imagePreview'>
                                    <img src={otherImage1.file} />
                                  </div>
                                </div> */}
                  {/* <div className='Item Upload'>
                                  <label>
                                    Product Image ( Other image of product )
                                  </label>
                                  <Button variant='contained' component='label'>
                                    Upload
                                    <input
                                      hidden
                                      accept='image/*'
                                      multiple
                                      type='file'
                                      name='other_image'
                                      onChange={handleOtherImages1}
                                    />
                                  </Button>
                                  <div className='svg'>
                                    <AiOutlineCamera />
                                  </div>
                                  <div className='imagePreview'>
                                    <img src={otherImage2.file} />
                                  </div>
                                </div>
                                <div className='Item Upload'>
                                  <label>
                                    Product Image ( Other image of product )
                                  </label>
                                  <Button variant='contained' component='label'>
                                    Upload
                                    <input
                                      hidden
                                      accept='image/*'
                                      multiple
                                      type='file'
                                      name='other_image'
                                      onChange={handleOtherImages2}
                                    />
                                  </Button>
                                  <div className='svg'>
                                    <AiOutlineCamera />
                                  </div>
                                  <div className='imagePreview'>
                                    <img src={otherImage3.file} />
                                  </div>
                                </div>
                                <div className='Item Upload'>
                                  <label>
                                    Product Image ( Other image of product )
                                  </label>
                                  <Button variant='contained' component='label'>
                                    Upload
                                    <input
                                      hidden
                                      accept='image/*'
                                      multiple
                                      type='file'
                                      name='other_image'
                                      onChange={handleOtherImages3}
                                    />
                                  </Button>
                                  <div className='svg'>
                                    <AiOutlineCamera />
                                  </div>
                                  <div className='imagePreview'>
                                    <img src={otherImage4.file} />
                                  </div>
                                </div> */}
                  {/* <div className="Item Upload">
                                <label>Product Image ( Other image of product )</label>
                                <Button variant="contained" component="label">
                                  Upload
                                  <input hidden accept="image/*" multiple type="file" name="other_image"
                                onChange={handleOtherImages} />
                                </Button>
                                <div className="svg">
                                  <AiOutlineCamera/>
                                </div>
                              </div> */}

                  {/* <div className='Item'>
                                  <Button type='submit' className='Update'>
                                    Update
                                  </Button>
                                  <Button type='reset' className='Cancle'>
                                    Cancle
                                  </Button>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </TabPanel> */}
                </form>
              </TabContext>
            </Box>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddProduct;