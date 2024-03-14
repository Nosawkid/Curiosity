import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Holder from '../../../assets/Courseholder.png'

const Reportedcourse = () => {
    const { courseId,reportId } = useParams()
    const [course, setCourse] = useState("")
    const [loading, setLoading] = useState(true)
    const [materials, setMaterials] = useState([])

    const fetchCourse = () => {
        axios.get("http://localhost:5000/Course/" + courseId).then((res) => {
            setCourse(res.data)
            axios.get("http://localhost:5000/Reportedcourse/" + courseId).then((res) => {
                setMaterials(res.data)
                console.log(res.data)
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => setLoading(false))
    }

    const sendResponse = ()=>{
        axios.get("http://localhost:5000/Sendresponse/"+reportId).then((res)=>{
            console.log(res.data.message)
        })
    }


    useEffect(() => {
        fetchCourse()
    }, [])


    return (
        <div className='adminReportedCourse'>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Typography sx={{ fontWeight: "bold", fontSize: "30px", textAlign: "center", mt: 2 }}>{course.courseTitle}</Typography>
                    <CardMedia
                        component={"img"}
                        image={course.courseImage ? course.courseImage : Holder}
                        sx={{
                            width: 450,
                            height: 450,
                            display: "block",
                            margin: "10px auto"
                        }}
                    ></CardMedia>
                    <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>Course Materials</Typography>
                    <Card>
                        <CardContent sx={{display:"flex",gap:"15px",flexWrap:"wrap",alignItems:"center",px:5}}>
                            {
                                materials && materials.map((row, key) => (
                                    <Paper sx={{p:3,width:"350px",height:"250px"}} elevation={3}>
                                        <Box>
                                            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                                                <Typography>Material {key + 1}</Typography>
                                                <Typography sx={{ fontWeight: "bold" }}>{row.materialTitle}</Typography>
                                            </Stack>
                                            <Typography component={"p"}>{row.materialDesc}</Typography>
                                            <video controls style={{width:"100%",height:"100%"}} src={row.materialFile}></video>
                                        </Box>
                                    </Paper>
                                ))
                            }
                        </CardContent>
                        <Stack  justifyContent={"center"} sx={{m:3}} direction={"row"} alignItems={"center"}>
                            <Button onClick={sendResponse} sx={{mx:2}} variant='contained' color='info'>Send Response</Button>
                          
                        </Stack>
                    </Card>
                </Box>
            )}
        </div>
    )
}

export default Reportedcourse