import transferLogo from "../assets/data-transfer.png";
import BackButton from '../component/back_button';
import SelectedFileTile from '../component/selected_file_tile';

const sender_name = "Robert"
const receiver_name = "John"



const files = [
    { name: "file1.txt", size: "12MB" },
    { name: "file2.txt", size: "1MB" },
    { name: "file4.txt", size: "20MB" },
]


function TransferPage() {
    return <div className="flex flex-col h-dvh pl-6 pr-6 pb-5 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>File Transfer</span></div>
        </div>

        <div className='flex grow items-center justify-center mt-auto'>
            <div className='w-[80%] h-[100%] flex flex-col'>
                <div className='flex mb-12 mt-12 items-center justify-center'>
                    <div className='w-20 h-20 bg-slate-100 rounded-full mr-4 shadow'></div>
                    <div className='flex flex-col '>
                        <span className='block '>{sender_name}</span>
                        <span className='text-sm text-gray-500'>Sender</span>
                    </div>
                    <img src={transferLogo} className='w-9 h-9 mr-auto ml-auto' />
                    <div className='flex flex-col mr-4'>
                        <span className='block '>{receiver_name}</span>
                        <span className='text-sm text-gray-500'>Receiver</span>
                    </div>
                    <div className='w-20 h-20 bg-slate-100 rounded-full shadow'></div>
                </div>
                <div className="w-full h-12 rounded-md border-[1px]">
                    <div className=" flex justify-center items-center h-12 bg-black rounded-md w-[45%] text-white " >45%</div>
                </div>
                <div className='grow shadow mt-12 flex flex-col pl-4 pr-3 pt-4'>
                    <span className='text-lg mb-3'>Transfer</span>
                    {files.map((file) => <SelectedFileTile file={file} />)}
                </div>
            </div>
        </div>
    </div>
}

export default TransferPage;