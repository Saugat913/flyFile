function Radar() {
    return <div className="grow mt-20 flex flex-col justify-center items-center overflow-y-clip">
        <div className="grow aspect-square broadcasting-container animate-spin z-[1]">
            <div className="h-[10%] aspect-square orbit-line z-[2] bg-white"></div>
            <div className="h-[30%] aspect-square orbit-line "></div>
            <div className="h-[60%] aspect-square orbit-line"></div>
            <div className="h-[80%] aspect-square orbit-line"></div>
        </div>
    </div>
}


export default Radar;