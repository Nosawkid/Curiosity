import React, { useEffect, useState } from 'react'
import './profile.scss'
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Profile = () => {

  const uid = sessionStorage.getItem("Uid")
  const [showProfile,setShowProfile] = useState([])

  const fetchProfile = ()=>{
    axios.get("http://localhost:5000/User/"+uid).then((res)=>{
      setShowProfile(res.data)
    })
  }


  useEffect(()=>{
    fetchProfile()
  },[])

  return (
    <div className='userProfile'>

      <Stack sx={{ p:1 }} className='profileContainer' direction={"row"} spacing={1}>
        <Box sx={{ width: '17vw'}} className="left">
          <Stack  direction={"column"}>
            <Card sx={{ width: 250, display: "flex", justifyContent: "center" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px", height: "300px",justifyContent:"center",alignItems:"center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} variant='h3'>Personal Details</Typography>
                <img style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} src={showProfile.userPhoto} alt="profile" />
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{showProfile.userName}</Typography>
                <Link to={"/user/settings"}>
                  <Button variant='outlined'>Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>
            <Card sx={{ width:250, mt: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: "17px", fontWeight: "bold", textAlign: "left" }} variant='p'>Head Line</Typography>
                <Stack direction={"row"} sx={{ alignItems: "center", mt: 2, justifyContent: "space-around" }}>
                  <PersonIcon />
                  <Typography variant='p' sx={{ fontSize: "15px", fontWeight: "bold", textAlign: "center", color: "gray" }}>{showProfile.userHeadLine}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        <Box sx={{width:"83vw"}} className="right">
           <Box className="rightTop">
            <Card sx={{width:"100%"}}>
              <CardContent>
                <Typography variant='p'>User Bio:</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Stack>

    </div>
  )
}

export default Profile