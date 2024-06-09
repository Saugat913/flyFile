import { useNavigate } from 'react-router-dom';
import backButtonLogo from '../assets/back.png';


function BackButton() {
    let navigator = useNavigate();
    return <div className='cursor-pointer' onClick={() => navigator(-1)}><img src={backButtonLogo} className='w-6 h-6' /></div>
}

export default BackButton;