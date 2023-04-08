import Sidebar from '../../Components/Common/Sidebar';
import Menubar from '../../Components/Common/Menubar';
import ProductReturn from '../../Components/Stock/ProductReturnPage/ProductReturn';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

            {/* <Sidebar active='stock'></Sidebar>
            <Menubar active='stock'></Menubar>
            <div className="TopGaps"></div> */}
            <ProductReturn></ProductReturn>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});