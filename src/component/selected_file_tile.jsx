import deleteButtonLogo from '../assets/bin.png';
function SelectedFileTile({ file, onDeleted }) {
    return <div className='flex items-center w-[100%] h-16 border-[1px] border-black mb-6 p-4 '>
        <div className="w-12 h-12 rounded-md bg-slate-400 mr-3"></div>
        <div>
            <span className="block" >{file}</span>
            {/* <span className="text-cyan text-sm">{file.size}</span> */}
        </div>
        <div className="grow"></div>
        <img src={deleteButtonLogo} className="w-6 h-6 cursor-pointer" onClick={onDeleted} />
    </div>
}



export default SelectedFileTile;