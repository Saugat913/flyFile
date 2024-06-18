import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

import flyFileLogo from "../assets/flyFileLogo.svg";
import InitialPage from "./initial_page";
import { useNavigate } from "react-router-dom";


function WrapperPage() {

    let [configStatus, setConfigStatus] = useState(false);
    let config = null
    let navigator = useNavigate();

    useEffect(() => {
        invoke("read_config").then((data) => {
            if (data != null) {
                navigator("/home_page", { state: data });
            }
            setConfigStatus(true);
        })
    });

    let splashScreen = (<div className="flex h-dvh justify-center items-center">
        <img src={flyFileLogo} alt="flyFileLogo" className="w-32 h-32" />
    </div>);

    return (configStatus == false ? splashScreen : <InitialPage />);
}



export default WrapperPage;