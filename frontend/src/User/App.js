import React from 'react'
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

const App = () => {
  return (
    <div className='userApp'>
      <Navbar/>
      <Routes>
          <Route path='/'>
              <Route index element={<Home/>} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/settings' element={<Settings/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/mylearning' element={<Mylearning/>}/>
              <Route path='/jobs' element={<Job/>} />
          </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App