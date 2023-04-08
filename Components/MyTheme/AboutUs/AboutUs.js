import React, { useState, useMemo } from 'react'
import { Box, Button, Container, Grid, Pagination, Stack, TextField } from "@mui/material";
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';
import { getWebsiteSettings, headers, shopId } from "../../../pages/api";
import Swal from 'sweetalert2';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
function AboutUs({ websiteSettingData }) {
    const [aboutUsContent, setAboutUsContent] = useState("")

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {

            matchVisual: false,
        },
    }

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]

    const handleChangeEditor = (editor) => {
        setAboutUsContent(editor)
    }
    const handleSubmitAboutUs = () => {
        axios
            .post(`${process.env.API_URL}/client/settings/business-info/update`, { about_us: aboutUsContent, shop_name: websiteSettingData?.domain }, {
                headers: headers,
            })
            .then(function (response) {
                Swal.fire("About Us content update", "success");
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong !",

                });
            });
    }
    return (
        <div className="WebsiteLink DashboardSetting ">
            <Container maxWidth="sm">
                <div className="text_edit_formater">
                    <QuillNoSSRWrapper modules={modules} formats={formats} onChange={handleChangeEditor} placeholder="Please Describe About your business" defaultValue={websiteSettingData?.about_us} />
                    <div className="submitButtonForPages">
                        <Button onClick={handleSubmitAboutUs} variant="contained">Submit</Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AboutUs