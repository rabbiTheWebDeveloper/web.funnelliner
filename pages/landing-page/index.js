import Sidebar from '../../Components/Common/Sidebar';
import Menubar from '../../Components/Common/Menubar';
import LandingWebsite from '../../Components/MyTheme/LandingPage/LandingWebsite';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

            {/* <Sidebar active='tamplate'></Sidebar>
            <Menubar active='tamplate'></Menubar>
         
            <div className="TopGaps"></div> */}
            <LandingWebsite></LandingWebsite>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});