import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo.png'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = () => {


    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false);
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [open, setOpen] = React.useState(true);
    const [message,setMessage] = useState("")
    const [severity,setSeverity] = useState("")


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendLoginDetails = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/Login", { Email, Password }).then((res) => {
           
            const { id, type } = res.data.payload
            console.log(type);
            if (type === "Instructor") {
                sessionStorage.setItem("Iid", id)
                navigate("../../Instructor/")
            }
            else if (type === "User") {
                sessionStorage.setItem("Uid", id)
                navigate("../../User/")
            }
            else if (type === "Jobportal") {
                sessionStorage.setItem("Jid", id)
                navigate("../../HiringPortal/")
            }
            else if (type === "Jobportal") {
                sessionStorage.setItem("Jid", id)
                navigate("../../HiringPortal/")
            }
            else if(type === "Admin")
            {
                sessionStorage.setItem("Aid",id)
                navigate("../../Admin/")
            }
            else {
                setOpen(true)
                setSeverity("error")
                setMessage("Invalid Username or Password")
            }




            // console.log(item)
        }).catch((err) => {
            setOpen(true)
            setSeverity("error")
            setMessage("Invalid Username or Password")
        })
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div>
            <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
                <Card onSubmit={sendLoginDetails} sx={{ width: "50%", p: 3, display: "flex", alignItems: "center", justifyContent: "center" }} component="form">
                    <CardContent sx={{ width: "60%" }}>
                        <Typography sx={{ textAlign: "left", textTransform: "uppercase", fontSize: "30px", fontWeight: "bold" }}>Welcome Back</Typography>
                        <Stack sx={{ mt: 3 }} direction="column" spacing={3}>
                            <TextField onChange={(e) => setEmail(e.target.value)} variant='outlined' placeholder='Email'></TextField>
                            {/* <TextField variant='outlined' placeholder='Password' type='password'></TextField> */}
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>

                            <Button type='submit' variant='contained'>Login</Button>
                        </Stack>
                    </CardContent>
                </Card>
                <Box sx={{ backgroundColor: "#edede9", width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <img width={300} src={Logo} alt="Site primary Logo" />
                    <Typography sx={{ fontWeight: "bold" }} variant='h3'>CURIOSITY</Typography>
                    <Typography variant='p' sx={{ fontWeight: "bold", letterSpacing: "5px", mt: 2 }}>SEEK OUT THE EXTRAORDINAY WITH US</Typography>
                </Box>
            </Box>
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
        </div>
    )
}

export default Login