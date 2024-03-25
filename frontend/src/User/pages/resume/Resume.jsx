import { Box, Button, Card, CardContent, CardMedia, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Server} from '../../../Server.js'
import {useParams,useNavigate} from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Placeholder from '../../components/placeholder/Placeholder.jsx'

const Resume = () => {
    const navigate = useNavigate()
    const [qualificationValue,setQualificationValue] = useState("")
    const [qualifications,setQualifications] = useState([])
    const [experienceValue,setExperienceValue] = useState("")
    const [experience,setExperience] = useState([])
    const [skillValue,setSkillValue] = useState("")
    const [skill,setSkill] = useState([])
    const [user,setUser] = useState([])
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = useState("")
    const [severity, setseverity] = useState("")

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const {id:jobVacancyId} = useParams()
    
    const uid = sessionStorage.getItem("Uid")
    
    const fetchUser = ()=>{
        axios.get(`${Server}/User/${uid}`).then((res)=>{
            setUser(res.data)
        })
    }

    const submitApplication = (e)=>{
        e.preventDefault()
        
        axios.post(`${Server}/Application`,{jobVacancyId,userId:uid,qualifications,experience,skills:skill}).then((res)=>{
            if(!res.data.status)
            {
               return console.log(res.data.message)
            }
            console.log("Resume Submitted")
            navigate("/user/jobs")
        }).catch((err)=>{
            if(err.response && err.response.data && err.response.data.message)
            {
                setOpen(true)
                setseverity("error")
                setmessage(err.response.data.message)
            }
            else
            {
                setOpen(true)
                setseverity("error")
                setmessage("Something went wrong")
            }
        })
    }














    const handleQualificationKeyPress= (e)=>{
        if(e.key === "Enter" && qualificationValue.trim !== "")
        {
            setQualifications([...qualifications,qualificationValue.trim()])
            setQualificationValue("")
        }
    }

    const handleRemoveQualifications = (index) => {
        const updatedItems = [...qualifications];
        updatedItems.splice(index, 1);
        setQualifications(updatedItems);
      };

    const handleSkillKeyPress= (e)=>{
        if(e.key === "Enter" && skillValue.trim !== "")
        {
            setSkill([...skill,skillValue.trim()])
            setSkillValue("")
        }
    }

    const handleRemoveSkill = (index) => {
        const updatedItems = [...skill];
        updatedItems.splice(index, 1);
        setSkill(updatedItems);
      };

    const handleExperienceKeyPress= (e)=>{
        if(e.key === "Enter" && experienceValue.trim !== "")
        {
            setExperience([...experience,experienceValue.trim()])
            setExperienceValue("")
        }
    }

    const handleRemoveExperience = (index) => {
        const updatedItems = [...experience];
        updatedItems.splice(index, 1);
        setExperience(updatedItems);
      };




      useEffect(()=>{
        fetchUser()
      },[])

    return (
        <div className='userResume'>
            <Box sx={{ p: 3 }}>
                <Card component={"form"} sx={{ width: "80%", margin: "0 auto" }}>
                    <CardContent>
                        <Typography variant='h5' sx={{ textAlign: "center", fontWeight: "bold" }}>RESUME</Typography>
                       {
                        user && user.userPhoto ?  <CardMedia
                        component={"img"}
                        image={user.userPhoto}
                        sx={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%", border: "10px solid #ced4da", display: "block", margin: "10px auto" }}
                    ></CardMedia>:<Placeholder username={user.userName}/>
                       }
                        <Box sx={{ p: 5 }}>
                            <Stack direction={"column"}>
                                <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "20px", mt: 3 }}>Name: <span style={{fontWeight:"bold"}}>{user.userName}</span></Typography>
                                    <Typography sx={{ fontSize: "20px", mt: 3 }}>Email: <span style={{fontWeight:"bold"}}>{user.userEmail}</span> </Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "20px", mt: 3 }}>Contact:  <span style={{fontWeight:"bold"}}>+91 {user.userContact}</span></Typography>
                                    <Typography sx={{ fontSize: "20px", mt: 3 }}>Profession:  <span style={{fontWeight:"bold"}}>{user.userHeadLine}</span></Typography>
                                </Stack>

                                <Typography sx={{ fontSize: "20px", mt: 3, textAlign: "justify" }}>About:{user.userBiography} </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{px:5}}>
                            <Typography sx={{fontSize:"20px",mt:2}}>Enter Qualifications:</Typography>
                            <TextField required multiline minRows={3} fullWidth variant='outlined'
                                value={qualificationValue}
                                onChange={(e)=>setQualificationValue(e.target.value)}
                                onKeyDown={handleQualificationKeyPress}
                                placeholder="Type and press Enter to add items"
                            ></TextField>
                            <Stack>
                                {qualifications.map((row,key)=>(
                                    <div key={key} className='item' style={{display:"inline"}}>
                                        <span>{row}</span>
                                        <Button onClick={() => handleRemoveQualifications(key)}>Remove</Button>
                                    </div>
                                ))}
                            </Stack>
                        </Box>
                        <Box sx={{px:5}}>
                            <Typography sx={{fontSize:"20px",mt:2}}>Enter Experience:</Typography>
                            <TextField required multiline minRows={3} fullWidth variant='outlined'
                                value={experienceValue}
                                onChange={(e)=>setExperienceValue(e.target.value)}
                                onKeyDown={handleExperienceKeyPress}
                                placeholder="Type and press Enter to add Experience"
                                
                            ></TextField>
                            <Stack>
                                {experience.map((row,key)=>(
                                    <div key={key} className='item' style={{display:"inline"}}>
                                        <span>{row}</span>
                                        <Button onClick={() => handleRemoveExperience(key)}>Remove</Button>
                                    </div>
                                ))}
                            </Stack>
                        </Box>
                        <Box sx={{px:5}}>
                            <Typography sx={{fontSize:"20px",mt:2}}>Enter Skills:</Typography>
                            <TextField required multiline minRows={3} fullWidth variant='outlined'
                                value={skillValue}
                                onChange={(e)=>setSkillValue(e.target.value)}
                                onKeyDown={handleSkillKeyPress}
                                placeholder="Type and press Enter to add Skills"
                            ></TextField>
                            <Stack>
                                {skill.map((row,key)=>(
                                    <div key={key} className='item' style={{display:"inline"}}>
                                        <span>{row}</span>
                                        <Button onClick={() => handleRemoveSkill(key)}>Remove</Button>
                                    </div>
                                ))}
                            </Stack>
                        </Box>
                        <Button onClick={submitApplication} fullWidth sx={{mt:2,fontSize:"18px"}} variant='contained'>Submit</Button>
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

export default Resume