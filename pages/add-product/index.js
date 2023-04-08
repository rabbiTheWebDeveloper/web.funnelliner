import AddProduct from '../../Components/AddProduct/AddProduct';
import withAuth from '../../hook/PrivateRoute';
const index = () => {
    return (
        <>
            <AddProduct/>

        </>
    )
}

export default withAuth(index, {
    isProtectedRoute: true
});