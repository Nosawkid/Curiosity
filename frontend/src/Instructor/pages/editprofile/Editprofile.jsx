import React, { useEffect, useState } from 'react'
import './editprofile.scss'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';

const Editprofile = () => {

  const [instructorDetails,setInstructorDetails] = useState([])
  const [instructorName,setInstructorName] = useState('')
  const [instructorField,setInstructorField] = useState('')
  const [isEditing,setIsEditing] = useState(false)
  const Id = sessionStorage.getItem("Iid")

  const fetchDetails = ()=>{
    axios.get("http://localhost:5000/Instructor/"+Id).then((res)=>{
      setInstructorDetails(res.data)
    })
  }

  const enableSubmit = ()=>{
    setIsEditing(!isEditing)
  }

  const updateInfo = (e)=>{
      e.preventDefault()
      axios.patch("http://localhost:5000/Instructor/"+Id+"/edit",{instructorName,instructorField}).then((res)=>{
         setIsEditing(false)
         alert("Details Updated")
      }).catch((err)=>{
        console.log(err.message)
      })
  }

  
 
  useEffect(()=>{
    fetchDetails()
  },[])

  return (
    <div className='instructorAccountSettings'>
        <Box className="container">
            <Typography component={"h2"} variant='h2' sx={{fontSize:"30px",fontWeight:"bold",mt:2,textAlign:"center"}}>Account Settings</Typography>
            <hr />

            <Stack onSubmit={updateInfo} component={"form"} className='formContainer' sx={{mt:3}} direction={"column"} >
                <Typography variant='p' sx={{fontSize:"25px"}}>Account Information</Typography>
                <p>These settings include basic information about your account.</p>

                <Stack direction={"column"} spacing={3}>
                    <Box>
                        <Typography className='detailName'>Name</Typography>
                        <TextField
                        disabled = {!isEditing}
                         className='updateInput' placeholder='Name' value={instructorDetails.instructorName}></TextField>
                        <Typography>The name that is used for ID verification and that appears on your certificates.</Typography>
                    </Box>
                    <Box>
                        <Typography className='detailName'>Email Address</Typography>
                        <TextField
                         disabled = {!isEditing}
                         className='updateInput' placeholder='Email' value={instructorDetails.instructorEmail}></TextField>
                        <Typography>This mail id is used for your authentication and verification.</Typography>
                    </Box>

                    <Box>
                        <Typography className='detailName'>Description</Typography>
                        <TextField
                         disabled = {!isEditing}
                        className='updateInput' placeholder='Description' multiline minRows={3} value={instructorDetails.instructorHeadLine}></TextField>
                        <Typography>A brief Description about yourself for students to get to know you better.</Typography>
                    </Box>

                    <Box>
                        <Typography className='detailName'>Qualification</Typography>
                        <TextField
                         disabled = {!isEditing}
                        className='updateInput' placeholder='Qualification' value={instructorDetails.instructorQualification}></TextField>
                        <Typography>Your highest qualification.</Typography>
                    </Box>

                    <Box>
                        <Typography className='detailName'>Field of Expertise</Typography>
                        <TextField
                         disabled = {!isEditing}
                        className='updateInput' placeholder='Field' value={instructorDetails.instructorField}></TextField>
                        <Typography>Your area of expertise.</Typography>
                    </Box>
                    
                </Stack>
                <Stack direction={"row"} spacing={4} sx={{mt:3}}>
                <Button id='edit' onClick={enableSubmit} variant='contained' type='button'>{isEditing ? "Cancel" : "Edit"}</Button>
                {isEditing && <Button  id='submit' variant='contained' type='submit'>Submit</Button> }
                </Stack>
            </Stack>
        </Box>
    </div>
  )
}

export default Editprofile