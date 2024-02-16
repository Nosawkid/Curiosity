import React from 'react'
import './mylearning.scss'

import Mylearningcontent from '../../components/mylearningcontent/Mylearningcontent'
import Footer from '../../components/footer/footer'

const Mylearning = () => {
  return (
    <div className='mylearning'>
      
      <Mylearningcontent title="My Learning"/>
      <Footer/>
    </div>
  )
}

export default Mylearning