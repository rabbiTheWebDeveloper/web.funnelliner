import Sidebar from '../../Components/Common/Sidebar';
import Menubar from '../../Components/Common/Menubar';
import PluginDetails from '../../Components/PluginDetailsPage/PluginDetails';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

            {/* <Sidebar active='plugins'></Sidebar>
            <Menubar active='plugins'></Menubar>
            <div className="TopGaps"></div> */}
            <PluginDetails></PluginDetails>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});