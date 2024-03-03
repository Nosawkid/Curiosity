import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false);
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const sendLoginDetails = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/Login", { Email, Password }).then((res) => {
            console.log(res.data)
            const { id, type } = res.data.payload
            console.log(type);
            if (type === "Instructor") {
                sessionStorage.setItem("Iid", id)
                navigate("../../Instructor/")
            }
            else if(type === "User")
            {
                sessionStorage.setItem("Uid",id)
                navigate("../../User/")
            }
            else if(type === "Jobportal")
            {
                sessionStorage.setItem("Jid",id)
                navigate("../../HiringPortal/")
            }
            else
            {
                alert("Invalid Credentials")
            }




            // console.log(item)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div>
            <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card onSubmit={sendLoginDetails} sx={{ minWidth: "500px", p: 3 }} component="form">
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>Login</Typography>
                        <Stack direction="column" spacing={3}>
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
            </Box>
        </div>
    )
}

export default Login