import React from 'react'
import './App.scss'
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
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';
import Complaint from './pages/complaint/Complaint';
import Section from './pages/section/Section';
import Material from './pages/material/Material';
import Single from './pages/single/Single';
import Myprofile from './pages/myprofile/Myprofile';
import Editprofile from './pages/editprofile/Editprofile';
import Footer from './pages/footer/footer';




function App() {

  


  return (
    <div className="instructorApp">

      <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Myprofile' element={<Myprofile/>}/>
              <Route path='/Drafts' element={<Draft />} />
              <Route path='/Courses' element={<Course />} />
              <Route path='/Courses/:id' element={<Single/>}/>
              <Route path='/Courses/:courseId/section' element={<Section/>}/>
              <Route path='/Section/:sid/material' element={<Material/>}/>
              <Route path='/Newcourse' element={<Newcourse />} />
              <Route path='/Cart' element = {<Cart/>}/>
              <Route path='/Wishlist' element = {<Wishlist/>}/>
              <Route path='/Complaints' element = {<Complaint/>}/>
              <Route path='/Section' element = {<Section/>} />
              <Route path='/Material' element={<Material/>}/>
              <Route path='/Settings' element={<Editprofile/>}/>
              
            </Routes>

          </div>
          <Footer/>
        </div>
      </div>
      


    </div>
  )
}

export default App