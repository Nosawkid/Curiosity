import React from 'react'
import './job.scss'
import Jobpreview from '../../components/jobPreview/Jobpreview'
import Footer from '../../components/footer/footer'

const Job = () => {
  return (
    <div className='userJobPage'>
        

        <div className="jobContainer">
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
            <Jobpreview/>
        </div>
        
    </div>
  )
}

export default Job