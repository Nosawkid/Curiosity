import React from 'react'
import './landing.scss'
import { Box, Button, CardMedia, Stack, Typography } from '@mui/material'
import {useNavigate} from "react-router-dom"
import Logo from '../../../assets/LogoOg.png'



const Landing = () => {
  const navigate = useNavigate()

  const login = ()=>{
    navigate("/guest")
  }



  return (
    <div className='webLanding'>
      <Box className="topMost"></Box>
      <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }} className='navbar'>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <CardMedia
            component={"img"}
            image={Logo}
            sx={{width:100}}
          ></CardMedia>
          <ul className='headerNav' style={{alignSelf:"flex-end"}}>
            <li><a style={{textTransform:"uppercase"}} href="#about">Join Us</a></li>
            <li><a style={{textTransform:"uppercase"}} href="#">Our Vision</a></li>
          </ul>
        </Stack>
        <Stack direction={"row"} spacing={1} className='logreg'>
          <Button className='btnPrimary' onClick={login} variant='contained'>Login</Button>
          <Button className='btnSecondary' variant='outlined'>Register</Button>
        </Stack>
      </Stack>
      <section className='heroSection'>
        <Stack sx={{ width: "45%" }} direction={"column"}>
          <Typography sx={{ fontSize: "50px", lineHeight: 1.5,fontWeight:"bold" }} variant='h1'>Discover, Learn, Succeed: Curiosity's Path to Career Excellence</Typography>
          <Typography sx={{ mt: 2, lineHeight: 1.5 }} variant='p'>Curiosity offers a dynamic blend of online courses and career opportunities. <br /> Explore new skills and propel your professional journey forward with us.</Typography>
          <Stack spacing={1} direction={"row"} sx={{ alignItems: "center",mt:2 }}>
            <Button onClick={login} className='btnPrimary' variant='contained'>Login</Button>
            <Button className='btnSecondary' variant='outlined'>Register</Button>
          </Stack>
        </Stack>
        <div style={{position:"relative",width:"45%"}}>
        <Stack>
            <img style={{width:"100%",border:"1px solid black",padding:"10px"}} src="https://i0.wp.com/foxutech.com/wp-content/uploads/2020/06/iStock-629285904-1.jpg?ssl=1" alt="heroimg" />
        </Stack>
        <img src="https://www.springboard.com/blog/wp-content/uploads/2023/12/best-free-online-coding-classes.jpeg" alt="second" className="heroSecond" />

        </div>
      </section>
      <section id='about' className="about">
        <Typography sx={{fontWeight:"bold",fontSize:"30px",textAlign:"center",mt:2,color:"#003f88"}}>JOIN US</Typography>
      </section>
    </div>
  )
}

export default Landing