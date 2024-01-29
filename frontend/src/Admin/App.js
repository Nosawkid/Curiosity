import React from 'react'
import Home from './pages/home/Home'
import List from './pages/list/List';
import {
  Routes,
  Route,
} from "react-router-dom";
import Single from './pages/single/Single';
import './style/dark.scss'
import Sociallinks from './pages/links/Link';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Category from './pages/category/Category';
import Subcategory from './pages/subcategory/Subcategory';
import Topic from './pages/topic/Topic';
import './App.scss'
function App() {

  


  return (
    <div className="adminApp">

      <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='links' element={<Sociallinks />} />
              <Route path='/Users' element={<List />} />
              <Route path='/SingleList' element={<Single />} />
              <Route path='/categories' element = {<Category/>}/>
              <Route path='/Subcategories' element = {<Subcategory/>}/>
              <Route path='/Topics' element = {<Topic/>}/>
            </Routes>

          </div>
        </div>
      </div>


    </div>
  )
}

export default App