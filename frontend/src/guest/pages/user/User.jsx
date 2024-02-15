import React, { useState } from 'react'
import { Box, Button, Card, CardContent,  Stack, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';


const User = () => {
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const [showCPassword,setShowCPassword] = useState(false)
    const [firstName,setFirstName] = useState("")
    const [userName,setUserName] = useState("")
    const [lastname,setLastName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userContact,setUserContact] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")


    const togglePassword = ()=>{
        setShowPassword(!showPassword)
    }

    const toggleCPassword = ()=>{
        setShowCPassword(!showCPassword)
    }


    const registerUser = (e)=>{
        e.preventDefault()
        
        if( userPassword && confirmPassword && userPassword === confirmPassword)
        {
           
            // setUserName(firstName + " " + lastname)
            axios.post("http://localhost:5000/User",{userName: firstName + " " + lastname,userEmail,userContact,userPassword}).then((res)=>{
                console.log(res.data)
                navigate("/guest/")
                
            }).catch((err)=>{
                console.log(err.message)
            })

          
        }
        else
        {
            alert("Password Mismatch")
        }
    }


    return (
        <div className='user'>
            <Navbar />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "100vh" }}>
                <Card   sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <AccountCircleIcon sx={{ fontSize: "75px" }} />
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
                            User Registration
                            <Stack onSubmit={registerUser} component="form" direction="column" spacing={2} sx={{ mt: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    <TextField onChange={(e)=>setFirstName(e.target.value)} id='firstName' label="First Name" variant='standard' />
                                    <TextField onChange={(e)=>setLastName(e.target.value)} id='lastName' label="Last Name" variant='standard' />
                                </Stack>
                                <TextField onChange={(e)=>setUserEmail(e.target.value)} type='email' id='email' label="Email" variant='standard' />
                                <TextField onChange={(e)=>setUserContact(e.target.value)} type='text' id='contact' label="Contact" variant='standard' />
                                <Stack direction={"row"}  sx={{display:"flex",alignItems:"center"}}>
                                    <TextField onChange={(e)=>setUserPassword(e.target.value)} sx={{flex:3}} type={!showPassword ? "password" : "text"} id='password' label="Password" variant='standard' />
                                    <Button onClick={togglePassword} variant='text' sx={{fontSize:"10px",alignSelf:"flex-end",flex:1}}>
                                        {!showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </Button>
                                </Stack>
                                <Stack direction={"row"}  sx={{display:"flex",alignItems:"center"}}>
                                    <TextField onChange={(e)=>setConfirmPassword(e.target.value)} sx={{flex:3}} type={!showCPassword ?"password" : "text"} id='cpassword' label="Confirm Password" variant='standard' />
                                    <Button onClick={toggleCPassword} variant='text' sx={{fontSize:"10px",alignSelf:"flex-end",flex:1}}>
                                        {!showCPassword ? <VisibilityIcon/>: <VisibilityOffIcon/>}
                                    </Button>
                                </Stack>
                                {/* <Stack direction="column" spacing={1} sx={{ pt: 2, pb: 2 }} >
                                    <FormLabel sx={{ textAlign: "left", mt: 5 }}>Upload Image</FormLabel>
                                    <TextField type='file' id='userPhoto' variant='standard' />
                                </Stack> */}
                                <Button type='submit' variant='contained'>Submit</Button>
                            </Stack>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
          
            <Footer />
        </div>
    )
}

export default User