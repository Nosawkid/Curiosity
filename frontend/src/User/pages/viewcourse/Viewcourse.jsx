import { Avatar, Box, Button, Card, CardContent, Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Rating, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChatIcon from '@mui/icons-material/Chat';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { SetSocket } from '../../../Context/Context'
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';


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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};












const Viewcourse = () => {
    const { courseId } = useParams()
    const uid = sessionStorage.getItem("Uid")
    const [material, setMaterial] = useState([])
    const [sectionLength, setSectionLength] = useState(0)
    const [showVideo, setShowVideo] = useState(null);
    const [materialDetails, setMaterialDetails] = useState("")
    const [course, setCourse] = useState("")
    const [time, setTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [progressData, setProgressData] = useState([])
    const [updatedProgress, setUpdatedProgress] = useState([])
    const [progress, setProgress] = useState(0)
    let [count, setCount] = useState(0)
    const [message, setMessage] = useState('')
    const [messageData, setMessageData] = useState([])
    const [chatImage, setChatImage] = useState("")
    const [reviewTitle, setReviewTitle] = useState("")
    const [reviewContent, setreviewContent] = useState("")
    const [reviewRating, setreviewRating] = useState("")
    const [reviews, setreviews] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [reportOpen, setReportOpen] = React.useState(false);
    const handleReportOpen = () => setReportOpen(true);
    const handleReportClose = () => setReportOpen(false);
    const [issueType,setIssueType] = useState("")
    const [issueDesc,setIssueDesc] = useState("")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const socket = useContext(SetSocket)


    useEffect(() => {
        if (!socket) return
        socket.emit("JoinRoomFromClient", { courseId });


        socket.on("chatContentFromServer", ({ chatData }) => {
            setMessageData(chatData)

        });

    }, [socket])

    const fetchChat = () => {
        axios.get(`${server}/Chat/${courseId}`).then((res) => {
            console.log(res.data);
            setMessageData(res.data)
        })
    }

    const submitReport = ()=>{
        axios.post(`${server}/Report`,{issueType,issueDesc,courseId,userId:uid}).then((res)=>{
            setReportOpen(false)
            console.log(res.data.message)
        })
    }



    const SendMessage = () => {

        socket.emit("DataFromClient", { message, courseId, uid }, (response) => {
            console.log(response); // "got it"
        });

        setMessage("")
    }





    const server = "http://localhost:5000"

    const getCourse = () => {
        axios.get(`${server}/Course/${courseId}`).then((res) => {
            setCourse(res.data)
        })
    }

    const submitReview = () => {
        if (!reviewTitle || !reviewContent || !reviewRating) {
            setOpen(true);
            setSeverity("error");
            setAlertMessage("Please fill in all required fields");
            return; // Stop execution if required fields are empty
        }
        axios.post(`${server}/Review`, { reviewTitle, reviewContent, reviewRating, userId: uid, courseId }).then((res) => {
            setReviewTitle("")
            setreviewContent("")
            setreviewRating("")
            fetchReviews()
        }).catch((err) => {
            setOpen(true)
            setSeverity("error")
            if (err.response && err.response.data && err.response.data.message) {
                setAlertMessage(err.response.data.message);
            } else {
                setAlertMessage("An error occurred");
            }
        })
    }

    const fetchReviews = () => {
        axios.get(`${server}/Review/${uid}/${courseId}`).then((res) => {
            setreviews(res.data)
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


    const viewCertificate = () => {
        navigate("/user/certificate/" + courseId + "/" + uid)
    }













    useEffect(() => {
        handleTime()

    }, [time])



    useEffect(() => {
        getSections()
        getCourse()
        fetchChat()
        fetchReviews()

    }, [])

    useEffect(() => {
        // Scroll to the end of the chat box when messageData changes
        const chatBox = document.getElementById('chatBox');
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messageData]);














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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                            <Box sx={{ mt: 2 }}>
                                <CircularProgressWithLabel value={progress || 0} />

                            </Box>
                            <Box>
                                {
                                    progress === 100 && <Button onClick={viewCertificate} sx={{ mt: 2 }} variant='contained'>View Certificate</Button>
                                }
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ p: 2 }}>
                        <video onTimeUpdate={getCurrentTime} onLoadedMetadata={getDuration} autoPlay style={{ width: "100%", height: "500px" }} controls controlsList="nodownload" src={showVideo && showVideo}></video>
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
                        <Divider />
                        <Box className="review" sx={{ mt: 3 }}>

                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Write a Review
                                </Typography>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={reviewTitle}
                                    sx={{ marginBottom: 2 }}
                                    onChange={(e) => setReviewTitle(e.target.value)}
                                    required
                                />

                                <TextField
                                    label="Review Content"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={reviewContent}
                                    sx={{ marginBottom: 2 }}
                                    onChange={(e) => setreviewContent(e.target.value)}
                                    required
                                />
                                <Typography variant="body1" gutterBottom>
                                    Rating:
                                </Typography>
                                <Rating
                                    sx={{ marginBottom: 2 }}
                                    onChange={(e) => setreviewRating(e.target.value)}
                                    value={reviewRating}
                                    
                                />

                                <Button onClick={submitReview} sx={{ display: "block", mb: 3 }} variant="contained" color="primary">
                                    Submit Review
                                </Button>
                                <Button onClick={handleReportOpen} color='info' sx={{ fontSize: "10px", alignSelf: "flex-end" }}>Report</Button>
                            </Box>
                            <Divider sx={{ m: 2 }}>My Reviews</Divider>
                            <Box>

                                {
                                    reviews && reviews.map((row, key) => (
                                        <Box key={key} sx={{ marginBottom: 2 }}>
                                            <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                                                {row.reviewTitle}
                                            </Typography>
                                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                {row.reviewContent}
                                            </Typography>
                                            <Rating value={row.reviewRating} readOnly />
                                        </Box>
                                    ))
                                }

                            </Box>

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
                            <Box id="chatBox" className="chatBox" sx={{ height: "540px", overflowY: "scroll", display: 'flex', flexDirection: 'column' }}>
                                {
                                    messageData.map((chat, key) => (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: uid === chat.userId._id ? 'flex-end' : 'flex-start',
                                                alignItems: 'flex-end', // Align items at the bottom to place profile picture properly
                                            }}
                                        >
                                            {uid !== chat.userId && (
                                                <Avatar
                                                    src={chat.userId.userPhoto}
                                                    sx={{ m: 1 }} // Add margin to Avatar for spacing
                                                    alt={chat.userId.userName}
                                                />
                                            )}
                                            <Card
                                                sx={{
                                                    width: "fit-content",
                                                    m: 1,
                                                    backgroundColor: uid === chat.userId._id ? "#d3e1f2" : "#ffffff",
                                                    borderRadius: '16px',

                                                }}
                                            >
                                                <CardContent
                                                    sx={{ maxWidth: "70%" }}
                                                >
                                                    <Typography>{chat.chatContent}</Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                                                        {new Date(chat.chatDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ))
                                }


                            </Box>
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
                                        onChange={(event) => setMessage(event.target.value)}
                                        value={message}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"

                                                    onClick={SendMessage}
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        startAdornment={<InputAdornment position="end">
                                            <IconButton
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}

                                            >
                                                <AddPhotoAlternateIcon />
                                                <VisuallyHiddenInput
                                                    onChange={(e) => setChatImage(e.target.files[0])}
                                                    type="file" />
                                            </IconButton>
                                        </InputAdornment>}
                                    />
                                </FormControl>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Modal
                open={reportOpen}
                onClose={handleReportClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
                        Report Abuse
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Content flagged on Curiosity undergoes a thorough review by our team to assess its compliance with our Terms of Use and Community Standards. The ultimate decision will be made by Admin.
                    </Typography>
                    <Box sx={{ minWidth: 120, mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Issue type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                label="Issue type"
                                onChange={(e)=>setIssueType(e.target.value)}

                            >
                                <MenuItem value={"Inappropriate Course Content"}>Inappropriate Course Content</MenuItem>
                                <MenuItem value={"Plagiarized Course Materials"}>Plagiarized Course Materials</MenuItem>
                                <MenuItem value={"Misleading Course Descriptions"}>Misleading Course Descriptions</MenuItem>
                                <MenuItem value={"Copyright Infringement"}>Copyright Infringement</MenuItem>
                                <MenuItem value={"Fraudulent Activity"}>Fraudulent Activity</MenuItem>
                                <MenuItem value={"Privacy Violations"}>Privacy Violations</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>


                            </Select>
                        </FormControl>

                            <Typography sx={{mt:2}}>Report Details</Typography>
                            <TextField onChange={(e)=>setIssueDesc(e.target.value)} fullWidth variant='outlined' multiline minRows={5}></TextField>
                            <Button onClick={submitReport} sx={{display:"block",margin:"10px auto"}} variant='contained'>Submit Complaint</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default Viewcourse