import React, { useEffect, useState } from 'react'
import './course.scss'
import WorkIcon from '@mui/icons-material/Work';
import { Alert, Avatar, Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { Server } from '../../../Server.js'
import Skeleton from '@mui/material/Skeleton';


const Course = () => {

  const jid = sessionStorage.getItem("Jid")
  const [jobs, setJobs] = useState([])
  

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




  useEffect(() => {
    fetchJobs()
  })


 


  return (
    <Box  sx={{ p: 3 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "40px" }}>My Vacancies</Typography>

      <Stack direction={"row"} sx={{alignItems:"center",gap:"20px",justifyContent:"center",mt:2,flexWrap:"wrap"}} >
        {
          jobs.map((row, key) => (
            <Box sx={{ backgroundColor: "#07beb8", width: "300px", height: "200px", borderRadius: "10px", color: "white", p: 2 }}>
              <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-around" }}>
                <Stack direction={"row"} sx={{ alignItems: "center", gap: "10px" }}>
                  <Avatar alt='Avatar'></Avatar>
                  <Stack>
                    <Typography sx={{ fontWeight: "bold", fontSize: "17px" }}>{row.vacancyTitle}</Typography>
                    {/* <Typography sx={{ fontSize: "13px", color: "gray", fontWeight: "bold" }}>{getTime(row.vacancyDate)}</Typography> */}
                  </Stack>
                </Stack>
              </Stack>
              <Typography sx={{ textAlign: "center", mt: 2, fontWeight: "bold", fontSize: "20px" }}>Designation</Typography>
              <Stack direction={"row"} sx={{ alignItems: "center", gap: "20px", justifyContent: "center", mt: 2 }}>
                <WorkIcon />
                <Typography>Full-Time</Typography>
              </Stack>
            </Box>
          ))
        }
      </Stack>
    </Box>

  )
}

export default Course