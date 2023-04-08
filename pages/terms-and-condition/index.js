import { useEffect, useState } from 'react';
import TermsAndCondition from '../../Components/MyTheme/TermsAndCondition/TermsAndCondition';
import withAuth from '../../hook/PrivateRoute';
import { getWebsiteSettings } from '../api';


const index = () => {
    const [websiteSettingData, setWebsiteSettingData]=useState({})
    useEffect(() => {
        getWebsiteSettings()
            .then((result) => {
                setWebsiteSettingData(result?.data?.data);
            })
            .catch(function (error) {
                return;
            });
    }, []);
    return (
        <>
           <TermsAndCondition websiteSettingData={websiteSettingData}/>
        </>
    )
}
export default withAuth(index, {
    isProtectedRoute: true
});