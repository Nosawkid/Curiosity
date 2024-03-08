import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import {Server} from '../../../Server.js'


console.log(Server);

const Changepassword = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showCurrent,setShowCurrent] = useState(false)
    const [showConfirm,setShowConfirm] = useState(false)
    const [instructorPassword,setInstructorPassword] = useState("")
    const [currentPassword,setCurrentPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const Iid = sessionStorage.getItem("Iid")


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleConfirm = () => setShowConfirm((show) => !show)
    const handleCurrent = () => setShowCurrent(show => !show)


    const changePassword = ()=>{
        if(instructorPassword ===  confirmPassword)
        {
            axios.patch(`${Server}/Instructor/${Iid}/changepassword`,{instructorPassword,currentPassword}).then((res)=>{
                if(res.data.status)
                {
                    alert(res.data.message)
                }
            })
        }
        else
        {
            alert("Password Confirmation failed, try again")
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className='instructorChangePassword'>
            <Box sx={{ p: 4 }}>
                <Typography sx={{ textAlign: "center", fontSize: "30px" }}>Change Password</Typography>
                <Stack direction={"column"} spacing={2} sx={{mt:5,width:"45ch"}}>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                        <OutlinedInput
                            onChange={(e)=> setCurrentPassword(e.target.value)}
                            id="outlined-adornment-password"
                            type={showCurrent ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleCurrent}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Current Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            onChange={(e)=>setInstructorPassword(e.target.value)}
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
                            label="New Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            id="outlined-adornment-password"
                            type={showConfirm ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                    <Button onClick={changePassword} variant='contained'>Submit</Button>
                </Stack>
            </Box>
        </div>
    )
}

export default Changepassword