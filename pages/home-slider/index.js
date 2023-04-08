import withAuth from '../../hook/PrivateRoute';
import Subscription from '../../Components/Subscription/Subscription';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';


const index = () => {


    return (


        <>

        
            <HomeSlider></HomeSlider>

        </>

    )

}
// export default index;

export default withAuth(index, {
    isProtectedRoute: true
});