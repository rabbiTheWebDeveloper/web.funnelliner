import SubProduct from '../../Components/SubProductPage/SubProduct';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (

        <>

            <SubProduct></SubProduct>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});