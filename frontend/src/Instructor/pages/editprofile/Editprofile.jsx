import React, { useEffect, useState } from 'react'
import './editprofile.scss'
import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Editprofile = () => {

  const [instructorDetails, setInstructorDetails] = useState([])
  const [instructorName, setInstructorName] = useState(instructorDetails.instructorName)
  const [instructorField, setInstructorField] = useState(instructorDetails.instructorField)
  const [instructorEmail, setInstructorEmail] = useState(instructorDetails.instructorEmail)
  const [instructorHeadLine, setInstructorDesc] = useState(instructorDetails.instructorHeadLine)
  const [instructorQualification, setInstructorQualification] = useState(instructorDetails.instructorQualification)
  const [isEditing, setIsEditing] = useState(false)
  const Id = sessionStorage.getItem("Iid")

  const fetchDetails = () => {
    axios.get("http://localhost:5000/Instructor/" + Id).then((res) => {
      setInstructorDetails(res.data)
    })
  }

  const enableSubmit = () => {
    setIsEditing(!isEditing)
  }

  const updateInfo = (e) => {
    e.preventDefault()
    axios.patch("http://localhost:5000/Instructor/" + Id + "/edit", { instructorName, instructorEmail, instructorHeadLine, instructorQualification, instructorField }).then((res) => {
      setIsEditing(false)
      alert("Details Updated")
    }).catch((err) => {
      console.log(err.message)
    })
  }


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <div className='instructorAccountSettings'>
      <Box className="container">
        <Typography component={"h2"} variant='h2' sx={{ fontSize: "30px", fontWeight: "bold", mt: 2, textAlign: "center" }}>Account Settings</Typography>
        

        <Stack onSubmit={updateInfo} component={"form"} className='formContainer' sx={{ mt: 3 }} direction={"column"} >
          <Typography variant='p' sx={{ fontSize: "25px" }}>Account Information</Typography>
          <p>These settings include basic information about your account.</p>

          <Stack direction={"column"} spacing={3} sx={{ mt: 3 }}>
            <Box>
              <Typography className='detailName'>Profile Picture</Typography>
              <img className='profilePic' src={instructorDetails.instructorPhoto || "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/06/17/16870061670094.jpg"} alt="" />
              <Button
              sx={{mt:2}}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput disabled={!isEditing} type="file" />
              </Button>
              <Typography className='info'>Your profile picture is used to identify you.</Typography>
            </Box>
            <Box>
              <Typography className='detailName'>Name</Typography>
              <input
                onChange={(e) => setInstructorName(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Name' defaultValue={instructorDetails.instructorName} />
              <Typography className='info'>The name that is used for ID verification and that appears on your certificates.</Typography>
            </Box>
            <Box>
              <Typography className='detailName'>Email Address</Typography>
              <input
                onChange={(e) => setInstructorEmail(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Email' defaultValue={instructorDetails.instructorEmail} />
              <Typography className='info'>This mail id is used for your authentication and verification.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Description</Typography>
              <textarea
                onChange={(e) => setInstructorDesc(e.target.value)}
                disabled={!isEditing}
                className='updateInput descInput' placeholder='Description' defaultValue={instructorDetails.instructorHeadLine}>

              </textarea>
              <Typography className='info'>A brief Description about yourself for students to get to know you better.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Qualification</Typography>
              <input
                onChange={(e) => setInstructorQualification(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Qualification' defaultValue={instructorDetails.instructorQualification} />
              <Typography className='info'>Your highest qualification.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Field of Expertise</Typography>
              <input
                onChange={(e) => setInstructorField(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Field' defaultValue={instructorDetails.instructorField} />
              <Typography className='info'>Your area of expertise.</Typography>
            </Box>

          </Stack>
          <Stack direction={"row"} spacing={4} sx={{ mt: 3 }}>
            <Button id='edit' onClick={enableSubmit} variant='contained' type='button'>{isEditing ? "Cancel" : "Edit"}</Button>
            {isEditing && <Button id='submit' variant='contained' type='submit'>Submit</Button>}
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

export default Editprofile