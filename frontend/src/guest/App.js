import React from 'react'
import {Routes, Route} from "react-router-dom"
import User from './pages/user/User'
import Instructor from './pages/instructor/Instructor'
import Hirer from './pages/hirer/Hirer'
import Login from './pages/login/Login'


const App = () => {
  return (
    <div className='app'>
      <Routes>
         
            
                  <Route path='/user' element={<User/>}/>
                  <Route path='/instructor' element={<Instructor/>}/>
                  <Route path='/hirer' element={<Hirer/>}/>
                  <Route path='/' element={<Login/>}/>

          
      </Routes>
    </div>
  )
}

export default App