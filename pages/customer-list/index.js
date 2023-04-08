
import CustomerList from '../../Components/CustomerListPage/CustomerList';
import withAuth from '../../hook/PrivateRoute';


const index = () => {
    return (
        <>
        
            <CustomerList></CustomerList>
        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});