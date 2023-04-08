
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
function PrivacyPolicy({ websiteSettingData }) {
    const [privacy_policy, setPrivacy_policy] = useState("")

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
        setPrivacy_policy(editor)
    }
    const handleSubmitPrivacyPolicyData = () => {
        axios
            .post(`${process.env.API_URL}/client/settings/business-info/update`, { privacy_policy: privacy_policy, shop_name: websiteSettingData?.domain }, {
                headers: headers,
            })
            .then(function (response) {
               if(response.status === 200){
                Swal.fire("Success")
               }
               else{
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong!",

                });
               }
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
                    <QuillNoSSRWrapper modules={modules} formats={formats} onChange={handleChangeEditor} placeholder="Privacy policy" defaultValue={websiteSettingData?.privacy_policy} />
                    <div className="submitButtonForPages">
                        <Button onClick={handleSubmitPrivacyPolicyData} variant="contained">Submit</Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PrivacyPolicy