import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Cart from './pages/cart/Cart'
import Mylearning from './pages/mylearning/Mylearning'
import Job from './pages/job/Job'
import './app.scss'
import Settings from './pages/settings/Settings'
import Navbar from './components/navbar/Navbar'

import Footer from './components/footer/footer'
import Wishlist from './pages/wishlist/Wishlist'
import Course from './pages/course/Course'
import { Box } from '@mui/material'
import Checkout from './pages/checkout/Checkout'
import Viewcourse from './pages/viewcourse/Viewcourse'
import Resume from './pages/resume/Resume'
import Certificate from './pages/certificate/Certificate'
import Categorycourse from './pages/categorycourse/Categorycourse'
import axios from 'axios'
import { SetCart } from '../Context/Context'






const App = () => {
  const [count,setCount]  = useState(null)
  const uid = sessionStorage.getItem("Uid")
  const fetchCart = () => {
    axios.get("http://localhost:5000/Cart/" + uid).then((res) => {
      setCount(res.data.length)
    })
  }

  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <div className='userApp'>
      <SetCart.Provider value={{count,fetchCart}}>

        <Navbar />
        <Box sx={{ minHeight: '100vh' }}>

          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/course/:id' element={<Course />} />
              <Route path='/coursefromcategory/:categoryId' element={<Categorycourse />} />
              <Route path='/Checkout/:courseId/:type' element={<Checkout />} />
              <Route path='/mylearning' element={<Mylearning />} />
              <Route path='/viewcourse/:courseId' element={<Viewcourse />} />
              <Route path='/jobs' element={<Job />} />
              <Route path='/resume/:id' element={<Resume />} />
              <Route path='/certificate/:courseId/:userId' element={<Certificate />} />
            </Route>
          </Routes>
        </Box>

        <Footer className="footer" />
      </SetCart.Provider>
    </div>
  )
}

export default App