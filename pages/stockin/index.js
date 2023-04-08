
import StockIn from '../../Components/Stock/StockInPage/StockIn';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (

        <>
            <StockIn></StockIn>
        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});