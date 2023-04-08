import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from '../../Components/ProductPage/Product';
import withAuth from '../../hook/PrivateRoute';
import { headers } from '../api';


const index = () => {
    const [category, setCategory] = useState([])
    const hanldeFetchCategories = () => {
        axios
            .get(process.env.API_URL + "/client/categories", { headers: headers })
            .then(function (response) {
                let allProduct = response.data.data;
                setCategory(allProduct);


            })
            .catch(function (error) {
                // if (error.response.data.api_status === "401") {
                //     window.location.href = "/login"
                //     Cookies.remove("token");
                //     localStorage.clear("token");
                //     Cookies.remove("user");
                //     localStorage.clear("user");

                //     window.location.href = "/login"
                // }
            });
    }

    useEffect(() => {
        hanldeFetchCategories()
    }, []);
    return (
        <>
            <Product category={category}></Product>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});