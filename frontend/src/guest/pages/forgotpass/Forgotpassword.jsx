import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Forgotpassword = () => {
    const [Email, setEmail] = useState("");
    const [user, setuser] = useState("");
    const [instructor, setinstructor] = useState("");
    const [hirer, sethirer] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setuserVerified(false)
    }
    const [userSecurityAnswer, setuserSecurityAnswer] = useState("");
    const [userVerified, setuserVerified] = useState(false);
    const [userPassword, setuserPassword] = useState("");
    const [confirmUserPassword, setconfirmUserPassword] = useState("");
    const [instructorSecurityAnswer, setinstructorSecurityAnswer] = useState("");
    const [insVerified, setinsVerified] = useState(false);
    const [instructorPassword, setinstructorPassword] = useState("");
    const [confirmInsPass, setconfirmInsPass] = useState("");
    const [jobPortalSecurityAnswer, setjobPortalSecurityAnswer] = useState("");
    const [hirerVerified, sethirerVerified] = useState("");
    const [jobPortalPassword, setjobPortalPassword] = useState("");
    const [portalConfirm, setportalConfirm] = useState("");

    const findAccount = () => {
        if(!Email)
        {
            return alert("Please Fill required fields")
        }
        axios.get("http://localhost:5000/fetchuser", { params: { Email } }).then((res) => {
            if (res.data.type === "User") {
                setuser(res.data.item)
                handleOpen()
            } else if (res.data.type === "Instructor") {
                setinstructor(res.data.item)
                handleOpen()
            }
            else if (res.data.type === "Hirer") {
                sethirer(res.data.item)
                handleOpen()
            }

            
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message)
            }
        })
    }


    const verifyUser = ()=>{
        if(!userSecurityAnswer)
        {
            return alert("Please fill required fields")
        }
        axios.get("http://localhost:5000/verifyuser",{params:{Email,userSecurityAnswer}}).then((res)=>{
           setuserVerified(res.data.status)
        })
    }

    const verifyins = ()=>{
        if(!instructorSecurityAnswer)
        {
            return alert("Please Fill required fields")
        }
        axios.get("http://localhost:5000/verifyins",{params:{Email,instructorSecurityAnswer}}).then((res)=>{
            setinsVerified(res.data.status)
        })
    }

    const verifyportal = ()=>{
        if(!jobPortalSecurityAnswer)
        {
            return alert("Please fill required fields")
        }
        axios.get("http://localhost:5000/verifyportal",{params:{Email,jobPortalSecurityAnswer}}).then((res)=>{
            sethirerVerified(res.data.status)
        })
    }

    const changeUserPass = ()=>{
        if(confirmUserPassword === userPassword)
        {
            axios.put("http://localhost:5000/changeuserpass",{userPassword,userId:user._id}).then((res)=>{
                console.log(res.data)
            })
        }
    }
    const changeInsPass = ()=>{
        if(confirmInsPass === instructorPassword)
        {
            axios.put("http://localhost:5000/changeinspass",{instructorPassword,instructorId:instructor._id}).then((res)=>{
                console.log(res.data)
            })
        }
    }

    const changeHirerpass = ()=>{
        if(portalConfirm === jobPortalPassword)
        {
            axios.put("http://localhost:5000/changehirerpassword",{jobPortalPassword,jobPortalId:hirer._id}).then((res)=>{
                console.log(res.data)
            })
        }
    }
    return (
        <div className='forgotpassword'>
            <Box sx={{ width: "100ww", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card>
                    <CardContent sx={{ p: 5 }}>
                        <Typography textAlign={"left"} variant='h5' sx={{ fontSize: "20px", fontWeight: "bold" }} gutterBottom>Find your CURIOSITY account</Typography>
                        <Typography>Enter the email associated with your account to change your password.</Typography>
                        <TextField type='email' required onChange={(e) => setEmail(e.target.value)} variant='standard' placeholder='Email' fullWidth sx={{ mt: 3 }}></TextField>
                        <Button onClick={findAccount} variant='contained' fullWidth sx={{ mt: 3 }}>SUBMIT</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                {user && (
                                    <Box>
                                        <Box>
                                        <Avatar alt={user.userName} src={user.userPhoto} sx={{ width: 64, height: 64 }} />
                                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                                            {user.userName}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {user.userEmail}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Security Question: {user.userSecurityQuestion}
                                        </Typography>
                                        <TextField onChange={(e)=>setuserSecurityAnswer(e.target.value)} sx={{mt:2}} label="Answer" fullWidth />
                                        <Button onClick={verifyUser}>Submit</Button>
                                    </Box>
                                    {
                                        userVerified && (
                                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                                <TextField onChange={(e)=>setuserPassword(e.target.value)} type='password' fullWidth sx={{my:2}} variant='standard' placeholder='Enter new password'></TextField>
                                                <TextField onChange={(e)=>setconfirmUserPassword(e.target.value)} type='password' fullWidth variant='standard' placeholder='Confirm new password'></TextField>
                                                <Button onClick={changeUserPass} fullWidth sx={{mt:2}} variant='contained'>Update Password</Button>
                                            </Box>
                                        )
                                    }
                                    </Box>
                                )}
                                {instructor && (
                                    <Box>
                                        <Avatar alt={instructor.instructorName} src={instructor.instructorPhoto} sx={{ width: 64, height: 64 }} />
                                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                                            {instructor.instructorName}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {instructor.instructorEmail}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Security Question: {instructor.instructorSecurityQuestion}
                                        </Typography>
                                        <TextField onChange={(e)=>setinstructorSecurityAnswer(e.target.value)} label="Answer" fullWidth />
                                        <Button onClick={verifyins}>Submit</Button>
                                        {
                                        insVerified && (
                                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                                <TextField onChange={(e)=>setinstructorPassword(e.target.value)} type='password' fullWidth sx={{my:2}} variant='standard' placeholder='Enter new password'></TextField>
                                                <TextField onChange={(e)=>setconfirmInsPass(e.target.value)} type='password' fullWidth variant='standard' placeholder='Confirm new password'></TextField>
                                                <Button onClick={changeInsPass} fullWidth sx={{mt:2}} variant='contained'>Update Password</Button>
                                            </Box>
                                        )
                                    }
                                    </Box>
                                )}
                                {hirer && (
                                    <Box>
                                        <Avatar alt={hirer.jobPortalName} src={hirer.jobPortalPhoto} sx={{ width: 64, height: 64 }} />
                                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                                            {hirer.jobPortalName}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {hirer.jobPortalEmail}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Security Question: {hirer.jobPortalSecurityQuestion}
                                        </Typography>
                                        <TextField onChange={(e)=>setjobPortalSecurityAnswer(e.target.value)}  label="Answer" fullWidth />
                                        <Button onClick={verifyportal}>Submit</Button>
                                        {
                                        hirerVerified && (
                                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                                <TextField onChange={(e)=>setjobPortalPassword(e.target.value)} type='password' fullWidth sx={{my:2}} variant='standard' placeholder='Enter new password'></TextField>
                                                <TextField onChange={(e)=>setportalConfirm(e.target.value)} type='password' fullWidth variant='standard' placeholder='Confirm new password'></TextField>
                                                <Button onClick={changeHirerpass} fullWidth sx={{mt:2}} variant='contained'>Update Password</Button>
                                            </Box>
                                        )
                                    }
                                    </Box>
                                )}
                            </Box>
                        </Modal>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Forgotpassword