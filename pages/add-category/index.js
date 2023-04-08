
import SubCategory from '../../Components/SubCategoryPage/SubCategory';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

          
            <SubCategory></SubCategory>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});