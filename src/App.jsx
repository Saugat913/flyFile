// import './App.css'
// import InitialPage from './pages/initial_page.jsx';
// import HomePage from './pages/home_page.jsx';


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {


//   return (
//     <BrowserRouter >
//       <Routes>
//         <Route exact path='/'>
//           <Redirect to="/initial_page" />
//         </Route>
//         <Route exact path="/initial_page" element={<InitialPage />}>
//           <Route exact path="/home_page" element={<HomePage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter >
//   );
// }

// export default App
import './App.css';
import InitialPage from './pages/initial_page';
import HomePage from './pages/home_page';
import FileSelectionPage from './pages/file_selecting_page';
import TransferPage from './pages/transfer_page';
import FindingReceiverPage from './pages/finding_receiver';




import { Routes, Route } from "react-router-dom";

function App() {
  return <Routes>
    <Route exact path="/" element={<InitialPage />} />
    <Route exact path="/home_page" element={<HomePage />} />
    <Route exact path="/file_selection_page" element={<FileSelectionPage />} />
    <Route exact path="/transfer_page" element={<TransferPage />} />
    <Route exact path="/finding_receiver_page" element={<FindingReceiverPage />} />

  </Routes>

}

export default App;
