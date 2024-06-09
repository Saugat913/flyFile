import addButtonLogo from '../assets/plus.png';
import SelectedFileTile from '../component/selected_file_tile';
import BackButton from '../component/back_button';

import { Link } from 'react-router-dom';

const files = [
    { name: "file1.txt", size: "12MB" },
    { name: "file2.txt", size: "1MB" },
    { name: "file4.txt", size: "20MB" },
]



function FileSelectionPage() {
    return <div className="flex flex-col h-dvh pl-8 pr-8 pb-12 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>Select files</span></div>
            <img src={addButtonLogo} className='w-6 h-6' />
        </div>
        <div className='grow pt-20'>
            {files.map((file) => <SelectedFileTile file={file} />)}
        </div>

        <Link to="/transfer_page">
            <div className='send-receive-btn w-[100%]'>
                <span>SEND</span>
            </div>
        </Link>


    </div>
}


export default FileSelectionPage;