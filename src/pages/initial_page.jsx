import flyFileLogo from "../assets/flyFileLogo.svg";
import { Link } from "react-router-dom";


function Avatar() {
    return <div className="w-16 h-16 rounded-full bg-gray-200 mt-auto flex-none mb-auto"></div>
}


const available_avatar = [1, 2, 3, 4, 5];

function InitialPage() {
    return <div className="flex h-dvh">
        <div className="flex-auto flex flex-col pl-5 pr-5">
            <img src={flyFileLogo} alt="flyFileLogo" className="w-32 h-32" />
            <div className="flex-auto flex flex-col justify-center items-center">

                <div className="w-40 h-40 rounded-full bg-slate-500"></div>
                <input type="text" id="user_name" className="block w-10/12 h-16 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-auto" placeholder="Enter your user name" />

                <Link to="/home_page" className="w-9/12 h-20  mt-auto mb-auto">
                    <div className="w-[100%] h-[100%] bg-black  border-black rounded-md flex justify-center items-center text-white">Next</div>
                </Link>
            </div>
        </div>
        <div className="flex-none flex flex-col w-32 bg-black h-full items-center pt-6 overflow-y-clip">
            {available_avatar.map(() => <Avatar />)}
        </div>
    </div>
}

export default InitialPage;