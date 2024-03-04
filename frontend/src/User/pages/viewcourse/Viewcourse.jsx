import { Avatar, Box, Button, Card, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChatIcon from '@mui/icons-material/Chat';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};













const Viewcourse = () => {
    const { courseId } = useParams()
    const [material, setMaterial] = useState([])
    const [sectionLength, setSectionLength] = useState(0)
    const [showVideo, setShowVideo] = useState(null);
    const [materialDetails, setMaterialDetails] = useState("")
    const [course, setCourse] = useState("")
    const [time, setTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [progressData, setProgressData] = useState([])
    const [updatedProgress, setUpdatedProgress] = useState([])
    const [progress,setProgress] = useState(0)
    let [count, setCount] = useState(0)



    const uid = sessionStorage.getItem("Uid")
    const server = "http://localhost:5000"

    const getCourse = () => {
        axios.get(`${server}/Course/${courseId}`).then((res) => {
            setCourse(res.data)
        })
    }

    const getSections = () => {
        axios.get(`${server}/progress/${uid}/${courseId}`).then((res) => {
            setProgressData(res.data)
            if (res.data) {
                setCount(res.data.materialIndex)
                var materilCount = res.data.materialIndex
                setProgress(res.data.materialProgress)
            }


            axios.get(`${server}/getallmaterial/${courseId}`).then((res) => {
                if (res.data.length > 0) {
                    setMaterial(res.data);
                    setShowVideo(res.data[materilCount].materialFile);
                    setMaterialDetails(res.data[materilCount])
                    setSectionLength(res.data.length);
                }

            })
        })
    }

    const nextVideo = () => {

        const nextCount = count + 1;
        if (nextCount < sectionLength) {
            setCount(nextCount);
            setShowVideo(material[nextCount].materialFile);
            setMaterialDetails(material[nextCount]);
            const materialProgress = ((nextCount + 1) / sectionLength) * 100;
            console.log(materialProgress);
            axios.patch(`${server}/progress/${progressData._id}`, { userId: uid, courseId, materialProgress, materialIndex: nextCount }).then((res) => {
                setUpdatedProgress(res.data)
                setProgress(res.data.materialProgress)
            })
        }
    }

    const prevVideo = () => {
        const prevCount = count - 1;
        if (prevCount >= 0) {
            setCount(prevCount);
            setShowVideo(material[prevCount].materialFile);
            setMaterialDetails(material[prevCount]);

        }

    }


    const handleTime = () => {
        const currentTime = time
        const duration = totalDuration

        if (currentTime === duration) {
            nextVideo()
        }
    }

    const getCurrentTime = (e) => {
        setTime(e.target.currentTime)

    }

    const getDuration = (e) => {
        setTotalDuration(e.target.duration)
    }




    









    useEffect(() => {
        handleTime()

    }, [time])



    useEffect(() => {
        getSections()
        getCourse()
    }, [])















    return (
        <div className='viewCourseUser'>
            {
                console.log(updatedProgress)
            }
            <Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
                <Box sx={{ width: "70vw", minHeight: "50vh", p: 2 }}>
                    <Stack spacing={1} direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ color: "#2b2d42", fontWeight: "bold", fontSize: "18px" }}>{course && course.courseTitle}</Typography>
                            <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: "16px" }}> &rarr; {materialDetails && materialDetails.sectionId.sectionName} </Typography>
                        </Box>
                        <Box sx={{ ml: 50 }}>
                            <CircularProgressWithLabel value={progress || 0} />
                        </Box>
                    </Stack>
                    <Box sx={{ p: 2 }}>
                        <video onTimeUpdate={getCurrentTime} onLoadedMetadata={getDuration} autoPlay style={{ width: "100%", height: "500px" }} controls src={showVideo && showVideo}></video>
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
                            {
                                progress === 100 && <Button sx={{mt:2}} variant='contained'>View Certificate</Button>
                            }
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