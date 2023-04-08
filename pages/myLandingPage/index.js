import Menubar from "../../Components/Common/Menubar";
import Sidebar from "../../Components/Common/Sidebar";
import MyLandingPage from "../../Components/MyTheme/Theme/MyLandingPage/MyLandingPage";


const index = () => {
    return (
        <>
            {/* <Sidebar active='mypage'></Sidebar>
            <Menubar active='mypage'></Menubar>
            <div className="TopGaps"></div> */}
            <MyLandingPage></MyLandingPage>

        </>
    );
};

export default index;