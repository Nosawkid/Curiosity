import React, { useEffect, useState } from 'react'
import './profile.scss'
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Placeholder from '../../components/placeholder/Placeholder';


const Profile = () => {

  const uid = sessionStorage.getItem("Uid")
  const [showProfile, setShowProfile] = useState([])
  const [links, setLinks] = useState(null)

  const fetchProfile = () => {
    axios.get("http://localhost:5000/User/" + uid).then((res) => {
      setShowProfile(res.data)
    })
  }


  const fetchLinks = () => {
    axios.get("http://localhost:5000/Link/" + uid).then((res) => {
      setLinks(res.data)
    })
  }




  useEffect(() => {
    fetchProfile()
    fetchLinks()
  }, [])

  return (
    <div className='userProfile'>

      <Stack sx={{ p: 1 }} className='profileContainer' direction={"row"} spacing={1}>
        <Box sx={{ width: '17vw' }} className="left">
          <Stack direction={"column"}>
            <Card sx={{ width: 250, display: "flex", justifyContent: "center" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px", height: "300px", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} variant='h3'>Personal Details</Typography>
                {showProfile.userPhoto ? <img style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} src={showProfile.userPhoto} alt="profile" /> :
                 <Placeholder   username={showProfile.userName}/> }
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{showProfile.userName}</Typography>
                <Link to={"/user/settings"}>
                  <Button variant='outlined'>Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, mt: 2 }}>
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
        <Box sx={{ width: "83vw" }} className="right">
          <Box className="rightTop">
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography sx={{ fontWeight: "bold" }} variant='p'>User Bio</Typography>
                <Typography sx={{ mt: 1,fontSize:"20px" }}>{showProfile.userBiography}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "500px", margin: "30px auto" }}>
              <CardContent>
                <Typography variant='h3' sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Visit me on my social media</Typography>
                <Stack direction={"row"} spacing={3} sx={{ alignItems: "center", justifyContent: "center", mt: 4 }}>
                  <a target='_blank' rel='noreferrer' href={links && "http://" + links.facebookLink} style={{ textDecoration: "none", color: "black" }}><FacebookIcon /></a>
                  <a target='_blank' rel='noreferrer' href={links && "http://" + links.twitterLink} style={{ textDecoration: "none", color: "black" }}><XIcon /></a>
                  <a target='_blank' rel='noreferrer' href={links && "http://" + links.instagramLink} style={{ textDecoration: "none", color: "black" }}><InstagramIcon /></a>
                  <a target='_blank' rel='noreferrer' href={links && "http://" + links.linkedInLink} style={{ textDecoration: "none", color: "black" }}>     <LinkedInIcon /></a>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Stack>

    </div>
  )
}

export default Profile