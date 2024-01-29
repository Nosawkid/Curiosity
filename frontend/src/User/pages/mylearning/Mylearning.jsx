import React from 'react'
import './mylearning.scss'
import Navbar from '../../components/navbar/Navbar'
import Mylearningcontent from '../../components/mylearningcontent/Mylearningcontent'
import Footer from '../../components/footer/footer'

const Mylearning = () => {
  return (
    <div className='mylearning'>
      <Navbar/>
      <Mylearningcontent title="My Learning"/>
      <Footer/>
    </div>
  )
}

export default Mylearning