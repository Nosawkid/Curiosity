import React, { useEffect, useState } from 'react'
import './job.scss'
import Jobpreview from '../../components/jobPreview/Jobpreview'
import axios from 'axios'
import { Server } from '../../../Server.js'


const Job = () => {
  const [jobs, setJobs] = useState("")

  const fetchJobs = () => {
    axios.get(`${Server}/Vacancy`).then((res) => {
      setJobs(res.data)
    })
  }


  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className='userJobPage'>


      <div className="jobContainer">
        {jobs && jobs.map((row, key) => (
          <Jobpreview link={row._id} companyName={row.jobPortalId.jobPortalName} vacancyTitle={row.vacancyTitle} vacancyRequirement={row.vacancyRequirement} minSalary={row.minSalary} maxSalary={row.maxSalary} category={ row.categoryId && row.categoryId.categoryName} vacancyTime={row.vacancyTime}  />
        ))}
      </div>

    </div>
  )
}

export default Job