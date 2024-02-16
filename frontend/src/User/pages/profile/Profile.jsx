import React from 'react'
import './profile.scss'
import Mylearningcontent from '../../components/mylearningcontent/Mylearningcontent'
import Footer from '../../components/footer/footer'

const Profile = () => {
  return (
    <div className='userProfile'>
      
      <Mylearningcontent title="Harry Potter"/>
      <Footer/>
    </div>
  )
}

export default Profile