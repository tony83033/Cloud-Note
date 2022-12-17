import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import Login from './component/Login';
import Sign from './component/Sign';
import NoteState from './component/context/NoteState';
function App() {
  return (
    
    <>
    <NoteState>
  <Router>
    <Navbar />
  <Routes>
          <Route exact path="/about" element={<About/>}>
          
          </Route>
          <Route exact path="/" element={<Home/>}>
           
          </Route>

          <Route exact path="/login" element={<Login/>}>
           
           </Route>

           <Route exact path="/sign" element={<Sign/>}>
           
           </Route>
          
        </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
