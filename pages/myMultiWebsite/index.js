import Menubar from "../../Components/Common/Menubar";
import Sidebar from "../../Components/Common/Sidebar";
import MyMultiWebsite from "../../Components/MyTheme/Theme/MyMultiWebsite/MyMultiWebsite";


const index = () => {
    return (
        <>
            {/* <Sidebar active='mypage'></Sidebar>
            <Menubar active='mypage'></Menubar>
            <div className="TopGaps"></div> */}
            <MyMultiWebsite></MyMultiWebsite>

        </>
    );
};

export default index;