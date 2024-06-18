import BackButton from "../component/back_button";



function BroadcastingPage() {
    return <div className="flex flex-col h-dvh pl-8 pr-8 pb-12 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>Broadcasting</span></div>
        </div>
        <div className="flex grow justify-center items-center">
            <div className="wrapper"></div>
        </div>
    </div>
}



export default BroadcastingPage;