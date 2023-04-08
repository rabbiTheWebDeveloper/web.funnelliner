import Courier from '../../Components/CourierPage/Courier';
import withAuth from '../../hook/PrivateRoute';


const index = ({...data}) => {
    const {busInfo} =data
    console.log("data" ,busInfo)


    return (
        <>
            <Courier busInfo={busInfo}></Courier>
        </>

    )

}

export default withAuth(index, {
    isProtectedRoute: true
});