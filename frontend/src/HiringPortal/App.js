import React from 'react'
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

function App() {

 


  return (
    <div className="hirerApp">

      <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/Drafts' element={<Draft />} />
              <Route path='/Courses' element={<Course />} />
              <Route path='/Newcourse' element={<Newcourse />} />
              <Route path='/Wishlist' element = {<Wishlist/>}/>
              <Route path='/Complaints' element = {<Complaint/>}/>
            </Routes>

          </div>
        </div>
      </div>


    </div>
  )
}

export default App