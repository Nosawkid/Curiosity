import React, { useEffect } from 'react'
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
import Changepassword from './pages/changepassword/Changepassword';
import { Card } from '@mui/material';
import Review from './pages/reviews/Review';
import { useNavigate } from 'react-router-dom';


function App() {
  const Iid = sessionStorage.getItem("Iid")
  const navigate = useNavigate()

  useEffect(()=>{
    if(!Iid)
    {
      return navigate("/")
    }
  
  },[])
  return (
    <div  className="instructorApp">

      <div  className='home'>
        <Sidebar />
        <div  className="homeContainer">
          <Navbar />
          <Card sx={{
            minHeight:"77vh", overflowY: 'scroll', m: 2, borderRadius: 5, py: 3,px:2, scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Myprofile' element={<Myprofile />} />
              <Route path='/Drafts' element={<Draft />} />
              <Route path='/Courses' element={<Course />} />
              <Route path='/Courses/:id' element={<Single />} />
              <Route path='/Courses/:courseId/section' element={<Section />} />
              <Route path='/Section/:sid/material' element={<Material />} />
              <Route path='/Newcourse' element={<Newcourse />} />
              <Route path='/Cart' element={<Cart />} />
              <Route path='/Wishlist' element={<Wishlist />} />
              <Route path='/Complaints' element={<Complaint />} />
              <Route path='/Section' element={<Section />} />
              <Route path='/Material' element={<Material />} />
              <Route path='/Settings' element={<Editprofile />} />
              <Route path='/changepassword' element={<Changepassword />} />
              <Route path='/Reviews/:courseId' element={<Review/>}/>
            </Routes>

          </Card>
            <Footer />
        </div>
      </div>



    </div>
  )
}

export default App