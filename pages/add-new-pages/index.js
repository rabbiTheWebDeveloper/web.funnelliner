
import AddNewPage from '../../Components/AddNewPages/AddNewPage';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

           
            <AddNewPage></AddNewPage>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});