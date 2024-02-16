import React, { useEffect, useState } from 'react'
import './home.scss'
import Topsuggestion from '../../components/topsuggestion/Topsuggestion'
import Hero from '../../components/hero/Hero'
import Enrolledsuggestion from '../../components/enrolledsuggestion/Enrolledsuggestion'
import Suggestion from '../../components/suggestion/Suggestion'
import Footer from '../../components/footer/footer'
import axios from 'axios'
import { Box } from '@mui/material'

const Home = () => {
  const [showCourses, setShowCourse] = useState([])



  const fetchCourses = () => {
    axios.get("http://localhost:5000/Course").then((res) => {
      setShowCourse(res.data)
      console.log(res.data);
    })
  }


  useEffect(() => {
    fetchCourses()
  }, [])



  return (
    <div className='userHome'>
    
      <Topsuggestion />
      <Hero />
      <Box>
        {showCourses.map((row,key) => (
          <div className='enrolledCards'>
            <div className="left">
              <img src="" alt="" />
            </div>
            <div className="right">
              <div className="details">
                <span className="courseName">{row.courseTitle}</span>
                <h3 className="lectureName">{row.courseDesc}</h3>
              </div>
              <div className="type">
                <span>{row.instructorId.instructorName}</span>
                <span>dvdfsv</span>
              </div>
            </div>
          </div>
        ))}
      </Box>
      <Enrolledsuggestion />
      <Suggestion title="Because you viewed games" />
      <Suggestion title="Because searched PSC" />
      <Suggestion title="Recommended for you" />
      <Footer />
    </div>
  )
}

export default Home