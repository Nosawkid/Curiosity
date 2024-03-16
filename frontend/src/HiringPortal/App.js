import React, { useEffect } from 'react'
import Home from './pages/home/Home'
import {
  Routes,
  Route,
} from "react-router-dom";
import './style/dark.scss'
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Course from './pages/courses/Course';
import Draft from './pages/drafts/Draft';
import Newcourse from './pages/newcourse/Newcourse';
import Wishlist from './pages/wishlist/Wishlist';
import Complaint from './pages/complaint/Complaint';
import Profile from './pages/profile/Profile';
import './App.scss'
import Applications from './pages/applications/Applications';
import Single from './pages/single/Single';
import Footer from './components/footer/footer'
import { useNavigate } from 'react-router-dom';



function App() {

const navigate = useNavigate()

const Jid = sessionStorage.getItem("Jid")


useEffect(()=>{
if(!Jid)
{
  return navigate("/")
}
},[])

  return (
    <div  className="hirerApp">

      <div className='home'>
        <Sidebar />
        <div style={{position:"relative"}}  className="homeContainer">
          <Navbar />
          <div style={{minHeight:"100vh"}}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/Drafts' element={<Draft />} />
              <Route path='/myposts' element={<Course />} />
              <Route path='/Newvacancy' element={<Newcourse />} />
              <Route path='/Wishlist' element={<Wishlist />} />
              <Route path='/Complaints' element={<Complaint />} />
              <Route path='/Applications/:jobId' element={<Applications/>} />
              <Route path='/Application/:appId' element={<Single/>} />

            </Routes>

          </div>
        <Footer/>
        </div>
      </div>


    </div>
  )
}

export default App