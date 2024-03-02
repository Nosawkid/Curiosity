import React, { useEffect, useState } from 'react'
import './mylearning.scss'
import { Box, Card, CardContent, Rating, Stack, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Mylearning = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const uid = sessionStorage.getItem("Uid")

  const fetchCourses = () => {
    axios.get("http://localhost:5000/mycourses/" + uid).then((res) => {
      setCourses(res.data)
    }).catch((err) => {
      console.log(err.message);
    })
  }

  const viewCourse = (courseId)=>{
    navigate("/user/viewcourse/"+courseId)
  }


  useEffect(() => {
    fetchCourses()
  }, [])


  return (
    <div style={{ padding: "20px" }} className='mylearning'>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "35px" }}>My Courses</Typography>
      <Box sx={{display:"flex",alignItems:"center",gap:"20px",flexWrap:"nowrap",justifyContent:"center"}}>
      {
        courses && courses.length > 0 ? courses.map((row, key) => (
          <Card  onClick = {() =>viewCourse(row.courseId._id)} className='courseCard' sx={{ width: "300px", height: "350px" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <img style={{ width: "100%", height: "200px", objectFit: "cover" }} src="https://t4.ftcdn.net/jpg/05/99/25/47/360_F_599254718_4hsBO7IvKD8KN9T4Cv8utU37903QzZjA.jpg" alt="Cover" />
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} variant='h3'>{row.courseId.courseTitle}</Typography>
              <Typography sx={{ fontSize: "13px", color: "gray" }} component={"p"} variant='span'>{row.courseId.instructorId.instructorName}</Typography>
              <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} direction={"row"} spacing={1}>
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }} component={"span"} variant='span'>4.6</Typography>
                <Rating sx={{ fontSize: "20px" }} name="read-only" value={3} readOnly />
              </Stack>
              <Stack sx={{ alignItems: "center", justifyContent: "space-between" }} direction={"row"}>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }} component={"p"} variant='h3'>{row.courseId.price}</Typography>
              </Stack>
            </CardContent>
          </Card>
        )):<Typography sx={{mt:5,fontWeight:"bold",fontSize:"30px",color:"gray"}}>No Courses here</Typography>
      }
      </Box>

    </div>
  )
}

export default Mylearning