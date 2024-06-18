import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event'


import BackButton from "../component/back_button";
import Radar from "../component/radar";





function getRandomIntString(min, max) {
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min.toString();
}


function FindingReceiverPage() {


    const [popUpArray, setPopUpArray] = useState([]);

    useEffect(() => {

        const unlisten = listen("new_receiver", (event) => {
            console.log(popUpArray);
            const data = event.payload.user_config.user_name; // adjust based on your payload structure
            console.log("Event received:", data);
            setPopUpArray([
                ...popUpArray,
                data
            ]);
        });

        // Clean up the listener on component unmount
        return () => {
            unlisten.then((fn) => fn());
        };
    }, []);

    return <div className="flex flex-col h-dvh pl-8 pr-8 pb-12 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>Finding Receiver</span></div>
        </div>

        <Radar>
            {
                popUpArray.map((name) => <div className='w-[100px] h-[100px] rounded-full bg-black' style=
                    {{
                        visibility: 'visible',
                        top: getRandomIntString(100, 200),
                        right: getRandomIntString(100, 200),
                        position: 'absolute'
                    }} onClick={() => {
                        // invoke("ask_reciever_permission", { receiverInfo: { message: popUpArray[1] } });
                    }}>{name}</div>)
            }
        </Radar>
    </div>
}


export default FindingReceiverPage;