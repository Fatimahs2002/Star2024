import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./dashcomponents/Settings";



function App() {
  return(
     <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Dashboard/>}/>
          {/* <Route path="/" element={<Settings/>}/> */}
        </Routes>
      </Router>


  </div>
  );
}

export default App;
