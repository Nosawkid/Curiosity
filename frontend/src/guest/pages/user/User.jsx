import React, { useState } from 'react'
import { Box, Button, Card, CardContent, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const User = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)
    const [firstName, setFirstName] = useState("")
    // const [userName,setUserName] = useState("")
    const [lastname, setLastName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userContact, setUserContact] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [contactError, setContactError] = useState("");
    const [passwordError, setPasswordError] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [message,setMessage] = useState("")
    const [severity,setSeverity] = useState("")



    const validatePassword = () => {
        if (userPassword.length < 8) {
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


    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleCPassword = () => {
        setShowCPassword(!showCPassword)
    }


    const validateContact = () => {
        const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
        if (!indianPhoneNumberRegex.test(userContact)) {
            setContactError("Please enter a valid  contact number");
        } else {
            setContactError("");
        }
    };







    const registerUser = (e) => {
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


        // Check if there are any password errors


        if (userPassword && confirmPassword && userPassword === confirmPassword) {

            // setUserName(firstName + " " + lastname)
            axios.post("http://localhost:5000/User", { userName: firstName + " " + lastname, userEmail, userContact, userPassword }).then((res) => {
                console.log(res.data)
                navigate("/guest/")

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


    return (
        <div className='user'>
            <Navbar />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "100vh" }}>
                <Card sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <AccountCircleIcon sx={{ fontSize: "75px" }} />
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
                            User Registration
                            <Stack onSubmit={registerUser} component="form" direction="column" spacing={2} sx={{ mt: 3 }}>
                                <Stack direction="row" spacing={3}>
                                    <TextField required onChange={(e) => setFirstName(e.target.value)} id='firstName' label="First Name" variant='standard' />
                                    <TextField required onChange={(e) => setLastName(e.target.value)} id='lastName' label="Last Name" variant='standard' />
                                </Stack>
                                <TextField required onChange={(e) => setUserEmail(e.target.value)} type='email' id='email' label="Email" variant='standard' />
                                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-contact">Contact</InputLabel>
                                    <Input
                                        error={!!contactError}
                                        onBlur={validateContact}
                                        onChange={(e) => setUserContact(e.target.value)}
                                        id="standard-adornment-contact"
                                        type='text'
                                        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                    />
                                    <FormHelperText error={!!contactError && contactError}>{contactError}</FormHelperText>
                                </FormControl>
                                <Stack direction={"column"}>
                                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            fullWidth
                                            onChange={(e) => {
                                                setUserPassword(e.target.value)

                                            }}
                                            onBlur={validatePassword}
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePassword}

                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {passwordError && <FormHelperText error={!!passwordError && passwordError}>Password isn't strong enough</FormHelperText>}

                                    </FormControl>

                                </Stack>
                                <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
                                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                        <Input
                                            fullWidth
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            id="standard-adornment-password"
                                            type={showCPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={toggleCPassword}

                                                    >
                                                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
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

            <Footer />
        </div>
    )
}

export default User