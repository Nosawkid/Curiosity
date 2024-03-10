import React, { useEffect, useState } from 'react'
import './single.scss'
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Server } from '../../../Server.js';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';



const Single = () => {
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState("")
  const { appId } = useParams()

  const fetchApplication = () => {
    axios.get(`${Server}/Application/${appId}/userApplication`).then((res) => {
      setCandidate(res.data)
    })
  }

  const shortListCandidate = ()=>{
   axios.patch(`${Server}/Shortlist/${appId}`).then((res)=>{
    console.log(res.data.message)
    navigate("/HiringPortal/Applications/"+candidate.jobVacancyId)
   }).catch((err)=>{
    console.log(err.message)
   })
  }

  const rejectCandiate = ()=>{
    axios.patch(`${Server}/Reject/${appId}`).then((res)=>{
      console.log(res.data.message)
      navigate("/HiringPortal/Applications/"+candidate.jobVacancyId)
    }).catch((err)=>{
      console.log(err.message)
    })
  }


  useEffect(() => {
    fetchApplication()
  }, [])


  return (
    <div className='singleApplication'>
      {
        candidate && <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>Applicant Details</Typography>
        <Card sx={{mt:2}}>
          <CardContent>
            <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", px: 10 }}>
              <CardMedia
                component={"img"}
                image={candidate.userId.userPhoto}
                sx={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "50%", border: "10px solid #e9ecef" }}
              >

              </CardMedia>
              <Box>
                <Typography sx={{ fontSize: "20px", color: "gray" }}>{candidate.userId.userHeadLine}</Typography>
                <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{candidate.userId.userName}</Typography>
                <Typography sx={{ fontSize: "12px", color: "gray" }}> {candidate.userId.userBiography} </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ mt: 2 }}>
                  <Button onClick={shortListCandidate} color='success' variant='contained'>Shortlist Candidate</Button>
                  <Button onClick={rejectCandiate} color='error' variant='contained'>Reject Candidate</Button>
                </Stack>
              </Box>

            </Stack>
            <Stack sx={{ p: 3, justifyContent: "space-evenly" }} direction={"row"} >
              <Box>
                <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "20px" }}>Qualifications</Typography>
                <Divider />
                <List>
                  {
                    candidate && candidate.qualifications.map((row, key) => (
                      <ListItem key={key}>
                        <ListItemText primary={row}></ListItemText>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
              <Box>
                <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "20px" }}>Experience</Typography>
                <Divider />
                <List>
                  {
                    candidate && candidate.experience.map((row, key) => (
                      <ListItem key={key}>
                        <ListItemText primary={row}></ListItemText>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
              <Box>
                <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "20px" }}>Skills</Typography>
                <Divider />
                <List>
                  {
                    candidate.skills.map((row,key)=>(
                      <ListItem key={key}>
                        <ListItemText primary={row}></ListItemText>
                      </ListItem>
                    ))
                  }
                </List>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      }
    </div>
  )
}

export default Single