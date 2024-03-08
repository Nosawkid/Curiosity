import React, { useEffect, useState } from 'react'
import './editprofile.scss'
import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Placeholder from '../../components/placeholder/Placeholder';
import {useNavigate} from "react-router-dom"


const Editprofile = () => {
  const navigate = useNavigate()
  const [instructorName, setInstructorName] = useState("")
  const [instructorField, setInstructorField] = useState("")
  const [instructorEmail, setInstructorEmail] = useState("")
  const [instructorHeadLine, setInstructorHeadLine] = useState("")
  const [instructorQualification, setInstructorQualification] = useState("")
  const [photo, setPhoto] = useState("")
  const [instructorPhoto, setInstructorPhoto] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const Id = sessionStorage.getItem("Iid")

  const fetchDetails = () => {
    axios.get("http://localhost:5000/Instructor/" + Id).then((res) => {
      setInstructorName(res.data.instructorName)
      setInstructorField(res.data.instructorField)
      setInstructorEmail(res.data.instructorEmail)
      setInstructorHeadLine(res.data.instructorHeadLine)
      setInstructorQualification(res.data.instructorQualification)
      setInstructorPhoto(res.data.instructorPhoto)
    })
  }

  const enableSubmit = () => {
    setIsEditing(!isEditing)
  }

  const updateInfo = (e) => {
    e.preventDefault()

    const frm = new FormData()
    frm.append("instructorName",instructorName)
    frm.append("instructorEmail",instructorEmail)
    frm.append("instructorHeadLine",instructorHeadLine)
    frm.append("instructorQualification",instructorQualification)
    frm.append("instructorField",instructorField)
    frm.append("instructorPhoto",instructorPhoto)
    axios.patch("http://localhost:5000/Instructor/" + Id + "/edit", frm).then((res) => {
      setIsEditing(false)
      alert("Details Updated")
    }).catch((err) => {
      console.log(err.message)
    })
  }


  const handleFileChange = (e) => {
    setInstructorPhoto(e.target.files[0])
    const url = URL.createObjectURL(e.target.files[0])
    setImgUrl(url)
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
              {
                imgUrl ? (
                  <img src={imgUrl} alt="instructor profile" className='profilePic' />
                ) : (
                  instructorPhoto ? (
                    <img src={instructorPhoto} alt='instructor dp' className='profilePic' />
                  ) : (
                    <Placeholder className='profilePic' username={instructorName} />
                  )
                )
              }
              <Button
                sx={{ mt: 3 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
              <Typography className='info'>Your profile picture is used to identify you.</Typography>
            </Box>
            <Box>
              <Typography className='detailName'>Name</Typography>
              <input
                onChange={(e) => setInstructorName(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Name' defaultValue={instructorName} />
              <Typography className='info'>The name that is used for ID verification and that appears on your certificates.</Typography>
            </Box>
            <Box>
              <Typography className='detailName'>Email Address</Typography>
              <input
                onChange={(e) => setInstructorEmail(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Email' defaultValue={instructorEmail} />
              <Typography className='info'>This mail id is used for your authentication and verification.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Description</Typography>
              <textarea
                onChange={(e) => setInstructorHeadLine(e.target.value)}
                disabled={!isEditing}
                className='updateInput descInput' placeholder='Description' defaultValue={instructorHeadLine}>

              </textarea>
              <Typography className='info'>A brief Description about yourself for students to get to know you better.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Qualification</Typography>
              <input
                onChange={(e) => setInstructorQualification(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Qualification' defaultValue={instructorQualification} />
              <Typography className='info'>Your highest qualification.</Typography>
            </Box>

            <Box>
              <Typography className='detailName'>Field of Expertise</Typography>
              <input
                onChange={(e) => setInstructorField(e.target.value)}
                disabled={!isEditing}
                className='updateInput' placeholder='Field' defaultValue={instructorField} />
              <Typography className='info'>Your area of expertise.</Typography>
            </Box>

          </Stack>
          <Stack direction={"row"} spacing={4} sx={{ mt: 3,alignItems:"center" }}>
            <Button id='edit' onClick={enableSubmit} variant='contained' type='button'>{isEditing ? "Cancel" : "Edit"}</Button>
            {isEditing && <Button id='submit' variant='contained' type='submit'>Submit</Button>}
              <Typography onClick={()=>navigate("/instructor/changepassword")} sx={{color:"#003f88",cursor:"pointer",'&:hover':{textDecoration:"underline"}}}>Change Password</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

export default Editprofile