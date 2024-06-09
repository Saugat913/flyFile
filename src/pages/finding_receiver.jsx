import BackButton from "../component/back_button";


function FindingReceiverPage() {
    return <div className="flex flex-col h-dvh pl-8 pr-8 pb-12 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>Finding Receiver</span></div>
        </div>

        <div className="grow mt-20 flex flex-col justify-center items-center overflow-y-clip">
            <div className="grow aspect-square broadcasting-container animate-spin z-[1]">
                <div className="h-[10%] aspect-square orbit-line z-[2] bg-white"></div>
                <div className="h-[30%] aspect-square orbit-line "></div>
                <div className="h-[60%] aspect-square orbit-line"></div>
                <div className="h-[80%] aspect-square orbit-line"></div>

            </div>

        </div>
    </div>
}


export default FindingReceiverPage;