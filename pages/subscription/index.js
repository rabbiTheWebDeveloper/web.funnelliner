import Subscription from '../../Components/Subscription/Subscription';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (

        <>
            <Subscription></Subscription>

        </>

    )

}
// export default index;

export default withAuth(index, {
    isProtectedRoute: true
});