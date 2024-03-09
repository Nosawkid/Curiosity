import React, { useEffect, useState } from 'react'
import './course.scss'
import WorkIcon from '@mui/icons-material/Work';
import { Alert, Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { Server } from '../../../Server.js'
import Skeleton from '@mui/material/Skeleton';
import moment from "moment"


const Course = () => {

  const jid = sessionStorage.getItem("Jid")
  const [jobs, setJobs] = useState([])
  const [time,setTime] = useState("")

  const fetchJobs = () => {
    axios.get(`${Server}/Vacancy/${jid}`).then((res) => {
      setJobs(res.data)
    }).catch((err) => {
      console.log(err.data);
    })
  }

  // const getTime = (pastDate)=>{
  //   const currDate = new Date()
  //   const timeDiff = currDate.getTime() - pastDate.getTime()
  //   return timeDiff
  // }

 
  
const getDuration = (date) => {
  const postDate = moment(date);

  // Current time
  const currentTime = moment();

  // Calculate the difference between the current date and the post date
  const duration = moment.duration(currentTime.diff(postDate));

  // Get the time difference in seconds, minutes, hours, days, and weeks
  const secondsAgo = Math.floor(duration.asSeconds());
  const minutesAgo = Math.floor(duration.asMinutes());
  const hoursAgo = Math.floor(duration.asHours());
  const daysAgo = Math.floor(duration.asDays());
  const weeksAgo = Math.floor(duration.asWeeks());

  // Define the output message based on the time difference
  let output;
  if (secondsAgo < 60) {
    output = secondsAgo + ' seconds ago';
  } else if (minutesAgo < 60) {
    output = minutesAgo + ' minutes ago';
  } else if (hoursAgo < 24) {
    output = hoursAgo + ' hours ago';
  } else if (daysAgo < 7) {
    output = daysAgo + ' days ago';
  } else {
    output = weeksAgo + ' weeks ago';
  }

  return output;
}
  useEffect(() => {
    fetchJobs()
  },[])





  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "40px" }}>My Vacancies</Typography>

      <Stack direction={"column"} sx={{ alignItems: "center", gap: "20px", justifyContent: "center", mt: 2, flexWrap: "wrap" }} >
        {
          jobs.map((row, key) => (
            <Card sx={{width:"100%",height:"150px"}}>
              <CardContent>
                <Stack direction={"row"} sx={{alignItems:"center",justifyContent:"space-between",height:"140px"}}>
                  <Typography>Job Title: <span style={{fontWeight:"bold"}}>{row.vacancyTitle}</span></Typography>
                  {/* <Typography>Posted: <span style={{fontWeight:"bold"}}>{moment(row.vacancyDate, "YYYYMMDD").fromNow() }</span></Typography> */}
                  <Typography>Requirement: <span style={{fontWeight:"bold"}}>{row.vacancyRequirement}</span></Typography>
                  <Stack direction={"row"} spacing={1} >
                  <Typography>Min Salary: <span style={{fontWeight:"bold"}}>{row.minSalary}</span></Typography>
                  <Typography>Max Salary: <span style={{fontWeight:"bold"}}>{row.maxSalary}</span></Typography>
                  </Stack>
                 <Stack  direction={"row"} sx={{alignItems:"center",width:"250px"}} spacing={1}>
                 <Button variant='contained'>View</Button>
                 <Button variant='contained' color='error'>Delete</Button>
                 <Button variant='outlined'color='error'>Expire</Button>
                 </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        }
      </Stack>
    </Box>

  )
}

export default Course