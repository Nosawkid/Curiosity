import { Avatar, Box, Button, Card, CardContent,  FormControl,  InputAdornment, InputLabel, OutlinedInput, Stack,  Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import myData from '../../../assets/Thor.mp4'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChatIcon from '@mui/icons-material/Chat';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Viewcourse = () => {
    const {courseId} = useParams()
    const [material,setMaterial] = useState([])
    let [count,setCount] = useState(0)
    const [sectionLength,setSectionLength] = useState(0)
    const [showVideo, setShowVideo] = useState(null);
    const [materialDetails,setMaterialDetails] = useState("")
    const [course,setCourse] = useState("")

    const uid = sessionStorage.getItem("Uid")
    const server = "http://localhost:5000"
   
    const getCourse = ()=>{
        axios.get(`${server}/Course/${courseId}`).then((res)=>{
            setCourse(res.data)
        })
    }
    
    const getSections = ()=>{
        axios.get(`${server}/getallmaterial/${courseId}`).then((res)=>{
            if (res.data.length > 0) {
                setMaterial(res.data);
                setShowVideo(res.data[0].materialFile);
                setMaterialDetails(res.data[0])
                setSectionLength(res.data.length);
            }
           
        })
    }

    const nextVideo = ()=>{
       setCount(count++)
       if(count > sectionLength - 1)
       {
         return setCount(sectionLength - 1)
       }
       setShowVideo(material[count].materialFile)
       setMaterialDetails(material[count])
    }

    const prevVideo = ()=>{
        setCount(count--)
        if(count < 0)
        {
            return setCount(0)
        }
        
       setShowVideo(material[count].materialFile)
       setMaterialDetails(material[count])
    }

   

   


    useEffect(()=>{
        getSections()
        getCourse()
    },[])










    return (
        <div className='viewCourseUser'>
           {
            console.log(showVideo,material)
           }
            <Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
                <Box sx={{ width: "70vw", minHeight: "50vh", p: 2 }}>
                    <Stack spacing={1} direction={"row"} sx={{ alignItems: "center" }}>
                        <Typography sx={{ color: "#2b2d42", fontWeight: "bold", fontSize: "18px" }}>{course && course.courseTitle}</Typography>
                        <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: "16px" }}> &rarr; {materialDetails && materialDetails.sectionId.sectionName} </Typography>
                    </Stack>
                    <Box sx={{ p: 2 }}>
                    <video autoPlay style={{ width: "100%",height:"500px" }} controls src={showVideo && showVideo }></video>
                        <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", mt: 2, justifyContent: "space-between" }}>
                            <Box>
                                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>{materialDetails && materialDetails.materialTitle}</Typography>
                                <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
                                    <Avatar sx={{ fontSize: "13px" }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Typography sx={{ fontSize: "15px", fontWeight: "bold", color: "gray" }}>{materialDetails && materialDetails.sectionId.courseId.instructorId.instructorName}</Typography>
                                </Stack>
                            </Box>
                            <Stack direction={"row"} spacing={1}>
                                <Tooltip title="Previous video">
                                    <Button onClick={prevVideo} variant='outlined'><ArrowLeftIcon /></Button>
                                </Tooltip>
                                <Tooltip title="Next video">
                                    <Button onClick={nextVideo} variant='outlined'><ArrowRightIcon /></Button>
                                </Tooltip>
                            </Stack>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <Typography>
                                {materialDetails && materialDetails.materialDesc}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ width: "30vw", minHeight: "50vh" }}>
                    <Card sx={{ width: "100%" }}>
                        <CardContent>
                            <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>Chat  </Typography>
                                <ChatIcon />
                            </Stack>
                            <Box className="chatBox" sx={{ height: "540px", overflowY: "scroll" }}></Box>
                            <Box className="chatForm" sx={{ pr: 4, width: "100%" }}>

                                {/* <Stack direction={"row"} sx={{
                                        alignItems:"center",
                                        gap:"5px",
                                        border:"2px solid gray",
                                        borderRadius:"10px",
                                        width:"100%",
                                        py:2
                                        }}>
                                        <IconButton sx={{alignSelf:"flex-end"}}><AddPhotoAlternateIcon sx={{color:"gray"}}/></IconButton>
                                        <InputBase fullWidth multiline  placeholder='Type here...'></InputBase>
                                        <IconButton sx={{alignSelf:"flex-end"}}><SendIcon sx={{color:"gray"}}/></IconButton>
                                    </Stack> */}

                                <FormControl sx={{ m: 1, width: "90%" }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                                    <OutlinedInput
                                        sx={{
                                            py: 3
                                        }}
                                        fullWidth
                                        multiline
                                        placeholder='type here...'
                                        id="filled-adornment-password"
                                        type="text"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        startAdornment={<InputAdornment position="end">
                                            <IconButton>
                                                <AddPhotoAlternateIcon />
                                            </IconButton>
                                        </InputAdornment>}
                                    />
                                </FormControl>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div>
    )
}

export default Viewcourse