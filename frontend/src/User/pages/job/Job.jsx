import React from 'react'
import './job.scss'
import Navbar from '../../components/navbar/Navbar'
import Jobpreview from '../../components/jobPreview/Jobpreview'
import Footer from '../../components/footer/footer'

const Job = () => {
  return (
    <div className='userJobPage'>
        <Navbar/>

        <div className="jobContainer">
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
        </div>
        <Footer/>
    </div>
  )
}

export default Job