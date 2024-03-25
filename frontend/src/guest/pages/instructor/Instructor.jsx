import React, { useState } from 'react'
import { Box, Button, Card, CardContent, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../Components/Navbar';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




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
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPassVisible, setConfirmPassVisible] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [contactError, setContactError] = useState("")
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [instructorSecurityQuestion, setinstructorSecurityQuestion] = useState("");
    const [instructorSecurityAnswer, setinstructorSecurityAnswer] = useState("");
    // Function to add send data to database
    const registerInstructor = (e) => {
        e.preventDefault()
        if (contactError) {
            setOpen(true)
            setMessage("Enter a valid contact number")
            setSeverity("error")
            return
        }

        if (passwordError) {
            setOpen(true)
            setMessage("Enter a strong password")
            setSeverity("error")
            return
        }

        if(!instructorSecurityAnswer)
        {
            setOpen(true)
            setMessage("Please provide a security answer")
            setSeverity("error")
            return
        }
        if (instructorPassword === confirmPassword) {

            const frm = new FormData()
            frm.append("instructorName", firstName + " " + lastName)
            frm.append("instructorEmail", instructorEmail)
            frm.append("instructorPassword", instructorPassword)
            frm.append("instructorContact", instructorContact)
            frm.append("instructorProof", instructorProof)
            frm.append("instructorQualification", instructorQualification)
            frm.append("instructorField", instructorField)
            frm.append("instructorSecurityQuestion", instructorSecurityQuestion)
            frm.append("instructorSecurityAnswer", instructorSecurityAnswer)


            axios.post("http://localhost:5000/Instructor", frm).then((res) => {
                console.log(res.data)
                navigate("/login")

            }).catch((err) => {
                console.log(err.message)
            })
        }
        else {
            setOpen(true)
            setMessage("Password Mismatch")
            setSeverity("error")
        }

    }


    const validateContact = () => {
        const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
        if (!indianPhoneNumberRegex.test(instructorContact)) {
            setContactError("Please enter a valid  contact number");
        } else {
            setContactError("");
        }
    };


    const passShow = () => {
        setPasswordVisible(!passwordVisible)
    }

    const confirmPassShow = () => {
        setConfirmPassVisible(!confirmPassVisible)
    }

    const validatePassword = () => {
        if (instructorPassword.length < 8) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };




    return (
        <div className='instructor' id='ins'>
            <Navbar />
            <Box sx={{mt:2, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "100vh" }} component={'form'} onSubmit={registerInstructor}>
                <Card sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <AccountCircleIcon sx={{ fontSize: "75px" }} />
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
                            Instructor Registration
                            <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    <TextField required onChange={(e) => setFirstName(e.target.value)} id='firstName' label="First Name" variant='standard' />
                                    <TextField required onChange={(e) => setLastName(e.target.value)} id='lastName' label="Last Name" variant='standard' />
                                </Stack>
                                <TextField required onChange={(e) => setInstructorEmail(e.target.value)} type='email' id='email' label="Email" variant='standard' />
                                <Stack>
                                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-contact">Contact</InputLabel>
                                        <Input
                                        required
                                            error={!!contactError}
                                            onBlur={validateContact}
                                            onChange={(e) => setInstructorContact(e.target.value)}
                                            id="standard-adornment-contact"
                                            type='text'
                                            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                        />
                                        <FormHelperText error={!!contactError && contactError}>{contactError}</FormHelperText>
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }} spacing={3}>
                                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input 
                                        required
                                            fullWidth
                                            onChange={(e) => {
                                                setInstructorPassword(e.target.value)

                                            }}
                                            onBlur={validatePassword}
                                            id="standard-adornment-password"
                                            type={passwordVisible ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={passShow}

                                                    >
                                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {passwordError && <FormHelperText error={!!passwordError && passwordError}>Password isn't strong enough</FormHelperText>}

                                    </FormControl>
                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }} spacing={3}>
                                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                        <Input
                                        required
                                            fullWidth
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)

                                            }}

                                            id="standard-adornment-password"
                                            type={confirmPassVisible ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={confirmPassShow}

                                                    >
                                                        {confirmPassVisible ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />


                                    </FormControl>
                                </Stack>
                                <TextField  onChange={(e) => setInstructorQualification(e.target.value)} type='text' id='qualification' label="Qualification" variant='standard' />
                                <TextField  onChange={(e) => setInstructorField(e.target.value)} type='text' id='field' label="Field of expertise" variant='standard' />
                                <Stack direction="column" spacing={1} sx={{ pt: 2, pb: 2 }} >
                                    <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                        <Typography component="span">Upload Id proof:</Typography>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput required onChange={(e) => setInstructorProof(e.target.files[0])} type="file" />
                                        </Button>
                                    </Box>
                                    <Box sx={{ minWidth: 120 }}>
                                    <FormControl variant='standard' fullWidth>
                                        <InputLabel id="demo-simple-select-label">Choose a security question</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={instructorSecurityQuestion}
                                            label="Choose a security question"
                                            onChange={(e)=>setinstructorSecurityQuestion(e.target.value)}
                                        >
                                            <MenuItem value={"In what city were you born?"}>In what city were you born?</MenuItem>
                                            <MenuItem value={"What is your favorite book?"}>What is your favorite book?</MenuItem>
                                            <MenuItem value={"What is the name of the first company you worked for?"}>What is the name of the first company you worked for?</MenuItem>
                                            <MenuItem value={"What is your favorite sports team?"}>What is your favorite sports team?</MenuItem>
                                            <MenuItem value={"What is the name of the elementary school you attended?"}>What is the name of the elementary school you attended?</MenuItem>
                                            </Select>
                                    </FormControl>
                                    <TextField
                                    onChange={(e)=>setinstructorSecurityAnswer(e.target.value)}
                                    fullWidth sx={{mt:4}} required variant='standard' placeholder='Answer'></TextField>
                                </Box>
                                </Stack>
                                <Button type='submit' variant='contained'>Submit</Button>
                            </Stack>
                        </Typography>
                    </CardContent>
                </Card>
                <Stack>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>
        </div>
    )
}

export default Instructor