import React from 'react'
import Guest from './guest/App'
import HiringPortal from './HiringPortal/App'
import Admin from './Admin/App'
import Instructor from './Instructor/App'
import User from './User/App'
import { Route, Routes } from 'react-router-dom'
import Landing from './guest/pages/landing/Landing'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path="/Guest/*" element={<Guest/>} />
      <Route path="/User/*" element={<User/>} />
      <Route path="/HiringPortal/*" element={<HiringPortal/>} />
      <Route path="/Instructor/*" element={<Instructor/>} />
      <Route path="/Admin/*" element={<Admin/>} />
    </Routes>
  )
}

export default App