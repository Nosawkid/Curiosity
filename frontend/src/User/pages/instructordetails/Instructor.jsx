import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { Server } from '../../../Server.js'
import { Box, Card, CardContent, CardMedia, Paper, Stack, Typography } from '@mui/material'
import Holder from '../../../assets/Courseholder.png'

const Instructor = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [instructor, setInstructor] = useState("")
    const [courses, setCourses] = useState([])
    const fetchInstructor = () => {
        axios.get(`${Server}/Instructor/${id}`).then((res) => {
            setInstructor(res.data)
        })
    }


    const fetchCourse = () => {
        axios.get(`${Server}/CourseFromIns/${id}`).then((res) => {
            setCourses(res.data)
        })
    }

    const Viewcourse = (id)=>{
        navigate("/user/course/"+id)
    }

    useEffect(() => {
        fetchInstructor()
        fetchCourse()
    }, [])
    return (
        <div className='userViewofInstructor'>
            <Box sx={{ width: "80%", margin: "10px auto" }}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-around"}>
                    <Box>
                        <Typography sx={{ fontSize: "17px", fontWeight: "bold", color: "gray" }}>INSTRUCTOR</Typography>
                        <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>{instructor.instructorName}</Typography>
                        <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>{instructor.instructorHeadLine}</Typography>
                        <Typography sx={{ fontSize: "17px", fontWeight: "bold", color: "gray", mt: 4 }}>ABOUT ME</Typography>
                        <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>{instructor.instructorBio}</Typography>
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            image={instructor.instructorPhoto}
                            sx={{ width: "250px", height: "250px", borderRadius: "50%" }}
                        ></CardMedia>
                    </Box>
                </Stack>
                <Card>
                        <Typography sx={{ textAlign: "center", fontWeight: "bold",mt:1 }}>My Courses</Typography>
                    <CardContent sx={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
                        {
                            courses && courses.map((row,key)=>(
                                <Paper onClick={()=>Viewcourse(row._id)}  key={key} elevation={3} sx={{width:"350px",cursor:"pointer",'&:hover':{
                                    transform:'scale(1.043)'
                                }}}>
                                <Box>
                                    <CardMedia
                                        component={"img"}
                                        image={row.courseImage ? row.courseImage : Holder}
                                        sx={{width:"100%",objectFit:"cover",height:"250px"}}
                                    ></CardMedia>
                                   <Box sx={{p:3,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                   <Typography sx={{fontWeight:"bold",m:1}} variant='h5'>{row.courseTitle}</Typography>
                                    <Typography sx={{m:1,fontSize:"20px",fontWeight:"bold"}} variant='p'>₹{row.price}</Typography>
                                   </Box>
    
                                </Box>
                            </Paper>
                            ))
                        }
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Instructor