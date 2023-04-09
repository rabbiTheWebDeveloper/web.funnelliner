import Order from '../../Components/OrderPage/Order';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

            {/* <Sidebar active='order'></Sidebar>
            <Menubar active='order'></Menubar>
            <div className="TopGaps"></div> */}
            <Order></Order>

        </>

    )

}
// export default index;

export default withAuth(index, {
    isProtectedRoute: true
});