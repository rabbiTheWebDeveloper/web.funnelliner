;
import Category from '../../Components/CategoryPage/Category';
import withAuth from '../../hook/PrivateRoute';


const index = () => {


    return (


        <>

           
            <Category></Category>

        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});