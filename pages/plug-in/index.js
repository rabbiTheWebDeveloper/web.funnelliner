import Sidebar from '../../Components/Common/Sidebar';
import Menubar from '../../Components/Common/Menubar';
import Plugin from '../../Components/PluginPage/Plugin';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

            {/* <Sidebar active='plugins'></Sidebar>
            <Menubar active='plugins'></Menubar>
            <div className="TopGaps"></div> */}
            <Plugin></Plugin>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});