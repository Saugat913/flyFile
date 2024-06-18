import flyFileLogo from "../assets/flyFileLogo.svg";
import sendLogo from "../assets/send.png";
import receiveLogo from "../assets/inbox.png";
import uploadLogo from "../assets/upload.png";
import downloadLogo from "../assets/downloads.png";


import available_avatar from "../model/avatar";

import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import appState from "../model/app";


//TODO
const favourites = [
    'name1',
    'name2',
    'name3'
];




function RecentListTile({ recent }) {

    console.log(recent.file_size);
    return <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-md bg-slate-400 mr-3"></div>
        <div>
            <span className="block " >{recent.file_name}</span>
            <span className="text-cyan text-sm">{recent.file_size.MB}</span>
        </div>
        <div className="grow"></div>
        <img src={recent.is_upload ? uploadLogo : downloadLogo} className="w-5 h-5" />
    </div>
}



function HomePage() {
    const { state } = useLocation();
    const config = state;


    return (
        <div className="flex flex-col h-dvh pl-12 pr-12 pb-12" >

            <div className="header">
                <img src={flyFileLogo} alt="flyFileLogo" className="w-32 h-32" />
                <div className="grow"></div>
                <div className="rounded-full bg-slate-500 w-12 h-12">
                    <img src={available_avatar[config.user_config.avatar]} className="w-[100%] h-[100%] rounded-full" />
                </div>
            </div>


            <div className="grow flex flex-col ">

                <div className="flex  justify-between items-center mt-3">
                    <Link to="/file_selection_page" className="flex-auto rounded-lg send-receive-btn mr-4">
                        <div className="flex grow justify-center items-center">
                            <span className="font-bold">SEND</span>
                            <img src={sendLogo} alt="send logo" className="w-6 h-6 ml-3" />
                        </div>
                    </Link>

                    <Link to="/broadcasting_page" className="flex-auto rounded-lg send-receive-btn" onClick={
                        async () => {
                            await appState.startBroadCasting();
                        }
                    }>
                        <div className="flex grow justify-center items-center">
                            <span className="font-bold">RECEIVE</span>
                            <img src={receiveLogo} alt="send logo" className="w-6 h-6 ml-3" />
                        </div>
                    </Link>



                    <div className="flex-auto flex flex-col p-5 bg-white border border-gray-200 rounded-lg shadow m-4">
                        <span className="block font-bold text-lg">Favourite</span>
                        <div className="flex  mt-3">
                            {favourites.map((value, index) => <div className="flex flex-col justify-center items-center text-center">
                                <div className="w-8 h-8 bg-black rounded-full ml-4 mr-4"></div>
                                <span>{value}</span>
                            </div>)}
                        </div>
                    </div>
                </div>

                <div className="grow flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow mt-8 overflow-y-hidden">
                    <span className="block font-bold text-lg mb-5">Recents</span>

                    {config.recent_config.map((recent) => <RecentListTile recent={recent} />)}

                </div>
            </div>
        </div>
    );
}



export default HomePage;