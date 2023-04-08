import axios from "axios";
import { useEffect, useState } from "react";
import { headers } from '../../pages/api';
import Menubar from './Menubar';
import Sidebar from './Sidebar';

export default function Layout({ children, busInfo }) {
  //   const [busInfo, setBusInfo] = useState({});
  const [isWindowExist, setIsWindowExist] = useState(false)
  //   const handleFetchBusInfo = async () => {
  //     try {
  //         let data = await axios({
  //             method: "get",
  //             url: `${process.env.API_URL}/client/settings/business-info`,
  //             headers: headers,
  //         });
  //         // console.log("setSalesTarget",data.data.data)
  //         setBusInfo(data?.data?.data);
  //     } catch (err) {
  //         // console.log(err)
  //     }


  // };  

  useEffect(() => {
    const windowObj = window;
    if (windowObj !== "undefined") {
      setIsWindowExist(true)
    }
  })


  // useEffect(() => {
  //     handleFetchBusInfo();
  // }, []);

  if (isWindowExist !== false) {
    return (
      <>
        <Menubar busInfo={busInfo}></Menubar>
        <Sidebar busInfo={busInfo} />
        <div className="TopGaps"></div>
        <main>{children}</main>
      </>
    )
  }



}