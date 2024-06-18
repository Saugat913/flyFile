import addButtonLogo from '../assets/plus.png';
import SelectedFileTile from '../component/selected_file_tile';
import BackButton from '../component/back_button';
import { open } from '@tauri-apps/api/dialog';


import { Link } from 'react-router-dom';
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';


import appState from "../model/app";


// const files = [
//     { name: "file1.txt", size: "12MB" },
//     { name: "file2.txt", size: "1MB" },
//     { name: "file4.txt", size: "20MB" },
// ]



function FileSelectionPage() {

    let [files, setFiles] = useState([]);


    function deleteByIndex(targetIndex) {
        const newArray = files.filter((item, index) => index !== targetIndex);
        setFiles(newArray);
    }

    return <div className="flex flex-col h-dvh pl-8 pr-8 pb-12 pt-4">
        <div className="flex">
            <BackButton />
            <div className='flex justify-center items-center grow'><span>Select files</span></div>
            <img src={addButtonLogo} className='w-6 h-6 cursor-pointer' onClick={async () => {
                const selected = await open({
                    multiple: true,
                });
                if (selected !== null) {
                    console.log(files);
                    setFiles([...files, ...selected])
                }
            }} />
        </div>
        <div className='grow pt-20'>
            {files.map((file, index) => {
                let onDeleted = () => {
                    deleteByIndex(index);
                }
                return <SelectedFileTile file={file} key={index} onDeleted={onDeleted} />
            })}
        </div>

        <Link to="/finding_receiver_page" onClick={async () => {
            await appState.startFindingReceiver();
        }}>
            <div className='send-receive-btn w-[100%]'>
                <span>SEND</span>
            </div>
        </Link>


    </div >
}


export default FileSelectionPage;