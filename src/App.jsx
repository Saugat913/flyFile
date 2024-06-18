import './App.css';
import InitialPage from './pages/initial_page';
import HomePage from './pages/home_page';
import FileSelectionPage from './pages/file_selecting_page';
import TransferPage from './pages/transfer_page';
import FindingReceiverPage from './pages/finding_receiver_page';




import { Routes, Route } from "react-router-dom";
import BroadcastingPage from './pages/broadcasting_page';
import WrapperPage from './pages/wrapper_page';

function App() {
  return <Routes>
    <Route exact path="/" element={<WrapperPage />} />
    <Route exact path="/home_page" element={<HomePage />} />
    <Route exact path="/file_selection_page" element={<FileSelectionPage />} />
    <Route exact path="/transfer_page" element={<TransferPage />} />
    <Route exact path="/finding_receiver_page" element={<FindingReceiverPage />} />
    <Route exact path="/broadcasting_page" element={<BroadcastingPage />} />
  </Routes>

}

export default App;
