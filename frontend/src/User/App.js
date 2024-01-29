import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Cart from './pages/cart/Cart'
import Mylearning from './pages/mylearning/Mylearning'
import Job from './pages/job/Job'

const App = () => {
  return (
    <div className='app'>
      <Routes>
          <Route path='/'>
              <Route index element={<Home/>} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/mylearning' element={<Mylearning/>}/>
              <Route path='/jobs' element={<Job/>} />
          </Route>
      </Routes>
    </div>
  )
}

export default App