import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo.png'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Navbar from '../../Components/Navbar';

const Login = () => {


    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false);
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [open, setOpen] = React.useState(false);
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
            else if(type === "Admin")
            {
                sessionStorage.setItem("Aid",id)
                navigate("../../Admin/")
            }
            else {
                setOpen(true)
                setSeverity("error")
                setMessage("Invalid Email or Password")
            }




            // console.log(item)
        }).catch((err) => {
          if(err.response && err.response.data && err.response.data.message)
          {
            setOpen(true)
            setSeverity("error")
            setMessage(err.response.data.message)
          }
        })
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className='login' id='login'>
            <Navbar/>
            <Box sx={{ display: "flex", width: "100vw", height: "100vh",justifyContent:"center" }}>
                <Card onSubmit={sendLoginDetails} sx={{ width: "50%", p: 3, display: "flex", alignItems: "center", justifyContent: "center",marginRight:"200px" }} component="form">
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
                            <Link style={{color:"#003f88",textAlign:"right"}} to={"/forgotpassword"}>Forgot Password</Link>
                            <Button type='submit' variant='contained'>Login</Button>
                        </Stack>
                    </CardContent>
                </Card>
               
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