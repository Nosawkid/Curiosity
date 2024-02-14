import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbar/Navbar';
import { styled } from '@mui/material/styles';
import Footer from '../../components/footer/Footer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';




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


const Instructor = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [instructorEmail, setInstructorEmail] = useState('')
    const [instructorPassword, setInstructorPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [instructorContact, setInstructorContact] = useState('')
    const [instructorProof, setInstructorProof] = useState('')
    const [instructorQualification, setInstructorQualification] = useState('')
    const [instructorField, setInstructorField] = useState('')
    const [passwordVisible,setPasswordVisible] = useState(false)
    const [confirmPassVisible, setConfirmPassVisible] = useState(false)

    // Function to add send data to database
    const registerInstructor = (e) => {
        e.preventDefault()
        if (instructorPassword === confirmPassword) {

            const frm = new FormData()
            frm.append("instructorName", firstName + " " + lastName)
            frm.append("instructorEmail", instructorEmail)
            frm.append("instructorPassword", instructorPassword)
            frm.append("instructorContact", instructorContact)
            frm.append("instructorProof", instructorProof)
            frm.append("instructorQualification", instructorQualification)
            frm.append("instructorField", instructorField)


            axios.post("http://localhost:5000/Instructor", frm).then((res) => {
                console.log(res.data)
                navigate("/guest/")
             
            }).catch((err) => {
                console.log(err.message)
            })
        }
        else {
            alert("Password Mismatch")
        }

    }

    
    const passShow = ()=>{
        setPasswordVisible(!passwordVisible)
    }

    const confirmPassShow = ()=>{
        setConfirmPassVisible(!confirmPassVisible)
    }






    return (
        <div className='instructor'>
            <Navbar />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "100vh" }} component={'form'} onSubmit={registerInstructor}>
                <Card sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <AccountCircleIcon sx={{ fontSize: "75px" }} />
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
                            Instructor Registration
                            <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    <TextField onChange={(e) => setFirstName(e.target.value)} id='firstName' label="First Name" variant='standard' />
                                    <TextField onChange={(e) => setLastName(e.target.value)} id='lastName' label="Last Name" variant='standard' />
                                </Stack>
                                <TextField onChange={(e) => setInstructorEmail(e.target.value)} type='email' id='email' label="Email" variant='standard' />
                                <TextField onChange={(e) => setInstructorContact(e.target.value)} type='text' id='contact' label="Contact" variant='standard' />
                                <Stack direction="row" sx={{display:"flex",alignItems:"center"}} spacing={3}>
                                    <TextField onChange={(e) => setInstructorPassword(e.target.value)} type={passwordVisible?"text":"password"} id='password' label="Password" variant='standard' />
                                    <Button onClick={passShow} variant='text' sx={{fontSize:"10px"}}>Show Password</Button>
                                </Stack>
                                <Stack direction={"row"} sx={{display:"flex",alignItems:"center"}} spacing={3}>
                                    <TextField onChange={(e) => setConfirmPassword(e.target.value)} type={confirmPassVisible ? "text" :"password"} id='password' label="Confirm password" variant='standard' />
                                    <Button onClick={confirmPassShow} variant='text' sx={{fontSize:"10px"}}>Show Password</Button>
                                </Stack>
                                <TextField onChange={(e) => setInstructorQualification(e.target.value)} type='text' id='qualification' label="Qualification" variant='standard' />
                                <TextField onChange={(e) => setInstructorField(e.target.value)} type='text' id='field' label="Field of expertise" variant='standard' />
                                <Stack direction="column" spacing={1} sx={{ pt: 2, pb: 2 }} >
                                    <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                        <Typography component="span">Upload Id proof:</Typography>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput onChange={(e) => setInstructorProof(e.target.files[0])} type="file" />
                                        </Button>
                                    </Box>
                                </Stack>
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

export default Instructor