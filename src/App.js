import './App.css';
import BeverageQueue from './components/BevrageQueue/BeverageQueue';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeverageMenu from './components/BevrageMenuForm/BeverageMenu';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BeverageMenu />} />
          <Route exact path="/queue" element={<BeverageQueue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
