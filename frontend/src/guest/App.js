import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import {Routes, Route} from "react-router-dom"
import User from './pages/user/User'
import Instructor from './pages/instructor/Instructor'
import Hirer from './pages/hirer/Hirer'
import Login from './pages/login/Login'
import Forgotpassword from './pages/forgotpass/Forgotpassword'

import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/userReg' element={<User />} />
        <Route path='/instructorReg' element={<Instructor />} />
        <Route path='/hirerReg' element={<Hirer />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />


      </Routes>
      <About />
      <Work />


      <Footer />
    </div>
  );
}

export default App;
