import React, { useState } from 'react'
import { Box, Button, Card, CardContent, FormLabel, Stack, TextField, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, InputAdornment, Input } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
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


const Hirer = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [jobPortalEmail, setJobPortalEmail] = useState("")
    const [jobPortalContact, setJobPortalContact] = useState("")
    const [jobPortalPassword, setJobPortalPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [jobPortalCompanyName, setJobPortalCompanyName] = useState("")
    const [jobPortalIdType, setJobPortalIdType] = useState("")
    const [jobPortalProof, setJobPortalProof] = useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message,setMessage] = useState("")
    const [severity,setSeverity] = useState("")
   
    

    const registerPortal = (e) => {
        e.preventDefault()
        if (jobPortalPassword === cPassword) {
            const frm = new FormData()
            frm.append("jobPortalName", firstName + " " + lastName)
            frm.append("jobPortalEmail", jobPortalEmail)
            frm.append("jobPortalPassword", jobPortalPassword)
            frm.append("jobPortalContact", jobPortalContact)
            frm.append("jobPortalCompanyName", jobPortalCompanyName)
            frm.append("jobPortalIdType", jobPortalIdType)
            frm.append("jobPortalProof", jobPortalProof)
            axios.post("http://localhost:5000/Jobportal", frm).then((res) => {
                if (res.data.status) {
                    setSeverity("success")
                    setOpen(true)
                    setMessage(res.data.message)
                    setTimeout(()=>{
                        navigate("/guest")
                    },2000)
                }
                else
                {
                    setSeverity("error")
                    setOpen(res.data.message)
                    setOpen(true)
                
                }
               
            }).catch((err) => {
                setSeverity("error")
                setOpen(err.message)
                setOpen(true)
            
            })
        }
        else {
            alert("Password Mismatch")
        }
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordC = () => setShowConfirm((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };




    return (
        <div className='hirer'>
            <Navbar />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "50vh", mt: 3 }}>
                <Card sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <AccountCircleIcon sx={{ fontSize: "75px" }} />
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
                            Hirer Registration
                            <Stack onSubmit={registerPortal} component="form" direction="column" spacing={2} sx={{ mt: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    <TextField onChange={(e) => setFirstName(e.target.value)} id='firstName' label="First Name" variant='standard' />
                                    <TextField onChange={(e) => setLastName(e.target.value)} id='lastName' label="Last Name" variant='standard' />
                                </Stack>
                                <TextField onChange={(e) => setJobPortalEmail(e.target.value)} type='email' id='email' label="Email" variant='standard' />
                                <TextField onChange={(e) => setJobPortalCompanyName(e.target.value)} type='text' id='companyName' label="Company Name" variant='standard' />
                                <TextField onChange={(e) => setJobPortalContact(e.target.value)} type='contact' id='contact' label="Contact" variant='standard' />
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input

                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setJobPortalPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                    <Input

                                        id="standard-adornment-password"
                                        type={showConfirm ? 'text' : 'password'}
                                        onChange={(e) => setCPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordC}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <Stack direction="column" spacing={1} sx={{ pt: 2, pb: 2 }} >

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">ID Type</InputLabel>
                                            <Select
                                                onChange={(e) => setJobPortalIdType(e.target.value)}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                label="ID Type"

                                            >
                                                <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                                                <MenuItem value={"Voter Id"}>Voter ID</MenuItem>
                                                <MenuItem value={"Pan Card"}>Pan Card</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <FormLabel sx={{ textAlign: "left", mt: 5 }}>Upload ID Photo</FormLabel>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput onChange={(e) => setJobPortalProof(e.target.files[0])} type="file" />
                                    </Button>
                                </Stack>
                                <Button type='submit' variant='contained'>Submit</Button>
                            </Stack>
                        </Typography>
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
                    </CardContent>
                </Card>
            </Box>
            <Footer />
        </div>
    )
}

export default Hirer