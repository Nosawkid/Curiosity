import React, { useEffect, useState } from 'react'
import './myprofile.scss'
import Chart from '../../components/chart/Chart'
import axios from 'axios'
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Typography } from '@mui/material';
import Placeholder from '../../components/placeholder/Placeholder';






const Myprofile = () => {


  const Id = sessionStorage.getItem("Iid")
  const [instructorData,setInstructorData] = useState([])
  const [instructorCourses,setInstructorCourses] = useState([])

  const fetchCourses = ()=>{
    axios.get("http://localhost:5000/CourseFromIns/"+Id).then((res)=>{
      setInstructorCourses(res.data)
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  useEffect(()=>{
 
    axios.get("http://localhost:5000/Instructor/"+Id).then((res)=>{
      setInstructorData(res.data)
    })

    fetchCourses()
  },[])
  return (
    <div className='myProfileInstructor'>
        <div className="singleContainer">
        <div className="top">
          <div className="left">
         
            <h1 className="title">Information</h1>
            <div className="item">
            {instructorData.instructorPhoto ? <img className='itemImg' src={instructorData.instructorPhoto} alt="profile" /> :
                 <Placeholder className='itemImg'  username={instructorData.instructorName}/> }
              <div className="details">
                <h1 className="itemTitle">{instructorData.instructorName}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Desc: </span>
                  <span className="itemValue">{instructorData.instructorHeadLine}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Qualification: </span>
                  <span className="itemValue">{instructorData.instructorQualification}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Field of Experience: </span>
                  <span className="itemValue">{instructorData.instructorField}</span>
                </div>
            
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title={"Instructor Revenue"}/>
          </div>
        </div>
        <div className="bottom">
        <Card>
              <CardContent>
                <Typography sx={{fontWeight:"bold"}}>My Courses</Typography>
                <Box sx={{mt:3,display:"flex",alignItems:"center",gap:"20px"}}>
                  {instructorCourses.map((row,key)=>(
                    <Card>
                      <CardContent>
                        <Typography>{row.courseTitle}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>    
    </div>
    </div>
    </div>
  )
}

export default Myprofile