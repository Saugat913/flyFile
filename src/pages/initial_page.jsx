import flyFileLogo from "../assets/flyFileLogo.svg";
import available_avatar from "../model/avatar";

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";


function Avatar({ image, onClick }) {
    return <div className="w-16 h-16 rounded-full bg-gray-200 mt-auto flex-none mb-auto cursor-pointer" onClick={onClick}>
        <img src={image} className="w-16 h-16 rounded-full" />
    </div>
}




function InitialPage() {
    let [currentAvatar, setCurrentAvatar] = useState(0);
    let navigator = useNavigate();

    let userNameRef = useRef();

    let onSubmit = () => {


        let userConfig = {
            user_name: userNameRef.current.value,
            avatar: currentAvatar,
        }


        let config = {
            "user_config": {
                "user_name": userNameRef.current.value,
                "avatar": currentAvatar
            },
            "recent_config": []
        }


        invoke("write_user_config", { data: userConfig }).then(() => {
            navigator("/home_page", { state: config });
        })
    }

    return <div className="flex h-dvh">
        <div className="flex-auto flex flex-col pl-5 pr-5">
            <img src={flyFileLogo} alt="flyFileLogo" className="w-32 h-32" />
            <div className="flex-auto flex flex-col justify-center items-center">

                <div className="w-40 h-40 rounded-full bg-slate-500">
                    <img src={available_avatar[currentAvatar]} className="rounded-full w-[100%] h-[100%]" />
                </div>
                <input type="text" ref={userNameRef} maxLength={8} className="block w-10/12 h-16 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-auto" placeholder="Enter your user name" />

                <div className="w-9/12 h-20  mt-auto mb-auto bg-black  border-black rounded-md flex justify-center items-center text-white cursor-pointer" onClick={onSubmit}>Next</div>

            </div>
        </div>
        <div className="flex-none flex flex-col w-32 bg-black h-full items-center pt-6 overflow-y-clip">
            {available_avatar.map((data, index) => {

                let onClickActions = () => {
                    setCurrentAvatar(index);
                }
                return <Avatar image={data} onClick={onClickActions} key={index} />;
            })}
        </div>
    </div>
}

export default InitialPage;